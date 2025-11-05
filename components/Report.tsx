import React, { useState, useEffect } from 'react';
import { ReportData } from '../types';
import { View } from '../App';
import ClarityCallModal from './ClarityCallModal';

interface ReportProps {
  reportData: ReportData;
  onRetakeQuiz: () => void;
  onNavigate: (view: View) => void;
}

// --- SVG Icons ---
const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
const DownloadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>;
const ReadAloudIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.858 15.858a5 5 0 01-2.828-7.072m11.314 0a5 5 0 00-8.486 0M3.03 9.03a9 9 0 0112.728 0m-2.829 9.9a5 5 0 008.486 0" /></svg>;
const StopIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10h6v4H9z" /></svg>;


const CircularProgress = ({ score }: { score: number }) => {
    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-40 h-40">
            <svg className="absolute w-full h-full" viewBox="0 0 120 120">
                <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                <circle
                    className="text-secondary-teal"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <div className="text-center">
                 <span className="text-4xl font-bold text-brand-text-primary">{score}</span>
                 <span className="text-sm text-brand-text-secondary block">/ 100</span>
            </div>
        </div>
    );
};

const FocusBar = ({ status, score }: { status: string, score: number }) => {
    const colorClasses = {
        'Strong': 'bg-green-500',
        'Developing': 'bg-yellow-500',
        'Focus Area': 'bg-red-500',
    };
    const color = colorClasses[status] || 'bg-gray-500';

    return (
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`${color} h-2 rounded-full`} style={{ width: `${score}%` }}></div>
        </div>
    );
};

const generateTextForCopy = (data: ReportData): string => {
    let text = `Your Leadership Clarity Plan\n\n`;
    
    text += `--- PLAN AT A GLANCE ---\n`;
    text += `Overall Score: ${data.executiveSummary.overallScore}/100\n`;
    text += `Summary: ${data.executiveSummary.oneSentenceAssessment}\n`;
    text += `Primary Strength: ${data.executiveSummary.positiveReinforcement}\n`;
    text += `Key Insight: ${data.executiveSummary.keyInsight}\n\n`;

    text += `--- WHERE TO FOCUS NOW ---\n`;
    data.focusAreas.forEach(area => {
        text += `${area.area}: ${area.score}/100 (${area.status})\n`;
    });
    text += `\n`;

    text += `--- YOUR TOP 3 GOALS ---\n`;
    data.top3Priorities.forEach(goal => {
        text += `Goal #${goal.priorityNumber}: ${goal.title}\n`;
        text += `${goal.description}\n`;
        text += `Month 1 Tasks:\n${goal.month1Tasks.map(t => `- ${t}`).join('\n')}\n`;
        text += `Expected Result: ${goal.expectedResult}\n\n`;
    });

    text += `--- 6-MONTH ROADMAP ---\n`;
    data.sixMonthPlan.forEach(phase => {
        text += `Month ${phase.month}: ${phase.theme}\n`;
        text += `Tasks:\n${phase.tasks.map(t => `- ${t}`).join('\n')}\n`;
        text += `KPI: ${phase.kpi}\n\n`;
    });

    return text;
};


