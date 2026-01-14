import { sendGTMEvent } from '@next/third-parties/google'

class GoogleAnalyticsService {
  
  private sendEvent(eventName: string, parameters: any): void {
    try {
      const platformInfo = this.getStoredPlatformInfo()
      const normalizedPath = this.normalizePagePath(window.location.pathname)
      
      sendGTMEvent({
        event: eventName,
        ...parameters,
        campaign_source: platformInfo.source,
        campaign_medium: platformInfo.medium,
        campaign_name: platformInfo.campaign,
        traffic_platform: platformInfo.platform,
        timestamp: Date.now(),
        page_location: window.location.origin + normalizedPath,
        page_path: normalizedPath,
        page_title: document.title
      })
      
      console.log(`📊 GTM Event: ${eventName}`, parameters)
    } catch (error) {
      console.error(`❌ Failed to send GTM event ${eventName}:`, error)
    }
  }

  private normalizePagePath(path: string): string {
    if (!path) return '/'
    
    path = path.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/ig, ':id')
    path = path.replace(/session_[0-9]{6,}/ig, 'session/:id')
    path = path.replace(/[0-9a-f]{24,64}/ig, ':id')
    path = path.replace(/(:id\/?){2,}/g, ':id/')
    
    path = path
      .replace(/^\/quest-result\/result\/:id\/session\/:id.*/i, '/quest-result/result')
      .replace(/^\/quest-result\/processing\/:id.*/i, '/quest-result/processing')
      .replace(/^\/quest-dashboard\/:id.*/i, '/quest-dashboard')
      .replace(/^\/assessment-list\/:id.*/i, '/assessment-list')
      .replace(/^\/payment-history\/:id.*/i, '/payment-history')
    
