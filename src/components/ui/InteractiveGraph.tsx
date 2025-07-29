import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiDownload, FiMaximize, FiShare2 } from 'react-icons/fi';
import { cn } from '../../utils/cn';
import { Button } from './Button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './Tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './Dialog';
import { CodeBlock } from './CodeBlock';

interface InteractiveGraphProps {
  title: string;
  description?: string;
  imageUrl: string;
  codeSnippet?: string;
  language?: string;
  className?: string;
  controls?: React.ReactNode;
  fullWidth?: boolean;
}

const InteractiveGraph: React.FC<InteractiveGraphProps> = ({
  title,
  description,
  imageUrl,
  codeSnippet,
  language = 'python',
  className,
  controls,
  fullWidth = false,
}) => {
  const [showCode, setShowCode] = useState(false);

  return (
    <motion.div
      className={cn(
        'overflow-hidden rounded-xl bg-white shadow-lg',
        fullWidth ? 'w-full' : 'max-w-4xl mx-auto',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-50 px-4 py-3">
        <div>
          <h3 className="font-medium text-primary-dark">{title}</h3>
          {description && <p className="text-sm text-neutral">{description}</p>}
        </div>
        <div className="flex space-x-2">
          <TooltipProvider>
            {codeSnippet && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowCode(!showCode)}
                    className={showCode ? 'bg-accent-purple/10 text-accent-purple' : ''}
                  >
                    <FiCode className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle Code View</p>
                </TooltipContent>
              </Tooltip>
            )}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FiDownload className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FiShare2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FiMaximize className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>{title}</DialogTitle>
                  {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                <div className="mt-4 aspect-video w-full overflow-hidden rounded-md bg-neutral-100">
                  <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                </div>
                {codeSnippet && (
                  <div className="mt-4">
                    <CodeBlock code={codeSnippet} language={language} title="Code" showLineNumbers />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TooltipProvider>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row">
        <div className={`${showCode ? 'md:w-1/2' : 'w-full'} bg-neutral-100`}>
          <div className="aspect-video w-full overflow-hidden">
            <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
          </div>
          {controls && <div className="border-t border-neutral-200 bg-white p-4">{controls}</div>}
        </div>

        {showCode && codeSnippet && (
          <div className="md:w-1/2 border-l border-neutral-200">
            <CodeBlock code={codeSnippet} language={language} title="Code" showLineNumbers />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default InteractiveGraph;