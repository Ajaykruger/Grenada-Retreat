import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

const TrafficLightIcon = ({ color }: { color: 'red' | 'yellow' | 'green' }) => {
  const colorClasses = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500',
  };
  const ringColorClasses = {
    red: 'ring-red-100',
    yellow: 'ring-yellow-100',
    green: 'ring-green-100',
  }
  return (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 bg-white ring-8 ${ringColorClasses[color]}`}>
      <div className={`w-3 h-3 rounded-full ${colorClasses[color]}`}></div>
    </div>
  );
};


const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {

  const renderLine = (line: string, index: number) => {
    // Headers
    if (line.startsWith('###')) {
      return <h3 key={index} className="text-xl font-semibold text-brand-text-primary mt-8 mb-3" dangerouslySetInnerHTML={{ __html: line.substring(4) }} />;
    }
    if (line.startsWith('##')) {
      return <h2 key={index} className="text-2xl sm:text-3xl font-bold text-brand-text-primary mt-10 mb-4 border-b-2 border-brand-light-teal pb-3" dangerouslySetInnerHTML={{ __html: line.substring(3) }} />;
    }
    
    // Horizontal Rule
    if (line.startsWith('---')) {
      return <hr key={index} className="my-8 border-t border-gray-200" />;
    }

    // Traffic Light Assessment Custom Rendering
    if (line.startsWith('**Red Light')) {
      const text = line.replace(/\*\*(.*?)\*\*/g, '$1');
      return (
        <div key={index} className="flex items-center mt-6 mb-3">
          <TrafficLightIcon color="red" />
          <h4 className="text-lg font-semibold text-red-800">{text}</h4>
        </div>
      );
    }
    if (line.startsWith('**Yellow Light')) {
      const text = line.replace(/\*\*(.*?)\*\*/g, '$1');
      return (
        <div key={index} className="flex items-center mt-6 mb-3">
          <TrafficLightIcon color="yellow" />
          <h4 className="text-lg font-semibold text-yellow-800">{text}</h4>
        </div>
      );
    }
    if (line.startsWith('**Green Light')) {
      const text = line.replace(/\*\*(.*?)\*\*/g, '$1');
      return (
        <div key={index} className="flex items-center mt-6 mb-3">
          <TrafficLightIcon color="green" />
          <h4 className="text-lg font-semibold text-green-800">{text}</h4>
        </div>
      );
    }
    
    // Paragraphs
    if (line.trim().length > 0) {
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brand-text-primary">$1</strong>');
      return <p key={index} className="mb-4 text-brand-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
    }
    
    return null;
  };

  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    if (line.startsWith('*')) {
      const listItems = [];
      const listStartIndex = i;
      while (i < lines.length && lines[i].startsWith('*')) {
        const itemContent = lines[i].substring(2);
        const formattedItem = itemContent.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-brand-text-primary">$1</strong>');
        listItems.push(
            <li key={i} className="flex items-start">
                <svg className="w-6 h-6 mr-3 text-secondary-teal flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="text-brand-text-secondary" dangerouslySetInnerHTML={{ __html: formattedItem }} />
            </li>
        );
        i++;
      }
      elements.push(
        <ul key={`ul-${listStartIndex}`} className="space-y-3 mb-4">
          {listItems}
        </ul>
      );
    } else {
      const element = renderLine(line, i);
      if (element) {
        elements.push(element);
      }
      i++;
    }
  }

  return <div className="prose max-w-none">{elements}</div>;
};

export default MarkdownRenderer;