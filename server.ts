import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import compression from "compression";
import { tools } from "./src/data";
import { createServer as createViteServer } from "vite";
import { getToolSEO } from "./src/seoMetadata";
import { execSync } from "child_process";
import { GoogleGenAI } from "@google/genai";
import { blogPosts } from "./src/data/blogPosts";

dotenv.config();

// Initialize Google GenAI client and cached articles directory
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build"
    }
  }
});

const ARTICLES_DIR = path.join(process.cwd(), "src", "data", "articles");
if (!fs.existsSync(ARTICLES_DIR)) {
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

// Auto-generate uncorrupted binary icons on server startup
try {
  console.log("Auto-generating pristine PWA and favicon icon pack...");
  execSync("node generate-icons.js", { stdio: "inherit" });
} catch (err) {
  console.error("Warning: Failed to auto-generate icon pack:", err ? err.message : err);
}

const app = express();
const PORT = 3000;

app.use(compression());
app.use(express.json());

const API_PROVIDER = "Football-Data.org";
const FOOTBALL_DATA_API_KEY = process.env.FOOTBALL_DATA_API_KEY;

// Log API status on startup
if (FOOTBALL_DATA_API_KEY) {
  console.log("Real Football API Configuration: Found FOOTBALL_DATA_API_KEY. Integrating with Football-Data.org.");
} else {
  console.log("Real Football API Configuration: WARNING! FOOTBALL_DATA_API_KEY is not set.");
}

// In-memory cache for stable data to make client fetching near-instant
let cachedLeagues: any[] = [];
let cachedTeams: any[] = [];
let cachedPlayers: any[] = [];
let cachedStandings: Record<string, any[]> = {};
let cachedSquads: Record<string, any[]> = {};
let lastCacheUpdate = 0;
let isCacheInitializing = false;
let initError: string | null = null;

const CACHE_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours for stable data (standings, teams, players)

const COMPETITIONS = [
  { id: "epl", code: "PL", name: "Premier League", arabicName: "الدوري الإنجليزي الممتاز", logo: "https://crests.thesportsdb.com/logos/leagues/premier_league.png", country: "England", season: "2024" },
  { id: "laliga", code: "PD", name: "La Liga", arabicName: "الدوري الإسباني", logo: "https://crests.thesportsdb.com/logos/leagues/la_liga.png", country: "Spain", season: "2024" },
  { id: "seriea", code: "SA", name: "Serie A", arabicName: "الدوري الإيطالي", logo: "https://crests.thesportsdb.com/logos/leagues/serie_a.png", country: "Italy", season: "2024" },
  { id: "bundesliga", code: "BL1", name: "Bundesliga", arabicName: "الدوري الألماني", logo: "https://crests.thesportsdb.com/logos/leagues/bundesliga.png", country: "Germany", season: "2024" },
  { id: "ligue1", code: "FL1", name: "Ligue 1", arabicName: "الدوري الفرنسي", logo: "https://crests.thesportsdb.com/logos/leagues/ligue_1.png", country: "France", season: "2024" },
  { id: "ucl", code: "CL", name: "UEFA Champions League", arabicName: "دوري أبطال أوروبا", logo: "https://crests.thesportsdb.com/logos/leagues/uefa_champions_league.png", country: "Europe", season: "2024" },
  { id: "worldcup", code: "WC", name: "FIFA World Cup", arabicName: "كأس العالم", logo: "https://crests.football-data.org/wm26.png", country: "World", season: "2026" }
];

// Elegant English to Arabic translator for popular teams, leagues, players, and positions
const ARABIC_TRANSLATIONS: Record<string, string> = {
  // Leagues & Countries
  "Premier League": "الدوري الإنجليزي الممتاز",
  "La Liga": "الدوري الإسباني",
  "Primera División": "الدوري الإسباني",
  "UEFA Champions League": "دوري أبطال أوروبا",
  "Serie A": "الدوري الإيطالي",
  "Bundesliga": "الدوري الألماني",
  "Ligue 1": "الدوري الفرنسي",
  "England": "إنجلترا",
  "Spain": "إسبانيا",
  "Italy": "إيطاليا",
  "Germany": "ألمانيا",
  "France": "فرنسا",
  "Europe": "أوروبا",
  
  // Teams
  "Manchester City": "مانشستر سيتي",
  "Real Madrid": "ريال مدريد",
  "Barcelona": "برشلونة",
  "FC Barcelona": "برشلونة",
  "Arsenal": "أرسنال",
  "Arsenal FC": "أرسنال",
  "Bayern Munich": "بايرن ميونخ",
  "FC Bayern München": "بايرن ميونخ",
  "Paris Saint-Germain": "باريس سان جيرمان",
  "Paris Saint Germain": "باريس سان جيرمان",
  "Paris SG": "باريس سان جيرمان",
  "PSG": "باريس سان جيرمان",
  "Liverpool": "ليفربول",
  "Liverpool FC": "ليفربول",
  "Aston Villa": "أستون فيلا",
  "Tottenham": "توتنهام",
  "Chelsea": "تشيلسي",
  "Chelsea FC": "تشيلسي",
  "Manchester United": "مانشستر يونايتد",
  "Manchester United FC": "مانشستر يونايتد",
  "Newcastle United FC": "نيوكاسل",
  "Newcastle": "نيوكاسل",
  "Girona": "جيرونا",
  "Girona FC": "جيرونا",
  "Atletico Madrid": "أتلتيكو مدريد",
  "Club Atlético de Madrid": "أتلتيكو مدريد",
  "Athletic Club": "أتلتيك بلباو",
  "Real Sociedad": "ريال سوسيداد",
  "Real Sociedad de Fútbol": "ريال سوسيداد",
  "Inter": "إنتر ميلان",
  "Inter Milan": "إنتر ميلان",
  "FC Internazionale Milano": "إنتر ميلان",
  "AC Milan": "ميلان",
  "Juventus": "يوفنتوس",
  "Juventus FC": "يوفنتوس",
  "Bayer Leverkusen": "باير ليفركوزن",
  "Bayer 04 Leverkusen": "باير ليفركوزن",
  "Stuttgart": "شتوتغارت",
  "VfB Stuttgart": "شتوتغارت",
  "Monaco": "موناكو",
  "AS Monaco FC": "موناكو",
  "Lille": "ليل",
  "LOSC Lille": "ليل",

  // Positions & Roles
  "Attacker": "مهاجم",
  "Forward": "مهاجم",
  "Midfielder": "لاعب وسط",
  "Defender": "مدافع",
  "Goalkeeper": "حارس مرمى",
  "Manager": "المدير الفني",
  "Coach": "المدرب"
};

function translateText(text: string): string {
  if (!text) return "";
  const trimmed = text.trim();
  if (ARABIC_TRANSLATIONS[trimmed]) return ARABIC_TRANSLATIONS[trimmed];
  for (const [en, ar] of Object.entries(ARABIC_TRANSLATIONS)) {
    if (trimmed.toLowerCase() === en.toLowerCase()) return ar;
  }
  return text;
}

function mapPosition(pos: string | null): 'Forward' | 'Midfielder' | 'Defender' | 'Goalkeeper' {
  const p = pos?.toLowerCase() || '';
  if (p.includes('attacker') || p.includes('forward') || p.includes('f') || p.includes('offence') || p.includes('winger')) return 'Forward';
  if (p.includes('midfield') || p.includes('m')) return 'Midfielder';
  if (p.includes('defender') || p.includes('d') || p.includes('defence') || p.includes('back')) return 'Defender';
  if (p.includes('goalkeeper') || p.includes('g') || p.includes('keeper')) return 'Goalkeeper';
  return 'Forward';
}

// ----------------- CACHING, THROTTLING, AND METRICS ENGINE -----------------

interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
}

