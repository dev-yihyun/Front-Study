"use client";

import { appMenuItems, authMenuItems } from "@/shared/data/memu";
import { useAuth } from "@/shared/hooks/useAuth";
import { ChevronUp, Command } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from "../ui/sidebar";
import LogoutButton from "./LogoutButton";
import PageTitle from "./PageTitle";
import SignupButton from "./SignupButton";

type NavbarProps = {
    children: React.ReactNode;
    defaultOpen: boolean;
};

function Navbar({ children, defaultOpen }: NavbarProps) {
    const { user, isAuthenticated } = useAuth();
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href="/">
                                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Command className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Acme Inc</span>
                                        <span className="truncate text-xs">Enterprise</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <Separator orientation="horizontal" />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Auth</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {authMenuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {appMenuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <Separator decorative />
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton size="lg">
                                        {/* 로그인 하지 않을 경우 이미지 */}
                                        {/* 로그인 한 경우 이미지 */}
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    user?.useremail
                                                        ? "https://github.com/shadcn.png"
                                                        : undefined
                                                }
                                                alt={user?.username || "Guest"}
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">
                                                    {user?.username || "Guest"}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user?.useremail || "GuestEmail"}
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    className="w-[--radix-popper-anchor-width]"
                                >
                                    <DropdownMenuItem>
                                        {isAuthenticated ? <LogoutButton /> : <SignupButton />}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>

                    <Separator decorative />
                    <div className="p-2 text-xs text-muted-foreground">
                        © 2024 Acme Inc. All rights reserved.
                    </div>
                </SidebarFooter>
            </Sidebar>
            <div className="flex flex-1 flex-col">
                <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 bg-header text-header-foreground border-b border-header-border backdrop-blur supports-[backdrop-filter]:bg-header/80">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <PageTitle />
                    </div>
                </header>
                <main className="flex-1 p-4">{children}</main>
            </div>
        </SidebarProvider>
    );
}

export default React.memo(Navbar);
