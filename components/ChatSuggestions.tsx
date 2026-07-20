import { useState } from 'react';
import { RESUME_DATA } from '../lib/resumeContext';

interface ChatSuggestionsProps {
  onSelect: (question: string) => void;
}

function SuggestionCategory({ category, questions, onSelect }: { category: string, questions: string[], onSelect: (q: string) => void }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const displayedQuestions = isExpanded ? questions : questions.slice(0, 4);

  return (
    <div className="space-y-2">
      <h4 className="text-[11px] font-medium text-gray-400 capitalize px-1">{category} Questions</h4>
      <div className="flex flex-wrap gap-2">
        {displayedQuestions.map((question, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(question)}
            className="text-xs bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-800 rounded-full px-3 py-1.5 transition-colors text-left"
            aria-label={`Ask: ${question}`}
          >
            {question}
          </button>
        ))}
        {questions.length > 4 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 px-3 py-1.5 rounded-full transition-colors"
          >
            {isExpanded ? 'Show Less' : `+${questions.length - 4} More`}
          </button>
        )}
      </div>
    </div>
  );
}

export default function ChatSuggestions({ onSelect }: ChatSuggestionsProps) {
  const { chatSuggestions } = RESUME_DATA;

  if (!chatSuggestions) return null;

  return (
    <div className="w-full mt-4 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-1">
        Popular questions from recruiters
      </h3>
      
      <div className="space-y-5">
        {Object.entries(chatSuggestions).map(([category, questions]) => (
          <SuggestionCategory 
            key={category} 
            category={category} 
            questions={questions} 
            onSelect={onSelect} 
          />
        ))}
      </div>
    </div>
  );
}

