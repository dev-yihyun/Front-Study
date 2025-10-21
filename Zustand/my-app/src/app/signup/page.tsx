"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { UserType } from "@/shared/types/user";
import React from "react";
import { useForm } from "react-hook-form";

type UserDataType = {
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
};

function SignupPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { isSubmitted, isSubmitting, errors, isValid },
    } = useForm<UserDataType>();

    return (
        <div className="flex min-h-svh w-full items-center justify-center md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>
                            Enter your information below to create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            noValidate
                            onSubmit={handleSubmit(async (data) => {
                                // 비동기 처리 시뮬레이션 (2초)
                                await new Promise((resolve) => setTimeout(resolve, 2000));

                                // Zustand 스토어에 사용자 정보 저장
                                const userData: UserType = {
                                    username: data.name,
                                    useremail: data.email,
                                    userpassword: data.password,
                                };

                                // setUser(userData);

                                console.log("##data : ", data);
                                console.log("##data : ", JSON.stringify(data));
                                console.log("##사용자 정보가 Zustand 스토어에 저장되었습니다.");
                            })}
                        >
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        required
                                        minLength={2}
                                        maxLength={20}
                                        {...register("name", {
                                            required: "이름은 필수 입력입니다.",
                                            minLength: {
                                                value: 2,
                                                message: "2자 이상 입력해 주세요.",
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "20자리 이하로 입력해 주세요.",
                                            },
                                        })}
                                        aria-invalid={
                                            isSubmitted
                                                ? errors.name
                                                    ? "true"
                                                    : "false"
                                                : undefined
                                        }
                                    />
                                    <FieldDescription className="text-red-600">
                                        {errors.name && (
                                            <>{errors.name.message || "이름을 입력해 주세요"}</>
                                        )}
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="example@example.com"
                                        autoComplete="new-password"
                                        required
                                        {...register("email", {
                                            required: "이메일은 필수 입력입니다.",
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message: "이메일 형식에 맞지 않습니다.",
                                            },
                                        })}
                                        aria-invalid={
                                            isSubmitted
                                                ? errors.email
                                                    ? "true"
                                                    : "false"
                                                : undefined
                                        }
                                    />
                                    <FieldDescription className="text-red-600">
                                        {errors.email && (
                                            <>
                                                {errors.email.message ||
                                                    "이메일을 정확히 입력해 주세요."}
                                            </>
                                        )}
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <Input
                                        id="password"
                                        type="password"
                                        minLength={8}
                                        maxLength={20}
                                        required
                                        autoComplete="new-password"
                                        {...register("password", {
                                            required: "비밀번호는 필수 입력입니다.",
                                            minLength: {
                                                value: 8,
                                                message: "8자리 이상 비밀번호를 사용하세요.",
                                            },
                                            maxLength: {
                                                value: 20,
                                                message: "20자리 이하 비밀번호를 사용하세요.",
                                            },
                                        })}
                                        aria-invalid={
                                            isSubmitted
                                                ? errors.password
                                                    ? "true"
                                                    : "false"
                                                : undefined
                                        }
                                    />
                                    <FieldDescription className="text-red-600">
                                        {errors.password && <>{errors.password.message}</>}
                                    </FieldDescription>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor="confirm-password">
                                        Confirm Password
                                    </FieldLabel>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        required
                                        autoComplete="new-password"
                                        {...register("confirmpassword", {
                                            required: "비밀번호 확인은 필수 입력입니다.",
                                            validate: (value) =>
                                                value === watch("password") ||
                                                "비밀번호가 일치하지 않습니다.",
                                        })}
                                        aria-invalid={
                                            isSubmitted
                                                ? errors.confirmpassword
                                                    ? "true"
                                                    : "false"
                                                : undefined
                                        }
                                    />
                                    <FieldDescription className="text-red-600">
                                        {errors.confirmpassword && (
                                            <>{errors.confirmpassword.message}</>
                                        )}
                                    </FieldDescription>
                                </Field>
                                <FieldGroup>
                                    <Field>
                                        <Button type="submit" disabled={!isValid || isSubmitting}>
                                            {isSubmitting ? "Processing..." : "Create Account"}
                                        </Button>
                                        <FieldDescription className="px-6 text-center">
                                            Already have an account? <a href="/login">Login in</a>
                                        </FieldDescription>
                                    </Field>
                                </FieldGroup>
                            </FieldGroup>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default React.memo(SignupPage);