const Report: React.FC<ReportProps> = ({ reportData, onRetakeQuiz, onNavigate }) => {
  const { executiveSummary, focusAreas, detailedBreakdown, top3Priorities, sixMonthPlan } = reportData;
  const [copyButtonText, setCopyButtonText] = useState('Copy Report');
  const [speakingSection, setSpeakingSection] = useState<string | null>(null);
  const [showClarityModal, setShowClarityModal] = useState(false);

  useEffect(() => {
    if (showClarityModal) return;

    let timeoutId: number | undefined;
    
    const showModal = () => {
      setShowClarityModal(current => {
        if (current) return true;
        window.removeEventListener('scroll', handleScroll);
        if (timeoutId) clearTimeout(timeoutId);
        return true;
      });
    };

    const handleScroll = () => {
      if (window.scrollY > document.body.scrollHeight / 2) {
        showModal();
      }
    };

    timeoutId = window.setTimeout(showModal, 10000);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showClarityModal]);

  useEffect(() => {
    return () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    };
  }, []);
  
  const handleDownloadPdf = () => {
    window.print();
  };

  const handleCopyReport = () => {
    const reportText = generateTextForCopy(reportData);
    navigator.clipboard.writeText(reportText).then(() => {
        setCopyButtonText('Copied!');
        setTimeout(() => setCopyButtonText('Copy Report'), 2000);
    });
  };

  const toggleReadAloud = (sectionId: string, text: string) => {
    if (!('speechSynthesis' in window)) {
        alert("Sorry, your browser doesn't support text-to-speech.");
        return;
    }
    
    if (speakingSection === sectionId) {
        window.speechSynthesis.cancel();
        setSpeakingSection(null);
    } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setSpeakingSection(null);
        utterance.onerror = () => setSpeakingSection(null);
        window.speechSynthesis.speak(utterance);
        setSpeakingSection(sectionId);
    }
  };
  
  const ReadAloudButton = ({ sectionId, textParts }: { sectionId: string, textParts: (string | string[])[]}) => {
    const isSpeaking = speakingSection === sectionId;
    const fullText = textParts.flat().join('. ');

    const handleClick = () => {
        toggleReadAloud(sectionId, fullText);
    };

    return (
        <button onClick={handleClick} className="flex items-center space-x-2 bg-brand-light-teal text-secondary-teal font-semibold px-4 py-2 rounded-full text-sm hover:bg-opacity-80 transition no-print">
            {isSpeaking ? <StopIcon /> : <ReadAloudIcon />}
            <span>{isSpeaking ? 'Stop Reading' : 'Read Aloud'}</span>
        </button>
    );
  };

  const getStatusColorClass = (status: string) => ({
      'Strong': 'text-green-600',
      'Developing': 'text-yellow-600',
      'Focus Area': 'text-red-600',
  }[status] || 'text-gray-600');
  
  return (
    <>
      {showClarityModal && (
          <ClarityCallModal 
              onClose={() => setShowClarityModal(false)}
              onBookCall={() => {
                  setShowClarityModal(false);
                  onNavigate('calendar');
              }}
          />
      )}
      <div className="space-y-8 mt-8">
          <div className="text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-brand-text-primary">Your Leadership Clarity Plan</h1>
              <div className="mt-6 flex justify-center items-center space-x-4 no-print">
                  <button onClick={handleCopyReport} className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-brand-text-primary font-semibold py-2 px-4 rounded-lg shadow-sm transition">
                      <CopyIcon/> {copyButtonText}
                  </button>
                  <button onClick={handleDownloadPdf} className="flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 text-brand-text-primary font-semibold py-2 px-4 rounded-lg shadow-sm transition">
                      <DownloadIcon/> Download PDF
                  </button>
              </div>
          </div>
          
          {/* Plan at a Glance */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 avoid-break">
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-brand-text-primary">Plan at a Glance</h2>
                  <ReadAloudButton sectionId="glance" textParts={[
                      "Plan at a Glance.",
                      `Overall Score: ${executiveSummary.overallScore}.`,
                      executiveSummary.oneSentenceAssessment,
                      `Primary Strength: ${executiveSummary.positiveReinforcement}`,
                      `Key Insight: ${executiveSummary.keyInsight}`
                  ]} />
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                      <CircularProgress score={executiveSummary.overallScore} />
                  </div>
                  <div className="flex-1 space-y-4">
                      <p className="text-lg text-brand-text-secondary">{executiveSummary.oneSentenceAssessment}</p>
                      <div className="p-4 bg-green-50 border-l-4 border-green-400 text-green-800 rounded-r-lg">
                         <p><strong className="font-semibold">Primary Strength:</strong> {executiveSummary.positiveReinforcement}</p>
                      </div>
                      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded-r-lg">
                          <p><strong className="font-semibold">Key Insight:</strong> {executiveSummary.keyInsight}</p>
                      </div>
                  </div>
              </div>
          </div>

          {/* Where to Focus Now */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 avoid-break">
              <h2 className="text-2xl font-bold text-brand-text-primary mb-6">Where to Focus Now</h2>
              <div className="space-y-4">
                  {focusAreas.map(area => (
                      <div key={area.area} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-center">
                          <h3 className="font-semibold text-brand-text-primary">{area.area}</h3>
                          <div className="md:col-span-1">
                              <FocusBar status={area.status} score={area.score} />
                          </div>
                          <p className={`font-semibold text-right ${getStatusColorClass(area.status)}`}>{area.status}</p>
                      </div>
                  ))}
              </div>
          </div>

          {/* A Closer Look */}
          <div>
              <h2 className="text-2xl font-bold text-brand-text-primary mb-6 text-center">A Closer Look</h2>
              <div className="space-y-6">
                  {detailedBreakdown.map(detail => (
                      <div key={detail.area} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 avoid-break">
                         <div className="flex justify-between items-center mb-2">
                             <h3 className="text-xl font-bold text-brand-text-primary">{detail.area}</h3>
                              <ReadAloudButton sectionId={`detail-${detail.area}`} textParts={[
                                  `A closer look at ${detail.area}.`,
                                  `Your score is ${detail.score} percent.`,
                                  detail.intro,
                                  "What's going well:", detail.whatsGoingWell,
                                  "Where to improve:", detail.whereToImprove,
                                  "How you compare:", detail.howYouCompare,
                                  "Quick Wins:", detail.quickWins
                              ]} />
                         </div>
                          <div className="flex justify-between items-baseline">
                               <p className={`text-lg font-bold ${getStatusColorClass(detail.status)}`}>{detail.score}%</p>
                          </div>
                          <p className="text-brand-text-secondary my-6">{detail.intro}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                              <div>
                                  <h4 className="font-bold text-green-700 mb-2">What's Going Well</h4>
                                  <ul className="space-y-2">
                                      {detail.whatsGoingWell.map((item, i) => <li key={i} className="flex items-start text-sm text-brand-text-secondary"><span className="text-green-500 mr-2 mt-1">✓</span>{item}</li>)}
                                  </ul>
                              </div>
                               <div>
                                  <h4 className="font-bold text-red-700 mb-2">Where to Improve</h4>
                                  <ul className="space-y-2">
                                      {detail.whereToImprove.map((item, i) => <li key={i} className="flex items-start text-sm text-brand-text-secondary"><span className="text-red-500 mr-2 mt-1">→</span>{item}</li>)}
                                  </ul>
                              </div>
                          </div>

                          <h4 className="font-bold text-brand-text-primary mb-2">How You Compare</h4>
                          <p className="text-sm text-brand-text-secondary mb-6">{detail.howYouCompare}</p>

                          <div className="p-4 bg-brand-light-teal border-l-4 border-secondary-teal rounded-r-lg">
                             <h4 className="font-bold text-secondary-teal mb-2">Quick Wins (Start This Week)</h4>
                              <ul className="space-y-2">
                                  {detail.quickWins.map((item, i) => <li key={i} className="flex items-start text-sm text-secondary-teal"><span className="mr-2 mt-1">&#8227;</span>{item}</li>)}
                              </ul>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Top 3 Goals */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 avoid-break">
              <h2 className="text-2xl font-bold text-brand-text-primary mb-6 text-center">Your Top 3 Goals</h2>
              <div className="space-y-8">
                  {top3Priorities.map(goal => (
                      <div key={goal.priorityNumber}>
                          <h3 className="text-xl font-bold text-brand-text-primary mb-2">Goal #{goal.priorityNumber}: {goal.title}</h3>
                          <p className="text-brand-text-secondary mb-4">{goal.description}</p>
                          <h4 className="font-semibold text-brand-text-primary mb-2">Month 1 Tasks:</h4>
                          <ul className="list-disc list-inside space-y-1 text-brand-text-secondary mb-4">
                             {goal.month1Tasks.map((task, i) => <li key={i}>{task}</li>)}
                          </ul>
                           <div className="p-4 bg-green-50 border-l-4 border-green-400 text-green-800 rounded-r-lg">
                               <p><strong className="font-semibold">Expected Result:</strong> {goal.expectedResult}</p>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
          
          {/* 6-Month Roadmap */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 avoid-break">
              <h2 className="text-2xl font-bold text-brand-text-primary mb-6 text-center">Your 6-Month Roadmap</h2>
              <div className="space-y-6">
                  {sixMonthPlan.map(phase => (
                      <div key={phase.month}>
                          <h3 className="text-lg font-bold text-secondary-teal border-b border-brand-light-teal pb-2 mb-3">Month {phase.month}: {phase.theme}</h3>
                          <h4 className="font-semibold text-brand-text-primary mb-1">Tasks:</h4>
                          <ul className="list-disc list-inside text-sm text-brand-text-secondary space-y-1 mb-3">
                              {phase.tasks.map((task, i) => <li key={i}>{task}</li>)}
                          </ul>
                          <p className="text-sm font-semibold text-brand-text-primary">{phase.kpi}</p>
                      </div>
                  ))}
              </div>
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center no-print">
              <h2 className="text-2xl font-bold text-brand-text-primary mb-4">What's Next?</h2>
              <p className="text-brand-text-secondary max-w-2xl mx-auto mb-6">
                  Your personalized growth plan is ready! Start by exploring your <strong className="text-secondary-teal">My Action Plan</strong> to see your main focus areas. Then, check <strong className="text-secondary-teal">My Daily Tasks</strong> to begin working on your first quick wins today. Remember, small steps lead to big changes!
              </p>
              <button
                onClick={onRetakeQuiz}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105"
              >
                Retake The Quiz
              </button>
          </div>
      </div>
    </>
  );
};

export default Report;