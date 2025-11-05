import { GoogleGenAI, Type } from "@google/genai";
import { Answers, ReportData } from '../types';

if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const formatAnswersForPrompt = (answers: Answers): string => {
    let formatted = "Here are the user's answers (on a scale of 1-5, where 1 is Strongly Disagree and 5 is Strongly Agree):\n";
     for (const [questionId, answerValue] of Object.entries(answers)) {
        formatted += `${questionId}: ${answerValue}\n`;
    }
    return formatted;
};

// Based on the new, highly structured ReportData type
const responseSchema = {
    type: Type.OBJECT,
    properties: {
        executiveSummary: {
            type: Type.OBJECT,
            properties: {
                overallScore: { type: Type.NUMBER },
                oneSentenceAssessment: { type: Type.STRING },
                primaryStrength: { type: Type.STRING },
                keyInsight: { type: Type.STRING },
                positiveReinforcement: { type: Type.STRING },
            },
            required: ["overallScore", "oneSentenceAssessment", "primaryStrength", "keyInsight", "positiveReinforcement"],
        },
        focusAreas: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    area: { type: Type.STRING },
                    status: { type: Type.STRING, enum: ['Strong', 'Developing', 'Focus Area'] },
                    score: { type: Type.NUMBER },
                    summary: { type: Type.STRING },
                },
                required: ["area", "status", "score", "summary"],
            },
        },
        top3Priorities: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    priorityNumber: { type: Type.NUMBER },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    month1Tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    expectedResult: { type: Type.STRING },
                },
                required: ["priorityNumber", "title", "description", "month1Tasks", "expectedResult"],
            },
        },
        detailedBreakdown: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    area: { type: Type.STRING },
                    score: { type: Type.NUMBER },
                    status: { type: Type.STRING, enum: ['Strong', 'Developing', 'Focus Area'] },
                    intro: { type: Type.STRING },
                    whatsGoingWell: { type: Type.ARRAY, items: { type: Type.STRING } },
                    whereToImprove: { type: Type.ARRAY, items: { type: Type.STRING } },
                    howYouCompare: { type: Type.STRING },
                    quickWins: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
                required: ["area", "score", "status", "intro", "whatsGoingWell", "whereToImprove", "howYouCompare", "quickWins"],
            },
        },
        sixMonthPlan: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    month: { type: Type.NUMBER },
                    theme: { type: Type.STRING },
                    tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
                    kpi: { type: Type.STRING },
                },
                required: ["month", "theme", "tasks", "kpi"],
            },
        },
        dailyTasks: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    category: { type: Type.STRING, enum: ['Awareness', 'Action', 'Reflection', 'Regulation', 'Connection'] },
                    cadence: { type: Type.STRING, enum: ['Daily', 'Weekly', 'Monthly'] },
                },
                required: ["title", "description", "category", "cadence"],
            },
        },
    },
    required: ["executiveSummary", "focusAreas", "top3Priorities", "detailedBreakdown", "sixMonthPlan", "dailyTasks"],
};


