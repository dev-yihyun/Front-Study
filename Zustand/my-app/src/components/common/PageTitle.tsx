"use client";
import { titleMap } from "@/shared/data/memu";
import { usePathname } from "next/navigation";
import React from "react";

function PageTitle() {
    const pathname = usePathname();

    return <h1 className="text-lg font-semibold">{titleMap[pathname] || "페이지"}</h1>;
}
export default React.memo(PageTitle);
