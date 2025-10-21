"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import React from "react";
import AppleIcon from "../_icon/AppleIcon";
import GoogleIcon from "../_icon/GoogleIcon";
import MetaIcon from "../_icon/MetaIcon";

function SocialLogin() {
    return (
        <>
            <FieldGroup className="my-7">
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
            </FieldGroup>
        </>
    );
}

export default React.memo(SocialLogin);
