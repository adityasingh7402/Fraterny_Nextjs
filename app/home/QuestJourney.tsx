// "use client"

// import type React from "react"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Home, User, FolderOpen } from "lucide-react"
// import Link from "next/link"

// interface Step {
//   id: number
//   label: string
//   icon: React.ReactNode
//   title: string
//   description: string
//   imageUrl: string
// }

// const steps: Step[] = [
//   {
//     id: 1,
//     label: "Quest Mode",
//     icon: <Home className="sm:w-5 sm:h-5 w-2 h-2" />,
//     title: "Enter Quest Mode",
//     description:
//       "Begin your journey with comprehensive research and planning. We analyze your needs, define objectives, and create a strategic roadmap that aligns with your vision and business goals.",
//     imageUrl: "/quest/quest-introspective.webp",
//   },
//   {
//     id: 2,
//     label: "Journaling",
//     icon: <User className="sm:w-5 sm:h-5 w-2 h-2" />,
//     title: "Discussion on Your Life Story",
//     description:
//       "Transform ideas into reality through iterative development. Our team builds robust solutions using cutting-edge technologies, ensuring quality and performance at every stage of the process.",
//     imageUrl: "/quest/quest-introspective.webp",
//   },
//   {
//     id: 3,
//     label: "Insights",
//     icon: <FolderOpen className="sm:w-5 sm:h-5 w-2 h-2" />,
//     title: "Get Private Intelligence file",
//     description:
//       "Deploy with confidence and celebrate success. We ensure a smooth launch, provide comprehensive training, and establish ongoing support to maximize your project's impact and longevity.",
//     imageUrl: "/quest/quest-introspective.webp",
//   },
// ]

// export function QuestJourney() {
//   const [activeStep, setActiveStep] = useState(1)

//   const currentStep = steps.find((step) => step.id === activeStep) || steps[0]

//   return (
//     <div className="bg-neutral-300 py-12 md:py-20 px-4 md:px-8 lg:px-12">
//     <div className="container mx-auto pt-5">
//       <div className="mb-16 flex flex-col space-y-5">
//         <motion.h2 
//             className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tight"
//         >
//             Quest { " " }<span className="text-neutral-900">Journey</span>
//         </motion.h2>
//         <nav className="w-full sm:w-fit flex bg-neutral-200 backdrop-blur-3xl border border-white/50 p-1.5 rounded-full shadow-lg">
//           {steps.map((step) => {
//             const isActive = activeStep === step.id

//             return (
//               <button
//                 key={step.id}
//                 onClick={() => setActiveStep(step.id)}
//                 className={`relative px-2 py-1 sm:px-6 sm:py-2.5 flex items-center justify-center gap-2 rounded-full transition-colors duration-300 group ${
//                   isActive ? "text-neutral-900" : "text-slate-400 hover:text-slate-600"
//                 }`}
//               >
//                 {isActive && (
//                   <motion.div
//                     layoutId="active-pill"
//                     className="absolute inset-0 bg-neutral-300 rounded-full shadow-md shadow-neutral-600"
//                     transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
//                   />
//                 )}

//                 <span className={`relative z-10 text-sm  flex items-center justify-center gap-2 font-gilroy-semibold ${isActive ? "text-neutral-900" : "text-slate-400 hover:text-slate-600"}`}>
//                   <span className="hidden sm:inline">{step.icon}</span>
//                   {step.label}
//                 </span>
//                 <div className="flex items-center text-slate-400 px-0 sm:px-2">
//                 <svg className="w-3 sm:w-5 h-3 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//                 </div>
//               </button>
//             )
//           })}
//         </nav>
//       </div>

//       {/* <AnimatePresence mode="wait">
//         <motion.div
//           key={activeStep}
//           initial={{ x: 20 }}
//           animate={{ x: 0 }}
//           exit={{ x: -20 }}
//           transition={{ duration: 0.4, ease: "easeInOut" }}
//           className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
//         >
//           <div className="flex-1 space-y-6">
//             <motion.div
//             //   initial={{ opacity: 0, y: 10 }}
//             //   animate={{ opacity: 1, y: 0 }}
//             //   transition={{ delay: 0.1, duration: 0.3 }}
//             >
//               <p className=" text-4xl sm:text-5xl md:text-6xl font-gilroy-semibold text-neutral-400">{'0' + currentStep.id}</p>
//               <p className="mb-4 text-3xl sm:text-4xl md:text-5xl font-gilroy-semibold text-neutral-600">{currentStep.title}</p>
//             </motion.div>

//             <motion.p
//             //   initial={{ opacity: 0, y: 10 }}
//             //   animate={{ opacity: 1, y: 0 }}
//             //   transition={{ delay: 0.2, duration: 0.3 }}
//               className=" leading-relaxed"
//             >
//                 <span className="text-lg md:text-2xl text-neutral-500 font-gilroy-medium">{currentStep.description}</span>
//             </motion.p>

