"use client";
import { FaCopy, FaCheckCircle, FaCode } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import Prism from "prismjs"; // Import PrismJS untuk syntax highlighting
import "prismjs/themes/prism-tomorrow.css"; // Import tema PrismJS

interface MarkdownContentProps {
    content: string;
}

const MarkdownContentChoiceQuestion: React.FC<MarkdownContentProps> = ({ content }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [content]);

    const components: Components = {
        p: ({ children, ...props }) => (
            <p className="w-full mb-3 last:mb-0 text-sm leading-relaxed" {...props}>
                {children}
            </p>
        ),
        h1: ({ children, ...props }) => (
            <h1 className="text-2xl font-bold mt-4 mb-3 text-gray-900" {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => (
            <h2 className="text-xl font-semibold mt-3 mb-2 text-gray-900" {...props}>
                {children}
            </h2>
        ),
        h3: ({ children, ...props }) => (
            <h3 className="text-lg font-medium mt-2 mb-2 text-gray-900" {...props}>
                {children}
            </h3>
        ),
        ul: ({ children, ...props }) => (
            <ul className="list-disc pl-5 space-y-1 my-2" {...props}>
                {children}
            </ul>
        ),
        ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-5 space-y-1 my-2" {...props}>
                {children}
            </ol>
        ),
        li: ({ children, ...props }) => (
            <li className="text-sm" {...props}>
                {children}
            </li>
        ),
        a: ({ children, ...props }) => (
            <a className="text-blue-600 hover:underline font-medium" {...props}>
                {children}
            </a>
        ),
        strong: ({ children, ...props }) => (
            <strong className="font-bold text-gray-900" {...props}>
                {children}
            </strong>
        ),
        em: ({ children, ...props }) => (
            <em className="italic text-gray-800" {...props}>
                {children}
            </em>
        ),
        blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-blue-400 bg-blue-50 pl-4 py-2 italic my-3 rounded-r" {...props}>
                {children}
            </blockquote>
        ),
        // Removed duplicate code property
        img: ({ src, alt, ...props }) => (
            <img 
                src={src} 
                alt={alt} 
                className="max-w-full h-auto rounded-lg my-3 border border-gray-200" 
                {...props} 
            />
        ),
        table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-3 rounded-lg border border-gray-200">
                <table className="min-w-full border-collapse" {...props}>
                    {children}
                </table>
            </div>
        ),
        thead: ({ children, ...props }) => (
            <thead className="bg-gray-100 border-b border-gray-200" {...props}>
                {children}
            </thead>
        ),
        tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-gray-200" {...props}>
                {children}
            </tbody>
        ),
        tr: ({ children, ...props }) => (
            <tr className="divide-x divide-gray-200" {...props}>
                {children}
            </tr>
        ),
        th: ({ children, ...props }) => (
            <th className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider" {...props}>
                {children}
            </th>
        ),
        td: ({ children, ...props }) => (
            <td className="px-4 py-2 text-sm" {...props}>
                {children}
            </td>
        ),
        hr: ({ ...props }) => (
            <hr className="my-6 border-t border-gray-200" {...props} />
        ),
        // Handle inline code within the existing code property
        code: ({ node, inline, className, children, ...props }: { node?: any; inline?: boolean; className?: string; children?: React.ReactNode }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match && match[1] ? match[1] : 'javascript';
            
            if (inline) {
                return (
                    <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                        {children}
                    </code>
                );
            }
            
            return (
                <div className="relative my-4 rounded-lg overflow-hidden shadow-md border border-gray-200">
                    <div className="bg-gray-800 flex items-center justify-between px-4 py-2">
                        <div className="flex items-center gap-2">
                            <FaCode className="text-blue-400" />
                            <span className="text-xs font-semibold text-gray-200 uppercase">{language}</span>
                        </div>
                        <button
                            onClick={() => copyToClipboard(children as string)}
                            className="flex items-center gap-1.5 text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
                            title="Salin kode"
                        >
                            {copied ? <FaCheckCircle className="text-green-400" /> : <FaCopy />}
                            <span>{copied ? "Tersalin!" : "Salin"}</span>
                        </button>
                    </div>
                    <div className="bg-gray-800 text-white p-4 overflow-x-auto">
                        <pre className="language-javascript">
                            <code className={`language-${language}`}>{children}</code>
                        </pre>
                    </div>
                </div>
            );
        },
    };

    const copyToClipboard = (text: string) => {
        const plainText = text;
        navigator.clipboard.writeText(plainText).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        });
    };

    return (
        <div className="w-full px-3 py-2 overflow-auto">
            <ReactMarkdown components={components} skipHtml={false}>
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownContentChoiceQuestion;