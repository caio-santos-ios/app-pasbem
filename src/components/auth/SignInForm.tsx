"use client";

import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { loadingAtom } from "@/jotai/global/loading.jotai";
import { resolveResponse } from "@/service/config.service";
import { TLogin } from "@/types/auth/auth.type";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import LabelForm from "../form/LabelForm";
import InputForm from "../form/input/InputForm";
import api from "@/service/api.service";
import { Logo } from "../logo/Logo";
import { maskCPF } from "@/utils/mask.util";

export default function SignInForm() {
  const [__, setIsLoading] = useAtom(loadingAtom);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }} = useForm<TLogin>();
  
  const login: SubmitHandler<TLogin> = async (body: TLogin) => {
    try {
      setIsLoading(true);
      const {data} = await api.post(`/auth/app/login`, body);
      const result = data.result.data;  
      
      localStorage.setItem("token", result.token);
      localStorage.setItem("name", result.name);
      localStorage.setItem("photo", result.photo);
      router.push("aplicativo/dashboard");
    } catch (error) {
      resolveResponse(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="p-6">
          <div className="mb-5 sm:mb-8 flex justify-center">
            <Logo width={150} height={150} darkWidth={250} darkHeight={250} />
          </div>
          <div>            
            <form onSubmit={handleSubmit(login)}>
              <div className="space-y-6">
                <div>
                  <LabelForm label="CPF" />
                  <InputForm onInput={(e: any) => maskCPF(e)} {...register("cpf")} />
                </div>
                <div>
                  <LabelForm label="Senha" />
                  <div className="relative">
                    <InputForm type={showPassword ? "text" : "password"} {...register("password")} />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2" >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">                  
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <div>
                  <Button className="w-full" size="sm">
                    Entrar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
