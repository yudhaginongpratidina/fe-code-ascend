import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

export const Form = ({ onSubmit, enctype, children }: { onSubmit: React.FormEventHandler<HTMLFormElement>, enctype?: boolean, children: React.ReactNode }) => {
    return (
        <form onSubmit={onSubmit} encType={enctype ? "multipart/form-data" : ""} className="w-full flex flex-col gap-4">
            {children}
        </form>
    );
};

export const FormSplit = ({ children }: { children: React.ReactNode }) => {
    const childCount = React.Children.count(children);

    let gridTemplate;
    switch (childCount) {
        case 2:
            gridTemplate = 'grid-cols-1 sm:grid-cols-2';
            break;
        case 3:
            gridTemplate = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            break;
        case 4:
            gridTemplate = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
            break;
        default:
            gridTemplate = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    }

    return (
        <div className={clsx('w-full grid gap-4', gridTemplate)}>
            {children}
        </div>
    );
};

export const FormMessage = ({ isError, message }: Readonly<{ isError: boolean, message: string }>) => {
    return (
        <div className={`w-full p-2.5 rounded-sm text-sm font-medium leading-6 ${isError ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"}`}>
            {message}
        </div>
    )
}

export const FormItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full flex flex-col gap-1.5">
            {children}
        </div>
    );
}

export const FormTextLinkAlternative = ({ alternativeText, alternativeLinkText, alternativeLinkHref }: { alternativeText: string, alternativeLinkText: string, alternativeLinkHref: string }) => {
    return (
        <Link href={alternativeLinkHref || "#"} className="w-full flex justify-center items-center gap-2">
            <span className="text-gray-600">{alternativeText}</span>
            <span className="text-blue-600 font-semibold hover:underline hover:underline-offset-4">{alternativeLinkText}</span>
        </Link>
    )
}