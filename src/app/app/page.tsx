import { redirect } from 'next/navigation'
import { isLoginAndBookingDisabled } from '@/lib/featureFlags'

export default function AppIndexPage() {
  redirect(isLoginAndBookingDisabled() ? '/' : '/app/booking')
}
