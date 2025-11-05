import React from 'react';

interface IntroProps {
  onStartQuiz: () => void;
  onAutoStart: () => void; // For the dev link
}

const CheckIcon = () => (
    <svg className="h-6 w-6 text-green-500 flex-shrink-0 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ClockIcon = () => (
    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const LockIcon = () => (
     <svg className="h-8 w-8 text-gray-400 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);


const Intro: React.FC<IntroProps> = ({ onStartQuiz, onAutoStart }) => {
  return (
    <div className="max-w-3xl mx-auto text-center py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary">
            Lead with Presence and Clarity
        </h1>
        <p className="mt-4 text-lg text-brand-text-secondary max-w-2xl mx-auto">
            Answer some simple questions about your leadership style to get your own personalised <span className="text-secondary-teal font-semibold">growth plan</span>, with clear goals and daily tasks to interrupt autopilot and lead with presence.
        </p>

        <div className="my-8 inline-flex items-center bg-yellow-100 text-yellow-800 font-semibold px-4 py-2 rounded-full">
            <ClockIcon />
            Takes about 10-15 minutes to complete
        </div>

        <div className="text-left max-w-md mx-auto space-y-4 my-8">
            <div className="flex items-start">
                <CheckIcon />
                <span>Discover where your leadership excels and find hidden opportunities for growth.</span>
            </div>
            <div className="flex items-start">
                <CheckIcon />
                <span>Get SMART goals created by AI, tailored specifically to your leadership patterns.</span>
            </div>
             <div className="flex items-start">
                <CheckIcon />
                <span>Receive a 6-month action plan with daily, weekly, and monthly tasks.</span>
            </div>
             <div className="flex items-start">
                <CheckIcon />
                <span>A simple, color-coded score shows you exactly where to focus your energy.</span>
            </div>
        </div>

        <button
            onClick={onStartQuiz}
            className="w-full sm:w-auto bg-secondary-teal hover:bg-opacity-90 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-secondary-teal focus:ring-opacity-50"
        >
            Start Leadership Clarity Quiz
        </button>

        <div className="mt-4">
             <button onClick={onAutoStart} className="text-sm text-gray-500 hover:text-gray-700 underline">
                Dev: Fill with test data & start
            </button>
        </div>
        
        <div className="mt-12 bg-gray-100 p-6 rounded-lg flex items-center max-w-md mx-auto">
            <LockIcon />
            <div className="text-left">
                <h3 className="font-bold text-brand-text-primary">Your data is private and secure.</h3>
                <p className="text-sm text-brand-text-secondary mt-1">
                    We use your answers solely to generate your personalized plan and help you track your business growth. We will never share or sell your information.
                </p>
            </div>
        </div>
    </div>
  );
};

export default Intro;