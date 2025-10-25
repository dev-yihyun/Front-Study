import { Clover } from "lucide-react";
import React from "react";
import PageTitle from "./PageTitle";

function ReadyComponent() {
    return (
        <section className="flex flex-col items-center gap-4">
            <Clover size={350} />
            <p className="text-4xl font-bold text-gray-600">Guest Mode</p>
            <PageTitle />
        </section>
    );
}
export default React.memo(ReadyComponent);
