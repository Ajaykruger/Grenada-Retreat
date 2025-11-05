import React, { useState, FC } from 'react';

interface ClarityCallProps {
    onBookCall: () => void;
}

const ClarityCall: FC<ClarityCallProps> = ({ onBookCall }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        coach: 'Either',
        challenge: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Booking submitted:', formData);
        setSubmitted(true);
        onBookCall(); // Navigate to confirmation page
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <section className="text-center py-12">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary">Your 15-Minute Clarity Call</h1>
                <h2 className="mt-4 text-2xl text-brand-text-secondary">A Free Conversation to Interrupt Autopilot and Discover What's Next</h2>
                <div className="mt-6 text-left max-w-2xl mx-auto space-y-3 bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-brand-text-primary">You've identified where autopilot is running your life. Now it's time to interrupt it.</p>
                    <p className="text-brand-text-secondary">In this 15-minute conversation, you'll:</p>
                    <ul className="list-disc list-inside space-y-2 text-brand-text-secondary">
                        <li><strong className="text-brand-text-primary">Get clarity</strong> on the leadership challenge that's costing you the most right now</li>
                        <li><strong className="text-brand-text-primary">Discover</strong> one powerful shift you can make this week using OCAA</li>
                        <li><strong className="text-brand-text-primary">Explore</strong> whether 1:1 coaching or the Grenada Retreat aligns with where you're going</li>
                    </ul>
                    <p className="font-semibold text-secondary-teal pt-2">This is real coaching—not a sales call. You'll leave with clarity whether we work together or not.</p>
                </div>
            </section>

            {/* Booking Form Section */}
            <section className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 my-8">
                <h3 className="text-2xl font-bold text-center mb-6">Book Your Call</h3>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-brand-text-primary mb-1">First Name</label>
                        <input type="text" name="name" id="name" required placeholder="Your first name" value={formData.name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-brand-text-primary mb-1">Email Address</label>
                        <input type="email" name="email" id="email" required placeholder="your@email.com" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="coach" className="block text-sm font-medium text-brand-text-primary mb-1">Who would you like to speak with?</label>
                        <select name="coach" id="coach" required value={formData.coach} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                            <option value="Either">Either coach - I'm open to whoever has availability</option>
                            <option value="Mari">Mari (Empower Forward) - Faith-driven leadership and values alignment</option>
                            <option value="Lizabé">Lizabé (Contx Coaching) - Context, intuition, and embodied presence</option>
                        </select>
                    </div>
                     <div>
                        <label htmlFor="challenge" className="block text-sm font-medium text-brand-text-primary mb-1">In one sentence, what's your biggest leadership challenge right now?</label>
                        <textarea name="challenge" id="challenge" placeholder="e.g., I'm reactive in high-pressure meetings..." value={formData.challenge} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
                        <p className="text-xs text-gray-500 mt-1">This helps us make the most of your 15 minutes. But if you'd rather share live, that's fine too.</p>
                    </div>
                    <button type="submit" className="w-full bg-secondary-teal hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105">
                        Reserve Your Spot
                    </button>
                </form>
            </section>
            
            {/* Trust & Reassurance Section */}
            <section className="py-12">
                <h3 className="text-2xl font-bold text-center mb-8">What to Expect</h3>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div>
                        <h4 className="font-bold text-lg mb-2">🎯 Personalized</h4>
                        <p className="text-brand-text-secondary">This isn't a script. We'll ask about your specific situation. You'll get coaching tailored to you—not generic advice.</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-lg mb-2">⚡ Efficient</h4>
                        <p className="text-brand-text-secondary">15 minutes is short, but it's enough. We focus on clarity, not lengthy backstories. You'll leave with one clear insight and a next step.</p>
                    </div>
                     <div>
                        <h4 className="font-bold text-lg mb-2">🤝 No Pressure</h4>
                        <p className="text-brand-text-secondary">This is a free call to explore fit. If coaching or the retreat feels aligned, we'll talk about it. If not, you still walk away with value.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClarityCall;
