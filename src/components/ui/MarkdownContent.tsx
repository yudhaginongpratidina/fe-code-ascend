"use client";

import { FaCopy } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

interface MarkdownContentProps {
    content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        Prism.highlightAll();
    }, [content]);

    const components: Components = {
        p: ({ children, ...props }) => (
            <p className="mb-2 last:mb-0 text-sm leading-relaxed" {...props}>
                {children}
            </p>
        ),
        h1: ({ children, ...props }) => (
            <h1 className="text-2xl font-bold mt-4 mb-2" {...props}>
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => (
            <h2 className="text-xl font-semibold mt-3 mb-2" {...props}>
                {children}
            </h2>
        ),
        h3: ({ children, ...props }) => (
            <h3 className="text-lg font-medium mt-2 mb-2" {...props}>
                {children}
            </h3>
        ),
        ul: ({ children, ...props }) => (
            <ul className="list-disc pl-5" {...props}>
                {children}
            </ul>
        ),
        ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-5" {...props}>
                {children}
            </ol>
        ),
        li: ({ children, ...props }) => (
            <li className="text-sm" {...props}>
                {children}
            </li>
        ),
        a: ({ children, ...props }) => (
            <a className="text-blue-500 hover:underline" {...props}>
                {children}
            </a>
        ),
        strong: ({ children, ...props }) => (
            <strong className="font-bold" {...props}>
                {children}
            </strong>
        ),
        em: ({ children, ...props }) => (
            <em className="italic" {...props}>
                {children}
            </em>
        ),
        blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-white pl-4 italic my-4" {...props}>
                {children}
            </blockquote>
        ),
        code: ({ children, ...props }) => (
            <div className="relative">
                <div className="bg-black text-white  rounded">
                    <pre className="p-4 whitespace-pre-wrap overflow-x-auto">
                        <code className="bg-black text-white">{children}</code>
                    </pre>
                </div>
                <button
                    onClick={() => copyToClipboard(children as string)}
                    className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded"
                    title="Salin kode"
                >
                    <FaCopy />
                </button>
                {copied && (
                    <span className="absolute top-2 right-12 text-green-500 text-sm">
                        Kode tersalin!
                    </span>
                )}
            </div>
        ),
    };

    const copyToClipboard = (text: string) => {
        // Check if navigator.clipboard is available
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }).catch((err) => {
                console.error('Failed to copy text: ', err);
                // Fallback method
                fallbackCopyTextToClipboard(text);
            });
        } else {
            // Fallback method for older browsers
            fallbackCopyTextToClipboard(text);
        }
    };

    const fallbackCopyTextToClipboard = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        
        document.body.removeChild(textArea);
    };

    return (
        <div className="overflow-auto">
            <ReactMarkdown components={components} skipHtml={true}>
                {content}
            </ReactMarkdown>
            <style jsx>{`
                .animate-fade-in {
                    animation: fadeIn 0.2s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default MarkdownContent;