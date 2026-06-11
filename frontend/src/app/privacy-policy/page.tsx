export default function PrivacyPolicyPage() {
  const documentText = `PRIVACY POLICY
Version: May 2026

Evervale
ELEVAN plus s.r.o.
Na Čečeličce 425/4, 150 00 Praha, Czechia
Company ID: 02928205 | VAT ID: CZ02928205
Privacy Contact: privacy@evervale.org

1. Introduction
This Privacy Policy ("Policy") describes how Evervale (operated by ELEVAN plus s.r.o.) collects, uses, protects, and processes your personal data when you visit our website at https://evervale.org, place an order, or interact with our blog and other content. This Policy is issued in compliance with the EU General Data Protection Regulation (GDPR) (Regulation (EU) 2016/679) and applicable Czech law.

2. Data Controller
The data controller responsible for processing your personal data is:

Company: ELEVAN plus s.r.o.
Registered address: Na Čečeličce 425/4, 150 00 Praha, Czechia
Company ID: 02928205
Privacy contact: privacy@evervale.org

3. Personal Data We Collect
We collect only personal data that you voluntarily provide when placing an order, creating an account, or contacting us:
• Full name
• Email address
• Phone number
• Delivery address (country, city, postal code, street)
• Payment information (processed by Stripe; we do not store card details)

We do not collect sensitive personal data such as health information or other special categories of data under Article 9 GDPR.

Blog and website usage: When you visit our website and blog, anonymised analytical data (page views, session duration, traffic sources) may be collected automatically via Google Analytics. This data is not linked to your identity and is used solely for website performance analysis.

4. Purpose and Legal Basis for Processing
We process your personal data for the following purposes and on the following legal bases (GDPR Article 6):

• Order fulfilment — Performance of a contract (Art. 6(1)(b))
• Delivery of products — Performance of a contract (Art. 6(1)(b))
• Order communication — Performance of a contract (Art. 6(1)(b))
• Customer support — Legitimate interests (Art. 6(1)(f))
• Legal & accounting records — Legal obligation (Art. 6(1)(c))
• Website analytics (anonymised) — Legitimate interests (Art. 6(1)(f)) / Consent via cookie banner

We do not use your personal data for marketing and do not send unsolicited newsletters.

5. Data Sharing and Third Parties
We do not sell or rent your personal data. We share data only with service providers strictly necessary to operate the Website and fulfil orders:

• Stripe — Payment processing (PCI-DSS compliant)
• Google Analytics — Anonymised traffic and performance analytics
• CookieYes — Cookie consent management platform
• Postal / courier services — Delivery of orders (name and address shared as required)
• Internal CRM — Order management and customer support records

All third-party service providers are bound by data processing agreements and/or their own GDPR-compliant privacy policies.

6. Data Storage and Retention
Your personal data is stored securely in our internal systems. We retain data only as long as necessary:

• Order and customer data: 3 years from the date of last order or last account activity
• Accounting and invoicing records: 10 years as required by Czech accounting law (Act No. 563/1991 Coll.)
• Customer support correspondence: 2 years from resolution of the query
• Anonymised analytics data: As per Google Analytics retention settings (default: 26 months)

Upon expiry of the applicable retention period, personal data is securely deleted or anonymised.

7. Cookies and Consent Management
We use cookies and similar tracking technologies on the Website. Cookies are managed through CookieYes, our cookie consent management platform. When you first visit the Website, a cookie banner is displayed allowing you to accept, reject, or customise your cookie preferences.

Categories of cookies:
• Strictly necessary — Required for basic website function (login, cart, security). Cannot be disabled.
• Analytics — Google Analytics anonymised traffic and performance data. Requires consent.

You can change or withdraw your cookie consent at any time by clicking the cookie settings link in the website footer, or by adjusting your browser settings.

8. Your Data Rights (GDPR)
Under the GDPR, you have the following rights regarding your personal data:
• Access — request a copy of the personal data we hold about you
• Rectification — request correction of inaccurate or incomplete data
• Erasure ("right to be forgotten") — request deletion of your data where it is no longer necessary
• Portability — receive your data in a structured, machine-readable format
• Restriction — request that we restrict processing of your data in certain circumstances
• Objection — object to processing based on legitimate interests
• Withdrawal of consent — where processing is based on consent, you may withdraw it at any time

To exercise any of these rights, contact us at: privacy@evervale.org. We will respond within 30 days as required by the GDPR.

9. Right to Lodge a Complaint with a Supervisory Authority
You have the right to lodge a complaint with a data protection supervisory authority if you believe your personal data has been processed in violation of the GDPR. As ELEVAN plus s.r.o. is registered in the Czech Republic, the competent supervisory authority is:

Úřad pro ochranu osobních údajů (ÚOOÚ)
Pplk. Sochora 27, 170 00 Praha 7, Czech Republic
Website: www.uoou.cz
Email: posta@uoou.cz

You also have the right to lodge a complaint with the supervisory authority in your country of residence within the EU.

10. International Data Transfers
Your personal data is primarily stored and processed within the European Economic Area (EEA). Where data is transferred outside the EEA (for example, via Google Analytics servers), such transfers are carried out in compliance with the GDPR, including through Standard Contractual Clauses (SCCs) or equivalent safeguards.

11. Children's Privacy
This Website is intended exclusively for individuals aged 21 and over. We do not knowingly collect personal data from anyone under the age of 21. If we become aware that personal data has been collected from someone under 21, we will delete it promptly. If you believe we have inadvertently collected such data, please contact us at privacy@evervale.org.

12. Changes to This Policy
We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or Website functionality. Updates are effective upon posting to the Website. We recommend reviewing this Policy periodically.

13. Contact Us
Privacy: privacy@evervale.org
General: info@evervale.org
Phone: +357 978 162 42
Supervisory authority: www.uoou.cz`;

  return (
    <div className=" text-pr_w">
      <section className="w-full px-4 pt-[120px] pb-24 sm:px-6 md:px-8 lg:px-12 xl:px-[130px]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-pr_w/70">Last updated: May 2026</p>
          <article className="mt-8 whitespace-pre-line rounded-3xl border border-pr_w/20 bg-pr_w/5 px-6 py-8 text-left text-sm leading-7 text-pr_w/85 shadow-xl backdrop-blur-sm sm:px-8 sm:py-10">
            {documentText}
          </article>
        </div>
      </section>
    </div>
  );
}
