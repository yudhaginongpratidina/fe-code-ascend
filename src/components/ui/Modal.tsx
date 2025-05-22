import { JSX } from "react";
import IconButton from "./IconButton";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    icon?: JSX.Element;
    isActive: boolean;
    title: string;
    children: React.ReactNode;
    closeModal: () => void;
    className?: string;
}

export default function Modal({ icon, isActive, title, children, closeModal, className }: ModalProps) {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'} duration-300`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)' }}>
            <div className={`w-full relative p-6 flex flex-col gap-4 rounded-sm shadow-xl bg-white transition-transform transform ${isActive ? 'scale-100' : 'scale-95'} duration-300 ${className}`}>
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {icon && <span className="text-gray-600">{icon}</span>}
                        <h1 className="text-xl font-bold text-gray-800 uppercase">{title}</h1>
                    </div>
                    <IconButton
                        icon={<IoMdClose className="w-5 h-5 text-gray-600 hover:text-gray-800 transition duration-200" />}
                        onClick={closeModal || (() => { })}
                        className="hover:bg-gray-200 rounded-full p-1"
                        aria-label="Close Modal"
                        type="button"
                    />
                </div>
                <hr className="border-gray-300" />
                <div className="max-h-[60vh] flex flex-col gap-4 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}