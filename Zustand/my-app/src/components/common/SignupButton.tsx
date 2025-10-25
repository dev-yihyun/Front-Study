// src/components/common/LogoutButton.tsx (새로 생성)
"use client";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";

function SignupButton() {
    return (
        <Button variant="ghost" asChild>
            <Link href="/signup">
                <UserPlus /> Sign up!
            </Link>
        </Button>
    );
}

export default React.memo(SignupButton);
