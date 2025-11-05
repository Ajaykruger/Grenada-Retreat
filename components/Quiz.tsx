import React, { useState } from 'react';
import { quizQuestions, totalQuestions, answerOptions } from '../constants';
import { Answers } from '../types';

interface QuizProps {
  onComplete: (answers: Answers) => void;
  initialAnswers: Answers;
  onBack: () => void;
  error?: string;
}

const Quiz: React.FC<QuizProps> = ({ onComplete, initialAnswers, onBack, error }) => {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };
  
  const answeredQuestionsCount = Object.keys(answers).length;
  const progress = (answeredQuestionsCount / totalQuestions) * 100;

  const currentSection = quizQuestions[currentSectionIndex];
  const isLastSection = currentSectionIndex === quizQuestions.length - 1;

  const handleNext = () => {
    if (!isLastSection) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    onComplete(answers);
  };
  
  const canSubmit = answeredQuestionsCount === totalQuestions;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-brand-text-primary">Leadership Clarity Quiz</h1>
        <button onClick={onBack} className="text-sm text-brand-text-secondary hover:text-brand-text-primary">
            &larr; Back to Dashboard
        </button>
      </div>
      <div className="space-y-8 mt-6">
        <div>
          <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-text-primary">{currentSection.title}</h2>
              <span className="text-sm font-medium text-secondary-teal">{answeredQuestionsCount} / {totalQuestions} Answered</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-secondary-teal h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">An Error Occurred</p>
            <p>{error}</p>
          </div>
        )}

        <div className="space-y-8">
          {currentSection.questions.map((q, index) => (
            <div key={q.id} className="border-b border-gray-200 pb-6">
              <p className="text-lg font-medium text-brand-text-primary mb-4">{currentSectionIndex * currentSection.questions.length + index + 1}. {q.text}</p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <span className="text-sm text-gray-500">{answerOptions[0].label}</span>
                <div className="flex justify-center space-x-2 sm:space-x-4">
                  {answerOptions.map(opt => (
                    <label key={opt.value} className="flex flex-col items-center cursor-pointer">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt.value}
                        checked={answers[q.id] === opt.value}
                        onChange={() => handleAnswerChange(q.id, opt.value)}
                        className="peer sr-only"
                      />
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-500 transition-all peer-checked:bg-secondary-teal peer-checked:border-secondary-teal peer-checked:text-white peer-checked:shadow-lg peer-checked:scale-110">
                        {opt.value}
                      </div>
                    </label>
                  ))}
                </div>
                <span className="text-sm text-gray-500 text-right">{answerOptions[4].label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-6">
          <button
            onClick={handleBack}
            disabled={currentSectionIndex === 0}
            className="bg-gray-200 hover:bg-gray-300 text-brand-text-primary font-bold py-2 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          
          {isLastSection ? (
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="bg-primary-gold hover:bg-opacity-90 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Get My Report
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-secondary-teal hover:bg-opacity-90 text-white font-bold py-2 px-6 rounded-full transition"
            >
              Next
            </button>
          )}
        </div>
         {!canSubmit && isLastSection && (
              <p className="text-center text-sm text-red-600 mt-4">Please answer all questions to generate your report.</p>
          )}
      </div>
    </div>
  );
};

export default Quiz;