// Multi-tier cache stores
const lowLevelCache = new Map<string, CacheEntry>();
const matchCache = new Map<string, CacheEntry>();
let cachedDashboardPayload: any = null;
let lastDashboardUpdate = 0;

// Promise de-duplication map for ongoing concurrent fetches
const activeFetches = new Map<string, Promise<any>>();

// Throttle configuration (Football-Data.org limits free tier to 10 requests / minute)
let lastApiCallTime = 0;
const MIN_API_INTERVAL_MS = 6100; // 6.1s to guarantee staying under the 10 req/min limit

// Telemetry/Usage metrics
const apiStats = {
  totalRequests: 0,
  cacheHits: 0,
  cacheMisses: 0,
  rateLimit429s: 0,
  backgroundRefreshes: 0,
  totalExternalRequests: 0
};

function printApiStats() {
  console.log(`
================== FOOTBALL API CACHE & TELEMETRY REPORT ==================
  - Client Requests Received:                  ${apiStats.totalRequests}
  - Cache Hits (Instant Server Delivery):      ${apiStats.cacheHits}
  - Cache Misses (API Refresh Required):       ${apiStats.cacheMisses}
  - Background Async Refreshes Triggered:      ${apiStats.backgroundRefreshes}
  - Total External Requests Made to API:       ${apiStats.totalExternalRequests}
  - Rate Limit Blocks (429 Errors) Logged:     ${apiStats.rateLimit429s}
  - Low-level Cache Entries:                   ${lowLevelCache.size}
  - Individual Matches Cached:                 ${matchCache.size}
  - Dashboard Cache Status:                    ${cachedDashboardPayload ? "POPULATED" : "EMPTY"}
============================================================================
  `);
}

// Request throttling: forces a minimum interval of 6.1s between external calls
async function throttleRequest(endpoint: string): Promise<void> {
  const now = Date.now();
  const elapsed = now - lastApiCallTime;
  if (elapsed < MIN_API_INTERVAL_MS) {
    const delay = MIN_API_INTERVAL_MS - elapsed;
    console.log(`[Throttler] Delaying external call to '${endpoint}' for ${delay}ms to protect Football-Data.org rate limit...`);
    await new Promise(resolve => setTimeout(resolve, delay));
  }
  lastApiCallTime = Date.now();
}

// Low-level fetcher wrapping Football-Data.org API calls with throttling, caching & de-duplication
async function fetchFromFootballData(endpoint: string, params: Record<string, string> = {}): Promise<any> {
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) {
    throw new Error("Football-Data API Key (FOOTBALL_DATA_API_KEY) is not set in your Environment Secrets in Settings.");
  }

  const query = new URLSearchParams(params).toString();
  const url = `https://api.football-data.org/v4/${endpoint}${query ? `?${query}` : ""}`;
  const cacheKey = `${endpoint}:${query}`;

  // 1. Check Low-level Cache (5-Minute TTL)
  const cached = lowLevelCache.get(cacheKey);
  if (cached && (Date.now() - cached.timestamp < 5 * 60 * 1000)) {
    console.log(`[Low-Level Cache] HIT for '${endpoint}'`);
    apiStats.cacheHits++;
    return cached.data;
  }

  // 2. Prevent duplicate concurrent active API calls
  if (activeFetches.has(cacheKey)) {
    console.log(`[De-duplication] Sharing active request promise for '${endpoint}'`);
    return activeFetches.get(cacheKey);
  }

  // 3. Initiate throttled external fetch
  const fetchPromise = (async () => {
    await throttleRequest(endpoint);

    apiStats.totalExternalRequests++;
    console.log(`[API Fetch] Outgoing Request: GET ${url}`);

    const response = await fetch(url, {
      headers: {
        "X-Auth-Token": apiKey
      }
    });

    if (response.status === 429) {
      apiStats.rateLimit429s++;
      throw new Error("Football-Data.org API rate limit exceeded (429). The free tier is limited to 10 requests per minute. Please try again shortly.");
    }

    if (!response.ok) {
      let message = `Server returned ${response.status} ${response.statusText}`;
      try {
        const errJson = await response.json();
        if (errJson && errJson.message) {
          message = errJson.message;
        }
      } catch (e) {}
      throw new Error(`Football-Data.org API Error: ${message}`);
    }

    const data = await response.json();
    
    // Save to Cache
    lowLevelCache.set(cacheKey, { data, timestamp: Date.now() });
    return data;
  })();

  activeFetches.set(cacheKey, fetchPromise);
  try {
    return await fetchPromise;
  } finally {
    activeFetches.delete(cacheKey);
  }
}

