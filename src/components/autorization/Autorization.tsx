"use client";

import { useAtom } from "jotai";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { userLoggerAtom } from "@/jotai/auth/auth.jotai";
import { loadingAtom } from "@/jotai/global/loading.jotai";

type TProp = {
    path?: string;
}

export const Autorization = () => {
    const [_, setUserLogger] = useAtom(userLoggerAtom);
    const [__, setIsLoading] = useAtom(loadingAtom);
    const router = useRouter();
    const path = usePathname();


    useEffect(() => {
        const localToken = localStorage.getItem("token");
        const token = localToken ? localToken : "";
        if(!token) {
            setUserLogger(false);
            if(path != "reset-password") {
                router.push("/signin");
            };
        } else {
            setUserLogger(true);
            if(path == "login" || path == "reset-password") {
                router.push("/dashboard");
            };
        };

        setIsLoading(false);
    }, []);

    return <></>
}