"use client";
import { ReactLenis } from "@studio-freight/react-lenis";

function SmoothScrolling({ children }: { children: any }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.08,
                duration: 1.8,
                smoothWheel: true,
                wheelMultiplier: 0.9,
            }}
        >
            {children}
        </ReactLenis>
    );
}

export default SmoothScrolling;