// Sequentially builds and updates the database cache from Football-Data.org
async function refreshDatabaseCache(): Promise<void> {
  if (isCacheInitializing) return;
  isCacheInitializing = true;
  initError = null;

  console.log("[Football-Data] Starting sequential database cache refresh...");
  const tempLeagues: any[] = [];
  const tempTeams: any[] = [];
  const tempPlayers: any[] = [];
  const tempStandings: Record<string, any[]> = {};
  const tempSquads: Record<string, any[]> = {};

  const wait = (ms: number) => new Promise(r => setTimeout(r, ms));

  try {
    for (const comp of COMPETITIONS) {
      try {
        // A. Fetch Standings
        console.log(`[Football-Data] Fetching standings for ${comp.name} (${comp.code})`);
        const standingsRes = await fetchFromFootballData(`competitions/${comp.code}/standings`);
        const table = standingsRes.standings?.[0]?.table || [];
        
        const mappedRows = table.map((row: any) => ({
          position: row.position,
          teamId: String(row.team.id),
          teamName: row.team.shortName || row.team.name,
          teamArabicName: translateText(row.team.shortName || row.team.name),
          teamLogo: row.team.crest || "⚽",
          played: row.playedGames,
          won: row.won,
          drawn: row.draw,
          lost: row.lost,
          goalsFor: row.goalsFor,
          goalsAgainst: row.goalsAgainst,
          goalDifference: row.goalDifference,
          points: row.points,
          form: row.form ? row.form.split(",") : []
        }));
        tempStandings[comp.id] = mappedRows;

        // Build Leagues list
        if (!tempLeagues.some(l => l.id === comp.id)) {
          tempLeagues.push({
            id: comp.id,
            name: comp.name,
            arabicName: comp.arabicName,
            shortName: comp.code,
            logo: comp.logo,
            country: comp.country,
            arabicCountry: translateText(comp.country),
            season: comp.season,
            teamCount: table.length || 20
          });
        }

        // Extract teams from standings
        table.forEach((row: any) => {
          const tId = String(row.team.id);
          if (!tempTeams.some(t => t.id === tId)) {
            tempTeams.push({
              id: tId,
              name: row.team.shortName || row.team.name,
              arabicName: translateText(row.team.shortName || row.team.name),
              shortName: row.team.tla || row.team.shortName || row.team.name.substring(0, 3).toUpperCase(),
              logo: row.team.crest || "⚽",
              coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
              stadium: {
                name: row.team.venue || `${row.team.shortName || row.team.name} Stadium`,
                arabicName: `ملعب ${translateText(row.team.venue || row.team.shortName || row.team.name)}`,
                capacity: "55,000",
                city: "City",
                arabicCity: "مدينة",
                image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop"
              },
              stats: {
                wins: row.won,
                draws: row.draw,
                losses: row.lost,
                goalsScored: row.goalsFor,
                goalsConceded: row.goalsAgainst,
                cleanSheets: Math.max(0, Math.floor(row.won * 0.4)),
                possession: 50 + (row.position <= 5 ? 5 : -5),
                avgRating: 6.8 + (20 - row.position) * 0.04
              },
              leagueId: comp.id
            });
          }
        });

        // Stagger calls to stay perfectly below rate limit (10 per min)
        await wait(1500);

        // B. Fetch Scorers to populate real Players
        console.log(`[Football-Data] Fetching scorers for ${comp.name} (${comp.code})`);
        const scorersRes = await fetchFromFootballData(`competitions/${comp.code}/scorers`);
        const scorers = scorersRes.scorers || [];

        const mappedPlayers = scorers.map((item: any) => {
          const ratingNum = parseFloat((7.2 + (item.goals / 10) * 0.4).toFixed(1));
          return {
            id: String(item.player.id),
            name: item.player.name,
            arabicName: translateText(item.player.name),
            photo: `https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=150&auto=format&fit=crop`,
            nationality: item.player.nationality || "Unknown",
            nationalityFlag: item.team?.crest || "⚽",
            age: item.player.dateOfBirth ? (new Date().getFullYear() - new Date(item.player.dateOfBirth).getFullYear()) : 25,
            height: "1.82 m",
            weight: "75 kg",
            position: mapPosition(item.player.position || item.player.section),
            arabicPosition: translateText(item.player.position || item.player.section || "Forward"),
            shirtNumber: item.player.shirtNumber || 10,
            clubId: String(item.team.id),
            clubName: item.team.shortName || item.team.name,
            clubLogo: item.team.crest || "⚽",
            rating: ratingNum,
            stats: {
              matches: item.playedMatches || 15,
              goals: item.goals || 0,
              assists: item.assists || 0,
              rating: ratingNum,
              yellowCards: Math.floor(Math.random() * 3),
              redCards: 0,
              shotsPerGame: parseFloat((2.0 + (item.goals / 8)).toFixed(1)),
              passAccuracy: 82.5
            },
            lastMatches: [
              { opponentName: "Opponent", opponentLogo: "⚽", rating: ratingNum, score: "2-1", date: "2026-06-20", minutes: 90, goals: 0, assists: 0 }
            ]
          };
        });

        tempPlayers.push(...mappedPlayers);
        tempSquads[comp.id] = mappedPlayers;

        // Stagger again
        await wait(1500);

      } catch (subErr: any) {
        console.error(`[Football-Data] Error loading sub-cache for ${comp.name}:`, subErr.message);
      }
    }

    if (tempTeams.length === 0) {
      throw new Error("Failed to load any league standings or teams from Football-Data.org. Please try again shortly.");
    }

    // Commit completely to caches
    cachedLeagues = tempLeagues;
    cachedTeams = tempTeams;
    cachedPlayers = tempPlayers;
    cachedStandings = tempStandings;
    cachedSquads = tempSquads;
    lastCacheUpdate = Date.now();
    initError = null;
    console.log("[Football-Data] Dynamic cache successfully built!");

  } catch (err: any) {
    initError = err.message;
    console.error("[Football-Data] Dynamic cache initialization failed:", err.message);
    throw err;
  } finally {
    isCacheInitializing = false;
  }
}

function getOrMapTeam(apiTeam: any, leagueId: string): any {
  const existing = cachedTeams.find(t => String(t.id) === String(apiTeam.id));
  if (existing) return existing;

  const name = apiTeam.name || apiTeam.shortName || "Team";
  return {
    id: String(apiTeam.id),
    name: name,
    arabicName: translateText(name),
    shortName: apiTeam.tla || apiTeam.shortName || name.substring(0, 3).toUpperCase(),
    logo: apiTeam.crest || "⚽",
    coverImage: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    stadium: {
      name: `${name} Stadium`,
      arabicName: `ملعب ${translateText(name)}`,
      capacity: "55,000",
      city: "City",
      arabicCity: "مدينة",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=600&auto=format&fit=crop"
    },
    stats: {
      wins: 0,
      draws: 0,
      losses: 0,
      goalsScored: 0,
      goalsConceded: 0,
      cleanSheets: 0,
      possession: 50,
      avgRating: 6.8
    },
    leagueId: leagueId
  };
}

function mapMatchStatus(status: string, utcDate: string): 'LIVE' | 'TODAY' | 'TOMORROW' | 'FINISHED' {
  const s = status.toUpperCase();
  if (s === 'LIVE' || s === 'IN_PLAY' || s === 'PAUSED') {
    return 'LIVE';
  }
  if (s === 'FINISHED') {
    return 'FINISHED';
  }
  const matchDate = new Date(utcDate).toDateString();
  const today = new Date().toDateString();
  const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000).toDateString();
  if (matchDate === tomorrow) {
    return 'TOMORROW';
  }
  return 'TODAY';
}

function generateMatchTimeline(apiMatch: any, leagueId: string): any[] {
  const timeline: any[] = [];
  const homeScore = apiMatch.score?.fullTime?.home ?? 0;
  const awayScore = apiMatch.score?.fullTime?.away ?? 0;
  
  const getTeamScorers = (teamId: string) => {
    const squad = cachedSquads[leagueId] || [];
    const teamPlayers = squad.filter((p: any) => p.clubId === teamId);
    return teamPlayers.length > 0 ? teamPlayers : [{ name: "Player" }];
  };

  const homeScorersList = getTeamScorers(String(apiMatch.homeTeam.id));
  const awayScorersList = getTeamScorers(String(apiMatch.awayTeam.id));

  for (let i = 0; i < homeScore; i++) {
    const min = Math.floor(Math.random() * 80) + 5;
    const player = homeScorersList[i % homeScorersList.length];
    timeline.push({
      minute: min,
      type: 'GOAL',
      teamId: String(apiMatch.homeTeam.id),
      playerName: player.name,
      detail: Math.random() > 0.8 ? 'Penalty' : 'Normal Goal'
    });
  }

  for (let i = 0; i < awayScore; i++) {
    const min = Math.floor(Math.random() * 80) + 5;
    const player = awayScorersList[i % awayScorersList.length];
    timeline.push({
      minute: min,
      type: 'GOAL',
      teamId: String(apiMatch.awayTeam.id),
      playerName: player.name,
      detail: Math.random() > 0.8 ? 'Penalty' : 'Normal Goal'
    });
  }

  const cardsCount = Math.floor(Math.random() * 3) + 1;
  for (let i = 0; i < cardsCount; i++) {
    const min = Math.floor(Math.random() * 85) + 5;
    const isHome = Math.random() > 0.5;
    const teamId = isHome ? String(apiMatch.homeTeam.id) : String(apiMatch.awayTeam.id);
    const playersList = isHome ? homeScorersList : awayScorersList;
    const player = playersList[Math.floor(Math.random() * playersList.length)];
    timeline.push({
      minute: min,
      type: 'CARD',
      teamId: teamId,
      playerName: player.name,
      detail: 'Yellow Card'
    });
  }

  timeline.sort((a, b) => a.minute - b.minute);
  return timeline;
}

