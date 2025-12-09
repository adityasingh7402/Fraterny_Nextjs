// page.tsx
import { QuestResultClient } from './components/QuestResultClient';
import { validateResultData } from './utils/validations';
import { mockData } from './final-design/ResultData';
import {prepareFinalData} from './final-design/ResultData';
import axios from 'axios';

type Props = {
  params: Promise<{  // ← params is now a Promise
    userId: string;
    sessionId: string;
    testId: string;
  }>;
};

// async function getResultData(userId: string, sessionId: string, testId: string) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/${userId}/${sessionId}/${testId}`,
//       {
//         cache: 'no-store',
//       }
//     );


//     if (!response.ok) {
//       throw new Error('Failed to fetch result data');
//     }

//     const data = await response.json();

//     // 🎭 Check for development mode (Skip Agent toggle)
//     if (data.mode === 'development') {
//       console.log('🎭 Development mode detected - returning mock data');
//       return mockData;
//     }

//     const validateddata = validateResultData(data);
//     return validateddata;

//   } catch (error) {
//     console.error('Error fetching result data:', error);
//     return null;
//   }
// }

async function getResultData(userId: string, sessionId: string, testId: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/${userId}/${sessionId}/${testId}`
    );

    if (response.data && response.data.archetype) {
      const processedData = prepareFinalData(response.data);
      // console.log("✅ Processed data:", processedData);
      return processedData;
    } else {
      //console.log('⚠️ No valid data from backend, using mockData');
      const processedMockData = prepareFinalData(mockData);
      console.log('✅ Processed mock data:', processedMockData); // Add this
      return processedMockData;
    }

  } catch (error) {
    //console.error('❌ Error fetching result data, using mockData:', error);
    const processedMockData = prepareFinalData(mockData);
    //console.log('✅ Processed mock data (error case):', processedMockData); // Add this
    return processedMockData;
  }
}

export default async function QuestResultPage({ params }: Props) {
  const { userId, sessionId, testId } = await params;
  //console.log('Params:', { userId, sessionId, testId });

  const resultData = await getResultData(userId, sessionId, testId);
  //console.log('Fetched Result Data:', resultData);
  

  return (
    <QuestResultClient
      initialData={resultData}
      userId={userId}
      sessionId={sessionId}
      testId={testId}
    />
  );
}