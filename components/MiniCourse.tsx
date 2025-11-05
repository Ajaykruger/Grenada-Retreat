import React, { FC, ReactNode } from 'react';

// --- Reusable UI Components ---
const Card: FC<{ children: ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`rounded-lg border border-gray-200 bg-white text-brand-text-primary shadow-sm ${className}`}>
        {children}
    </div>
);

// --- Icon Components for Visual Clarity ---
const VideoIcon: FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect x="2" y="6" width="14" height="12" rx="2" ry="2"/></svg>;
const WorkbookIcon: FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
const QuizIcon: FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>;
const AudioIcon: FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>;

const ModuleSection: FC<{ day: number, title: string, videoTitle: string, children: ReactNode }> = ({ day, title, videoTitle, children }) => (
    <Card className="p-6 mb-8">
        <h3 className="text-sm font-semibold text-accent-coral uppercase tracking-wider">Day {day}</h3>
        <h2 className="text-2xl font-bold text-brand-text-primary mt-1 mb-4">{title}</h2>
        <div className="flex items-start gap-3 text-secondary-teal font-semibold mb-6">
            <VideoIcon className="w-6 h-6 flex-shrink-0 mt-1" />
            <p>{videoTitle}</p>
        </div>
        <div className="space-y-4">{children}</div>
    </Card>
);

