import React from 'react';
import { ReportData } from '../types';
import { View } from '../App';
import Intro from './Intro';

interface DashboardProps {
  reportData: ReportData | null;
  onNavigate: (view: View) => void;
  onStartQuiz: () => void;
  onAutoStart: () => void;
}

const CircularProgress = ({ score }: { score: number }) => {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;
    const color = score > 80 ? 'text-green-500' : score > 60 ? 'text-yellow-500' : 'text-red-500';

    return (
        <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
                <circle
                    className={color}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="50"
                    cy="50"
                    transform="rotate(-90 50 50)"
                />
            </svg>
            <span className="text-3xl font-bold text-brand-text-primary">{score}</span>
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ reportData, onNavigate, onStartQuiz, onAutoStart }) => {
  // If no report data, show the intro/landing page for the quiz
  if (!reportData) {
    return <Intro onStartQuiz={onStartQuiz} onAutoStart={onAutoStart} />;
  }
  
  // If report data exists, show the summary dashboard
  const { executiveSummary, focusAreas } = reportData;

  const getStatusDisplay = (status: string) => {
      const statusMap = {
          'Strong': { text: 'Healthy', color: 'bg-green-100 text-green-800' },
          'Developing': { text: 'Developing', color: 'bg-yellow-100 text-yellow-800' },
          'Focus Area': { text: 'Focus Area', color: 'bg-red-100 text-red-800' },
      };
      return statusMap[status] || { text: 'N/A', color: 'bg-gray-100 text-gray-800' };
  };

  return (
    <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary flex items-center">
            Good morning! <span className="text-3xl ml-2">✨</span>
        </h1>
        <p className="mt-2 text-lg text-brand-text-secondary">
            Here's what to focus on today. Let's do this!
        </p>

        <div className="mt-8 space-y-8">
            {/* Today's Tasks */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="bg-brand-light-teal p-2 rounded-lg">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-brand-text-primary">Today's Tasks</h2>
                    </div>
                    <button onClick={() => onNavigate('dailyTasks')} className="font-semibold text-secondary-teal bg-secondary-teal/10 hover:bg-secondary-teal/20 px-4 py-2 rounded-full text-sm transition">
                        View All
                    </button>
                </div>
                 <div className="mt-4">
                     <p className="text-green-600 font-semibold">All tasks for today are complete. Amazing work!</p>
                </div>
            </div>

            {/* Health Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
                 <div className="flex items-center space-x-3 mb-6">
                    <div className="bg-brand-light-teal p-2 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <h2 className="text-xl font-bold text-brand-text-primary">Health Summary</h2>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                        <CircularProgress score={executiveSummary.overallScore} />
                    </div>
                    <div className="flex-1 w-full space-y-3">
                        {focusAreas.map(area => {
                            const { text, color } = getStatusDisplay(area.status);
                            return (
                                <div key={area.area} className={`flex justify-between items-center p-3 rounded-lg ${color}`}>
                                    <span className="font-semibold">{area.area}</span>
                                    <span className="font-bold">{text}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;