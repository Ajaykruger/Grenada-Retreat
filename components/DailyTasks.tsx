import React, { useState } from 'react';
import { Task } from '../types';

interface DailyTasksProps {
    tasks: Task[];
    onToggleTask: (index: number) => void;
    onAddTask: (task: Omit<Task, 'completed'>) => void;
}

const categoryIcons: Record<Task['category'], string> = {
    "Awareness": "🧠",
    "Action": "💪",
    "Reflection": "✍️",
    "Regulation": "🧘",
    "Connection": "🤝"
};

const AddTaskForm: React.FC<{ onAddTask: DailyTasksProps['onAddTask'] }> = ({ onAddTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cadence, setCadence] = useState<Task['cadence']>('Daily');
    const [category, setCategory] = useState<Task['category']>('Action');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onAddTask({ title, description, cadence, category });
        setTitle('');
        setDescription('');
        setIsAdding(false);
    };

    if (!isAdding) {
        return (
            <div className="text-center mt-6">
                <button
                    onClick={() => setIsAdding(true)}
                    className="bg-secondary-teal/10 hover:bg-secondary-teal/20 text-secondary-teal font-bold py-2 px-6 rounded-full transition"
                >
                    + Add New Task
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-4">
            <h3 className="font-bold text-lg text-brand-text-primary">Add a New Task</h3>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title (e.g., 'Weekly reflection journal')"
                className="w-full p-2 border border-gray-300 rounded-md"
                required
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the task"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={2}
            />
            <div className="grid grid-cols-2 gap-4">
                <select value={cadence} onChange={(e) => setCadence(e.target.value as Task['cadence'])} className="w-full p-2 border border-gray-300 rounded-md">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
                <select value={category} onChange={(e) => setCategory(e.target.value as Task['category'])} className="w-full p-2 border border-gray-300 rounded-md">
                   {Object.keys(categoryIcons).map(cat => <option key={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
                <button type="submit" className="bg-secondary-teal text-white px-4 py-2 rounded-md">Add Task</button>
            </div>
        </form>
    );
};

const DailyTasks: React.FC<DailyTasksProps> = ({ tasks, onToggleTask, onAddTask }) => {

    const groupedTasks = tasks.reduce((acc, task, index) => {
        const cadence = task.cadence || 'Daily';
        if (!acc[cadence]) {
            acc[cadence] = [];
        }
        acc[cadence].push({ ...task, originalIndex: index });
        return acc;
    }, {} as Record<string, (Task & { originalIndex: number })[]>);

    const cadenceOrder: Task['cadence'][] = ['Daily', 'Weekly', 'Monthly'];

    return (
        <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-text-primary mb-2">Your Tasks</h1>
            <p className="text-lg text-brand-text-secondary mb-8">Here are your tasks, designed to help you focus on your top priorities.</p>

            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
                <div className="space-y-8">
                    {cadenceOrder.map(cadence => (
                        groupedTasks[cadence] && (
                            <div key={cadence}>
                                <h2 className="text-xl font-bold text-brand-text-primary border-b-2 border-brand-light-teal pb-2 mb-4">{cadence} Tasks</h2>
                                <div className="space-y-4">
                                    {groupedTasks[cadence].map((task) => (
                                        <div key={task.originalIndex} className={`flex items-start space-x-4 p-4 rounded-lg transition-all ${task.completed ? 'bg-gray-50' : 'bg-brand-background'}`}>
                                            <input
                                                type="checkbox"
                                                checked={task.completed}
                                                onChange={() => onToggleTask(task.originalIndex)}
                                                className="mt-1 h-5 w-5 rounded border-gray-300 text-secondary-teal focus:ring-secondary-teal cursor-pointer"
                                            />
                                            <label className="flex-1 cursor-pointer">
                                                <div className="flex items-center">
                                                    <span className="text-xl mr-3">{categoryIcons[task.category] || '✨'}</span>
                                                    <h3 className={`font-bold text-lg text-brand-text-primary ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
                                                </div>
                                                <p className={`text-brand-text-secondary ml-8 ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.description}</p>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <AddTaskForm onAddTask={onAddTask} />
            </div>
        </div>
    );
};

export default DailyTasks;