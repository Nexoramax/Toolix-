export type ToolCategory = 'pdf-tools' | 'image-tools' | 'text-tools' | 'developer-tools' | 'security-tools' | 'calculators' | 'converters' | 'generators' | 'ai-tools';

export interface Tool {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  arabicDescription: string;
  category: ToolCategory;
  iconName: string;
  isPopular?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export interface ActivityLog {
  id: string;
  toolId: string;
  toolName: string;
  arabicToolName: string;
  timestamp: string;
  action: string;
  arabicAction: string;
}

export interface AnalyticsData {
  totalVisits: number;
  totalToolUses: number;
  popularTools: {
    toolId: string;
    name: string;
    arabicName: string;
    uses: number;
    category: ToolCategory;
  }[];
  recentActivities: ActivityLog[];
}
