/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface VideoAnalysis {
  id: number;
  title: string;
  views: number;
  engagementRate: number;
  hookScore: number;
  hookType: string;
  thumbnail: string;
  likes: number;
  shares: number;
  saves: number;
  commentsCount: number;
  trigger: string;
  pacing: string;
  textOverlay: string;
  spokenHook: string;
  spokenHookAnalysis: string;
  analysis: {
    whyItWorks: string;
    improvement: string;
  };
  commentInsights: string;
  topComments: string[];
}

export interface GIAAnalysis {
  username: string;
  videosAnalyzed: number;
  overallScore: number;
  bestVideo: {
    title: string;
    reason: string;
  };
  worstVideo: {
    title: string;
    reason: string;
  };
  audienceSignals: {
    whatTheyShare: string;
    whatTheySave: string;
    whatTheyComment: string;
    tellingComment: string;
  };
  themes: {
    work: string[];
    avoid: string[];
  };
  roadmap: {
    idealHookFormula: string;
    visualStyle: string;
    emotionalTrigger: string;
    postingStrategy: string;
  };
  nextVideoBrief: {
    say: string;
    show: string;
  };
  videos: VideoAnalysis[];
}
