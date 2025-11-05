import React from 'react';
import { View } from '../App';

interface SidebarProps {
    onNavigate: (view: View) => void;
    activeView: View;
    isReportGenerated: boolean;
    isMobileOpen: boolean;
    onClose: () => void;
}

const Logo = () => (
    <div className="flex items-center space-x-3 p-4">
        <div className="bg-primary-gold p-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707.707M12 21v-1m0-16a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
        </div>
        <span className="font-bold text-xl text-brand-text-primary">Empower Forward</span>
    </div>
);

const NavItem = ({ icon, label, active = false, locked = false, onClick }) => {
    const buttonContent = (
        <>
            {icon}
            <span className="flex-1">{label}</span>
            {locked && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            )}
        </>
    );

    if (locked) {
        return (
            <div className="relative group">
                <button disabled className="flex items-center w-full text-left space-x-3 px-4 py-3 rounded-lg font-medium transition-colors text-brand-text-secondary opacity-50 cursor-not-allowed">
                    {buttonContent}
                </button>
                <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                    Complete the quiz to unlock
                </span>
            </div>
        );
    }

    return (
        <button onClick={onClick} className={`flex items-center w-full text-left space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${active ? 'bg-brand-light-teal text-secondary-teal' : 'text-brand-text-secondary hover:bg-gray-100'}`}>
            {buttonContent}
        </button>
    );
};


const icons = {
    dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
    tasks: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
    plan: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V7.618a1 1 0 01.553-.894L9 4m0 16v-8m-6 3h12M9 4l6 3v12l-6-3V4z" /></svg>,
    coaching: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
    clarityReport: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7c0-1.1.9-2 2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    clarityCall: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>,
    retreat: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945C21.42 6.443 17.055 3 12 3S2.58 6.443 3.055 11z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 16a7 7 0 1114 0H5z" /></svg>,
};


const Sidebar: React.FC<SidebarProps> = ({ onNavigate, activeView, isReportGenerated, isMobileOpen, onClose }) => {
  return (
    <aside className={`w-64 bg-sidebar-bg p-4 flex flex-col border-r border-gray-200 shadow-sm fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 overflow-x-hidden`}>
        <div className="flex items-center justify-between flex-shrink-0">
            <Logo />
            <button onClick={onClose} className="p-2 -mr-2 md:hidden">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
        <p className="text-sm text-brand-text-secondary px-4 mt-1 mb-4 flex-shrink-0">
            From <span className="text-secondary-teal font-semibold">Mari</span> & <span className="text-secondary-teal font-semibold">Lizabé.</span>
        </p>
        <div className="flex-1 overflow-y-auto pb-4 min-h-0 scrollbar-hide">
            <nav className="space-y-2">
                <NavItem icon={icons.dashboard} label="Dashboard" active={activeView === 'dashboard'} locked={false} onClick={() => onNavigate('dashboard')} />
                <NavItem icon={icons.tasks} label="Daily Tasks" active={activeView === 'dailyTasks'} locked={!isReportGenerated} onClick={() => onNavigate('dailyTasks')} />
                <NavItem icon={icons.plan} label="My Action Plan" active={activeView === 'actionPlan'} locked={!isReportGenerated} onClick={() => onNavigate('actionPlan')} />
                <NavItem icon={icons.coaching} label="Interrupt Autopilot: The Mini-Course" active={activeView === 'miniCourse'} onClick={() => onNavigate('miniCourse')}/>
                <NavItem icon={icons.clarityCall} label="15-Min Clarity Call" active={activeView === 'clarityCall'} onClick={() => onNavigate('clarityCall')}/>
                <NavItem icon={icons.retreat} label="Grenada Leadership Retreat" active={activeView === 'grenadaRetreat'} onClick={() => onNavigate('grenadaRetreat')}/>
                
                <div className="pt-6">
                     <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">My Plan</p>
                    <div className="space-y-2">
                         <NavItem 
                            icon={icons.clarityReport} 
                            label="Leadership Clarity Report" 
                            active={activeView === 'report'} 
                            locked={!isReportGenerated}
                            onClick={() => onNavigate('report')} 
                        />
                    </div>
                </div>
            </nav>
        </div>
    </aside>
  );
};

export default Sidebar;