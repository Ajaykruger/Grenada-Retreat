// types.ts

// --- Core Data Structures for the Quiz ---
export interface Question {
  id: string;
  text: string;
}

export interface Section {
  title: string;
  questions: Question[];
}

export interface Answers {
  [questionId: string]: number;
}


// --- New Structured Report Data ---

export interface ExecutiveSummary {
  overallScore: number;
  oneSentenceAssessment: string;
  primaryStrength: string;
  keyInsight: string;
  positiveReinforcement: string;
}

export interface FocusArea {
  area: string; // e.g., 'Emotional Intelligence'
  status: 'Strong' | 'Developing' | 'Focus Area';
  score: number; // 0-100
  summary: string;
}

export interface TopPriority {
  priorityNumber: number; // 1, 2, or 3
  title: string;
  description: string;
  month1Tasks: string[];
  expectedResult: string;
  completed: boolean;
}

export interface DetailedBreakdown {
  area: string;
  score: number;
  status: 'Strong' | 'Developing' | 'Focus Area';
  intro: string;
  whatsGoingWell: string[];
  whereToImprove: string[];
  howYouCompare: string; // A comparison to leadership benchmarks
  quickWins: string[];
}

export interface SixMonthPhase {
  month: number;
  theme: string;
  tasks: string[];
  kpi: string;
}

export interface Task {
  title: string;
  description: string;
  category: 'Awareness' | 'Action' | 'Reflection' | 'Regulation' | 'Connection';
  cadence: 'Daily' | 'Weekly' | 'Monthly';
  completed: boolean;
}

/**
 * The main data structure for the entire generated report.
 */
export interface ReportData {
  executiveSummary: ExecutiveSummary;
  focusAreas: FocusArea[];
  top3Priorities: TopPriority[];
  detailedBreakdown: DetailedBreakdown[];
  sixMonthPlan: SixMonthPhase[];
  dailyTasks: Task[];
}