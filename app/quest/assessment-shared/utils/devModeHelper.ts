// devModeHelper.ts
import { getAllQuestions } from '../questions/questions';
import { QuestSession, QuestionResponse } from '../types/types';

/**
 * Generate auto-filled responses for Skip Input mode
 * Creates dummy responses for all questions based on their type
 */
export const generateAutoFilledResponses = (userId: string): QuestSession => {
    const allQuestions = getAllQuestions();
    const now = new Date().toISOString();

    const responses: Record<string, QuestionResponse> = {};
    const questionProgress: Record<string, 'answered' | 'skipped'> = {};
    const visitedQuestions: string[] = [];

    allQuestions.forEach(question => {
        let responseValue: string;

        // Generate response based on question type
        switch (question.type) {
            case 'number_dropdown':
                // Age question
                responseValue = '17';
                break;

            case 'multiple_choice':
                // Gender question - default to first option
                responseValue = question.options?.[0] || 'Male';
                break;

            case 'ranking':
                // Ranking question - use JSON format with ranking and additional input
                responseValue = JSON.stringify({
                    ranking: question.options || [],
                    additionalInput: 'Test'
                });
                break;

            case 'text_input':
                // Check if it needs special format (name/email with anonymous flag)
                if (question.allowAnonymous) {
                    if (question.id === 'q1_1') {
                        // Name field
                        responseValue = JSON.stringify({
                            selectedCity: '',
                            name: 'Test',
                            isAnonymous: false
                        });
                    } else if (question.id === 'q1_2') {
                        // Email field
                        responseValue = JSON.stringify({
                            selectedCity: '',
                            email: 'Test',
                            isAnonymous: false
                        });
                    } else {
                        // Other anonymous fields (e.g., q1_5)
                        responseValue = JSON.stringify({
                            isAnonymous: true,
                            selectedCity: '',
                            details: 'Test'
                        });
                    }
                } else {
                    // Regular text input
                    responseValue = 'Test';
                }
                break;

            default:
                responseValue = 'Test';
        }

        responses[question.id] = {
            questionId: question.id,
            response: responseValue,
            tags: [],
            timestamp: now
        };

        questionProgress[question.id] = 'answered';
        visitedQuestions.push(question.id);
    });

    const autoFilledSession: QuestSession = {
        id: `session_${Date.now()}`,
        userId,
        sectionId: 'section_5', // Last section
        currentQuestionIndex: 2, // Last question of section 5 (0-indexed)
        status: 'in_progress',
        startedAt: now,
        allowSkip: true,
        questionProgress,
        responses,
        visitedQuestions
    };

    return autoFilledSession;
};

/**
 * Save development mode to localStorage
 */
export const saveDevMode = (mode: 'skip_agent' | 'skip_input' | null) => {
    if (mode) {
        localStorage.setItem('quest_dev_mode', mode);
        console.log(`🎭 Development mode enabled: ${mode}`);
    } else {
        localStorage.removeItem('quest_dev_mode');
        console.log('✅ Development mode disabled');
    }
};

/**
 * Get current development mode from localStorage
 */
export const getDevMode = (): 'skip_agent' | 'skip_input' | null => {
    const mode = localStorage.getItem('quest_dev_mode');
    return mode as 'skip_agent' | 'skip_input' | null;
};

/**
 * Clear development mode from localStorage
 */
export const clearDevMode = () => {
    localStorage.removeItem('quest_dev_mode');
};

/**
 * Check if development mode is active
 */
export const isDevModeActive = (): boolean => {
    return getDevMode() !== null;
};
