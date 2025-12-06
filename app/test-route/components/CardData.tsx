import { LogOut } from "lucide-react";
import { CardData } from "./types";
import React from 'react';

export const CARDS_DATA: CardData[] = [
  {
    id: 1,
    title: <>HEALING <br /> HEART</>,
    subtitle: "Embercarrier",
    tag: "Self",
    imageUrl: '/result/HEALING HEART.webp',
    stats: [],
    bgGradient: '/result/HEALING HEART (4).webp',
    buttonbg: 'bg-[#0198ac]',
    textcolor: 'text-[#0198ac]',
    icon: <><LogOut className="w-6 h-6 text-[#0198ac]" /></>,
    bgHeading: <> SELF VIEW </>,
    bgSubheading: <> HOW YOU SEE YOURSELF </>,
    content: <div className="">
      <p className="text-sm font-gilroy-light text-gray-800 mb-3">
        The Healing Heart is someone who makes a room feel safe just by walking into it.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-3 text-sm font-gilroy-light">
        <li className=" text-gray-800 text-sm font-gilroy-light">Approach orientation to recovery</li>
        <li className=" text-gray-800 text-sm font-gilroy-light">Rhythmic regulation</li>
        <li className=" text-gray-800 text-sm font-gilroy-light">Realistic optimism</li>
      </ul>
      
      <p className="text-sm font-gilroy-light">
        Your personal psychological artifact discusses how the Healing Heart mask and your current inclination affects you in great detail.
      </p>
    </div>
  },
  {
    id: 2,
    title: <>RESTLESS <br /> MIND</>,
    subtitle: "Signal Finder",
    tag: "World",
    imageUrl: "/result/RESTLESS MIND.webp",
    icon: <><LogOut className="w-6 h-6 text-[#1a5a7e]" /></>,
    stats: [],
    bgGradient: "/result/RESTLESS MIND (4).webp",
    buttonbg: 'bg-[#1a5a7e]',
    textcolor: 'text-[#1a5a7e]',
    bgHeading: <>ASPIRATION</>,
    bgSubheading: "HOW YOU ASPIRE TO BE",
    content: <>
      <p className="text-sm font-gilroy-light text-gray-800 mb-6">
        Restless Minds carry a brain that often feels like a browser with fifty tabs open.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-6 text-sm font-gilroy-light">
        <li className="text-gray-800 text-sm font-gilroy-light">Range and Regulation</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Decision Friction</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Creative Motion</li>
      </ul>
      
      <p className="text-sm font-gilroy-light text-gray-800">
        Your personal psychological artifact discusses how the Restless Mind mask and your current inclination affects you in great detail.
      </p>
    </>
  },
  {
    id: 3,
    title: <>HIDDEN <br /> THINKER</>,
    subtitle: "Quiet Prodigy",
    tag: "Aspire",
    imageUrl: "/result/HIDDEN THINKER (2).webp",
    icon: <><LogOut className="w-6 h-6 text-[#043974]" /></>,
    stats: [],
    bgGradient: "/result/HIDDEN THINKER (3).webp",
    buttonbg: 'bg-[#043974]',
    textcolor: 'text-[#043974]',
    bgHeading: <>SOCIAL VIEW</>,
    bgSubheading: <>HOW THE WORLD SEES YOU</>,
    content: <>
    <p className="text-sm font-gilroy-light text-gray-800 mb-6">
      Hidden Thinkers slow moments down just enough to get them right.
    </p>
    
    <p className="text-sm font-gilroy-light text-gray-800 mb-1">
      Psychologically, this energy combines:
    </p>
    
    <ul className="list-disc ml-6 mb-6 text-sm font-gilroy-light">
      <li className="text-gray-800 text-sm font-gilroy-light">Accuracy drive & craftsmanship</li>
      <li className="text-gray-800 text-sm font-gilroy-light">Calm attentional style</li>
      <li className="text-gray-800 text-sm font-gilroy-light">Visibility caution</li>
    </ul>
    
    <p className="text-sm font-gilroy-light text-gray-800">
      Your personal psychological artifact discusses how the Hidden Thinker mask and your current inclination affects you in great detail.
    </p>
  </>
  }
];

export const mockData = {
    "archetype":{
        "self":"Soul Cartographer",
        "world":"Quiet Prodigy",
        "aspiration":"Hopewright"
    },
    "core_line":"You keep reaching for a life built on quiet presence, yet when uncertainty rises you almost automatically reach back for the old proof-by-effort script that once kept you safe.",
    "primary_pattern":"You see yourself as someone who is here to map inner worlds and turn suffering into understanding. In daily life, others meet the reliable, undemanding achiever who rarely shows how much weight you carry inside. What pulls you forward is a simple but demanding wish: to live from embodied peace, abroad if needed, and to let spiritual practice shape your days instead of fear. The live tension is between trusting this slower, riskier path and the fast, familiar comfort of working harder than you actually want to.",
    "slider_question":{
        "question1":"When you slow down and rest, do you start to feel guilty inside?",
        "question2":"Right now, how hard is it for you to ask someone for help?",
        "question3":"How much do you feel torn between family duty and your own path?",
        "question4":"Do you feel your spiritual ideas and your daily life actually match?",
        "likert1":["Not at all","Very much"],
        "likert2":["Not Hard","Very Hard"],
        "likert3":["Doesn’t matter","Matters a lot"],
        "likert4":["Never","Always"]
    },
    "signals":{
        "signal1_purpose":"Work-as-safety autopilot",
        "signal2_purpose":"Disappearing needs",
        "signal3_purpose":"Deferred grief",
        "signal4_purpose":"Concepts as armor",
        "signal5_purpose":"Conditional freedom plan",
        "signal1_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal2_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal3_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal4_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
        "signal5_description":"When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want."
    },
    "depth_score":42
};

export default mockData;