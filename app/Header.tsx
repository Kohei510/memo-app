"use client";

import { useState } from "react";

export default function Header(){
    const [open, setOpen] = useState(false);

    return (
        <header
        style={{
            height: "60px",
            width: "100%",
            position: "fixed",
            top: 0,
            zIndex: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            borderBottom: "1px solid #eee",
        }}
        >
            <a href="/" style={{ textDecoration: "none", color: "#111" }}>
                <h1 style={{ fontSize: "22px", margin: 0, fontWeight: 600 }}>
                My Note App
                </h1>
            </a>
        </header>
    )
}