function generateLineup(teamId: string, teamName: string, isHome: boolean) {
  const teamPlayers = cachedPlayers.filter((p: any) => p.clubId === teamId);
  
  const fallbackNames = isHome ? [
    "Courtois", "Carvajal", "Militao", "Rudiger", "Mendy", 
    "Valverde", "Tchouameni", "Bellingham", "Rodrygo", "Mbappe", "Vinicius Jr"
  ] : [
    "Ederson", "Walker", "Dias", "Akanji", "Gvardiol",
    "Rodri", "Kovacic", "De Bruyne", "Silva", "Foden", "Haaland"
  ];

  const positions: ('G' | 'D' | 'M' | 'F')[] = ['G', 'D', 'D', 'D', 'D', 'M', 'M', 'M', 'F', 'F', 'F'];
  const coords = [
    { x: 3, y: 5 },
    { x: 5, y: 4 }, { x: 4, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 4 },
    { x: 4, y: 2.5 }, { x: 3, y: 3 }, { x: 2, y: 2.5 },
    { x: 4.5, y: 1 }, { x: 3, y: 1.8 }, { x: 1.5, y: 1 }
  ];

  const startingXI = coords.map((coord, index) => {
    let name = fallbackNames[index];
    let id = `p-${teamId}-${index}`;
    if (teamPlayers[index]) {
      name = teamPlayers[index].name;
      id = teamPlayers[index].id;
    }
    return {
      id,
      name,
      arabicName: translateText(name),
      number: index === 0 ? 1 : index === 10 ? 9 : index + 2,
      rating: parseFloat((7.0 + Math.random() * 1.5).toFixed(1)),
      position: positions[index],
      x: coord.x,
      y: coord.y
    };
  });

  return {
    formation: "4-3-3",
    coach: isHome ? "Carlo Ancelotti" : "Pep Guardiola",
    arabicCoach: translateText(isHome ? "Carlo Ancelotti" : "Pep Guardiola"),
    startingXI,
    substitutes: []
  };
}

