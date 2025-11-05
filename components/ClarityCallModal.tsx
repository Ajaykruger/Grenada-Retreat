import React, { useState, FC, useEffect } from 'react';

interface ClarityCallModalProps {
    onClose: () => void;
    onBookCall: () => void;
}

const ClarityCallModal: FC<ClarityCallModalProps> = ({ onClose, onBookCall }) => {
    const [formData, setFormData] = useState({ name: '', email: '', coach: 'Either', challenge: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Modal booking submitted:", formData);
        setIsSubmitted(true);
        setTimeout(() => {
            onBookCall();
        }, 3000); // Wait 3 seconds then navigate
    };

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 text-center relative transform transition-all" onClick={(e) => e.stopPropagation()}>
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {isSubmitted ? (
                    <div>
                        <div className="w-16 h-16 mb-4 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                            <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-brand-text-primary">You're Booked!</h2>
                        <p className="mt-2 text-brand-text-secondary">Check your email—we've sent you confirmation and next steps. Redirecting you shortly...</p>
                    </div>
                ) : (
                    <>
                        <span className="text-4xl">✨</span>
                        <h2 className="text-2xl font-bold text-brand-text-primary mt-2">Your Autopilot Patterns Are Clear. Now Let's Interrupt Them.</h2>
                        <p className="mt-2 text-brand-text-secondary">Schedule your free 15-minute clarity call to discover your next move.</p>
                        
                        <div className="text-left mt-4 mb-6 space-y-1 text-sm text-brand-text-secondary">
                            <p>✓ <span className="font-semibold">Identify the one pattern</span> costing you the most</p>
                            <p>✓ <span className="font-semibold">Discover your next move</span> using the OCAA framework</p>
                            <p>✓ <span className="font-semibold">Explore</span> if 1:1 coaching or the Grenada Retreat is right for you</p>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" name="name" placeholder="Your first name" required value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                                <input type="email" name="email" placeholder="your@email.com" required value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <select name="coach" required value={formData.coach} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-500">
                                <option value="Either">Either coach</option>
                                <option value="Mari">Mari (Faith-driven leadership)</option>
                                <option value="Lizabé">Lizabé (Context & intuition)</option>
                            </select>
                            <textarea name="challenge" placeholder="Optional: What's your biggest challenge right now?" value={formData.challenge} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                            
                            <button type="submit" className="w-full bg-secondary-teal hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-full text-lg shadow-md transition-transform transform hover:scale-105">
                                Reserve My Spot
                            </button>
                            <button type="button" onClick={onClose} className="w-full text-sm text-gray-500 hover:text-gray-700 py-2">
                                I'll Do This Later
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ClarityCallModal;
