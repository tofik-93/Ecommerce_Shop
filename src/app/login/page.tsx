"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, logout } from "@/store/uiSlice";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const isAuthenticated = useAppSelector((s) => s.ui.isAuthenticated);
	const dispatch = useAppDispatch();
	return (
		<div className="max-w-md space-y-4">
			<h1 className="text-xl font-semibold">Login</h1>
			{isAuthenticated ? (
				<div className="space-y-3">
					<p className="opacity-80">You are logged in.</p>
					<Button variant="outline" onClick={() => dispatch(logout())}>
						Logout
					</Button>
				</div>
			) : (
				<form
					className="space-y-3"
					onSubmit={(e) => {
						e.preventDefault();
						dispatch(login({ username }));
					}}
				>
					<Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
					<Button type="submit">Login</Button>
				</form>
			)}
		</div>
	);
}


