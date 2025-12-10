

// import React from 'react'
// import img from '../../../../public/Vector.svg';
// import { Facebook, Instagram, Mail, Twitter, Youtube } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';

// function QuestFooter() {
//   return (
//     <div>
//         <div className='flex-col items-start justify-start pl-6 pt-4 mb-4'>
//             <div className='pb-4'>
//             <Image src='/Vector.svg' alt="Quest Footer" height={96} width={96} />
//             </div>
//             <div className="w-80 pb-5 justify-start text-gray-400 text-lg font-normal font-gilroy-regular leading-none">
//                 AI-powered psychoanalysis tool that generates a personalized mindset and personality report based on your responses. Built to go beyond traditional personality tests, Quest reveals emotional patterns, blind spots, and growth pathways unique to you.
//             </div>
//             {/* social media icons in flex row */}
//             <div className='flex space-x-8 pb-4'>
//                 <Link href="mailto:quest@fratery.in?subject=Refund Request" aria-label="Facebook">
//                     <Mail className='h-6 w-6 text-blue-600' />
//                 </Link>
//                 <Link href="https://www.instagram.com/quest.fraterny/" aria-label="Instagram">
//                     <Instagram className='h-6 w-6 text-pink-600' />
//                 </Link >
//                 <Link href="https://x.com/frat_erny" aria-label="Youtube">
//                     <Twitter className='h-6 w-6 text-black' />
//                 </Link>
//             </div>
//             <div className=" flex justify-between w-full pr-10">
//                 <div className='flex-col gap-2 '>
//                     <h2 className='text-[#0284c7] text-2xl pb-2'>Fraterny</h2>
//                     <div className='flex flex-col gap-1'>
//                         <Link href="/quest/quest-mode" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">Home</Link>
//                         <Link href="https://www.instagram.com/quest.fraterny/" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">Instagram</Link>
//                         <Link href="https://www.linkedin.com/company/fraterny/" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">LinkedIn</Link>
//                         <Link href="/blog" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">Blog</Link>
//                     </div>
//                 </div>
//                 <div className='flex-col gap-2 '>
//                     <h2 className='text-[#0284c7] text-2xl pb-2'>Support</h2>
//                     <div className='flex flex-col gap-1'>
//                         <Link href="/privacy-policy" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">Data Privacy</Link>
//                         <Link href="/terms-and-conditions" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">Terms  & Conditions</Link>
//                         <Link href="mailto:quest@fratery.in?subject=Refund Request" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">Refund</Link>
//                         <Link href="mailto:quest@fratery.in?subject=Internship Opportunity" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">Internships</Link>
//                         <Link href="/quest/begin" className="text-[#292929] text-sm font-normal font-['Inter'] leading-tight">Begin</Link>
//                     </div>
//                 </div>

//             </div>

//         </div>      
//     </div>
//   )
// }

// export default QuestFooter


import React from 'react'
import { Mail, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

function QuestFooter() {
  return (
    <div className='w-full bg-[#004A7F]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
        {/* Logo and Description */}
        <div className='flex flex-col items-start mb-8 sm:mb-10'>
          <div className='mb-4 sm:mb-6'>
            <Image 
              src='/Vector.svg' 
              alt="Quest Footer" 
              height={80} 
              width={80}
              className='sm:h-24 sm:w-24 invert'
            />
          </div>
          
          <div className="w-full mb-6 text-gray-100 text-base sm:text-lg font-normal font-gilroy-regular leading-relaxed">
            AI-powered psychoanalysis tool that generates a personalized mindset and personality report based on your responses. Built to go beyond traditional personality tests, Quest reveals emotional patterns, blind spots, and growth pathways unique to you.
          </div>
          
          {/* Social Media Icons */}
          <div className='flex space-x-6 sm:space-x-8 mb-8 sm:mb-10'>
            <Link 
              href="mailto:quest@fratery.in?subject=Refund Request" 
              aria-label="Email"
              className='hover:opacity-70 transition-opacity'
            >
              <Mail className='h-5 w-5 sm:h-6 sm:w-6 text-gray-100' />
            </Link>
            <Link 
              href="https://www.instagram.com/quest.fraterny/" 
              aria-label="Instagram"
              className='hover:opacity-70 transition-opacity'
            >
              <Instagram className='h-5 w-5 sm:h-6 sm:w-6 text-pink-600' />
            </Link>
            <Link 
              href="https://x.com/frat_erny" 
              aria-label="Twitter"
              className='hover:opacity-70 transition-opacity'
            >
              <Twitter className='h-5 w-5 sm:h-6 sm:w-6 text-black' />
            </Link>
          </div>
        </div>

        {/* Links Section - Responsive Grid */}
        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {/* Fraterny Column */}
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-gray-100 text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 font-gilroy-semibold'>
              Fraterny
            </h2>
            <div className='flex flex-col gap-2 sm:gap-2.5 text-gray-100'>
              <Link 
                href="/quest/quest-mode" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                Home
              </Link>
              <Link 
                href="https://www.instagram.com/quest.fraterny/" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                Instagram
              </Link>
              <Link 
                href="https://www.linkedin.com/company/fraterny/" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                LinkedIn
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Support Column */}
          <div className='flex flex-col gap-2 sm:gap-3'>
            <h2 className='text-gray-100 text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 font-gilroy-semibold'>
              Support
            </h2>
            <div className='flex flex-col gap-2 sm:gap-2.5'>
              <Link 
                href="/privacy-policy" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                Data Privacy
              </Link>
              <Link 
                href="/terms-and-conditions" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link 
                href="mailto:quest@fratery.in?subject=Refund Request" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                Refund
              </Link>
              <Link 
                href="mailto:quest@fratery.in?subject=Internship Opportunity" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                Internships
              </Link>
              <Link 
                href="/quest/begin" 
                className="text-gray-100 text-sm sm:text-base font-normal font-['Inter'] leading-tight hover:text-[#0284c7] transition-colors"
              >
                Begin
              </Link>
            </div>
          </div>
        </div>

        {/* Optional Copyright Section */}
        <div className='mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200'>
          <p className='text-gray-400 text-xs sm:text-sm text-center font-["Inter"]'>
            © {new Date().getFullYear()} Fraterny. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default QuestFooter