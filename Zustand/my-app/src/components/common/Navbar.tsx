import { menuItems } from "@/shared/data/memu";
import { Command } from "lucide-react";
import { cookies } from "next/headers";
import React from "react";
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
import PageTitle from "./PageTitle";

type NavbarProps = {
    children: React.ReactNode;
};

async function Navbar({ children }: NavbarProps) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <Sidebar collapsible="icon">
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <a href="#">
                                    <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <Command className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">Acme Inc</span>
                                        <span className="truncate text-xs">Enterprise</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <Separator orientation="horizontal" />
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>Application</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
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
