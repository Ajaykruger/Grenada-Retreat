import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Loading from './components/Loading';
import ActionPlan from './components/ActionPlan';
import DailyTasks from './components/DailyTasks';
import MiniCourse from './components/MiniCourse';
import Report from './components/Report';
import ClarityCall from './components/ClarityCall';
import Calendar from './components/Calendar';
import GrenadaRetreat from './components/GrenadaRetreat';
import Footer from './components/Footer';
import Header from './components/Header'; // Import the new Header component
import { generateClarityReport } from './services/geminiService';
import { Answers, ReportData, Task, TopPriority } from './types';
import { quizQuestions } from './constants';

export type View = 'dashboard' | 'quiz' | 'loading' | 'report' | 'actionPlan' | 'dailyTasks' | 'miniCourse' | 'clarityCall' | 'calendar' | 'grenadaRetreat';

const App: React.FC = () => {
  const [view, setView] = useState<View>('dashboard');
  const [answers, setAnswers] = useState<Answers>({});
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [error, setError] = useState<string>('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleStartQuiz = () => {
    setAnswers({});
    setError('');
    setView('quiz');
  };

  const handleQuizComplete = useCallback(async (finalAnswers: Answers) => {
    setAnswers(finalAnswers);
    setView('loading');
    setError('');
    try {
      const generatedReport = await generateClarityReport(finalAnswers);
      const processedReport: ReportData = {
        ...generatedReport,
        top3Priorities: generatedReport.top3Priorities.map(p => ({ ...p, completed: false })),
        dailyTasks: generatedReport.dailyTasks.map(t => ({ ...t, completed: false })),
      };
      setReportData(processedReport);
      setView('report');
    } catch (err) {
      console.error("Error generating report:", err);
      setError('Sorry, we encountered an error while generating your report. Please try again.');
      setView('quiz');
    }
  }, []);
  
  const handleRetakeQuiz = () => {
    setReportData(null);
    setView('dashboard');
  }

  const handleAutoCompleteAndStart = () => {
    const autoAnswers: Answers = {};
    quizQuestions.forEach(section => {
      section.questions.forEach(q => {
        autoAnswers[q.id] = Math.floor(Math.random() * 3) + 2;
      });
    });
    handleQuizComplete(autoAnswers);
  };

  const handleNavigate = (newView: View) => {
    if ((newView === 'actionPlan' || newView === 'dailyTasks' || newView === 'report') && !reportData) {
      return;
    }
    setView(newView);
    setIsMobileNavOpen(false); // Close mobile nav on navigation
  }

  const handleToggleTaskComplete = (taskIndex: number) => {
    setReportData(prevData => {
      if (!prevData) return null;
      const newTasks = [...prevData.dailyTasks];
      newTasks[taskIndex].completed = !newTasks[taskIndex].completed;
      return { ...prevData, dailyTasks: newTasks };
    });
  };

  const handleTogglePriorityComplete = (priorityNumber: number) => {
    setReportData(prevData => {
        if (!prevData) return null;
        const newPriorities = prevData.top3Priorities.map(p => 
            p.priorityNumber === priorityNumber ? { ...p, completed: !p.completed } : p
        );
        return { ...prevData, top3Priorities: newPriorities };
    });
  };

  const handleAddTask = (newTask: Omit<Task, 'completed'>) => {
    setReportData(prevData => {
        if (!prevData) return null;
        const newTasks = [...prevData.dailyTasks, { ...newTask, completed: false }];
        return { ...prevData, dailyTasks: newTasks };
    });
  };

  const handleAddPriority = (newPriority: Omit<TopPriority, 'completed' | 'priorityNumber' | 'month1Tasks'>) => {
      setReportData(prevData => {
          if (!prevData) return null;
          const newPriorityNumber = Math.max(...prevData.top3Priorities.map(p => p.priorityNumber), 0) + 1;
          const newPriorities = [...prevData.top3Priorities, { ...newPriority, month1Tasks: [], priorityNumber: newPriorityNumber, completed: false}];
          return { ...prevData, top3Priorities: newPriorities };
      });
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return <Dashboard 
          reportData={reportData} 
          onNavigate={handleNavigate} 
          onStartQuiz={handleStartQuiz}
          onAutoStart={handleAutoCompleteAndStart}
        />;
      case 'quiz':
        return <Quiz onComplete={handleQuizComplete} initialAnswers={answers} error={error} onBack={() => setView('dashboard')} />;
      case 'loading':
        return <Loading />;
       case 'report':
        return reportData ? <Report reportData={reportData} onRetakeQuiz={handleRetakeQuiz} onNavigate={handleNavigate} /> : null;
      case 'actionPlan':
        return reportData ? <ActionPlan 
            priorities={reportData.top3Priorities} 
            plan={reportData.sixMonthPlan} 
            onTogglePriority={handleTogglePriorityComplete}
            onAddPriority={handleAddPriority}
          /> : null;
       case 'dailyTasks':
        return reportData ? <DailyTasks 
            tasks={reportData.dailyTasks}
            onToggleTask={handleToggleTaskComplete}
            onAddTask={handleAddTask}
          /> : null;
      case 'miniCourse':
        return <MiniCourse />;
      case 'clarityCall':
        return <ClarityCall onBookCall={() => handleNavigate('calendar')} />;
      case 'calendar':
        return <Calendar onBackToDashboard={() => handleNavigate('dashboard')} />;
      case 'grenadaRetreat':
        return <GrenadaRetreat onNavigate={handleNavigate} />;
      default:
        return <Dashboard 
          reportData={reportData} 
          onNavigate={handleNavigate} 
          onStartQuiz={handleStartQuiz}
          onAutoStart={handleAutoCompleteAndStart}
        />;
    }
  };

  return (
    <div className="bg-brand-background min-h-screen text-brand-text-primary font-sans antialiased overflow-x-hidden">
      <Header onToggleNav={() => setIsMobileNavOpen(prev => !prev)} />
      <div className="flex">
        <Sidebar 
          onNavigate={handleNavigate}
          activeView={view}
          isReportGenerated={!!reportData}
          isMobileOpen={isMobileNavOpen}
          onClose={() => setIsMobileNavOpen(false)}
        />
        <main className="flex-1 p-6 sm:p-8 md:p-10 md:ml-64 flex flex-col min-h-screen pt-24 md:pt-10">
          <div className="flex-grow">
            {renderContent()}
          </div>
          <Footer />
        </main>
      </div>
      {isMobileNavOpen && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setIsMobileNavOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default App;