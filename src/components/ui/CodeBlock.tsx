import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { cn } from '../../utils/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  showLineNumbers = true,
  title,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className={cn('overflow-hidden rounded-lg bg-primary-dark', className)}>
      {title && (
        <div className="flex items-center justify-between border-b border-neutral-light/10 bg-secondary-dark px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm font-medium text-neutral-light">{title}</div>
          <div></div> {/* Empty div for flex spacing */}
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm">
          <code className={`language-${language}`}>
            {lines.map((line, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell pr-4 text-right text-neutral opacity-50">
                    {i + 1}
                  </span>
                )}
                <span className="table-cell text-primary-light">{line}</span>
              </div>
            ))}
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 rounded-md bg-secondary-dark p-2 text-neutral-light transition-colors hover:bg-secondary-dark/80 hover:text-primary-light"
          aria-label="Copy code"
        >
          {copied ? <FiCheck className="h-4 w-4" /> : <FiCopy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
};