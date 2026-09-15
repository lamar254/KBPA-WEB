import { NextRequest, NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

// Temporary, one-time-use endpoint to seed the Privacy/Terms/Cookies
// pages through the already-deployed app (which has working DB
// connectivity, unlike the environment this was authored from).
// Protected by PAYLOAD_SECRET as a query param. Remove after use.

const paragraph = (text: string) => ({
  type: "paragraph",
  direction: null,
  format: "",
  indent: 0,
  version: 1,
  children: [{ type: "text", text, version: 1 }],
});

const heading = (text: string, tag = "h2") => ({
  type: "heading",
  tag,
  direction: null,
  format: "",
  indent: 0,
  version: 1,
  children: [{ type: "text", text, version: 1 }],
});

const listItem = (text: string) => ({
  type: "listitem",
  direction: null,
  format: "",
  indent: 0,
  version: 1,
  value: 1,
  children: [{ type: "text", text, version: 1 }],
});

const list = (items: string[]) => ({
  type: "list",
  tag: "ul",
  listType: "bullet",
  direction: null,
  format: "",
  indent: 0,
  version: 1,
  start: 1,
  children: items.map(listItem),
});

const rich = (children: unknown[]) =>
  ({
    root: {
      type: "root",
      direction: null,
      format: "",
      indent: 0,
      version: 1,
      children,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;

const EFFECTIVE_DATE = "15 September 2026";

const privacyBody = rich([
  paragraph(`Effective date: ${EFFECTIVE_DATE}`),
  paragraph(
    "The Kenya Basketball Players Association (KBPA) is committed to protecting the privacy of players, members, and visitors to this website, in line with Kenya's Data Protection Act, 2019.",
  ),
  heading("Information We Collect"),
  paragraph("We collect information you provide directly to us, including:"),
  list([
    "Membership applications: full name, email, phone number, date of birth, player category, club, and supporting documents.",
    "Support enquiries: your name, email, phone number, and the details of your enquiry, including any attachments.",
    "Contact and general enquiry forms: your name, email, and message.",
  ]),
  heading("How We Use Your Information"),
  paragraph("We use the information we collect to:"),
  list([
    "Review and process membership applications.",
    "Respond to support enquiries and provide the assistance requested.",
    "Communicate with you about KBPA programmes, news, and events.",
    "Maintain accurate records of our membership and case history.",
  ]),
  heading("Confidentiality of Support Enquiries"),
  paragraph(
    "Enquiries submitted through our confidential support channel are only accessible to authorised KBPA support staff and administrators. This information is not shared publicly and is not used for any purpose beyond addressing your enquiry, unless required by law.",
  ),
  heading("Data Storage and Security"),
  paragraph(
    "Your information is stored on secure, access-controlled systems. We take reasonable technical and organisational measures to protect your personal data against unauthorised access, loss, or misuse.",
  ),
  heading("Your Rights"),
  paragraph("Under the Data Protection Act, 2019, you have the right to:"),
  list([
    "Access the personal data we hold about you.",
    "Request correction of inaccurate or incomplete data.",
    "Request deletion of your data, subject to our legal and operational requirements.",
    "Object to certain uses of your data.",
    "Withdraw consent at any time, where processing is based on consent.",
  ]),
  heading("Contact Us"),
  paragraph(
    "If you have questions about this Privacy Policy or how your data is handled, please contact us through our Contact page.",
  ),
  paragraph(
    "This policy may be updated from time to time. Significant changes will be reflected on this page.",
  ),
]);

const termsBody = rich([
  paragraph(`Effective date: ${EFFECTIVE_DATE}`),
  paragraph(
    "These Terms of Use govern your access to and use of the Kenya Basketball Players Association (KBPA) website. By using this site, you agree to these terms.",
  ),
  heading("Use of This Site"),
  paragraph(
    "This website is provided to inform the public about KBPA's work, and to allow players to apply for membership and request support. You agree to use this site only for lawful purposes and in a manner that does not infringe the rights of, or restrict or inhibit the use of, this site by any third party.",
  ),
  heading("Membership Applications"),
  paragraph(
    "Submitting a membership application does not guarantee membership. Applications are reviewed by KBPA staff, and applicants will be notified of the outcome.",
  ),
  heading("Accuracy of Information"),
  paragraph(
    "While we make every effort to keep the content on this site accurate and up to date, KBPA makes no warranties about the completeness or accuracy of the information published here.",
  ),
  heading("Intellectual Property"),
  paragraph(
    "All content on this site, including text, graphics, logos, and images, is the property of KBPA or its licensors, unless otherwise stated, and may not be reproduced without permission.",
  ),
  heading("Limitation of Liability"),
  paragraph(
    "KBPA is not liable for any loss or damage arising from your use of this website, to the fullest extent permitted by law.",
  ),
  heading("Changes to These Terms"),
  paragraph(
    "We may update these Terms of Use from time to time. Continued use of the site after changes are posted constitutes acceptance of the updated terms.",
  ),
  heading("Governing Law"),
  paragraph("These terms are governed by the laws of Kenya."),
  heading("Contact Us"),
  paragraph(
    "Questions about these Terms of Use can be directed to us through our Contact page.",
  ),
]);

const cookiesBody = rich([
  paragraph(`Effective date: ${EFFECTIVE_DATE}`),
  paragraph(
    "This Cookie Policy explains how the Kenya Basketball Players Association (KBPA) website uses cookies and similar technologies.",
  ),
  heading("What Are Cookies"),
  paragraph(
    "Cookies are small text files stored on your device when you visit a website. They help websites function properly and can be used to remember your preferences.",
  ),
  heading("How We Use Cookies"),
  paragraph("This site currently uses cookies for:"),
  list([
    "Essential functionality, such as keeping you logged in to the admin panel if you are KBPA staff.",
    "Basic, privacy-respecting analytics to help us understand how the site is used, where enabled.",
  ]),
  paragraph(
    "We do not use cookies for third-party advertising or to sell your data.",
  ),
  heading("Managing Cookies"),
  paragraph(
    'Most web browsers allow you to control cookies through their settings. You can usually find these settings in the "Options" or "Preferences" menu of your browser. Please note that disabling essential cookies may affect the functionality of parts of this site, such as the admin panel.',
  ),
  heading("Changes to This Policy"),
  paragraph(
    "We may update this Cookie Policy as our use of cookies changes. Any updates will be posted on this page.",
  ),
  heading("Contact Us"),
  paragraph(
    "If you have questions about this Cookie Policy, please contact us through our Contact page.",
  ),
]);

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await getPayloadClient();
  const pages = [
    { slug: "privacy", title: "Privacy Policy", body: privacyBody },
    { slug: "terms", title: "Terms of Use", body: termsBody },
    { slug: "cookies", title: "Cookie Policy", body: cookiesBody },
  ];

  const results = [];
  for (const page of pages) {
    const { docs } = await payload.find({
      collection: "pages",
      where: { slug: { equals: page.slug } },
      overrideAccess: true,
    });
    if (docs.length === 0) {
      await payload.create({
        collection: "pages",
        data: { ...page, status: "published" },
        overrideAccess: true,
      });
      results.push({ slug: page.slug, action: "created" });
    } else {
      await payload.update({
        collection: "pages",
        id: docs[0].id,
        data: { body: page.body },
        overrideAccess: true,
      });
      results.push({ slug: page.slug, action: "updated", id: docs[0].id });
    }
  }

  return NextResponse.json({ results });
}
