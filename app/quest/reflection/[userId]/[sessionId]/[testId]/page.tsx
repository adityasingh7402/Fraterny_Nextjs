// page.tsx
import { QuestResultClient } from './components/QuestResultClient';
import { mockData } from './final-design/ResultData';
import { prepareFinalData } from './final-design/ResultData';
import axios from 'axios';
import { supabase } from '@/lib/supabase';

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
    const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/report/${userId}/${sessionId}/${testId}`;
    console.log('🔍 Fetching from API:', apiUrl);

    const response = await axios.get(apiUrl);

    console.log('📦 API Response status:', response.status);

    // Parse the results field which contains stringified JSON
    let parsedResults = null;
    if (response.data?.results) {
      try {
        parsedResults = typeof response.data.results === 'string'
          ? JSON.parse(response.data.results)
          : response.data.results;
        console.log('✅ Parsed results:', parsedResults);
      } catch (parseError) {
        console.error('❌ Failed to parse results:', parseError);
      }
    }

    // Check if we have valid archetype data
    if (parsedResults && parsedResults.archetype) {
      console.log('✅ Using API data - archetype found!');
      console.log('📊 Archetype data:', parsedResults.archetype);

      // Extract likert data from response if available

      // Fetch likert data directly from DB to ensure we have it
      let likertData = undefined;

      try {
        const { data: dbLikert, error: dbError } = await supabase
          .from('summary_generation')
          .select('likertq1, likertq2, likertq3, likertq4')
          .eq('testid', testId)
          .single();

        if (dbLikert && !dbError) {
          console.log('✅ Fetched Likert data directly from DB:', dbLikert);
          likertData = {
            q1: dbLikert.likertq1,
            q2: dbLikert.likertq2,
            q3: dbLikert.likertq3,
            q4: dbLikert.likertq4,
            q5: 5 // Default q5 as we don't track it in calibration sometimes
          };
        } else {
          // Fallback to response data if DB fetch fails
          likertData = response.data?.likert ? {
            q1: response.data.likert.q1 ? parseInt(response.data.likert.q1) : undefined,
            q2: response.data.likert.q2 ? parseInt(response.data.likert.q2) : undefined,
            q3: response.data.likert.q3 ? parseInt(response.data.likert.q3) : undefined,
            q4: response.data.likert.q4 ? parseInt(response.data.likert.q4) : undefined,
            q5: response.data.likert.q5 ? parseInt(response.data.likert.q5) : undefined,
          } : undefined;
        }
      } catch (err) {
        console.error('Error fetching direct likert data:', err);
      }

      console.log('📊 Likert data from DB:', likertData);

      const processedData = prepareFinalData(parsedResults);

      console.log('🎯 PROCESSED DATA FOR CLIENT:', {
        self: processedData.archetypes.self?.subtitle,
        world: processedData.archetypes.world?.subtitle,
        aspiration: processedData.archetypes.aspiration?.subtitle,
        likert: likertData
      });

      // Return with likert data included
      return {
        ...processedData,
        likert: likertData
      };
    } else {
      console.log('⚠️ No valid archetype in parsed results, falling back to mockData');
      console.log('⚠️ Response structure:', Object.keys(response.data || {}));
      console.log('⚠️ Parsed results structure:', parsedResults ? Object.keys(parsedResults) : 'null');
      const processedMockData = prepareFinalData(mockData);
      return processedMockData;
    }

  } catch (error) {
    console.error('❌ Error fetching result data:', error);
    if (axios.isAxiosError(error)) {
      console.error('❌ Axios error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
    console.log('⚠️ Falling back to mockData due to error');
    const processedMockData = prepareFinalData(mockData);
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