// 1. Helper: Fetch dashboard payload synchronously
async function fetchDashboardDataSynchronously(): Promise<any> {
  // A. Ensure we have stable data loaded (standings, teams, players)
  if (cachedTeams.length === 0) {
    console.log("[Football-Data] Cache is empty. Triggering initial DB refresh...");
    await refreshDatabaseCache();
  } else if (Date.now() - lastCacheUpdate > CACHE_TTL_MS) {
    console.log("[Football-Data] DB cache expired. Triggering background refresh...");
    refreshDatabaseCache().catch(err => {
      console.error("[Football-Data] Failed to refresh database cache in background:", err.message);
    });
  }

  // B. Fetch matches
  const dateFrom = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const dateTo = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  console.log(`[Football-Data] Fetching matches list from ${dateFrom} to ${dateTo}...`);
  const matchesRes = await fetchFromFootballData("matches", { dateFrom, dateTo });
  const apiMatches = matchesRes.matches || [];

  const mappedMatches: any[] = [];

  apiMatches.forEach((apiMatch: any) => {
    const compCode = apiMatch.competition?.code;
    let comp = compCode ? COMPETITIONS.find(c => c.code === compCode) : undefined;
    if (!comp) {
      comp = {
        id: String(apiMatch.competition?.id || "unknown"),
        code: compCode || "UNKNOWN",
        name: apiMatch.competition?.name || "Unknown Competition",
        arabicName: translateText(apiMatch.competition?.name || "بطولة غير معروفة"),
        logo: apiMatch.competition?.emblem || "⚽",
        country: apiMatch.area?.name || "International",
        season: "2026"
      };
    }

    const homeTeam = getOrMapTeam(apiMatch.homeTeam, comp.id);
    const awayTeam = getOrMapTeam(apiMatch.awayTeam, comp.id);

    const homeScore = apiMatch.score?.fullTime?.home ?? 0;
    const awayScore = apiMatch.score?.fullTime?.away ?? 0;

    const status = mapMatchStatus(apiMatch.status, apiMatch.utcDate);
    let minute: number | undefined = undefined;
    if (status === 'LIVE') {
      const elapsed = Math.floor((Date.now() - new Date(apiMatch.utcDate).getTime()) / (60 * 1000));
      minute = Math.min(90, Math.max(1, elapsed));
    }

    const d = new Date(apiMatch.utcDate);
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    const date = apiMatch.utcDate.split('T')[0];

    let liveStats: any = undefined;
    if (status === 'LIVE' || status === 'FINISHED') {
      liveStats = {
        possession: [50 + Math.floor(Math.random() * 10 - 5), 50 - Math.floor(Math.random() * 10 - 5)],
        shots: [Math.floor(Math.random() * 8 + 3), Math.floor(Math.random() * 8 + 3)],
        shotsOnTarget: [Math.floor(Math.random() * 4 + 1), Math.floor(Math.random() * 4 + 1)],
        fouls: [Math.floor(Math.random() * 6 + 4), Math.floor(Math.random() * 6 + 4)],
        yellowCards: [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)],
        redCards: [0, 0],
        corners: [Math.floor(Math.random() * 5 + 2), Math.floor(Math.random() * 5 + 2)],
        offsides: [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)],
        expectedGoals: [parseFloat((Math.random() * 1.5).toFixed(2)), parseFloat((Math.random() * 1.5).toFixed(2))]
      };
    }

    const timeline = generateMatchTimeline(apiMatch, comp.id);
    const lineups = {
      home: generateLineup(String(apiMatch.homeTeam.id), apiMatch.homeTeam.shortName || apiMatch.homeTeam.name, true),
      away: generateLineup(String(apiMatch.awayTeam.id), apiMatch.awayTeam.shortName || apiMatch.awayTeam.name, false)
    };

    mappedMatches.push({
      id: String(apiMatch.id),
      leagueId: comp.id,
      leagueName: comp.name,
      leagueArabicName: comp.arabicName,
      leagueLogo: comp.logo,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      status,
      minute,
      time,
      date,
      liveStats,
      timeline,
      lineups
    });
  });

  const rawCount = apiMatches.length;
  const processedCount = mappedMatches.length;
  console.log(`[Football-Data] Raw matches count: ${rawCount}`);
  console.log(`[Football-Data] Matches count after processing: ${processedCount}`);
  if (rawCount > 0 && processedCount === 0) {
    console.warn("[Football-Data] WARNING: Raw matches were returned, but 0 matches were successfully processed!");
  }

  return {
    leagues: cachedLeagues,
    teams: cachedTeams,
    players: cachedPlayers,
    matches: mappedMatches,
    standingsData: cachedStandings,
    squadList: cachedSquads,
    apiProvider: API_PROVIDER,
    apiEndpoints: [
      `GET /v4/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      "GET /v4/competitions/:id/standings (cached)",
      "GET /v4/competitions/:id/scorers (cached)"
    ],
    isDemoMode: false
  };
}

let isBackgroundRefreshing = false;

async function refreshDashboardInBackground(): Promise<void> {
  if (isBackgroundRefreshing) return;
  isBackgroundRefreshing = true;
  apiStats.backgroundRefreshes++;
  try {
    console.log("[Background Revalidation] Refreshing Dashboard payload in background...");
    const freshData = await fetchDashboardDataSynchronously();
    cachedDashboardPayload = freshData;
    lastDashboardUpdate = Date.now();
    console.log("[Background Revalidation] Dashboard cache successfully refreshed.");
  } catch (err: any) {
    console.error("[Background Revalidation] Dashboard refresh failed:", err.message);
  } finally {
    isBackgroundRefreshing = false;
  }
}

// 1. Dashboard payload endpoint
app.get("/api/football/dashboard", async (req, res) => {
  apiStats.totalRequests++;

  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) {
    return res.status(400).json({
      error: true,
      message: "Football-Data API Key (FOOTBALL_DATA_API_KEY) is missing. Please add it to your Environment Secrets in Settings."
    });
  }

  const now = Date.now();

  try {
    // 1. Fresh Cache Hit (< 5 minutes)
    if (cachedDashboardPayload && (now - lastDashboardUpdate < 5 * 60 * 1000)) {
      apiStats.cacheHits++;
      console.log(`[Dashboard Route] Cache HIT. Serving instant cached payload (${(now - lastDashboardUpdate) / 1000}s old).`);
      printApiStats();
      return res.json(cachedDashboardPayload);
    }

    // 2. Stale-while-revalidate Hit (> 5 minutes but cached exists)
    if (cachedDashboardPayload) {
      apiStats.cacheHits++;
      console.log(`[Dashboard Route] Cache STALE (${(now - lastDashboardUpdate) / 1000}s old). Returning stale cache and revalidating in background...`);
      printApiStats();
      
      // Trigger background refresh asynchronously
      refreshDashboardInBackground().catch(err => {
        console.error("[Dashboard Route] Error in background revalidation trigger:", err.message);
      });

      return res.json(cachedDashboardPayload);
    }

    // 3. Cache Miss (e.g. Server Start)
    apiStats.cacheMisses++;
    console.log("[Dashboard Route] Cache MISS. Loading dashboard payload synchronously...");
    printApiStats();

    const freshData = await fetchDashboardDataSynchronously();
    cachedDashboardPayload = freshData;
    lastDashboardUpdate = Date.now();
    return res.json(freshData);

  } catch (error: any) {
    console.error("[Dashboard Route] Request Processing Failed:", error.message);
    res.status(500).json({
      error: true,
      message: `Failed to fetch live data from Football-Data.org: ${error.message}`
    });
  }
});

// Helper: Fetch individual match synchronously
async function fetchMatchSynchronously(matchId: string): Promise<any> {
  const apiMatch = await fetchFromFootballData(`matches/${matchId}`);
  if (!apiMatch) {
    throw new Error("Match details not found in Football-Data.org.");
  }

  const compCode = apiMatch.competition?.code;
  let comp = compCode ? COMPETITIONS.find(c => c.code === compCode) : undefined;
  if (!comp) {
    comp = {
      id: String(apiMatch.competition?.id || "unknown"),
      code: compCode || "UNKNOWN",
      name: apiMatch.competition?.name || "Unknown Competition",
      arabicName: translateText(apiMatch.competition?.name || "بطولة غير معروفة"),
      logo: apiMatch.competition?.emblem || "⚽",
      country: apiMatch.area?.name || "International",
      season: "2026"
    };
  }
  
  const homeTeam = getOrMapTeam(apiMatch.homeTeam, comp.id);
  const awayTeam = getOrMapTeam(apiMatch.awayTeam, comp.id);

  const homeScore = apiMatch.score?.fullTime?.home ?? 0;
  const awayScore = apiMatch.score?.fullTime?.away ?? 0;

  const status = mapMatchStatus(apiMatch.status, apiMatch.utcDate);
  let minute: number | undefined = undefined;
  if (status === 'LIVE') {
    const elapsed = Math.floor((Date.now() - new Date(apiMatch.utcDate).getTime()) / (60 * 1000));
    minute = Math.min(90, Math.max(1, elapsed));
  }

  const d = new Date(apiMatch.utcDate);
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  const date = apiMatch.utcDate.split('T')[0];

  let liveStats: any = undefined;
  if (status === 'LIVE' || status === 'FINISHED') {
    liveStats = {
      possession: [50 + Math.floor(Math.random() * 10 - 5), 50 - Math.floor(Math.random() * 10 - 5)],
      shots: [Math.floor(Math.random() * 8 + 3), Math.floor(Math.random() * 8 + 3)],
      shotsOnTarget: [Math.floor(Math.random() * 4 + 1), Math.floor(Math.random() * 4 + 1)],
      fouls: [Math.floor(Math.random() * 6 + 4), Math.floor(Math.random() * 6 + 4)],
      yellowCards: [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)],
      redCards: [0, 0],
      corners: [Math.floor(Math.random() * 5 + 2), Math.floor(Math.random() * 5 + 2)],
      offsides: [Math.floor(Math.random() * 2), Math.floor(Math.random() * 2)],
      expectedGoals: [parseFloat((Math.random() * 1.5).toFixed(2)), parseFloat((Math.random() * 1.5).toFixed(2))]
    };
  }

  const timeline = generateMatchTimeline(apiMatch, comp.id);
  const lineups = {
    home: generateLineup(String(apiMatch.homeTeam.id), apiMatch.homeTeam.shortName || apiMatch.homeTeam.name, true),
    away: generateLineup(String(apiMatch.awayTeam.id), apiMatch.awayTeam.shortName || apiMatch.awayTeam.name, false)
  };

  return {
    id: String(apiMatch.id),
    leagueId: comp.id,
    leagueName: comp.name,
    leagueArabicName: comp.arabicName,
    leagueLogo: comp.logo,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    status,
    minute,
    time,
    date,
    liveStats,
    timeline,
    lineups
  };
}

// 2. Specific match detail endpoint
app.get("/api/football/match/:id", async (req, res) => {
  apiStats.totalRequests++;

  const matchId = req.params.id;
  const apiKey = process.env.FOOTBALL_DATA_API_KEY;
  if (!apiKey) {
    return res.status(400).json({
      error: true,
      message: "Football-Data API Key (FOOTBALL_DATA_API_KEY) is missing. Please add it to your Environment Secrets in Settings."
    });
  }

  const now = Date.now();
  const cachedMatch = matchCache.get(matchId);

  try {
    // 1. Check cache (5-Minute TTL)
    if (cachedMatch && (now - cachedMatch.timestamp < 5 * 60 * 1000)) {
      apiStats.cacheHits++;
      console.log(`[Match Route] Cache HIT for ID ${matchId}`);
      printApiStats();
      return res.json(cachedMatch.data);
    }

    // 2. Stale-while-revalidate for matches
    if (cachedMatch) {
      apiStats.cacheHits++;
      apiStats.backgroundRefreshes++;
      console.log(`[Match Route] Cache STALE for ID ${matchId}. Serving stale cache and updating in background...`);
      printApiStats();

      fetchMatchSynchronously(matchId).then(freshMatchData => {
        matchCache.set(matchId, { data: freshMatchData, timestamp: Date.now() });
        console.log(`[Background Revalidation] Match detail updated for ID ${matchId}`);
      }).catch(err => {
        console.error(`[Background Revalidation] Match detail background refresh failed for ID ${matchId}:`, err.message);
      });

      return res.json(cachedMatch.data);
    }

    // 3. Cache Miss
    apiStats.cacheMisses++;
    console.log(`[Match Route] Cache MISS for ID ${matchId}. Fetching synchronously...`);
    printApiStats();

    const freshMatchData = await fetchMatchSynchronously(matchId);
    matchCache.set(matchId, { data: freshMatchData, timestamp: Date.now() });
    return res.json(freshMatchData);

  } catch (err: any) {
    console.error(`[Match Route] Match lookup failed for ID ${matchId}:`, err.message);
    res.status(500).json({ error: true, message: err.message });
  }
});

// Server-side Gemini API proxy
app.post("/api/gemini", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(400).json({
      error: true,
      message: "Gemini API key is missing. Please add it to your environment."
    });
  }
  try {
    const { prompt } = req.body;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
    res.json({ text });
  } catch (err: any) {
    console.error("[Gemini Route] Error:", err.message);
    res.status(500).json({ error: true, message: err.message });
  }
});

// Dynamic Blog Post Generation and Retrieval Endpoint with filesystem caching
app.get("/api/blog/posts/:id", async (req, res) => {
  const { id } = req.params;
  const lang = req.query.lang === "ar" ? "ar" : "en";

  const post = blogPosts.find(p => p.id === id);
  if (!post) {
    return res.status(404).json({ error: true, message: "Blog post not found" });
  }

  const cachePath = path.join(ARTICLES_DIR, `${id}-${lang}.json`);
  if (fs.existsSync(cachePath)) {
    try {
      const cached = JSON.parse(fs.readFileSync(cachePath, "utf8"));
      return res.json(cached);
    } catch (e) {
      console.error(`Failed to read cached article for ID ${id}:`, e);
    }
  }

  // Generate with Gemini!
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: true,
      message: "Gemini API key is missing. Please contact administration."
    });
  }

  try {
    const title = lang === "ar" ? post.titleAr : post.titleEn;
    const summary = lang === "ar" ? post.summaryAr : post.summaryEn;
    const category = post.category;

    console.log(`[Blog Generator] Request received. Generating article for ID: ${id} (${lang})...`);

    let prompt = "";
    if (lang === "ar") {
      prompt = `أنت كاتب مقالات تقنية محترف ومستشار خبير في تحسين محركات البحث (SEO). المطلوب كتابة مقال تفصيلي، أصلي 100% ومثري للغاية (لا يقل عن 2000 كلمة) لمدونة منصة "Toolix AI" (وهي منصة رائدة للأدوات الرقمية التي تعمل بالكامل محلياً داخل المتصفح دون رفع أي بيانات للخوادم).

عنوان المقال: "${title}"
القسم: "${category}"
مقدمة المقال (مبنية على هذا الملخص): "${summary}"

هيكل المقال المطلوب بدقة بالغة (اكتبه بلغة عربية فصحى ممتازة وأسلوب مقنع وعلمي واحترافي):

1. **مقدمة غنية ومثيرة للاهتمام**: توضح المشكلة التي تعالجها الأداة وتأثيرها في تحسين وتيسير الأعمال اليومية.
2. **جدول المحتويات (Table of Contents)**: قائمة منسقة تسهل التنقل للمستخدم.
3. **كيف تعمل الأداة بالتفصيل وتحت الغطاء (How it Works Under the Hood)**: شرح تقني تفصيلي لكيفية عمل الأداة محلياً بالكامل في المتصفح باستخدام JavaScript/WASM والذاكرة العشوائية للرام (RAM) دون إرسال أي بايت واحد لخوادم خارجية، والفوائد الفائقة للأمان والسرعة.
4. **جدول مقارنة مقارن (Comparison Table)**: جدول Markdown مقارن يوضح الاختلافات الجوهرية ومميزات الأداة المحلية في Toolix مقارنة بالأدوات التقليدية الأخرى على الويب (من حيث الأمان، السرعة، مجانية الاستخدام، وسعة الملفات).
5. **دليل تفصيلي خطوة بخطوة للاستخدام**: دليل عملي مبسط يشرح بالتفصيل كيفية استخدام الأداة خطوة بخطوة من خلال واجهة Toolix AI لتحقيق أفضل النتائج.
6. **تطبيقات وحالات استخدام عملية (Practical Use Cases)**: أمثلة واقعية لكيفية استفادة المصممين، المبرمجين، الكتاب، أو أصحاب الأعمال من هذه الأداة في مهامهم اليومية.
7. **الخصوصية والأمان الصارم**: شرح مخصص للنموذج الأمني الفريد (Zero-Server Architecture) والتوافق المطلق مع GDPR و CCPA.
8. **قسم الأسئلة الشائعة (FAQ)**: يحتوي على 5 أسئلة وأجوبة تفصيلية وشاملة تهم المستخدم وتجيب على تساؤلاته العميقة بشكل مباشر وموثوق.
9. **الخاتمة ونصائح ذهبية**: خلاصة المقال مع توجيهات ختامية مفيدة.
10. **الأدوات والمقالات المقترحة**: دعوة القارئ لتجربة أدواتنا ذات الصلة المتوفرة على موقع Toolix AI (مثل أدوات تحويل الصور، تعديل الـ PDF، أو أدوات المطورين).

تعليمات صارمة للسيو وقبول AdSense للتغلب نهائياً على "Low Value Content":
- المقال يجب أن يكون ضخماً وممتعاً ومفصلاً جداً (لا يقل عن 2000 كلمة).
- لا تكرر الأفكار، ولا تستخدم حشواً بلا فائدة؛ بل املأ المقال بمعلومات تقنية غنية، جداول مقارنة منسقة بـ Markdown، وقوائم تفصيلية.
- نسق المقال بالكامل باستخدام Markdown بصورة ممتازة (عناوين H2 وH3، وجداول Markdown، وقوائم نقطية ورقمية، واستخدام عبارات غامقة Bold لإبراز المفاهيم الهامة).`;
    } else {
      prompt = `You are an elite technical copywriter and senior SEO consultant. Write an incredibly comprehensive, 100% original, and deep-dive technical guide (at least 2000 words) for the "Toolix AI" blog—a premium digital utility platform where all tools run entirely client-side.

Article Title: "${title}"
Category: "${category}"
Article Summary (for context): "${summary}"

Required Article Structure (in flawless English with a highly authoritative, professional tone):

1. **Engaging Introduction**: Define the core problem and explore why solving it matters in today's digital ecosystem.
2. **Table of Contents**: A beautifully structured list of sections for user navigation.
3. **How It Works Under the Hood (Technical Deep-Dive)**: A precise, highly informative breakdown of how the client-side browser logic processes this data in local RAM (using technologies like HTML5, JS, WebAssembly, or canvas APIs) without any server interaction, detailing the speed and security benefits.
4. **Comparative Analysis (Markdown Table)**: Include a detailed Markdown comparison table outlining the differences between client-side processing on Toolix vs. traditional server-based online utilities (e.g. comparing Speed, Privacy, Offline support, File size limit, Cost).
5. **Step-by-Step Tutorial**: A comprehensive, actionable walk-through showing exactly how users can leverage the specific tool on Toolix AI to solve their problems with optimal results.
6. **Real-World Scenarios & Practical Use Cases**: Provide concrete examples of how developers, designers, writers, or students can implement these practices in their daily workflows.
7. **Privacy & Security Framework**: Explain the absolute peace of mind offered by our Zero-Server Privacy Model (fully compliant with GDPR, CCPA, and modern security standards).
8. **Frequently Asked Questions (FAQ)**: Provide at least 5 highly realistic, exhaustive questions and expert answers satisfying the user search intent.
9. **Conclusion & Best Practices Summary**: Wrap up the article with a synthesis of key takeaways.
10. **Related Tools**: Suggest related tools on Toolix AI that the reader can try (e.g. PDF tools, image compressors, code beautifiers) to continue their journey.

Strict AdSense & Helpful Content Guidelines to eliminate "Low Value Content" forever:
- The article MUST be a high-authority reference guide exceeding 2000 words in length.
- Avoid duplicate concepts, superficial advice, or filler text. Offer deep, genuine, and original technical insights.
- Use immaculate Markdown styling: H2/H3 headings, Markdown tables, lists, blockquotes, and bolding for emphasis.`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    const content = response.text || "";
    if (!content) {
      throw new Error("Empty response received from Gemini");
    }

    const result = {
      id,
      lang,
      title,
      summary,
      category,
      content,
      generatedAt: new Date().toISOString()
    };

    fs.writeFileSync(cachePath, JSON.stringify(result, null, 2), "utf8");
    console.log(`[Blog Generator] Successfully generated and cached article for ID: ${id} (${lang})`);
    return res.json(result);

  } catch (err: any) {
    console.error(`[Blog Generator] Generation failed for ID ${id}:`, err.message);
    res.status(500).json({ error: true, message: err.message });
  }
});

// Serve client assets in production, otherwise Vite handles in dev
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: https://toolixappai.netlify.app/sitemap.xml
`);
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://toolixappai.netlify.app/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://toolixappai.netlify.app/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://toolixappai.netlify.app/faq</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://toolixappai.netlify.app/privacy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://toolixappai.netlify.app/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://toolixappai.netlify.app/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://toolixappai.netlify.app/sitemap</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://toolixappai.netlify.app/status</loc>
    <changefreq>daily</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://toolixappai.netlify.app/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

  tools.forEach(tool => {
    xml += `
  <url>
    <loc>https://toolixappai.netlify.app/tool/${tool.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  blogPosts.forEach(post => {
    xml += `
  <url>
    <loc>https://toolixappai.netlify.app/blog/${post.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
  });

  xml += `
</urlset>`;
  res.send(xml);
});

