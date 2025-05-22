"use client";
import React, { useRef } from "react";
import dynamic from "next/dynamic";
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface MarkdownEditorProps {
    value: string;
    onChange: (value: string) => void;
    mode: "edit" | "preview";
    hideToolbar?: boolean;
    height?: number;
    dataColorMode: "light" | "dark";
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange, mode = "edit", hideToolbar = false, dataColorMode = "light", height = 200 }) => {
    const editorRef = useRef<any>(null);

    return (
        <div className="w-full rounded-sm border border-gray-300">
            <MDEditor
                ref={editorRef}
                value={value}
                onChange={(value) => onChange(value || "")}
                preview={mode}
                data-color-mode={dataColorMode}
                hideToolbar={hideToolbar}
                height={height}
            />
        </div>
    );
};

export default MarkdownEditor;