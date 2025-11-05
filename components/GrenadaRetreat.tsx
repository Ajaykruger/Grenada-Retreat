import React, { FC, ReactNode } from 'react';
import { View } from '../App';

interface GrenadaRetreatProps {
    onNavigate: (view: View) => void;
}

const Section: FC<{ children: ReactNode, className?: string, id?: string }> = ({ children, className = '', id }) => (
    <section id={id} className={`py-16 sm:py-20 ${className}`}>
        <div className="max-w-4xl mx-auto px-4">{children}</div>
    </section>
);

const CheckIcon: FC = () => <svg className="w-6 h-6 text-secondary-teal mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

const GrenadaRetreat: FC<GrenadaRetreatProps> = ({ onNavigate }) => {
    const handleCTAClick = () => onNavigate('clarityCall');

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <header className="bg-brand-light-teal text-center py-20 sm:py-24">
                <div className="max-w-4xl mx-auto px-4">
                    <p className="font-semibold text-secondary-teal">May 2026 | Grenada</p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-text-primary mt-4">This Is Not a Vacation. This Is an Activation.</h1>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-brand-text-secondary mt-4">Of Your Clarity, Your Leadership, and Your Life.</h2>
                    <p className="mt-6 max-w-2xl mx-auto text-lg text-brand-text-secondary">A leadership retreat for women who are ready to interrupt autopilot, align thought with action, and lead with emotional regulation, presence, and whole-life congruence.</p>
                    <p className="mt-4 font-bold text-brand-text-primary text-lg">This is not escape. This is alignment.</p>
                    <div className="mt-8">
                        <button onClick={handleCTAClick} className="bg-secondary-teal hover:bg-opacity-90 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105">
                            Schedule a Clarity Call
                        </button>
                        <p className="text-sm text-brand-text-secondary mt-2">15 minutes. Ask questions. Explore fit.</p>
                    </div>
                </div>
            </header>

            {/* Section 1: The Transformation */}
            <Section>
                <h2 className="text-3xl font-bold text-center mb-10">You'll Leave With</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-xl mb-2">Greater Confidence & Emotional Regulation</h3>
                        <p className="text-brand-text-secondary">Two-way communication skills that support influence, trust, and collaboration—at work, at home, and in the community. Lead without performing.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-xl mb-2">Autonomy & Agency</h3>
                        <p className="text-brand-text-secondary">Command over your thoughts, your choices, and your presence. Stop reacting to life and start creating it.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-xl mb-2">A Thinking System You Can Rely On</h3>
                        <p className="text-brand-text-secondary">When life, leadership, or relationships feel overwhelming, you'll have OCAA—a framework that works in the moments that matter most.</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-bold text-xl mb-2">Sustainable Practices</h3>
                        <p className="text-brand-text-secondary">Clear, repeatable tools you can use long after the retreat ends. Integration over intensity. Clarity over chaos.</p>
                    </div>
                </div>
                <p className="text-center text-3xl font-bold text-secondary-teal mt-12 tracking-wider">Clarity. Congruence. Command.</p>
            </Section>

            {/* Section 2: The Problem */}
            <Section className="bg-brand-background">
                <h2 className="text-3xl font-bold text-center mb-6">You're Capable. You're Accomplished. And You're Exhausted.</h2>
                <div className="max-w-3xl mx-auto text-lg space-y-4 text-brand-text-secondary">
                    <p>You lead teams. You make decisions. You show up for everyone else.</p>
                    <p>But inside? You're reacting more than responding. You're managing everyone's emotions while suppressing your own. You're capable on the outside but running on autopilot on the inside.</p>
                    <p>You know there's a better way to lead—one that doesn't leave you drained, reactive, or performing. You're ready to interrupt the pattern.</p>
                    <p className="font-bold text-brand-text-primary text-xl text-center pt-4">That's what this retreat is for.</p>
                </div>
            </Section>
            
            {/* Sections 3 & 4: Theme & Pillars */}
            <Section>
                <h2 className="text-3xl font-bold text-center">The Power of Thought</h2>
                <p className="text-xl text-center font-semibold text-brand-text-secondary mt-2 mb-10">Your internal dialogue shapes everything.</p>
                 <h2 className="text-3xl font-bold text-center mt-16">The Four Pillars</h2>
                <p className="text-xl text-center font-semibold text-brand-text-secondary mt-2 italic mb-10">Growth through thought, breath, body, and community.</p>
                <div className="grid md:grid-cols-2 gap-10">
                    <div>
                        <h3 className="font-bold text-xl">1. Morning Mindfulness + Internal Dialogue</h3>
                        <p className="font-semibold text-accent-coral text-sm my-2">ATTENTION / AWARENESS</p>
                        <p className="text-brand-text-secondary">Begin each day by training attention—the foundation of interrupting autopilot. This isn't meditation for relaxation. This is attention training for leadership.</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl">2. Water + Breath: Scuba or Snorkel</h3>
                        <p className="font-semibold text-accent-coral text-sm my-2">BODY / CHOICE / REWIRING</p>
                        <p className="text-brand-text-secondary">In the pool and sea, your mind may say, "I can't." Then you breathe anyway. This is nervous-system rewiring in real time. You'll learn what your body already knows: you're more capable than your thoughts tell you.</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl">3. Service + Stewardship with Aquanauts</h3>
                        <p className="font-semibold text-accent-coral text-sm my-2">PURPOSE / FLOW / LEADERSHIP BEYOND SELF</p>
                        <p className="text-brand-text-secondary">Engage in conservation initiatives. Leadership expands when purpose expands. Your growth strengthens ecological growth. Purpose fuels flow.</p>
                    </div>
                     <div>
                        <h3 className="font-bold text-xl">4. Evening Integration + Yin</h3>
                        <p className="font-semibold text-accent-coral text-sm my-2">HEART / REGULATION / WHOLE-LIFE LEADERSHIP</p>
                        <p className="text-brand-text-secondary">At night, integrate the day in dialogue and Yin practices that calm and reset the nervous system. Take home tools you can repeat to sustain emotional regulation.</p>
                    </div>
                </div>
            </Section>

            {/* Section 8: Daily Rhythm */}
            <Section className="bg-brand-background">
                <h2 className="text-3xl font-bold text-center">Daily Rhythm</h2>
                <p className="text-xl text-center font-semibold text-brand-text-secondary mt-2 italic mb-10">Designed for clarity, not hurry.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="border-l-4 border-secondary-teal pl-6">
                        <h3 className="font-bold text-xl">Day 1: Arrival</h3>
                        <p className="font-semibold text-brand-text-secondary">Ground. Settle. Exhale.</p>
                    </div>
                     <div className="border-l-4 border-secondary-teal pl-6">
                        <h3 className="font-bold text-xl">Day 2: Mind + Body Activation</h3>
                        <p className="text-brand-text-secondary">Morning mindfulness, mid-day pool/scuba/snorkel, evening integration.</p>
                    </div>
                    <div className="border-l-4 border-secondary-teal pl-6">
                        <h3 className="font-bold text-xl">Day 3: Leadership in Motion</h3>
                        <p className="text-brand-text-secondary">Morning mindfulness, mid-day rest or service, evening dialogue + Yin.</p>
                    </div>
                     <div className="border-l-4 border-secondary-teal pl-6">
                        <h3 className="font-bold text-xl">Day 4: Embodiment + Integration</h3>
                        <p className="text-brand-text-secondary">Morning thought work, mid-day exploration or service, evening closing integration.</p>
                    </div>
                    <div className="border-l-4 border-secondary-teal pl-6 md:col-span-2 lg:col-span-1">
                        <h3 className="font-bold text-xl">Day 5: Departure</h3>
                        <p className="text-brand-text-secondary">Light reflection, closing ritual, and travel home with renewed clarity.</p>
                    </div>
                </div>
            </Section>

            {/* Section 9: What's Included */}
            <Section>
                 <h2 className="text-3xl font-bold text-center mb-10">What's Included</h2>
                 <div className="max-w-2xl mx-auto space-y-4">
                     <p className="flex items-start"><CheckIcon /> <strong>Four days, three nights</strong> at True Blue Boutique Hotel (double occupancy; single-room upgrade available)</p>
                     <p className="flex items-start"><CheckIcon /> <strong>All meals:</strong> Breakfast, lunch, dinner + non-alcoholic beverages</p>
                     <p className="flex items-start"><CheckIcon /> <strong>Water experience:</strong> Scuba pool session + optional open-water scuba or snorkel</p>
                     <p className="flex items-start"><CheckIcon /> <strong>Leadership + thought-work sessions</strong> facilitated by certified coaches</p>
                     <p className="flex items-start"><CheckIcon /> <strong>Two 1:1 coaching sessions</strong> (one before the retreat, one after)</p>
                     <p className="flex items-start"><CheckIcon /> <strong>Private airport transfers</strong> to and from the hotel</p>
                     <p className="flex items-start"><CheckIcon /> <strong>All retreat materials</strong> including workbooks and practice guides</p>
                     <p className="flex items-start"><CheckIcon /> <strong>5% donation</strong> to Aquanauts conservation initiatives</p>
                 </div>
                 <p className="text-center font-bold text-brand-text-primary text-xl mt-10">Everything you want for complete focus—nothing you don't.</p>
            </Section>

            {/* Section 11: Investment */}
            <Section className="bg-brand-background text-center">
                 <h2 className="text-3xl font-bold mb-4">Investment</h2>
                 <p className="text-6xl font-bold text-secondary-teal mb-2">$2,000 USD</p>
                 <p className="text-brand-text-secondary mb-6">(Flight not included)</p>
                 <p className="max-w-xl mx-auto text-brand-text-secondary">Spaces are <strong>limited by design</strong> to preserve intimacy, impact, and transformation. This is a boutique experience with personalized coaching, deep community, and real transformation.</p>
                <div className="mt-8">
                    <button onClick={handleCTAClick} className="bg-secondary-teal hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg">
                        Book My Clarity Call
                    </button>
                    <p className="text-sm text-brand-text-secondary mt-2">If you're considering it, book a 15-minute clarity call to explore fit and reserve your spot.</p>
                </div>
            </Section>
            
            {/* Section 12: FAQ */}
            <Section>
                 <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                 <div className="max-w-3xl mx-auto space-y-6">
                     <div>
                         <h4 className="font-bold text-lg">What if I'm nervous in water?</h4>
                         <p className="text-brand-text-secondary">You choose your pace—scuba, snorkel, or grounding-by-the-shore. Growth is invitational, not forced. We'll meet you where you are.</p>
                     </div>
                     <div>
                         <h4 className="font-bold text-lg">Why would my employer pay for this?</h4>
                         <p className="text-brand-text-secondary">Because this retreat develops skills tied directly to performance. Your facilitators are SHRM-CP certified, and employers can classify this as professional development.</p>
                     </div>
                     <div>
                         <h4 className="font-bold text-lg">Is this religious or therapy?</h4>
                         <p className="text-brand-text-secondary">No. This is a leadership and personal growth experience rooted in mindfulness, nervous system awareness, and thought work.</p>
                     </div>
                      <div>
                         <h4 className="font-bold text-lg">Is this only for women?</h4>
                         <p className="text-brand-text-secondary">Yes. This retreat is designed specifically for women leaders navigating the unique pressures and expectations they face.</p>
                     </div>
                 </div>
            </Section>

            {/* Section 14: Who this is for */}
            <Section className="bg-brand-background">
                <h2 className="text-3xl font-bold text-center mb-10">This Retreat Is For You If...</h2>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
                    <p className="flex items-center"><CheckIcon /> You're a leader who feels reactive</p>
                    <p className="flex items-center"><CheckIcon /> You're tired of performing competence</p>
                    <p className="flex items-center"><CheckIcon /> You want tools that work in real life</p>
                    <p className="flex items-center"><CheckIcon /> You're ready to interrupt autopilot</p>
                    <p className="flex items-center"><CheckIcon /> You value community and depth</p>
                    <p className="flex items-center"><CheckIcon /> You're willing to do the work</p>
                </div>
                 <div className="mt-12 max-w-3xl mx-auto p-6 bg-red-50 border-l-4 border-red-400">
                    <h3 className="font-bold text-red-800">This retreat is not for you if:</h3>
                    <ul className="list-disc list-inside text-red-700 mt-2">
                        <li>You're looking for a vacation or escape</li>
                        <li>You're not ready to examine your thought patterns</li>
                        <li>You want quick fixes without sustainable practice</li>
                    </ul>
                 </div>
            </Section>

            {/* Final CTA */}
            <Section className="bg-secondary-teal text-white text-center">
                <h2 className="text-3xl sm:text-4xl font-bold">You Are Not Here to Be Rescued</h2>
                <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto">You are here to <strong>remember your power.</strong> Align your thinking. Command your presence. Lead your life with clarity and self-command.</p>
                <div className="mt-8">
                     <button onClick={handleCTAClick} className="bg-white hover:bg-gray-200 text-secondary-teal font-bold py-4 px-10 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105">
                        Lead Differently. Join Us.
                    </button>
                </div>
            </Section>
        </div>
    );
};

export default GrenadaRetreat;