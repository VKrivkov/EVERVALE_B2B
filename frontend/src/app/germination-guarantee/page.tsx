export default function GerminationGuaranteePage() {
  const documentText = `GERMINATION GUARANTEE
Version: May 2026

Evervale
ELEVAN plus s.r.o.
Na Cecelice 425/4, 150 00 Praha, Czechia
Contact: support@evervale.org

IMPORTANT NOTICE: Evervale sells cannabis seeds exclusively as collectible souvenirs for genetic preservation purposes. Our seeds are not intended for cultivation. Germination and cultivation of cannabis seeds is illegal in many countries.

By placing an order on our website, the buyer confirms that they are familiar with the laws of their country and bear full personal responsibility for any actions taken with the purchased seeds.

This Germination Guarantee applies exclusively to buyers located in jurisdictions where germination and cultivation of cannabis is legal.

1. Our Germination Guarantee
Evervale guarantees the viability of every seed shipped to our customers. Each seed batch undergoes quality control before dispatch. We stand behind our genetics — and this guarantee is our commitment, not just a promise.

We guarantee a 90% germination rate under the conditions described below. If documented results show that more than 10% of seeds in your order have failed to germinate, we will replace them free of charge.

2. What the Guarantee Covers
• All seeds purchased on evervale.org
• Claims submitted within 90 days of receiving your order
• Germination attempted using the paper towel method only (described in Section 3)
• Photo documentation with a visible timestamp (date on phone screen or paper beside the seeds)
• Buyer is located in a jurisdiction where cannabis germination is legal

3. Paper Towel Method (Required for Guarantee)
Only this method is accepted for guarantee claims:

1. Place seeds between two sheets of damp paper towel
2. Set on a plate or in a food container in a dark, warm location (21–26°C)
3. Maintain consistent moisture for 5–7 days
4. Photograph each stage with a visible date

Note: Seeds germinated in soil, hydroponics, peat pellets, or by any other method are not covered by this guarantee.

4. How to Submit a Claim
1. Email support@evervale.org with subject: Germination Guarantee — [order number]
2. Attach: photos of each stage with date, order number, quantity and name of ungerminated seeds
3. We will review your claim within 5 business days
4. If approved, a free replacement will be dispatched to your address

5. Terms and Limitations
• Claim period: 90 days from receipt of order
• Claims per order: One claim per order
• Germination method: Paper towel method only
• Documentation: Timestamped photos required
• Compensation: Seed replacement or store credit — no cash refunds
• Promotional seeds: Free and gift seeds are not covered
• Storage: Seeds must have been stored in a cool, dry place
• Jurisdiction: Countries where cannabis germination is legal only

6. Why We Are Confident in Our Genetics
Evervale works with an exclusive dedicated supplier — Green Future, a professional cannabis seed producer based in Thailand with its own breeding and selection program. Green Future operates as our primary and preferred genetics partner, providing us with direct access to tested, stable varieties before each shipment.

Every batch undergoes internal germination testing prior to dispatch. Batches falling below a 90% germination rate are not released for sale. This controlled supply chain is the foundation of our guarantee — and what allows us to back it with a real commitment rather than a marketing claim.

7. Frequently Asked Questions

Q: Can I receive a cash refund instead of a replacement?
A: No. Compensation is issued exclusively as a seed replacement or store credit toward a future order.

Q: What if I cannot photograph the process?
A: Unfortunately, claims cannot be processed without photo documentation. This is a standard requirement to protect both parties.

Q: What if germination is illegal in my country?
A: The Germination Guarantee does not apply. Please note that Evervale seeds are sold exclusively as collectible souvenirs.

Q: I ordered 10 seeds and 2 did not germinate. Does this qualify?
A: Yes. 2 out of 10 represents a 20% loss, exceeding the 10% threshold. Your claim will be reviewed.

Q: How long will a replacement take to arrive?
A: Once approved, replacements are dispatched within 3–5 business days using our standard discreet packaging.

Evervale reserves the right to update this policy at any time. The version in effect at the time of purchase applies to your order.`;

  return (
    <div className=" text-pr_w">
      <section className="w-full px-4 pt-[120px] pb-24 sm:px-6 md:px-8 lg:px-12 xl:px-[130px]">
        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl">Germination Guarantee</h1>
          <p className="mt-3 text-sm text-pr_w/70">Last updated: May 2026</p>
          <article className="mt-8 whitespace-pre-line rounded-3xl border border-pr_w/20 bg-pr_w/5 px-6 py-8 text-left text-sm leading-7 text-pr_w/85 shadow-xl backdrop-blur-sm sm:px-8 sm:py-10">
            {documentText}
          </article>
        </div>
      </section>
    </div>
  );
}
