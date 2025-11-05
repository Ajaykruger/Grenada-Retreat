import React, { FC } from 'react';

interface CalendarProps {
    onBackToDashboard: () => void;
}

const Calendar: FC<CalendarProps> = ({ onBackToDashboard }) => {
    return (
        <div className="flex flex-col items-center justify-center text-center py-10 px-4 h-full">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto">
                <div className="w-16 h-16 mb-6 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                
                <h1 className="text-3xl font-bold text-brand-text-primary">Your Clarity Call is Reserved!</h1>
                
                <p className="text-brand-text-secondary mt-4">
                    Check your email—we've sent you confirmation with next steps.
                </p>

                <div className="mt-8 text-left space-y-4 bg-gray-50 p-6 rounded-lg border">
                     <h2 className="font-bold text-brand-text-primary">What to expect:</h2>
                     <ol className="list-decimal list-inside space-y-2 text-brand-text-secondary">
                        <li>You'll receive a confirmation email within 5 minutes (check spam if you don't see it).</li>
                        <li>We'll send your Zoom link 24 hours before your call.</li>
                        <li>Come ready to share what's really going on—we'll do the rest.</li>
                     </ol>
                </div>

                 <p className="font-semibold text-secondary-teal mt-8">Your clarity is waiting.</p>

                <button 
                    onClick={onBackToDashboard}
                    className="mt-8 bg-secondary-teal hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default Calendar;
