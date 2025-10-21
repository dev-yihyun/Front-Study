"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";

// 폼 데이터 타입 정의
export interface LoginFormValues {
    email: string;
    password: string;
    loginKeep?: boolean;
}

interface EmailLoginFormProps {
    onSubmit?: (data: LoginFormValues) => void;
}

function EmailLoginForm({ onSubmit }: EmailLoginFormProps) {
    const { register, handleSubmit } = useForm<LoginFormValues>();

    return (
        <form
            onSubmit={handleSubmit((data) => {
                console.log("이메일 로그인 클릭:", data);
                onSubmit?.(data);
            })}
        >
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
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
                    <Input id="password" type="password" required {...register("password")} />
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
