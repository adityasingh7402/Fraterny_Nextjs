'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface TestimonialData {
    name: string;
    role: string;
    avatar: string;
    stars: number;
    text: string;
}

const FALLBACK_DATA: TestimonialData[] = [
    {
        name: "Hope_Good19",
        role: "",
        avatar: "https://picsum.photos/100/100?random=60",
        stars: 5,
        text: "I am speechless — the accuracy, introspective feedback and summary from my file was outstanding."
    },
    {
        name: "wicked-dream1",
        role: "",
        avatar: "https://picsum.photos/100/100?random=61",
        stars: 5,
        text: "Spending 10 minutes on Quest was the equivalent to an hour with a psychiatrist, yet I even get a tangible file from my time spent."
    },
    {
        name: "Anonymous",
        role: "",
        avatar: "https://picsum.photos/100/100?random=62",
        stars: 5,
        text: "Woww — some key takeaways for me to reflect on in life that I never would have pieced together before! Highly recommend."
    },
    {
        name: "Veronicastyles",
        role: "",
        avatar: "https://picsum.photos/100/100?random=63",
        stars: 5,
        text: "Very insightful! Thank you."
    },
    {
        name: "Jennaofficial90",
        role: "",
        avatar: "https://picsum.photos/100/100?random=64",
        stars: 5,
        text: "I am surprised how accurate the free preview was considering I gave quite vague answers."
    },
    {
        name: "Vibess1998",
        role: "",
        avatar: "https://picsum.photos/100/100?random=65",
        stars: 5,
        text: "I tried it out. The file didn’t resonate with me at first, but the next observations it made blew my mind with perspective."
    }
];

export const ReflectionTestimonial: React.FC = () => {
    const [data, setData] = useState<TestimonialData[]>(FALLBACK_DATA);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await fetch('/api/public/feedback');
                const result = await response.json();
                if (result.success && result.data && result.data.length > 0) {
                    setData(result.data);
                }
            } catch (error) {
                console.error('Error fetching feedback:', error);
                // Fallback is already set as initial state
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    if (loading && data.length === 0) {
        return null;
    }

    // Split data into two rows and duplicate multiple times for seamless infinite scroll
    const midPoint = Math.ceil(data.length / 2);
    const topRow = [...data.slice(0, midPoint), ...data.slice(0, midPoint), ...data.slice(0, midPoint), ...data.slice(0, midPoint)];
    const bottomRow = [...data.slice(midPoint), ...data.slice(midPoint), ...data.slice(midPoint), ...data.slice(midPoint)];

    // Calculate the width of one set of cards (approximate)
    const cardWidth = 300 + 24; // card width + gap
    const singleSetWidth = (data.slice(0, midPoint).length * cardWidth);

    return (
        <section className="py-12 px-4 overflow-hidden bg-[#f7f7f7]">

            {/* Top Row - Left to Right */}
            <div className="mb-4 md:mb-8 mask-[linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
                <motion.div
                    className="flex gap-3 md:gap-6"
                    initial={{ x: 0 }}
                    animate={{
                        x: [-singleSetWidth, 0],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 18,
                            ease: "linear",
                        },
                    }}
                >
                    {topRow.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg border border-gray-100 w-[280px] md:w-[300px] h-[250px] shrink-0 flex flex-col justify-between"
                        >
                            <div className="overflow-hidden">
                                <div className="mb-3 md:mb-4">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-neutral-900" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>
                                <div className="relative overflow-hidden">
                                    <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-gilroy-regular line-clamp-4">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center pt-3 md:pt-4 border-t border-gray-100 mt-2">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 md:mr-3 object-cover shadow-sm"
                                />
                                <div className="flex-1">
                                    <h4 className="font-bold text-xs md:text-sm font-gilroy-bold text-neutral-800">{item.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom Row - Right to Left */}
            <div className='mask-[linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]'>
                <motion.div
                    className="flex gap-3 md:gap-6"
                    initial={{ x: -singleSetWidth }}
                    animate={{
                        x: [0, -singleSetWidth],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 15,
                            ease: "linear",
                        },
                    }}
                >
                    {bottomRow.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 md:p-6 rounded-lg md:rounded-xl shadow-lg border border-gray-100 w-[280px] md:w-[300px] h-[250px] shrink-0 flex flex-col justify-between"
                        >
                            <div className="overflow-hidden">
                                <div className="mb-3 md:mb-4">
                                    <svg className="w-6 h-6 md:w-8 md:h-8 text-neutral-800" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                    </svg>
                                </div>
                                <div className="relative overflow-hidden">
                                    <p className="text-gray-700 text-xs md:text-sm leading-relaxed font-gilroy-regular line-clamp-4">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center pt-3 md:pt-4 border-t border-gray-100 mt-2">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full mr-2 md:mr-3 object-cover shadow-sm"
                                />
                                <div className="flex-1">
                                    <h4 className="font-bold text-xs md:text-sm font-gilroy-bold text-neutral-800">{item.name}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ReflectionTestimonial;
