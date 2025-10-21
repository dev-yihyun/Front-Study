"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType } from "@/shared/types/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../../_api/api";

// 폼 데이터 타입 정의
export interface LoginFormValues {
    email: string;
    password: string;
    loginKeep?: boolean;
}

interface EmailLoginFormProps {
    onLoginSuccess?: (user: UserType) => void;
}

function EmailLoginForm({ onLoginSuccess }: EmailLoginFormProps) {
    const router = useRouter();
    const { register, handleSubmit } = useForm<LoginFormValues>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (data: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            const user = await loginUser(data.email, data.password);
            alert(`로그인 성공! 환영합니다, ${user.username}`);
            onLoginSuccess?.(user); // 로그인 성공 시 콜백 호출

            router.push("/");
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "로그인 실패";
            alert(msg);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        autoComplete="email"
                        {...register("email")}
                    />
                </Field>

                <Field>
                    <div className="flex items-center">
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <a
                            href="/find-account"
                            className="ml-auto text-sm underline-offset-4 hover:underline text-blue-500"
                        >
                            Forgot your password?
                        </a>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        autoComplete="new-password"
                        {...register("password")}
                    />
                </Field>

                <Field>
                    <div className="flex items-center gap-3">
                        <Checkbox id="login-keep" {...register("loginKeep")} />
                        <Label htmlFor="login-keep">Stay Signed in</Label>
                    </div>
                </Field>

                <Field>
                    <Button type="submit">Login</Button>
                </Field>
            </FieldGroup>
        </form>
    );
}

export default React.memo(EmailLoginForm);
