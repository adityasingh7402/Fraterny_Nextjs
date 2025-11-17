"use client";
import { useEffect } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
useEffect(() => {
  if (!scope.current) return;

  const spans = scope.current.querySelectorAll("span") as NodeListOf<HTMLSpanElement>;

  spans.forEach((span, index: number) => {
    animate(
      span as HTMLElement,
      {
        opacity: 1,
        // Words after index 10 stay blurred
        filter: index >= 10 ? "blur(8px)" : "blur(0px)",
      },
      {
        duration: duration ?? 1,
        delay: index * 0.2, // manual stagger
      }
    );
  });
}, [scope, animate, duration]);


  // const renderWords = () => {
  //   return (
  //     <motion.div ref={scope}>
  //       {wordsArray.map((word, idx) => {
  //         return (
          
  //           <motion.span
  //             key={word + idx}
  //             className="dark:text-white text-white font-gilroy-regular opacity-0"
  //             style={{
  //               filter: filter ? "blur(10px)" : "none",
  //             }}
  //           >
  //             {word}{" "}
  //           </motion.span>
  //         );
  //       })}
  //     </motion.div>
  //   );
  // };

//   const renderWords = () => {
//   return (
//     <div className="relative">
//       <motion.div ref={scope}>
//         {wordsArray.map((word, idx) => {
//           return (
//             <motion.span
//               key={word + idx}
//               className={`dark:text-white text-white ${idx >= 10 ? 'blur-lg' : 'opacity-100'} relative inline-block mr-2`}
//             >
//               {word}
//               {/* Black redaction bar for words after index 6 (7th word onward) */}
//               {/* {idx >= 10 && (
//                 <div 
//                   className="absolute inset-0 z-10 rounded-sm"
//                   style={{
//                     width: `${word.length * 0.6}em`,
//                     height: '1.2em',
//                     top: '0.1em',
                    
//                   }}
//                 />
//               )} */}
              
//             </motion.span>
//           );
//         })}
//       </motion.div>
//     </div>
//   );
// };

const renderWords = () => {
  return (
    <div className="relative">
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => (
          <motion.span
            key={idx}
            className="inline-block mr-2 opacity-0 dark:text-white text-white"
            style={{
              filter: "blur(8px)", // initial blur for ALL words
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};



  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className=" dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
