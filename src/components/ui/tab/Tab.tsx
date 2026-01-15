"use client";

import { ReactNode, useEffect, useState } from "react";

type TBodyCard = {
    title: {key: string; value: string;}
    body: ReactNode;
    button: ReactNode;
}

type TProps = {
    titleHeader?: string
    bodyCard: TBodyCard[]
}

export const Tab = ({titleHeader = "", bodyCard}: TProps) => {
    const [currentTab, setCurrentTab] = useState<TBodyCard>({title: {key: "", value: ""}, body: <></>, button: <></>});

    useEffect(() => {
        if(bodyCard.length > 0) {
            const firstCard = bodyCard[0];
            setCurrentTab(firstCard);
        }
    }, []);

    return (
        <div className={`${titleHeader ? 'rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3' : ''}`}>
            {
                titleHeader &&
                <div className="py-5">
                    <h3 className="text-base font-medium text-gray-800 dark:text-white/90">{titleHeader}</h3>
                </div>
            }
            <div className={`${titleHeader ? 'border-t' : ''} border-gray-100 dark:border-gray-800`}>
                <div className="space-y-6 mb-2">
                    <div className={`${titleHeader ? '' : 'rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3'}`}>
                        <div className="p-3">
                            <nav className="flex overflow-x-auto rounded-lg bg-gray-100 p-1 dark:bg-gray-900 [&amp;::-webkit-scrollbar]:h-1.5 [&amp;::-webkit-scrollbar-track]:bg-white dark:[&amp;::-webkit-scrollbar-track]:bg-transparent [&amp;::-webkit-scrollbar-thumb]:rounded-full [&amp;::-webkit-scrollbar-thumb]:bg-gray-200 dark:[&amp;::-webkit-scrollbar-thumb]:bg-gray-600">
                            {
                                bodyCard.map((card: TBodyCard, i: number) => {
                                    return (
                                            <button key={i} className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${currentTab.title.key == card.title.key ? 'bg-white text-gray-900 shadow-theme-xs dark:bg-white/3 dark:text-white' : 'bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}>{card.title.value}</button>
                                        )
                                    })
                            }
                            </nav>
                        </div>
                        
                        
                        <div className="p-6 pt-4">
                            {currentTab.body}
                        </div>
                    </div>
                </div>
                {currentTab.button}
            </div>
        </div>
    )
}