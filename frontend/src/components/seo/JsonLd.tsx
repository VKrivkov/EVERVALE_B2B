import { JsonLdNode } from "@/lib/seo/schema";

/**
 * A4 — renders one or more schema.org nodes as <script type="application/ld+json">.
 *
 * The "<" escape matters: a JSON string containing "</script>" would otherwise
 * close the tag early and inject the rest as markup. Next does not escape the
 * contents of dangerouslySetInnerHTML, so we do it here.
 */
export default function JsonLd({ schema }: { schema: JsonLdNode | JsonLdNode[] }) {
  const nodes = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {nodes.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(node).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
