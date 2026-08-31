import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { PAGE_SEO } from "@/lib/seo/siteConfig";

// B3/B4 — this page's own title, description and self-referencing canonical.
// Before this, all six pages inherited one title/description from the layout.
export const metadata: Metadata = pageMetadata("returnRefundPolicy");

export default function ReturnRefundPolicyPage() {
  const documentText = `RETURN & REFUND POLICY
Version: May 2026

Evervale
ELEVAN plus s.r.o.
Na Čečeličce 425/4, 150 00 Praha, Czechia
Company ID: 02928205 | VAT ID: CZ02928205
Contact: privacy@evervale.org

EU Consumer Rights — Right of Withdrawal: Under EU Directive 2011/83/EU on Consumer Rights, you generally have the right to withdraw from a distance contract within 14 days of receiving your order, without giving any reason.

However, cannabis seeds are perishable goods subject to rapid deterioration in quality. Additionally, sealed items that are not suitable for return for health or hygiene reasons once the protective seal has been broken are exempt from the right of withdrawal under Article 16(d) and 16(e) of the Directive.

For unopened, sealed orders, you may request a return within 14 days of delivery. Once the original packaging is opened or the seal broken, the right of withdrawal no longer applies.

1. General Return Policy
Due to the nature of our products (perishable collectible seeds), returns and refunds are generally not permitted. Limited return options are available under the strict conditions set out in this Policy.

Products are sold "as-is" with no warranty of outcomes, including germination, viability, or genetic characteristics. Please refer to the Germination Guarantee page for viability claims in eligible jurisdictions.

2. Return Eligibility Requirements
A return may only be considered if all of the following conditions are met:
• Return request submitted within 14 days of confirmed delivery
• Original packaging is unopened and the seal is intact
• No signs of use, damage, or tampering
• Valid order confirmation or proof of purchase provided

Note: Opening the product packaging automatically disqualifies the item from return eligibility.

3. Germination Guarantee vs. Return Policy
If you have a quality concern about seed viability, you may be eligible to submit a claim under the Germination Guarantee instead of a return. The Germination Guarantee applies exclusively in jurisdictions where cannabis germination is legal and is subject to its own separate terms and documentation requirements.

An active Germination Guarantee claim and a return request cannot be submitted for the same order simultaneously. If you have opened your seeds to test viability, the standard return route is no longer available — the Germination Guarantee route applies instead (subject to eligibility).

4. Return Process
1. Email privacy@evervale.org with your order number and reason for return
2. Attach photos of the unopened product if requested
3. Await approval — we aim to respond within 5 business days
4. If approved, follow the return shipping instructions we provide

5. Return Shipping Costs
Return shipping costs are the responsibility of the customer. We recommend using a tracked service, as Evervale cannot be held responsible for returned parcels lost in transit.

6. Refund Options
If a return is approved, Evervale may provide one of the following at its sole discretion:
• Replacement product
• Store credit for a future order
• Refund to original payment method — in exceptional circumstances only

7. Non-Returnable Items
The following items are not eligible for return under any circumstances:
• Opened, unsealed, or used products
• Products with signs of tampering or damage caused by the customer
• Requests submitted after 14 days of delivery
• Promotional, free, or gift seeds
• Products improperly stored by the customer (not in cool, dry conditions)

8. Damaged Products on Arrival
If your order arrives visibly damaged, please report this within 7 days of delivery by emailing privacy@evervale.org with clear photos of the damaged packaging and contents. We will assess the claim and arrange a replacement or resolution at our discretion.

9. Lost or Missing Orders
If your order has not arrived within the expected timeframe, contact us at privacy@evervale.org. We will initiate a carrier trace and work toward a resolution.

10. Online Dispute Resolution (EU)
EU consumers who are unable to resolve a dispute directly with Evervale may use the European Commission's Online Dispute Resolution platform: https://consumer-redress.ec.europa.eu/index_en

Our contact for ODR purposes: privacy@evervale.org

11. Exceptions and Discretionary Resolutions
Evervale may, at its sole discretion, provide resolutions in exceptional cases not covered by this Policy. Such resolutions do not create a precedent or obligation to provide the same resolution in future cases.

12. Policy Changes
We may update this Policy from time to time. Changes are effective upon posting to the Website.

13. Contact
Returns & Refunds: privacy@evervale.org
General: info@evervale.org
Phone: +357 978 162 42
ODR Platform: consumer-redress.ec.europa.eu`;

  return (
    <div className=" text-pr_w">
      {/* A4 — Home &gt; Return &amp; Refund Policy trail; the site is only two levels deep. */}
      <JsonLd schema={breadcrumbSchema("returnRefundPolicy")} />
      <section className="w-full px-4 pt-[120px] pb-24 sm:px-6 md:px-8 lg:px-12 xl:px-[130px]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {PAGE_SEO.returnRefundPolicy.heading}
          </h1>
          <p className="mt-3 text-sm text-pr_w/70">Last updated: May 2026</p>
          <article className="mt-8 whitespace-pre-line rounded-3xl border border-pr_w/20 bg-pr_w/5 px-6 py-8 text-left text-sm leading-7 text-pr_w/85 shadow-xl backdrop-blur-sm sm:px-8 sm:py-10">
            {documentText}
          </article>
        </div>
      </section>
    </div>
  );
}
