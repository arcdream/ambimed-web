'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Copy, MessageCircle, Phone, X } from 'lucide-react'
import QRCode from 'react-qr-code'
import {
  getDisplayPhone,
  getPhoneDigits,
  getTelHref,
  getTelQrValue,
  getWhatsAppHref,
} from '@/lib/contactLinks'
import { shouldUsePhoneDialer } from '@/lib/isMobileCallDevice'
import './CallContactModal.css'

const WHATSAPP_MESSAGE = 'Hi Ambimed, I would like to enquire about home healthcare services.'

const CallContactContext = createContext(null)

export function useCallContact() {
  const ctx = useContext(CallContactContext)
  if (!ctx) {
    throw new Error('useCallContact must be used within CallContactProvider')
  }
  return ctx
}

function CallContactModal({ open, onClose }) {
  const [copied, setCopied] = useState(false)
  const phone = getDisplayPhone()
  const telHref = getTelHref()
  const telQrValue = getTelQrValue()
  const waHref = getWhatsAppHref(WHATSAPP_MESSAGE)

  useEffect(() => {
    if (!open) {
      setCopied(false)
      return
    }
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const copyNumber = async () => {
    const text = getDisplayPhone()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* fallback for older browsers */
      const input = document.createElement('textarea')
      input.value = text
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="call-contact-modal"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="call-contact-modal__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="call-contact-title"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button type="button" className="call-contact-modal__close" onClick={onClose} aria-label="Close">
              <X strokeWidth={2.25} aria-hidden />
            </button>

            <div className="call-contact-modal__icon-wrap" aria-hidden>
              <Phone strokeWidth={2} />
            </div>

            <h2 id="call-contact-title" className="call-contact-modal__title">
              Call customer care
            </h2>

            <a href={telHref} className="call-contact-modal__phone">
              {phone}
            </a>

            <p className="call-contact-modal__qr-hint">Scan to call from your phone</p>

            <div className="call-contact-modal__qr-wrap">
              <QRCode value={telQrValue} size={168} bgColor="#ffffff" fgColor="#0f172a" level="M" />
            </div>

            <div className="call-contact-modal__actions">
              <button type="button" className="call-contact-modal__btn call-contact-modal__btn--primary" onClick={copyNumber}>
                <Copy strokeWidth={2} aria-hidden />
                {copied ? 'Copied!' : 'Copy number'}
              </button>
              <a
                href={waHref}
                className="call-contact-modal__btn call-contact-modal__btn--wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle strokeWidth={2} aria-hidden />
                Open WhatsApp
              </a>
            </div>

            <p className="call-contact-modal__availability">
              <Clock strokeWidth={2} aria-hidden />
              Available 24×7
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export function CallContactProvider({ children }) {
  const [open, setOpen] = useState(false)

  const openCallContact = useCallback(() => {
    if (shouldUsePhoneDialer()) {
      window.location.href = getTelHref()
      return
    }
    setOpen(true)
  }, [])

  const closeCallContact = useCallback(() => setOpen(false), [])

  const value = useMemo(
    () => ({ openCallContact, closeCallContact }),
    [openCallContact, closeCallContact],
  )

  return (
    <CallContactContext.Provider value={value}>
      {children}
      <CallContactModal open={open} onClose={closeCallContact} />
    </CallContactContext.Provider>
  )
}
