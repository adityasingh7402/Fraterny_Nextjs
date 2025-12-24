"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    const mouse = useRef({ x: 0, y: 0 });
    const pos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener("mousemove", onMouseMove);

        const animate = () => {
            // Smooth follow (lerp)
            pos.current.x += (mouse.current.x - pos.current.x) * 0.25;
            pos.current.y += (mouse.current.y - pos.current.y) * 0.25;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(
          ${pos.current.x - 20}px,
          ${pos.current.y - 20}px,
          0
        )`;
            }

            requestAnimationFrame(animate);
        };

        animate();

        return () => window.removeEventListener("mousemove", onMouseMove);
    }, []);

    return (
        <div
            ref={cursorRef}
            className="hidden lg:block fixed top-0 left-0 w-10 h-10 blur-sm rounded-full pointer-events-none z-[9999] p-[2px] bg-[linear-gradient(157deg,theme(colors.emerald.200),theme(colors.violet.800))]"
            style={{
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                maskComposite: "exclude",
                WebkitMaskComposite: "xor",
            }}
        />
    );
}
