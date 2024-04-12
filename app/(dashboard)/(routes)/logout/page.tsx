"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Signout = () => {
	const router = useRouter();
	useEffect(() => {
		signOut({ redirect: false });
		router.push("/login");
	}, []);
	return <></>;
};

export default Signout;
