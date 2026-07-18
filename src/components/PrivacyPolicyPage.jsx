import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { config } from '@/data/config'
import './Header.css'
import './Footer.css'
import './LegalPage.css'

const LAST_UPDATED = '18 March 2026'

export function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <article className="legal-page container">
        <p className="legal-back">
          <Link href="/">← Back to home</Link>
        </p>
        <p className="section-subtitle legal-eyebrow">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-meta">Last updated: {LAST_UPDATED}</p>
        <p className="legal-lead">
          Ambimed Healthcare Private Limited (&quot;Ambimed&quot;, &quot;we&quot;, &quot;us&quot;) respects your privacy.
          This policy explains how we collect, use, store, and protect personal data when you use our website, mobile
          apps, and home healthcare services in India.
        </p>

        <section className="legal-section">
          <h2>1. Who this policy applies to</h2>
          <p>
            This policy applies to visitors to ambimed.in, users of the Ambimed client and caregiver mobile
            applications, families booking care, caregivers on our platform, and anyone who contacts us by phone,
            email, or WhatsApp.
          </p>
        </section>

        <section className="legal-section">
          <h2>2. Information we collect</h2>
          <ul>
            <li>
              <strong>Identity &amp; contact:</strong> name, phone number, email address, home address, city, and
              emergency contact details.
            </li>
            <li>
              <strong>Booking &amp; care information:</strong> service type, visit dates, care instructions, and
              notes you provide about the patient&apos;s needs (which may include health-related information).
            </li>
            <li>
              <strong>Account &amp; authentication:</strong> mobile number and OTP verification records for secure
              sign-in.
            </li>
            <li>
              <strong>Payment &amp; billing:</strong> invoice details, transaction references, and billing history
              (payment card data is processed by third-party payment providers where applicable — we do not store
              full card numbers on our servers).
            </li>
            <li>
              <strong>Technical data:</strong> device type, browser, IP address, app version, and usage logs for
              security and service improvement.
            </li>
            <li>
              <strong>Caregiver workforce data:</strong> for assigned professionals — identity documents,
              background-verification status, training records, and visit logs.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>3. How we use your information</h2>
          <p>We use personal data to:</p>
          <ul>
            <li>Provide, schedule, and manage home healthcare services you request</li>
            <li>Verify your identity and secure your account (OTP login)</li>
            <li>Communicate about bookings, caregiver assignments, visit updates, and support</li>
            <li>Process billing, invoices, and payment reconciliation</li>
            <li>Conduct background checks and compliance processes for caregivers</li>
            <li>Improve our website, apps, and service quality</li>
            <li>Comply with applicable laws, respond to lawful requests, and protect against fraud</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>4. Legal basis (India — DPDP Act, 2023)</h2>
          <p>
            We process personal data based on your consent (e.g. when you book care or create an account), performance
            of a contract (delivering services you requested), and legitimate uses permitted under the Digital Personal
            Data Protection Act, 2023 and related rules, including compliance with law and prevention of fraud.
          </p>
        </section>

        <section className="legal-section">
          <h2>5. Sharing with third parties</h2>
          <p>We may share data with:</p>
          <ul>
            <li>
              <strong>Assigned caregivers and nurses</strong> — only information needed to deliver your care safely
            </li>
            <li>
              <strong>Technology providers</strong> — cloud hosting, authentication (e.g. Supabase), analytics, and
              messaging infrastructure under contractual confidentiality obligations
            </li>
            <li>
              <strong>Payment processors</strong> — to complete transactions you authorise
            </li>
            <li>
              <strong>Verification partners</strong> — for background and identity checks of care professionals
            </li>
            <li>
              <strong>Regulators or authorities</strong> — when required by applicable law
            </li>
          </ul>
          <p>We do not sell your personal data to third parties for marketing purposes.</p>
        </section>

        <section className="legal-section">
          <h2>6. Data retention</h2>
          <p>
            We retain personal data for as long as needed to provide services, meet legal and accounting obligations,
            resolve disputes, and enforce agreements. Booking and billing records are typically retained for the period
            required under Indian law. You may request deletion subject to exceptions where retention is legally
            required.
          </p>
        </section>

        <section className="legal-section">
          <h2>7. Security</h2>
          <p>
            We implement reasonable technical and organisational measures — including access controls, encrypted
            connections (HTTPS), and staff training — to protect personal data. No method of transmission over the
            internet is 100% secure; we encourage you to use strong device security and not share OTP codes.
          </p>
        </section>

        <section className="legal-section">
          <h2>8. Your rights</h2>
          <p>Under applicable Indian law, including the DPDP Act, you may have the right to:</p>
          <ul>
            <li>Access personal data we hold about you</li>
            <li>Correct inaccurate or incomplete data</li>
            <li>Withdraw consent where processing is consent-based</li>
            <li>Request erasure, subject to legal retention requirements</li>
            <li>Nominate another person to exercise rights on your behalf in certain circumstances</li>
            <li>Grieve to us and, where applicable, to the Data Protection Board of India</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>9. Children&apos;s data</h2>
          <p>
            Our services may involve care for minors as patients under a parent or guardian&apos;s booking. We do not
            knowingly collect data directly from children without parental or guardian involvement. Contact us if you
            believe we have collected a child&apos;s data in error.
          </p>
        </section>

        <section className="legal-section">
          <h2>10. Changes to this policy</h2>
          <p>
            We may update this policy from time to time. The &quot;Last updated&quot; date at the top will change, and
            material changes may be communicated via the website or app where appropriate.
          </p>
        </section>

        <section className="legal-section">
          <h2>11. Contact &amp; data requests</h2>
          <p>
            For privacy questions, access requests, corrections, or complaints, contact:
          </p>
          <p>
            <strong>Ambimed Healthcare Private Limited</strong>
            <br />
            Email:{' '}
            <a href={`mailto:${config.contact.email}?subject=Privacy%20Policy%20Request`}>{config.contact.email}</a>
            <br />
            Phone: <a href={`tel:${config.contact.phone.replace(/\s/g, '')}`}>{config.contact.phone}</a>
          </p>
        </section>

        <p className="legal-back">
          <Link href="/terms">Terms &amp; conditions</Link>
          {' · '}
          <Link href="/">Home</Link>
        </p>
      </article>
      <Footer />
    </>
  )
}