//             <motion.div
//             //   initial={{ opacity: 0, y: 10 }}
//             //   animate={{ opacity: 1, y: 0 }}
//             //   transition={{ delay: 0.3, duration: 0.3 }}
//               className="flex gap-4 pt-4"
//             >
//               <div className="mb-8 flex gap-4">

//                 <Link href="/quest/quest-mode">
//                     <button className='px-7 py-3 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Start Your Quest</button>
//                 </Link>
//                 {activeStep < steps.length && (
//                     <button onClick={() => setActiveStep(activeStep + 1)} className='px-7 py-3 bg-neutral-500 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Next Step</button>
//                 )}
//                 </div>
//             </motion.div>
//           </div>

//           <motion.div
//             // initial={{ opacity: 0, scale: 0.95 }}
//             // animate={{ opacity: 1, scale: 1 }}
//             // transition={{ delay: 0.2, duration: 0.4 }}
//             className="flex-1 w-full"
//           >
//             <div className="relative rounded-2xl overflow-hidden bg-muted">
//               <img
//                 src={currentStep.imageUrl || "/placeholder.svg"}
//                 alt={currentStep.title}
//                 className="w-full h-full object-contain"
//               />
//             </div>
//           </motion.div>
//         </motion.div>
//       </AnimatePresence> */}
//       <AnimatePresence mode="wait">
//         <motion.div
//             key={activeStep}
//             initial={{ opacity: 0, filter: "blur(10px)", translateX: 100 }}
//             animate={{ opacity: 1, filter: "blur(0px)", translateX: 0 }}
//             exit={{ opacity: 0, filter: "blur(10px)", translateX: -100 }}
//             transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
//             className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
//         >
//             <div className="flex-1 space-y-6">
//             <div>
//                 <p className="text-4xl sm:text-5xl md:text-6xl font-gilroy-semibold text-neutral-400">{'0' + currentStep.id}</p>
//                 <p className="mb-4 text-3xl sm:text-4xl md:text-5xl font-gilroy-semibold text-neutral-700">{currentStep.title}</p>
//             </div>

//             <p className="leading-relaxed">
//                 <span className="text-lg md:text-2xl text-neutral-500 font-gilroy-medium">{currentStep.description}</span>
//             </p>

//             {/* <div className="flex gap-4 pt-4 items-center">
//                 {
//                 activeStep !== 1 && (<motion.button
//                     onClick={() => setActiveStep(activeStep - 1)}
//                     className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
//                     aria-label="Previous testimonials"
                    
//                     >
//                     <svg
//                         width="20"
//                         height="20"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                         <path d="M15 18l-6-6 6-6" />
//                     </svg>
//                 </motion.button>
//                 )}
//                 {
//                 activeStep < steps.length && (
//                     <motion.button
//                     onClick={() => setActiveStep(activeStep + 1)}
//                     className="w-10 h-10 rounded-full border-2 border-neutral-900 text-neutral-900 flex items-center justify-center hover:bg-neutral-900 hover:text-white transition-colors"
//                     aria-label="Next testimonials"
//                     whileTap={{ scale: 0.95 }}
//                     >
//                     <svg
//                         width="20"
//                         height="20"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                         <path d="M9 18l6-6-6-6" />
//                     </svg>
//                     </motion.button>
//                 )}
//             </div> */}
//             </div>

//             <div className="flex-1 w-full">
//             <div className="relative rounded-2xl overflow-hidden ">
//                 <img
//                 src={currentStep.imageUrl || "/placeholder.svg"}
//                 alt={currentStep.title}
//                 className="w-full h-full object-contain"
//                 />
//             </div>
//             </div>
//         </motion.div>
//       </AnimatePresence>

//         <Link href="/quest/quest-mode">
//             <button className='px-7 py-3 mt-8 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Enter Quest Mode</button>
//         </Link>

//       <div className="mt-16 flex gap-2 justify-center">
//         {steps.map((step) => (
//           <motion.div
//             key={step.id}
//             className="h-1 rounded-full"
//             animate={{
//               width: activeStep === step.id ? "48px" : "24px",
//               backgroundColor: activeStep >= step.id ? "hsl(var(--primary))" : "hsl(var(--border))",
//             }}
//             transition={{ duration: 0.3 }}
//           />
//         ))}
//       </div>
//     </div>
//     </div>
//   )
// }



"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Home, User, FolderOpen } from "lucide-react"
import Link from "next/link"

interface Step {
  id: number
  label: string
  icon: React.ReactNode
  title: string
  description: string
  imageUrl: string
}