const MiniCourse: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center py-12">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text-primary">INTERRUPT AUTOPILOT: THE MINI-COURSE</h1>
            <p className="mt-4 text-xl text-brand-text-secondary">
                A 5-Day Framework for Women Who Are Ready to Lead with Clarity Instead of Chaos
            </p>
        </header>

        {/* Course Overview */}
        <Card className="p-8 mb-12">
            <h2 className="text-2xl font-bold text-center mb-6">Course Overview</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <h3 className="font-bold text-lg mb-2">What You'll Get</h3>
                    <ul className="text-brand-text-secondary list-disc list-inside text-left">
                        <li>5 core video lessons</li>
                        <li>Interactive workbook</li>
                        <li>Daily practice guides</li>
                        <li>Audio-only versions</li>
                        <li>Private community access</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2">Who It's For</h3>
                    <ul className="text-brand-text-secondary list-disc list-inside text-left">
                        <li>Leaders feeling reactive</li>
                        <li>Anyone seeking clarity</li>
                        <li>Those tired of generic advice</li>
                        <li>People ready to lead differently</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-bold text-lg mb-2">Investment</h3>
                    <ul className="text-brand-text-secondary list-disc list-inside text-left">
                        <li>$97 Self-Paced</li>
                        <li>$147 Supported Course</li>
                        <li>Free lead magnet version</li>
                    </ul>
                </div>
            </div>
        </Card>
        
        {/* Course Structure */}
        <div>
            <h2 className="text-3xl font-bold text-center mb-8">Course Structure</h2>

            {/* Pre-Course */}
            <Card className="p-6 mb-8 bg-brand-light-teal border-secondary-teal">
                <h3 className="text-sm font-semibold text-secondary-teal uppercase tracking-wider">PRE-COURSE</h3>
                <h2 className="text-2xl font-bold text-brand-text-primary mt-1">Welcome & Orientation</h2>
                <p className="mt-2 text-brand-text-secondary">Get started with your downloadable workbook and a short assessment to identify where you're currently on autopilot.</p>
            </Card>

            {/* Module 1 */}
            <ModuleSection day={1} title="The Autopilot Problem" videoTitle="You're Not Broken—You're Just Running Old Code">
                <p className="text-brand-text-secondary">Understand the brain science behind autopilot, the cost of unconscious patterns, and get a high-level overview of the OCAA framework as the solution.</p>
                <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><WorkbookIcon className="w-4 h-4" /> Lesson 1 Workbook</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><QuizIcon className="w-4 h-4" /> Knowledge Check</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><AudioIcon className="w-4 h-4" /> Daily Practice Audio</div>
                </div>
            </ModuleSection>

            {/* Module 2 */}
            <ModuleSection day={2} title="Observe" videoTitle="The Foundation—Awareness Without Judgment">
                <p className="text-brand-text-secondary">Learn why observation is a skill, the difference between thinking and being thought, and how to notice your thoughts, sensations, and patterns without judgment.</p>
                 <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><WorkbookIcon className="w-4 h-4" /> Lesson 2 Workbook</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><QuizIcon className="w-4 h-4" /> Knowledge Check</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><AudioIcon className="w-4 h-4" /> Morning Awareness Audio</div>
                </div>
            </ModuleSection>
            
            {/* Module 3 */}
            <ModuleSection day={3} title="Choose" videoTitle="The Power—Responding Instead of Reacting">
                <p className="text-brand-text-secondary">Discover how to create a "choice point" under pressure using The Clarity Question, enabling you to make values-aligned decisions even when emotions are high.</p>
                 <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><WorkbookIcon className="w-4 h-4" /> Lesson 3 Workbook</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><QuizIcon className="w-4 h-4" /> Knowledge Check</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><AudioIcon className="w-4 h-4" /> 3-Breath Choice Audio</div>
                </div>
            </ModuleSection>

            {/* Module 4 */}
            <ModuleSection day={4} title="Adapt" videoTitle="The Shift—Learning to Do It Scared">
                <p className="text-brand-text-secondary">Learn how to rewire your nervous system in real-time. Understand the power of incremental courage and use your body to regulate your mind.</p>
                 <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><WorkbookIcon className="w-4 h-4" /> Lesson 4 Workbook</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><QuizIcon className="w-4 h-4" /> Knowledge Check</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><AudioIcon className="w-4 h-4" /> Box Breathing Audio</div>
                </div>
            </ModuleSection>
            
            {/* Module 5 */}
            <ModuleSection day={5} title="Advance" videoTitle="The Movement—Sustainable Progress Over Heroic Sprints">
                <p className="text-brand-text-secondary">Discover the difference between advancing and hustling. Learn to build trust with yourself and integrate lasting change by aligning action with purpose.</p>
                 <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><WorkbookIcon className="w-4 h-4" /> Lesson 5 Workbook</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><QuizIcon className="w-4 h-4" /> Knowledge Check</div>
                    <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-md"><AudioIcon className="w-4 h-4" /> Weekly Review Audio</div>
                </div>
            </ModuleSection>

             {/* Bonus Module */}
            <Card className="p-6 mb-12 bg-primary-gold/10 border-primary-gold">
                <h3 className="text-sm font-semibold text-primary-gold uppercase tracking-wider">BONUS MODULE</h3>
                <h2 className="text-2xl font-bold text-brand-text-primary mt-1">Putting It All Together & What's Next</h2>
                <p className="mt-2 text-brand-text-secondary">Solidify your learning with a post-course assessment, get your completion certificate, and access bonus materials like the OCAA Quick Reference Card and a 30-Day Practice Calendar.</p>
            </Card>
        </div>

        {/* Pricing Models */}
        <section className="py-12">
             <h2 className="text-3xl font-bold text-center mb-8">Ready to Start? Choose Your Path.</h2>
             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="p-6 flex flex-col">
                    <h3 className="font-bold text-lg">Lead Magnet</h3>
                    <p className="font-bold text-3xl my-2">Free</p>
                    <p className="text-sm text-brand-text-secondary flex-grow">Get a taste of the framework.</p>
                    <ul className="text-sm space-y-2 my-4 flex-grow">
                        <li>✓ Modules 1-3 only</li>
                        <li>✓ Email opt-in required</li>
                        <li>✓ Drives to full course</li>
                    </ul>
                    <button className="mt-4 w-full bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-full">Get Started</button>
                </Card>
                 <Card className="p-6 flex flex-col">
                    <h3 className="font-bold text-lg">Self-Paced Course</h3>
                    <p className="font-bold text-3xl my-2">$97</p>
                    <p className="text-sm text-brand-text-secondary flex-grow">The complete course curriculum.</p>
                    <ul className="text-sm space-y-2 my-4 flex-grow">
                        <li>✓ All 5 modules + bonus</li>
                        <li>✓ Lifetime access</li>
                        <li>✓ Workbook + practices</li>
                    </ul>
                    <button className="mt-4 w-full bg-secondary-teal text-white font-bold py-2 px-4 rounded-full">Enroll Now</button>
                </Card>
                 <Card className="p-6 flex flex-col border-2 border-secondary-teal shadow-xl relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary-teal text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
                    <h3 className="font-bold text-lg">Supported Course</h3>
                    <p className="font-bold text-3xl my-2">$147</p>
                    <p className="text-sm text-brand-text-secondary flex-grow">Everything in Self-Paced, plus community.</p>
                    <ul className="text-sm space-y-2 my-4 flex-grow">
                        <li>✓ All 5 modules + bonus</li>
                        <li>✓ Lifetime access</li>
                        <li>✓ Workbook + practices</li>
                        <li><strong className="text-secondary-teal">+ Private community access</strong></li>
                        <li><strong className="text-secondary-teal">+ Monthly Q&A calls (3 mo)</strong></li>
                    </ul>
                    <button className="mt-4 w-full bg-secondary-teal text-white font-bold py-2 px-4 rounded-full">Enroll Now</button>
                </Card>
             </div>
        </section>
    </div>
  );
};

export default MiniCourse;
