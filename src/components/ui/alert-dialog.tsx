"use client";

import * as React from "react";

export function AlertDialog({
	title,
	description,
	onConfirm,
	onCancel,
	confirmText = "Confirm",
	cancelText = "Cancel"
}: {
	title: string;
	description?: string;
	onConfirm: () => void;
	onCancel: () => void;
	confirmText?: string;
	cancelText?: string;
}) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
			<div className="w-full max-w-sm rounded-lg border bg-background p-4 shadow">
				<h3 className="text-lg font-semibold">{title}</h3>
				{description ? <p className="mt-1 text-sm opacity-80">{description}</p> : null}
				<div className="mt-4 flex justify-end gap-2">
					<button className="h-9 rounded-md border px-3 text-sm" onClick={onCancel}>
						{cancelText}
					</button>
					<button className="h-9 rounded-md bg-destructive px-3 text-sm text-destructive-foreground" onClick={onConfirm}>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}


