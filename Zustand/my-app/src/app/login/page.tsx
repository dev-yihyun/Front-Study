"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldDescription, FieldSeparator } from "@/components/ui/field";
import React from "react";
import EmailLogin from "./_ui/component/EmailLogin";
import SocialLogin from "./_ui/component/SocialLogin";

function LoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center md:p-10">
            <div className="w-full max-w-sm">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome back</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <EmailLogin />
                        <FieldSeparator className="mt-7">Or continue with</FieldSeparator>
                        <SocialLogin />{" "}
                        <FieldDescription className="text-center">
                            Don&apos;t have an account?{" "}
                            <a href="/signup" className="text-blue-500">
                                Sign up
                            </a>
                        </FieldDescription>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default React.memo(LoginPage);
