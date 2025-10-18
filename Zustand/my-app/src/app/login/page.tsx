"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import AppleIcon from "./_ui/_icon/AppleIcon";
import GoogleIcon from "./_ui/_icon/GoogleIcon";
import MetaIcon from "./_ui/_icon/MetaIcon";

function LoginPage() {
    const { register, handleSubmit } = useForm();
    return (
        <div className="flex min-h-svh w-full items-center justify-center md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form
                            onSubmit={handleSubmit(() => {
                                console.log("클릭");
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
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        {...register("password")}
                                    />
                                </Field>
                                <Field>
                                    <Button type="submit">Login</Button>
                                </Field>

                                <FieldSeparator> Or continue with</FieldSeparator>

                                <Field className="grid grid-cols-3 gap-4">
                                    <Button variant="outline" type="button">
                                        <AppleIcon />
                                        <span className="sr-only">Login with Apple</span>
                                    </Button>
                                    <Button variant="outline" type="button">
                                        <GoogleIcon />
                                        <span className="sr-only">Login with Google</span>
                                    </Button>
                                    <Button variant="outline" type="button">
                                        <MetaIcon />
                                        <span className="sr-only">Login with Meta</span>
                                    </Button>
                                </Field>

                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <a href="/signup" className="text-blue-500">
                                        Sign up
                                    </a>
                                </FieldDescription>
                            </FieldGroup>
                        </form>
                    </CardContent>

                    <CardContent></CardContent>
                </Card>
            </div>
        </div>
    );
}

export default React.memo(LoginPage);
