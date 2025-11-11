"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return <input {...props} className={cn("w-full rounded-md border px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2", props.className)} />;
}
