import React, { useState } from 'react';
import { SixMonthPhase, TopPriority } from '../types';

interface ActionPlanProps {
    plan: SixMonthPhase[];
    priorities: TopPriority[];
    onTogglePriority: (priorityNumber: number) => void;
    onAddPriority: (priority: Omit<TopPriority, 'completed' | 'priorityNumber' | 'month1Tasks'>) => void;
}

const AddPriorityForm: React.FC<{ onAddPriority: ActionPlanProps['onAddPriority'] }> = ({ onAddPriority }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [expectedResult, setExpectedResult] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAddPriority({ title, description, expectedResult });
        setTitle('');
        setDescription('');
        setExpectedResult('');
        setIsAdding(false);
    };

    if (!isAdding) {
        return (
            <div className="text-center mt-6">
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-secondary-teal/10 hover:bg-secondary-teal/20 text-secondary-teal font-bold py-2 px-6 rounded-full transition"
                >
                    + Add New Priority
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-4">
            <h3 className="font-bold text-lg text-brand-text-primary">Add a New Priority</h3>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Priority Title (e.g., Improve Team Feedback)"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Why is this a priority?"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={2}
            />
            <input
                type="text"
                value={expectedResult}
                onChange={(e) => setExpectedResult(e.target.value)}
                placeholder="What is the expected positive outcome?"
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="bg-secondary-teal text-white px-4 py-2 rounded-md">Add Priority</button>
            </div>
        </form>
    );
};


const ActionPlan: React.FC<ActionPlanProps> = ({ plan, priorities, onTogglePriority, onAddPriority }) => {
    return (
        <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-text-primary mb-2">My Action Plan</h1>
            <p className="text-lg text-brand-text-secondary mb-8">Your personalized roadmap for growth, based on your quiz results.</p>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 mb-8">
                 <h2 className="text-2xl font-bold text-brand-text-primary mb-6">Your Top 3 Priorities</h2>
                 <div className="space-y-4 text-left">
                    {priorities.map((priority) => (
                        <div key={priority.priorityNumber} className={`p-4 rounded-xl border transition-all ${priority.completed ? 'bg-gray-50' : 'bg-brand-background'}`}>
                            <label className="flex items-start space-x-4 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={priority.completed}
                                    onChange={() => onTogglePriority(priority.priorityNumber)}
                                    className="mt-1 h-5 w-5 rounded border-gray-300 text-secondary-teal focus:ring-secondary-teal"
                                />
                                <div className="flex-1">
                                    <h3 className={`font-bold text-lg text-secondary-teal transition-all ${priority.completed ? 'line-through text-gray-500' : ''}`}>{priority.priorityNumber}. {priority.title}</h3>
                                    <p className={`text-brand-text-secondary text-sm mb-4 transition-all ${priority.completed ? 'line-through text-gray-400' : ''}`}>{priority.description}</p>
                                    <div className={`mt-auto p-3 bg-green-50 border border-green-200 rounded-lg transition-all ${priority.completed ? 'opacity-50' : ''}`}>
                                        <p className="text-sm font-semibold text-green-800"><span className="font-bold">Expected Result:</span> {priority.expectedResult}</p>
                                   </div>
                                </div>
                            </label>
                        </div>
                    ))}
                 </div>
                 <AddPriorityForm onAddPriority={onAddPriority} />
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
                 <h2 className="text-2xl font-bold text-brand-text-primary mb-6">Your 6-Month Action Plan</h2>
                 <div className="space-y-6">
                    {plan.map((phase) => (
                         <div key={phase.month} className="p-6 rounded-xl border-2 border-brand-light-teal bg-white">
                            <h3 className="font-bold text-xl text-secondary-teal mb-3">Month {phase.month}: {phase.theme}</h3>
                            <div className="space-y-2">
                                <div>
                                    <p className="font-bold text-brand-text-primary">Key Tasks:</p>
                                    <ul className="list-disc list-inside text-brand-text-secondary pl-2">
                                        {phase.tasks.map((task, i) => <li key={i}>{task}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-bold text-brand-text-primary">How you're winning:</p>
                                    <p className="text-brand-text-secondary">{phase.kpi}</p>
                                </div>
                            </div>
                         </div>
                    ))}
                 </div>
            </div>

        </div>
    );
};

export default ActionPlan;