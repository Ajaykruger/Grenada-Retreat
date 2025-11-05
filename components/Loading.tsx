import React, { useState, useEffect } from 'react';

const loadingSteps = [
    'Analyzing your responses...',
    'Identifying your core strengths...',
    'Pinpointing key growth opportunities...',
    'Crafting your personalized roadmap...',
    'Finalizing your daily tasks...',
    'Almost there...',
];

const Loading: React.FC = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentStepIndex(prevIndex => (prevIndex + 1) % loadingSteps.length);
        }, 2500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center py-10 px-4 h-full">
            {/* Spinner */}
            <div className="w-20 h-20 mb-8 animate-spin">
                 <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <circle
                        className="stroke-current text-gray-200"
                        cx="50" cy="50" r="45"
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        className="stroke-current text-secondary-teal"
                        cx="50" cy="50" r="45"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray="282.74"
                        strokeDashoffset="212.055"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-text-primary">
                Lizamari is building your growth plan...
            </h2>
            
            <p className="text-brand-text-secondary max-w-lg mt-3 text-lg">
                This is the exciting part! Your personal report, 6-month roadmap, and daily tasks are being generated. This can take up to 6 minutes.
            </p>
            
            <p className="text-secondary-teal font-semibold mt-8 text-lg h-6">
                {loadingSteps[currentStepIndex]}
            </p>

            <div className="mt-12 p-4 bg-brand-light-teal border-l-4 border-secondary-teal rounded-r-lg max-w-xl w-full text-left">
                <h3 className="font-bold text-secondary-teal mb-1">Heads up!</h3>
                <p className="text-brand-text-secondary">
                    You can navigate to another page if you need to. Your report and plan are being generated in the background and will be here when they're done.
                </p>
            </div>
        </div>
    );
};

export default Loading;