    return path
  }

  private getContentGroup(path: string): string | undefined {
    if (path === '/quest') return 'quest'
    if (path === '/quest-dashboard') return 'quest-dashboard'
    if (path === '/assessment-list') return 'assessment-list'
    if (path === '/quest-result/processing') return 'quest-processing'
    if (path === '/quest-result/result') return 'quest-result'
    return undefined
  }

  private getStoredPlatformInfo(): any {
    try {
      const stored = sessionStorage.getItem('user_platform_info')
      if (stored) {
        const platformInfo = JSON.parse(stored)
        return {
          source: platformInfo.source || 'direct',
          medium: platformInfo.medium || '(none)',
          campaign: platformInfo.campaign || '(none)',
          platform: platformInfo.platform || 'direct'
        }
      }
    } catch (error) {
      console.log('Error getting platform info:', error)
    }
    
    return {
      source: 'direct',
      medium: '(none)',
      campaign: '(none)',
      platform: 'direct'
    }
  }

  trackPageView(): void {
    const normalizedPath = this.normalizePagePath(window.location.pathname)
    const contentGroup = this.getContentGroup(normalizedPath)
    
    this.sendEvent('page_view', {
      page_location: window.location.origin + normalizedPath + window.location.search,
      page_path: normalizedPath,
      page_title: document.title,
      ...(contentGroup && { content_group: contentGroup })
    })
  }

  trackQuestStart(params: {
    session_id: string
    user_state: 'anonymous' | 'logged_in'
    total_questions: number
    is_resumed_session?: boolean
  }): void {
    this.sendEvent('quest_start', {
      event_category: 'Quest',
      event_label: 'Session Started',
      session_id: params.session_id,
      user_state: params.user_state,
      total_questions: params.total_questions,
      is_resumed_session: params.is_resumed_session || false
    })
  }

  trackQuestSessionResume(params: {
  session_id: string;
  user_state: 'logged_in' | 'anonymous';
  total_questions: number;
  }) {
    this.sendEvent('quest_session_resume', {
      session_id: params.session_id,
      user_state: params.user_state,
      total_questions: params.total_questions,
      is_resumed_session: true
    });
  }

  // trackQuestionView(params: {
  //   session_id: string
  //   question_id: string
  //   section_id: string
  //   user_state: 'anonymous' | 'logged_in'
  //   question_index: number
  //   section_question_index: number
  // }): void {
  //   this.sendEvent('quest_question_view', {
  //     event_category: 'Quest',
  //     event_label: `Question View: ${params.question_id}`,
  //     session_id: params.session_id,
  //     question_id: params.question_id,
  //     section_id: params.section_id,
  //     user_state: params.user_state,
  //     question_index: params.question_index,
  //     section_question_index: params.section_question_index
  //   })
  // }

  // trackQuestionComplete(params: {
  //   session_id: string
  //   question_id: string
  //   section_id: string
  //   user_state: 'anonymous' | 'logged_in'
  //   question_index: number
  //   response_length?: number
  //   time_on_question?: number
  // }): void {
  //   this.sendEvent('quest_question_complete', {
  //     event_category: 'Quest',
  //     event_label: `Question Complete: ${params.question_id}`,
  //     session_id: params.session_id,
  //     question_id: params.question_id,
  //     section_id: params.section_id,
  //     user_state: params.user_state,
  //     question_index: params.question_index,
  //     response_length: params.response_length || 0,
  //     time_on_question: Math.round(params.time_on_question || 0)
  //   })
  // }

  trackQuestComplete(params: {
    session_id: string
    user_state: 'anonymous' | 'logged_in'
    total_duration: number
    questions_completed: number
  }): void {
    this.sendEvent('quest_complete', {
      event_category: 'Quest',
      event_label: 'Quest Completed',
      session_id: params.session_id,
      user_state: params.user_state,
      total_duration: Math.round(params.total_duration),
      questions_completed: params.questions_completed
    })

    // this.sendEvent('quest_conversion', {
    //   event_category: 'Conversion',
    //   event_label: 'Quest Completed',
    //   value: params.questions_completed,
    //   currency: 'points'
    // })
  }

  trackQuestAbandon(params: {
    session_id: string
    question_id: string
    section_id: string
    user_state: 'anonymous' | 'logged_in'
    question_index: number
    session_duration: number
    abandon_reason?: string
  }): void {
    this.sendEvent('quest_abandon', {
      event_category: 'Quest',
      event_label: `Abandoned at: ${params.question_id}`,
      session_id: params.session_id,
      question_id: params.question_id,
      section_id: params.section_id,
      user_state: params.user_state,
      question_index: params.question_index,
      session_duration: Math.round(params.session_duration),
      abandon_reason: params.abandon_reason || 'unknown'
    })
  }

  trackUserConversion(params: {
    session_id: string
    conversion_point: string
    questions_completed_as_anonymous: number
  }): void {
    this.sendEvent('user_conversion', {
      event_category: 'User Journey',
      event_label: 'Anonymous to Logged-in',
      session_id: params.session_id,
      conversion_point: params.conversion_point,
      questions_completed_as_anonymous: params.questions_completed_as_anonymous
    })

    this.sendEvent('sign_up', {
      method: 'quest_save'
    })
  }

  trackSessionSave(params: {
    session_id: string
    user_state: 'anonymous' | 'logged_in'
    questions_completed: number
    save_trigger: 'auto' | 'manual' | 'before_unload'
  }): void {
    this.sendEvent('quest_session_save', {
      event_category: 'Quest',
      event_label: 'Session Saved',
      session_id: params.session_id,
      user_state: params.user_state,
      questions_completed: params.questions_completed,
      save_trigger: params.save_trigger
    })
  }

  trackSessionResume(params: {
    session_id: string
    user_state: 'anonymous' | 'logged_in'
    resume_question_id: string
    time_since_save: number
  }): void {
    this.sendEvent('quest_session_resume', {
      event_category: 'Quest',
      event_label: 'Session Resumed',
      session_id: params.session_id,
      user_state: params.user_state,
      resume_question_id: params.resume_question_id,
      time_since_save: Math.round(params.time_since_save * 100) / 100
    })
  }

  trackPaymentInitiated(params: {
    session_id: string
    test_id: string
    user_state: 'anonymous' | 'logged_in'
    payment_amount: number
    pricing_tier: 'early' | 'regular'
  }): void {
    this.sendEvent('initiate_checkout', {
      event_category: 'Payment',
      event_label: 'Payment Initiated',
      session_id: params.session_id,
      test_id: params.test_id,
      user_state: params.user_state,
      value: params.payment_amount,
      pricing_tier: params.pricing_tier,
      currency: 'INR'
    })
  }

  trackPaymentModalOpened(params: {
    session_id: string
    order_id: string
    amount: number
    currency: string
  }): void {
    this.sendEvent('payment_modal_opened_from_result_page', {
      event_category: 'Payment',
      event_label: 'Payment Modal Opened',
      session_id: params.session_id,
      order_id: params.order_id,
      amount: params.amount,
      currency: params.currency
    })
  }

  trackPaymentSuccess(params: {
    session_id: string
    payment_id: string
    order_id: string
    amount: number
  }): void {
    this.sendEvent('payment_success_from_result_page', {
      event_category: 'Payment',
      event_label: 'Payment Completed',
      session_id: params.session_id,
      payment_id: params.payment_id,
      order_id: params.order_id,
      amount: params.amount
    })

    this.sendEvent('payment_conversion', {
      event_category: 'Conversion',
      event_label: 'Payment Conversion',
      session_id: params.session_id,
      payment_id: params.payment_id,
      order_id: params.order_id,
      value: params.amount,
      currency: 'INR'
    })
  }

  trackPaymentCompleted(params: {
    session_id: string
    payment_id: string
    verification_success: boolean
    total_duration: number
  }): void {
    this.sendEvent('payment_completed_from_result_page', {
      event_category: 'Payment',
      event_label: 'Payment Fully Completed',
      session_id: params.session_id,
      payment_id: params.payment_id,
      verification_success: params.verification_success,
      total_duration: Math.round(params.total_duration)
    })
  }

  trackPaymentFailed(params: {
    session_id: string
    failure_reason: string
    error_code?: string
    amount: number
  }): void {
    this.sendEvent('payment_failed_from_result_page', {
      event_category: 'Payment',
      event_label: 'Payment Failed',
      session_id: params.session_id,
      failure_reason: params.failure_reason,
      error_code: params.error_code || 'unknown',
      amount: params.amount
    })
  }

  trackPaymentCancelled(params: {
    session_id: string
    cancel_reason: string
    amount: number
  }): void {
    this.sendEvent('payment_cancelled', {
      event_category: 'Payment',
      event_label: 'Payment Cancelled',
      session_id: params.session_id,
      cancel_reason: params.cancel_reason,
      value: params.amount,
      currency: 'INR'
    })
  }

  trackPdfUnlockCTA(params: {
    session_id: string
    test_id: string
    user_state: 'anonymous' | 'logged_in'
  }): void {
    this.sendEvent('pdf_unlock_cta_clicked_from_result_page', {
      event_category: 'Engagement',
      event_label: 'PDF Unlock CTA Clicked',
      session_id: params.session_id,
      test_id: params.test_id,
      user_state: params.user_state
    })
  }

  trackPaymentInitiatedFromDashboard(params: {
    session_id: string
    test_id: string
    user_state: 'anonymous' | 'logged_in'
    payment_amount: number
    pricing_tier: 'early' | 'regular'
  }): void {
    this.sendEvent('payment_initiated_from_dashboard_page', {
      event_category: 'Payment',
      event_label: 'Payment Started',
      session_id: params.session_id,
      test_id: params.test_id,
      user_state: params.user_state,
      payment_amount: params.payment_amount,
      pricing_tier: params.pricing_tier
    })
  }

  trackPdfUnlockCTAFromDashboard(params: {
    session_id: string
    test_id: string
    user_state: 'anonymous' | 'logged_in'
  }): void {
    this.sendEvent('pdf_unlock_cta_clicked_from_dashboard_page', {
      event_category: 'Engagement',
      event_label: 'PDF Unlock CTA Clicked',
      session_id: params.session_id,
      test_id: params.test_id,
      user_state: params.user_state
    })
  }
}

export const googleAnalytics = new GoogleAnalyticsService()
export { GoogleAnalyticsService }