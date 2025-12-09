import { LogOut } from "lucide-react";
import { CardData } from "./types";
import { Cluster } from "./types";
import React from 'react';
import { log } from "console";

export const CARDS_DATA: CardData[] = [
  {
    id: 1,
    title: <div className="flex flex-col items-start leading-6">
     <p className="pb-2"> HEALING</p>
     <p> HEART </p>
    </div>,
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
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        The Healing Heart is someone who makes a room feel safe just by walking into it.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-1 text-sm font-gilroy-light">
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
    title: <div className="flex flex-col items-start leading-6">
     <p className="pb-2"> RESTLESS </p>
     <p> MIND </p>
    </div>,
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
      <p className="text-sm font-gilroy-light text-gray-800 mb-2">
        Restless Minds carry a brain that often feels like a browser with fifty tabs open.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-2 text-sm font-gilroy-light">
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
    title: <div className="flex flex-col items-start leading-6">
     <p className="pb-2"> HIDDEN </p>
     <p> THINKER </p>
    </div>,
    subtitle: "Quiet Prodigy",
    tag: "Aspire",
    imageUrl: "/result/HIDDEN THINKER (2).webp",
    icon: <><LogOut className="w-6 h-6 text-[#043974]" /></>,
    stats: [],
    bgGradient: "/result/HIDDEN THINKER (5).webp",
    buttonbg: 'bg-[#043974]',
    textcolor: 'text-[#043974]',
    bgHeading: <>SOCIAL VIEW</>,
    bgSubheading: <>HOW THE WORLD SEES YOU</>,
    content: <>
    <p className="text-sm font-gilroy-light text-gray-800 mb-2">
      Hidden Thinkers slow moments down just enough to get them right.
    </p>
    
    <p className="text-sm font-gilroy-light text-gray-800 mb-1">
      Psychologically, this energy combines:
    </p>
    
    <ul className="list-disc ml-6 mb-2 text-sm font-gilroy-light">
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

export const clusters: Cluster[] = [
  {
    name: <div className="flex flex-col items-start leading-6">
     <p className="pb-2"> THE </p>
     <p> STRATEGISTS </p>
    </div>,
    img: '/result/STRATEGIST.webp',
    bgimg: '/result/STRATEGIST (4).webp',
    buttonbg: 'bg-[#000000]',
    textcolor: 'text-[#000000]',
    icon: <><LogOut className="w-6 h-6 text-[#000000]" /></>,
    bgHeading: <> SELF VIEW </>,
    bgSubheading: <> HOW YOU SEE YOURSELF </>,
    content: <div className="">
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Strategists are people who quietly turn mess into movement.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        In psychology terms, this energy blends:
      </p>
      
      <ul className="list-decimal ml-6 mb-1 text-sm font-gilroy-light">
        <li className="text-gray-800 text-sm font-gilroy-light">Reality testing</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Locus of control</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Executive functioning</li>
      </ul>
      
      <p className="text-sm font-gilroy-light">
        Your personal psychological artifact discusses how the Strategist mask and your current inclination affects you in great detail.
      </p>
    </div>,
    archetypes: [
      "Min-Maxer",
      "Speedrunner",
      "Meta Reader",
      "Build Master",
      "Clutch Caller",
      "Rogue Operator"
    ],
  },
  {
    name: <div className="flex flex-col items-start leading-6">
     <p className="pb-2"> HIDDEN </p>
     <p> THINKER </p>
    </div>,
    img: '/result/HIDDEN THINKER (2).webp',
    bgimg: '/result/HIDDEN THINKER (5).webp',
    buttonbg: 'bg-[#043974]',
    textcolor: 'text-[#043974]',
    bgHeading: <>SOCIAL VIEW</>,
    bgSubheading: <>HOW THE WORLD SEES YOU</>,
    icon: <><LogOut className="w-6 h-6 text-[#043974]" /></>,
    content: <>
      <p className="text-sm font-gilroy-light text-gray-800 mb-2">
        Hidden Thinkers slow moments down just enough to get them right.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-2 text-sm font-gilroy-light">
        <li className="text-gray-800 text-sm font-gilroy-light">Accuracy drive & craftsmanship</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Calm attentional style</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Visibility caution</li>
      </ul>
      
      <p className="text-sm font-gilroy-light text-gray-800">
        Your personal psychological artifact discusses how the Hidden Thinker mask and your current inclination affects you in great detail.
      </p>
    </>,
    archetypes: [
      "Quiet Prodigy",
      "Proof Seeker",
      "Calibrator",
      "Draft Mode",
      "Threshold Walker"
    ],
  },
  {
    name: <div className="flex flex-col items-start leading-6">
     <p className="pb-2"> THE FREE </p>
     <p> SPIRITS </p>
    </div>,
    img: '/result/FREE SPIRIT (2).webp',
    bgimg: '/result/FREE SPIRIT (4).webp',
    buttonbg: 'bg-[#545454]',
    textcolor: 'text-[#545454]',
    bgHeading: <>SOCIAL VIEW</>,
    bgSubheading: <>HOW THE WORLD SEES YOU</>,
    icon: <><LogOut className="w-6 h-6 text-[#545454]" /></>,
    content: <div className="">
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Free Spirits are the people who refuse to live life on autopilot.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-1 text-sm font-gilroy-light">
        <li className="text-gray-800 text-sm font-gilroy-light">Autonomy and Agency</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Novelty Seeking</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Experiential Learning</li>
      </ul>
      
      <p className="text-sm font-gilroy-light">
        Your personal psychological artifact discusses how the Free Spirit mask and your current inclination affects you in great detail.
      </p>
    </div>,
    archetypes: [
      "Wildcard",
      "Vibe Pilot",
      "SideQuester",
      "Glitchjoy",
      "Offscript"
    ],
  },
  {
    name: <div className="flex flex-col items-start leading-6">
     <p className="pb-2"> RESTLESS </p>
     <p> MIND </p>
    </div>,
    img: '/result/RESTLESS MIND.webp',
    bgimg: '/result/RESTLESS MIND (4).webp',
    buttonbg: 'bg-[#1a5a7e]',
    textcolor: 'text-[#1a5a7e]',
    bgHeading: <>ASPIRATION</>,
    bgSubheading: "HOW YOU ASPIRE TO BE",
    icon: <><LogOut className="w-6 h-6 text-[#1a5a7e]" /></>,
    content: <>
      <p className="text-sm font-gilroy-light text-gray-800 mb-2">
        Restless Minds carry a brain that often feels like a browser with fifty tabs open.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-2 text-sm font-gilroy-light">
        <li className="text-gray-800 text-sm font-gilroy-light">Range and Regulation</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Decision Friction</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Creative Motion</li>
      </ul>
      
      <p className="text-sm font-gilroy-light text-gray-800">
        Your personal psychological artifact discusses how the Restless Mind mask and your current inclination affects you in great detail.
      </p>
    </>,
    archetypes: [
      "Loopbreak",
      "Tab Overload",
      "What-If Tamer",
      "Soft Focus",
      "Signal Finder"
    ],
  },
  {
    name: <div className="flex flex-col items-start leading-6">
      <p className="pb-2"> HEALING </p>
      <p> HEARTS </p>
    </div>,
    img: '/result/HEALING HEART.webp',
    bgimg: '/result/HEALING HEART (4).webp',
    buttonbg: 'bg-[#0198ac]',
    textcolor: 'text-[#0198ac]',
    icon: <><LogOut className="w-6 h-6 text-[#0198ac]" /></>,
    bgHeading: <> SELF VIEW </>,
    bgSubheading: <> HOW YOU SEE YOURSELF </>,
    content: <div className="">
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        The Healing Heart is someone who makes a room feel safe just by walking into it.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-1 text-sm font-gilroy-light">
        <li className=" text-gray-800 text-sm font-gilroy-light">Approach orientation to recovery</li>
        <li className=" text-gray-800 text-sm font-gilroy-light">Rhythmic regulation</li>
        <li className=" text-gray-800 text-sm font-gilroy-light">Realistic optimism</li>
      </ul>
      
      <p className="text-sm font-gilroy-light">
        Your personal psychological artifact discusses how the Healing Heart mask and your current inclination affects you in great detail.
      </p>
    </div>,
    archetypes: [
      "Lightkeeper",
      "Embercarrier",
      "Hopewright",
      "Tender Shield",
      "Sunrise Club"
    ],
  },
  {
    name: <div className="flex flex-col items-start leading-6">
      <p className="pb-2"> SOUL </p>
      <p>ALIGNED </p>
    </div>,
    img: '/result/SOUL ALIGNED (2).webp',
    bgimg: '/result/SOUL ALIGNED (4).webp',
    buttonbg: 'bg-[#4dbdfc]',
    textcolor: 'text-[#4dbdfc]',
    bgHeading: <>ASPIRATION</>,
    bgSubheading: "HOW YOU ASPIRE TO BE",
    icon: <><LogOut className="w-6 h-6 text-[#4dbdfc]" /></>,
    content: <div className="">
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        The Soul Aligned are the people who sense the invisible layers of a moment.
      </p>
      
      <p className="text-sm font-gilroy-light text-gray-800 mb-1">
        Psychologically, this energy combines:
      </p>
      
      <ul className="list-disc ml-6 mb-1 text-sm font-gilroy-light">
        <li className="text-gray-800 text-sm font-gilroy-light">Coherence</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Emotional Literacy</li>
        <li className="text-gray-800 text-sm font-gilroy-light">Contextual Intelligence</li>
      </ul>
      
      <p className="text-sm font-gilroy-light">
        Your personal psychological artifact discusses how the Soul Aligned mask and your current inclination affects you in great detail.
      </p>
    </div>,
    archetypes: [
      "Threadweaver",
      "Quiet Beacon",
      "Heart Tuner",
      "Soul Cartographer",
      "Aura Editor"
    ]
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


// Helper function to find which cluster an archetype belongs to and return full cluster data
const findClusterByArchetype = (archetypeName: string) => {
  for (const cluster of clusters) {
    const found = cluster.archetypes.includes(archetypeName);
    if (found) {
      return cluster;
    }
  }
  return null;
};

// Main function to get cluster data for all archetypes
const getArchetypeData = (archetypeData: {
  self: string;
  world: string;
  aspiration: string;
}): {
  [key: string]: {
    clusterName: React.ReactNode;
    subtitle: string;
    imgUrl: string;
    bgUrl: string;
    buttonbg: string;
    textcolor: string;
    icon: React.ReactNode;
    content: React.ReactNode;
    bgHeading: React.ReactNode;
    bgSubheading: React.ReactNode;
  }
} => {
  const result: {
    [key: string]: {
      clusterName: React.ReactNode;
      subtitle: string;
      imgUrl: string;
      bgUrl: string;
      buttonbg: string;
      textcolor: string;
      icon: React.ReactNode;
      content: React.ReactNode;
      bgHeading: React.ReactNode;
      bgSubheading: React.ReactNode;
    }
  } = {};

  // Process each archetype (self, world, aspiration)
  Object.entries(archetypeData).forEach(([key, archetypeName]) => {
    const cluster = findClusterByArchetype(archetypeName);
    
    if (cluster) {
      result[key] = {
        clusterName: cluster.name,
        subtitle: archetypeName,
        imgUrl: cluster.img ?? "",
        bgUrl: cluster.bgimg ?? "",
        buttonbg: cluster.buttonbg ?? "",
        textcolor: cluster.textcolor ?? "",
        icon: cluster.icon,
        content: cluster.content,
        bgHeading: cluster.bgHeading,
        bgSubheading: cluster.bgSubheading
      };
    }
  });

  return result;
};



// Main function to prepare final data for components
export const prepareFinalData = (data: typeof mockData) => {
  // Get cluster data for each archetype
  const archetypeData = getArchetypeData(data.archetype);
  
  // Define heading overrides based on context (self/world/aspiration)
  const headingMap = {
    self: {
      bgHeading: <> SELF VIEW </>,
      bgSubheading: <> HOW YOU SEE YOURSELF </>
    },
    world: {
      bgHeading: <>SOCIAL VIEW</>,
      bgSubheading: <>HOW THE WORLD SEES YOU</>
    },
    aspiration: {
      bgHeading: <>ASPIRATION</>,
      bgSubheading: <>HOW YOU ASPIRE TO BE</>
    }
  };
  
  // Apply overrides to archetype data
  Object.keys(archetypeData).forEach(key => {
    const headings = headingMap[key as keyof typeof headingMap];
    if (headings && archetypeData[key]) {
      archetypeData[key].bgHeading = headings.bgHeading;
      archetypeData[key].bgSubheading = headings.bgSubheading;
    }
  });
  
  
  // Return complete dataset
  return {
    archetypes: archetypeData,
    core_line: data.core_line,
    primary_pattern: data.primary_pattern,
    slider_question: data.slider_question,
    signals: data.signals,
    depth_score: data.depth_score
  };
};

// Access like:
// finalData.archetypes.self.imgUrl
// finalData.archetypes.world.content
// finalData.archetypes.aspiration.buttonbg
// finalData.core_line
// finalData.signals


// {
//   "archetypes": {
//     "self": {
//       "clusterName": "<JSX: SOUL / ALIGNED>",
//       "imgUrl": "/result/SOUL ALIGNED (2).webp",
//       "bgUrl": "/result/SOUL ALIGNED (4).webp",
//       "buttonbg": "bg-[#4dbdfc]",
//       "textcolor": "text-[#4dbdfc]",
//       "icon": "<JSX: LogOut icon with text-[#4dbdfc]>",
//       "content": "<JSX: The Soul Aligned description with Coherence, Emotional Literacy, Contextual Intelligence>",
//       "bgHeading": "<JSX: SELF VIEW>",
//       "bgSubheading": "<JSX: HOW YOU SEE YOURSELF>"
//     },
//     "world": {
//       "clusterName": "<JSX: HIDDEN / THINKER>",
//       "imgUrl": "/result/HIDDEN THINKER (2).webp",
//       "bgUrl": "/result/HIDDEN THINKER (5).webp",
//       "buttonbg": "bg-[#043974]",
//       "textcolor": "text-[#043974]",
//       "icon": "<JSX: LogOut icon with text-[#043974]>",
//       "content": "<JSX: Hidden Thinkers description with Accuracy drive, Calm attentional style, Visibility caution>",
//       "bgHeading": "<JSX: SOCIAL VIEW>",
//       "bgSubheading": "<JSX: HOW THE WORLD SEES YOU>"
//     },
//     "aspiration": {
//       "clusterName": "<JSX: HEALING / HEARTS>",
//       "imgUrl": "/result/HEALING HEART.webp",
//       "bgUrl": "/result/HEALING HEART (4).webp",
//       "buttonbg": "bg-[#0198ac]",
//       "textcolor": "text-[#0198ac]",
//       "icon": "<JSX: LogOut icon with text-[#0198ac]>",
//       "content": "<JSX: Healing Heart description with Approach orientation to recovery, Rhythmic regulation, Realistic optimism>",
//       "bgHeading": "<JSX: ASPIRATION>",
//       "bgSubheading": "HOW YOU ASPIRE TO BE"
//     }
//   },
//   "core_line": "You keep reaching for a life built on quiet presence, yet when uncertainty rises you almost automatically reach back for the old proof-by-effort script that once kept you safe.",
//   "primary_pattern": "You see yourself as someone who is here to map inner worlds and turn suffering into understanding. In daily life, others meet the reliable, undemanding achiever who rarely shows how much weight you carry inside. What pulls you forward is a simple but demanding wish: to live from embodied peace, abroad if needed, and to let spiritual practice shape your days instead of fear. The live tension is between trusting this slower, riskier path and the fast, familiar comfort of working harder than you actually want to.",
//   "slider_question": {
//     "question1": "When you slow down and rest, do you start to feel guilty inside?",
//     "question2": "Right now, how hard is it for you to ask someone for help?",
//     "question3": "How much do you feel torn between family duty and your own path?",
//     "question4": "Do you feel your spiritual ideas and your daily life actually match?",
//     "likert1": ["Not at all", "Very much"],
//     "likert2": ["Not Hard", "Very Hard"],
//     "likert3": ["Doesn't matter", "Matters a lot"],
//     "likert4": ["Never", "Always"]
//   },
//   "signals": {
//     "signal1_purpose": "Work-as-safety autopilot",
//     "signal2_purpose": "Disappearing needs",
//     "signal3_purpose": "Deferred grief",
//     "signal4_purpose": "Concepts as armor",
//     "signal5_purpose": "Conditional freedom plan",
//     "signal1_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
//     "signal2_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
//     "signal3_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
//     "signal4_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want.",
//     "signal5_description": "When anxiety about money, worth, or separation rises, you instinctively reach for work and self-reliance. It soothes you quickly, but also postpones rest, emotional risk, and the spiritual life you say you want."
//   },
//   "depth_score": 42
// }