export const generateClarityReport = async (answers: Answers): Promise<ReportData> => {
    const formattedAnswers = formatAnswersForPrompt(answers);

    const LEADERSHIP_BENCHMARKS = {
        "EmotionalIntelligence": "Top-quartile leaders demonstrate high emotional self-awareness, allowing them to regulate responses in over 90% of high-stress situations.",
        "StrategicThinking": "Effective leaders dedicate 5-10 hours per week (12-25% of their time) to strategic thinking and planning, not just operational tasks.",
        "Communication": "Highly influential leaders maintain a feedback ratio of approximately 4:1 (positive/reinforcing to constructive/redirecting) to foster psychological safety and growth.",
        "TeamDevelopment": "Leaders in high-performing teams spend up to 20% of their time coaching and developing their direct reports.",
        "Wellbeing": "Leaders who model and prioritize well-being report 30% higher team engagement and have a 40% lower burnout rate among their staff."
    };

    const prompt = `
You are "Lizamari", an expert leadership coach who is warm, empowering, insightful, and completely non-judgmental. You combine values-driven insights with a possibility-focused approach to help leaders grow.

Your task is to analyze a user's answers from the 'Leadership Clarity Quiz' and generate a comprehensive, actionable, and personalized "Leadership Clarity Plan".

You MUST return the output as a single, valid JSON object that strictly adheres to the provided 'LeadershipClarityReport' TypeScript interface. Do not include any markdown formatting like \`\`\`json around the object.

**USER'S QUIZ ANSWERS (Scale 1-5):**
${formattedAnswers}

**LEADERSHIP BENCHMARKS (for your context):**
${JSON.stringify(LEADERSHIP_BENCHMARKS, null, 2)}

**REQUIRED JSON OUTPUT STRUCTURE (LeadershipClarityReport):**
// Ensure your entire output is a single JSON object matching this structure.
interface ReportData {
    executiveSummary: {
        overallScore: number; // 0-100 score based on overall analysis.
        oneSentenceAssessment: string;
        primaryStrength: string;
        keyInsight: string;
        positiveReinforcement: string;
    };
    focusAreas: {
        area: string; // MUST be one of: 'Self-Awareness & Presence', 'Emotional Regulation', 'Strategic Thinking', 'Communication & Influence', 'Team Empowerment', "Leader's Well-being"
        status: 'Strong' | 'Developing' | 'Focus Area'; // Strong > 80, Developing 60-79, Focus Area < 60
        score: number; // 0-100 score for this specific area.
        summary: string;
    }[];
    top3Priorities: {
        priorityNumber: number; // 1, 2, or 3
        title: string; // e.g., "Cultivate Mindful Presence in High-Stakes Meetings".
        description: string; // 2-3 sentences on why this is a priority.
        month1Tasks: string[]; // 2-4 concrete tasks for the first month.
        expectedResult: string; // The positive outcome.
    }[];
    detailedBreakdown: {
        area: string; // Matches area from focusAreas.
        score: number;
        status: string; // Matches status from focusAreas.
        intro: string;
        whatsGoingWell: string[]; // 2-3 bullet points.
        whereToImprove: string[]; // 2-3 bullet points.
        howYouCompare: string; // Compare to the benchmarks provided.
        quickWins: string[]; // 2-3 simple, high-impact tasks.
    }[];
    sixMonthPlan: {
        month: number; // 1 through 6.
        theme: string; // e.g., "Month 1: Foundational Awareness".
        tasks: string[]; // 3-5 key tasks.
        kpi: string; // The Key Performance Indicator.
    }[];
    dailyTasks: {
        title: string;
        description: string;
        category: 'Awareness' | 'Action' | 'Reflection' | 'Regulation' | 'Connection';
        cadence: 'Daily' | 'Weekly' | 'Monthly';
    }[]; // 5-7 initial tasks, mixed cadence.
}

**ANALYSIS INSTRUCTIONS:**
1.  **Calculate Scores:** Analyze answers to determine scores for the **6 focus areas** and an overall score. Be realistic. Low scores on self-regulation questions should result in a low score for 'Emotional Regulation'.
2.  **Be a Coach:** Use an encouraging, professional, and highly actionable tone. Empower the user.
3.  **Prioritize:** The "Top 3 Priorities" should be the most impactful changes the user can make.
4.  **Actionable Advice:** All tasks must be specific and practical. Generate a mix of Daily, Weekly, and Monthly tasks.
5.  **Strict JSON:** The final output must be only the JSON object, starting with \`{\` and ending with \`}\`.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const responseText = response.text.trim();
        const reportData: ReportData = JSON.parse(responseText);

        // Basic validation to ensure the core objects are present
        if (reportData.executiveSummary && reportData.focusAreas && reportData.top3Priorities) {
            return reportData;
        } else {
            throw new Error("Received an incomplete JSON response from the API.");
        }
    } catch (error) {
        console.error("Gemini API call or JSON parsing failed:", error);
        if (error instanceof SyntaxError) {
             console.error("Invalid JSON received from API. Content:", (error as any).message);
        }
        throw new Error("Failed to generate and parse report from Gemini API.");
    }
};