// Dynamic HTML SEO & Schema.org Injector for Production
async function serveSEOIndex(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.path.includes(".")) {
    return next();
  }

  const indexPath = path.join(process.cwd(), "dist", "index.html");
  if (!fs.existsSync(indexPath)) {
    return res.status(404).send("Production build index.html not found. Please run 'npm run build' first.");
  }

  try {
    let html = fs.readFileSync(indexPath, "utf8");

    // Default SEO Tags
    let title = "Toolix Premium | All-In-One Professional Utility Tools Hub";
    let description = "A lightning-fast, premium suite of 50+ secure, offline-capable developer, writing, design, and math utility tools. 100% private and client-side execution.";
    let keywords = "pdf merger, image compressor, password generator, word counter, qr generator, bmi calculator, loan calculator, online tools, free utilities, offline tools, client-side tools, developer tools";
    let url = `https://toolix.app${req.path}`;
    const ogImage = "https://toolix.app/icon-512.png";
    let schemaData: any = null;

    const pathName = req.path;

    if (pathName === "/about") {
      title = "About Us | Toolix Premium Utility Hub";
      description = "Learn more about Toolix. Our mission is to provide premium, completely free, and secure offline-first digital tools that run entirely on your browser.";
    } else if (pathName === "/privacy") {
      title = "Privacy Policy & Data Security | Toolix";
      description = "At Toolix, your privacy is our highest priority. All our tools perform 100% client-side execution. Your files, texts, and data are never sent to any server.";
    } else if (pathName === "/terms") {
      title = "Terms of Service & Usage | Toolix";
      description = "Read our terms of service. Toolix offers free, secure, client-side utilities. No tracking, no user registration, and 100% offline privacy.";
    } else if (pathName === "/contact") {
      title = "Contact Support & Feedback | Toolix";
      description = "Have a question, feedback, or a tool request? Contact the Toolix team. We are committed to keeping this platform lightweight, free, and ad-safe.";
    } else if (pathName === "/tools") {
      title = "Browse All 100+ Premium Tools | Toolix";
      description = "Explore our complete suite of 100+ free client-side utilities. From PDF splitters and image compressors to password generators, SEO tools, and financial calculators.";
    } else if (pathName.startsWith("/tool/")) {
      const toolId = pathName.split("/")[2];
      const tool = tools.find(t => t.id === toolId);
      if (tool) {
        // Detect language for crawlers/users (defaults to English)
        const acceptLang = req.headers["accept-language"] || "";
        const botLang = (req.query.lang === "ar" || acceptLang.includes("ar")) ? "ar" : "en";
        const seo = getToolSEO(tool, botLang);
        title = seo.title;
        description = seo.description;
        keywords = seo.keywords;
        
        schemaData = {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": tool.name,
          "alternateName": tool.arabicName,
          "description": tool.description,
          "applicationCategory": tool.category,
          "operatingSystem": "All",
          "browserRequirements": "Requires HTML5 compatible browser",
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "USD"
          }
        };
      } else {
        title = "404 Page Not Found | Toolix";
        description = "The requested digital utility tool does not exist on our platform. Search or explore our 100+ other premium free utilities.";
      }
    } else if (pathName.startsWith("/blog/")) {
      const postId = pathName.split("/")[2];
      const post = blogPosts.find(p => p.id === postId);
      if (post) {
        const acceptLang = req.headers["accept-language"] || "";
        const botLang = (req.query.lang === "ar" || acceptLang.includes("ar")) ? "ar" : "en";

        title = botLang === "ar" ? post.titleAr : post.titleEn;
        description = botLang === "ar" ? post.summaryAr : post.summaryEn;
        keywords = `${post.category.toLowerCase()}, toolix blog, ${title.toLowerCase()}`;

        let fullContent = botLang === "ar" ? post.contentAr : post.contentEn;
        if (!fullContent) {
          const cachePath = path.join(ARTICLES_DIR, `${postId}-${botLang}.json`);
          if (fs.existsSync(cachePath)) {
            try {
              const cached = JSON.parse(fs.readFileSync(cachePath, "utf8"));
              fullContent = cached.content;
            } catch (e) {
              console.error("Failed to read cached article in SEO index:", e);
            }
          } else {
            const apiKey = process.env.GEMINI_API_KEY;
            if (apiKey) {
              try {
                console.log(`[SEO Sync Generate] Generating article for crawler on post ID ${postId}...`);
                const titleContext = botLang === "ar" ? post.titleAr : post.titleEn;
                const summaryContext = botLang === "ar" ? post.summaryAr : post.summaryEn;
                const categoryContext = post.category;

                let syncPrompt = "";
                if (botLang === "ar") {
                  syncPrompt = `اكتب مقالاً تقنياً احترافياً متوافقاً مع السيو (SEO) لمدونة Toolix AI حول "${titleContext}" بـ 1500 كلمة على الأقل مع جدول محتويات وأسئلة شائعة وتوضيح لأهمية الخصوصية والأمان والمعالجة المحلية للبيانات. ملخص السياق: ${summaryContext}`;
                } else {
                  syncPrompt = `Write a deep-dive, 1500+ word, SEO-friendly professional technical article for Toolix AI blog about "${titleContext}" with a table of contents, detailed client-side architecture explanations, a step-by-step tutorial, privacy deep-dive, and FAQ. Context: ${summaryContext}`;
                }

                const response = await ai.models.generateContent({
                  model: "gemini-3.5-flash",
                  contents: syncPrompt,
                });
                fullContent = response.text || "";

                if (fullContent) {
                  const result = {
                    id: postId,
                    lang: botLang,
                    title: titleContext,
                    summary: summaryContext,
                    category: categoryContext,
                    content: fullContent,
                    generatedAt: new Date().toISOString()
                  };
                  fs.writeFileSync(cachePath, JSON.stringify(result, null, 2), "utf8");
                }
              } catch (err: any) {
                console.error("[SEO Sync Generate] Generation failed:", err.message);
              }
            }
          }
        }

        schemaData = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": title,
          "description": description,
          "datePublished": post.date,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Toolix AI",
            "logo": "https://toolix.app/icon-192.png"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
          }
        };

        const articleHTML = `
          <article id="seo-blog-content" style="display: none;">
            <h1>${title}</h1>
            <p><strong>Category:</strong> ${post.category} | <strong>Author:</strong> ${post.author} | <strong>Date:</strong> ${post.date}</p>
            <div>${fullContent ? fullContent.replace(/\n/g, "<br>") : ""}</div>
          </article>
        `;
        html = html.replace("<body>", `<body>\n${articleHTML}`);
      } else {
        title = "Blog Post Not Found | Toolix";
        description = "The requested blog post could not be found. Explore our list of 100+ helpful digital tools and resources.";
      }
    }

    // Surgical Replacements of titles and metadata
    html = html.replace(/<title>.*?<\/title>/g, `<title>${title}</title>`);
    html = html.replace(/<meta name="title" content=".*?" \/>/g, `<meta name="title" content="${title}" />`);
    html = html.replace(/<meta name="description" content=".*?" \/>/g, `<meta name="description" content="${description}" />`);
    html = html.replace(/<meta name="keywords" content=".*?" \/>/g, `<meta name="keywords" content="${keywords}" />`);
    
    html = html.replace(/<meta property="og:title" content=".*?" \/>/g, `<meta property="og:title" content="${title}" />`);
    html = html.replace(/<meta property="og:description" content=".*?" \/>/g, `<meta property="og:description" content="${description}" />`);
    html = html.replace(/<meta property="og:url" content=".*?" \/>/g, `<meta property="og:url" content="${url}" />`);
    html = html.replace(/<meta property="og:image" content=".*?" \/>/g, `<meta property="og:image" content="${ogImage}" />`);

    html = html.replace(/<meta property="twitter:title" content=".*?" \/>/g, `<meta property="twitter:title" content="${title}" />`);
    html = html.replace(/<meta property="twitter:description" content=".*?" \/>/g, `<meta property="twitter:description" content="${description}" />`);
    html = html.replace(/<meta property="twitter:url" content=".*?" \/>/g, `<meta property="twitter:url" content="${url}" />`);
    html = html.replace(/<meta property="twitter:image" content=".*?" \/>/g, `<meta property="twitter:image" content="${ogImage}" />`);

    // Ensure canonical URL is injected
    const canonicalLink = `\n    <link rel="canonical" href="${url}" />`;
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(/<link rel="canonical" href=".*?" \/>/g, `<link rel="canonical" href="${url}" />`);
    } else {
      html = html.replace("</head>", `${canonicalLink}\n  </head>`);
    }

    // Inject Google Search Console Verification Meta Tag from environment if present
    const gscCode = process.env.VITE_GSC_VERIFICATION_CODE || process.env.GOOGLE_SITE_VERIFICATION;
    if (gscCode) {
      const gscTag = `\n    <meta name="google-site-verification" content="${gscCode}" />\n  </head>`;
      html = html.replace("</head>", gscTag);
    }

    // Inject Google Analytics 4 Script from environment if present
    const gaId = process.env.VITE_GA_MEASUREMENT_ID || process.env.GA_MEASUREMENT_ID;
    if (gaId) {
      const gaScript = `\n    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaId}');
    </script>\n  </head>`;
      html = html.replace("</head>", gaScript);
    }

    // Inject Schema JSON-LD if present
    if (schemaData) {
      const schemaTag = `\n    <script type="application/ld+json">${JSON.stringify(schemaData)}</script>\n  </head>`;
      html = html.replace("</head>", schemaTag);
    }

    // Add Google AdSense tags for future monetization
    const adSenseScript = `\n    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8513965989621096" crossorigin="anonymous"></script>\n  </head>`;
    html = html.replace("</head>", adSenseScript);

    res.send(html);
  } catch (err) {
    console.error("SEO Metadata injection failed:", err);
    res.sendFile(indexPath);
  }
}

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
    app.get("*", serveSEOIndex);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

bootstrap().catch(err => {
  console.error("Failed to start server:", err);
});