const steps: Step[] = [
  {
    id: 1,
    label: "Quest Mode",
    icon: <Home className="sm:w-5 sm:h-5 w-2 h-2" />,
    title: "Enter Quest Mode",
    description:
      "Begin your journey with comprehensive research and planning. We analyze your needs, define objectives, and create a strategic roadmap that aligns with your vision and business goals.",
    imageUrl: "/quest/quest-introspective.webp",
  },
  {
    id: 2,
    label: "Journaling",
    icon: <User className="sm:w-5 sm:h-5 w-2 h-2" />,
    title: "Discussion on Your Life Story",
    description:
      "Transform ideas into reality through iterative development. Our team builds robust solutions using cutting-edge technologies, ensuring quality and performance at every stage of the process.",
    imageUrl: "/quest/quest-introspective.webp",
  },
  {
    id: 3,
    label: "Insights",
    icon: <FolderOpen className="sm:w-5 sm:h-5 w-2 h-2" />,
    title: "Get Private Intelligence file",
    description:
      "Deploy with confidence and celebrate success. We ensure a smooth launch, provide comprehensive training, and establish ongoing support to maximize your project's impact and longevity.",
    imageUrl: "/quest/quest-introspective.webp",
  },
]

export function QuestJourney() {
  const [activeStep, setActiveStep] = useState(1)
  const [direction, setDirection] = useState(1)

  const currentStep = steps.find((step) => step.id === activeStep) || steps[0]

  const handleStepChange = (newStep: number) => {
    setDirection(newStep > activeStep ? 1 : -1)
    setActiveStep(newStep)
  }

  const variants = {
    enter: (direction: number) => ({
      opacity: 0,
      filter: "blur(10px)",
      x: direction * 100,
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      x: direction * -100,
      opacity: 0,
      filter: "blur(10px)",
    }),
  }

  return (
    <div className="bg-neutral-300 py-12 md:py-20 px-4 md:px-8 lg:px-12">
    <div className="container mx-auto pt-5">
      <div className="mb-16 flex flex-col space-y-5">
        <motion.h2 
            className="text-5xl sm:text-6xl md:text-7xl font-gilroy-semibold text-neutral-500 tracking-tight"
        >
            Quest { " " }<span className="text-neutral-900">Journey</span>
        </motion.h2>
        <nav className="w-full sm:w-fit flex bg-neutral-200 backdrop-blur-3xl border border-white/50 p-1.5 rounded-full shadow-lg">
          {steps.map((step) => {
            const isActive = activeStep === step.id

            return (
              <button
                key={step.id}
                onClick={() => handleStepChange(step.id)}
                className={`relative px-2 py-1 sm:px-6 sm:py-2.5 flex items-center justify-center gap-2 rounded-full transition-colors duration-300 group ${
                  isActive ? "text-neutral-900" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-neutral-300 rounded-full shadow-md shadow-neutral-600"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}

                <span className={`relative z-10 text-sm  flex items-center justify-center gap-2 font-gilroy-semibold ${isActive ? "text-neutral-900" : "text-slate-400 hover:text-slate-600"}`}>
                  <span className="hidden sm:inline">{step.icon}</span>
                  {step.label}
                </span>
                <div className="flex items-center text-slate-400 px-0 sm:px-2">
                <svg className="w-3 sm:w-5 h-3 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </div>
              </button>
            )
          })}
        </nav>
      </div>

      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
            key={activeStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ 
              x: { type: "spring", stiffness: 300, damping: 50 },
              duration: 0.2 
            }}
            className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center"
        >
            <div className="flex-1 space-y-6">
            <div>
                <p className="text-4xl sm:text-5xl md:text-6xl font-gilroy-semibold text-neutral-400">{'0' + currentStep.id}</p>
                <p className="mb-4 text-3xl sm:text-4xl md:text-5xl font-gilroy-semibold text-neutral-700">{currentStep.title}</p>
            </div>

            <p className="leading-relaxed">
                <span className="text-lg md:text-2xl text-neutral-500 font-gilroy-medium">{currentStep.description}</span>
            </p>
            </div>

            <div className="flex-1 w-full">
            <div className="relative rounded-2xl overflow-hidden ">
                <img
                src={currentStep.imageUrl || "/placeholder.svg"}
                alt={currentStep.title}
                className="w-full h-full object-contain"
                />
            </div>
            </div>
        </motion.div>
      </AnimatePresence>

        <Link href="/quest/quest-mode">
            <button className='px-7 py-3 mt-8 bg-neutral-800 hover:bg-neutral-900 shadow-3xl transition-colors duration-200 text-white rounded-md font-gilroy-semibold tracking-tighter sm:text-2xl'>Enter Quest Mode</button>
        </Link>

      <div className="mt-16 flex gap-2 justify-center">
        {steps.map((step) => (
          <motion.div
            key={step.id}
            className="h-1 rounded-full"
            animate={{
              width: activeStep === step.id ? "48px" : "24px",
              backgroundColor: activeStep >= step.id ? "hsl(var(--primary))" : "hsl(var(--border))",
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
    </div>
  )
}