import { JSX, useMemo } from "react";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: JSX.Element;
    onClick: () => void;
    className?: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    tooltip?: string;
}

export default function IconButton({
    icon,
    onClick,
    className = "",
    variant = 'outline',
    size = 'md',
    tooltip,
    ...props
}: IconButtonProps) {
    const buttonClassName = useMemo(() => {
        const sizeClasses = {
            sm: 'p-1.5 text-sm',
            md: 'p-2 text-base',
            lg: 'p-2.5 text-lg'
        };

        const variantClasses = {
            primary: 'bg-indigo-500 hover:bg-indigo-600 text-white border-transparent',
            secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-transparent',
            outline: 'bg-white hover:bg-gray-50 text-gray-700 border-gray-200 hover:border-indigo-300 hover:text-indigo-600',
            ghost: 'bg-transparent hover:bg-gray-100 text-gray-700 border-transparent hover:text-indigo-600'
        };

        return `
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      flex items-center justify-center
      rounded-lg
      border
      transition-all duration-200
      shadow-sm hover:shadow
      ${className}
    `;
    }, [className, variant, size]);

    return (
        <button
            onClick={onClick}
            className={buttonClassName}
            title={tooltip}
            {...props}
        >
            {icon}
        </button>
    );
}