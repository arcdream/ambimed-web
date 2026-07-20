import { FunctionsHttpError } from '@supabase/supabase-js'
import { isSupabaseConfigured, supabase } from '@/client-app/lib/supabase'

export type LeadRequestPayload = {
  full_name: string
  phone_number: string
  city: string
  service_required: string
}

const EDGE_FUNCTION = 'query_notify_email_request'

async function getEdgeFunctionErrorMessage(error: unknown): Promise<string | null> {
  if (!(error instanceof FunctionsHttpError) || !error.context) {
    return null
  }

  try {
    const body = (await error.context.clone().json()) as {
      error?: string
      detail?: string
    }
    const message = body.detail ?? body.error
    if (!message) return null
    return toUserFacingError(message)
  } catch {
    try {
      const text = await error.context.clone().text()
      if (text.trim()) return toUserFacingError(text)
    } catch {
      // ignore parse failures
    }
  }

  return null
}

function toUserFacingError(message: string): string {
  if (
    message.includes('Missing QUERY_REQUEST_NOTIFY_EMAIL') ||
    message.includes('Missing ZEPTO_API_KEY') ||
    message.includes('Missing ZOHO_SMTP_PASSWORD') ||
    message.includes('Missing ZEPTOMAIL_SEND_MAIL_TOKEN') ||
    message.includes('ZeptoMail API error')
  ) {
    return 'We could not send your request online right now. Please call customer care and we will help you immediately.'
  }

  return message
}

export async function submitLeadRequest(payload: LeadRequestPayload): Promise<unknown> {
  if (!isSupabaseConfigured()) {
    throw new Error('Online booking is temporarily unavailable. Please call customer care.')
  }

  const { data, error } = await supabase.functions.invoke(EDGE_FUNCTION, {
    body: payload,
  })

  if (error) {
    const detail = await getEdgeFunctionErrorMessage(error)
    if (detail) {
      throw new Error(detail)
    }
    throw error
  }

  return data
}
