"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import instagram from "../../../public/icons/instagram-logo.svg";
import linkedin from "../../../public/icons/linkedin-logo.svg";
import InfoContainer from "../common/InfoContainer";
import Card from "../common/Card";
import Button from "../ui/Button";
import { cn } from "../../lib/utils";
import { trackContactFormSubmit } from "../../lib/analytics";

const API_URL = "https://backend.evervale.org/forms/contact-us";

interface ContactSectionProps {
  className?: string;
  sectionId?: string;
}

type ContactFormData = {
  name: string;
  companyName: string;
  companyEmail: string;
  message: string;
  website: string; // honeypot
};

type FormErrors = Partial<Record<keyof ContactFormData, string>> & {
  general?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ContactSection: React.FC<ContactSectionProps> = ({
  className,
  sectionId,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    companyName: "",
    companyEmail: "",
    message: "",
    website: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formStartedAt, setFormStartedAt] = useState("");

  useEffect(() => {
    setFormStartedAt(new Date().toISOString());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      general: "",
    }));

    if (successMessage) setSuccessMessage("");
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    const name = formData.name.trim();
    const companyName = formData.companyName.trim();
    const companyEmail = formData.companyEmail.trim();
    const message = formData.message.trim();

    if (!name) {
      nextErrors.name = "Full name is required.";
    } else if (name.length > 100) {
      nextErrors.name = "Full name must be at most 100 characters.";
    }

    if (!companyName) {
      nextErrors.companyName = "Company name is required.";
    } else if (companyName.length > 150) {
      nextErrors.companyName = "Company name must be at most 150 characters.";
    }

    if (!companyEmail) {
      nextErrors.companyEmail = "Company email is required.";
    } else if (companyEmail.length > 255) {
      nextErrors.companyEmail = "Company email must be at most 255 characters.";
    } else if (!EMAIL_REGEX.test(companyEmail)) {
      nextErrors.companyEmail = "Enter a valid email address.";
    }

    if (!message) {
      nextErrors.message = "Message is required.";
    } else if (message.length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    } else if (message.length > 3000) {
      nextErrors.message = "Message must be at most 3000 characters.";
    }

    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setSuccessMessage("");
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;
    if (!formStartedAt) return;

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        companyName: formData.companyName.trim(),
        companyEmail: formData.companyEmail.trim().toLowerCase(),
        message: formData.message.trim(),
        website: formData.website, // honeypot, should stay empty
        submittedAt: formStartedAt,
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get("content-type");
      const isJson = contentType?.includes("application/json");

      const data = isJson ? await response.json() : null;

      if (!response.ok) {
        throw new Error(data?.message || "Failed to submit the form.");
      }

      // C2 — a conversion is a message the backend accepted, so this sits
      // after the !response.ok throw above, not next to the submit handler.
      trackContactFormSubmit();

      setSuccessMessage("Your message has been sent successfully.");
      setErrors({});
      setFormData({
        name: "",
        companyName: "",
        companyEmail: "",
        message: "",
        website: "",
      });
      setFormStartedAt(new Date().toISOString());
    } catch (error) {
      setErrors({
        general:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id={sectionId} className={cn("w-full", className)}>
      <div className="flex flex-col gap-12">
        <InfoContainer
          title="Get in Touch."
          titleClassName="text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.08] font-extrabold text-pr_w"
          contentClassName="display-md_thin text-pr_w/70"
          containerGap="gap-4"
          textAlign="left"
        >
          Feel free to contact us, let us know how we can help!
        </InfoContainer>

        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,640px)] lg:items-stretch">
          <div className="flex h-full flex-col gap-8 text-pr_w">
            <div>
              <p className="text-ag-12 uppercase tracking-[0.12em] text-white/60">
                Email
              </p>
              <p className="mt-2 display-md text-pr_y">info@evervale.org</p>
            </div>

            <div>
              <p className="text-ag-12 uppercase tracking-[0.12em] text-white/60">
                Phone Number
              </p>
              <p className="mt-2 display-md text-pr_y">+35797816242</p>
            </div>

            <div>
              <p className="text-ag-12 uppercase tracking-[0.12em] text-white/60">
                Social Media
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://instagram.com/evervale_official?igsh=MXY2YjB1aHd6emJlaQ=="
                  aria-label="Instagram"
                  className="flex items-center gap-3 rounded-full border border-pr_y/40 px-6 py-3 text-pr_w transition hover:border-pr_y hover:bg-pr_y/10"
                >
                  <Image
                    src={instagram}
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    className="filter brightness-0 invert"
                  />
                  <span className="text-ag-14">Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/evervale/"
                  aria-label="LinkedIn"
                  className="flex items-center gap-3 rounded-full border border-pr_y/40 px-6 py-3 text-pr_w transition hover:border-pr_y hover:bg-pr_y/10"
                >
                  <Image
                    src={linkedin}
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    className="filter brightness-0 invert"
                  />
                  <span className="text-ag-14">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full lg:ml-auto lg:max-w-[640px] lg:h-full">
            <Card width="100%" className="h-full text-pr_dg">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex h-full min-h-[640px] flex-col gap-6"
              >
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={handleChange}
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-ag-14 font-medium text-pr_dg"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    placeholder="Michael Alfredo"
                    className="h-11 rounded-lg border border-pr_dg/40 bg-[color:var(--surface)] px-4 text-pr_dg outline-none transition focus:border-pr_dg focus:ring-2 focus:ring-pr_lg/30"
                  />
                  {errors.name && (
                    <p id="name-error" className="text-sm text-red-600">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="companyName"
                    className="text-ag-14 font-medium text-pr_dg"
                  >
                    Company Name
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    value={formData.companyName}
                    onChange={handleChange}
                    maxLength={150}
                    autoComplete="organization"
                    aria-invalid={Boolean(errors.companyName)}
                    aria-describedby={
                      errors.companyName ? "companyName-error" : undefined
                    }
                    placeholder="Example Co."
                    className="h-11 rounded-lg border border-pr_dg/40 bg-[color:var(--surface)] px-4 text-pr_dg outline-none transition focus:border-pr_dg focus:ring-2 focus:ring-pr_lg/30"
                  />
                  {errors.companyName && (
                    <p id="companyName-error" className="text-sm text-red-600">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="companyEmail"
                    className="text-ag-14 font-medium text-pr_dg"
                  >
                    Company Email
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    maxLength={255}
                    autoComplete="email"
                    inputMode="email"
                    aria-invalid={Boolean(errors.companyEmail)}
                    aria-describedby={
                      errors.companyEmail ? "companyEmail-error" : undefined
                    }
                    placeholder="you@example.com"
                    className="h-11 rounded-lg border border-pr_dg/40 bg-[color:var(--surface)] px-4 text-pr_dg outline-none transition focus:border-pr_dg focus:ring-2 focus:ring-pr_lg/30"
                  />
                  {errors.companyEmail && (
                    <p id="companyEmail-error" className="text-sm text-red-600">
                      {errors.companyEmail}
                    </p>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <label
                    htmlFor="message"
                    className="text-ag-14 font-medium text-pr_dg"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    minLength={10}
                    maxLength={3000}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    placeholder="Let us know how we can help"
                    className="h-full min-h-[160px] rounded-lg border border-pr_dg/40 bg-[color:var(--surface)] px-4 py-3 text-pr_dg outline-none transition focus:border-pr_dg focus:ring-2 focus:ring-pr_lg/30"
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-red-600">
                      {errors.message}
                    </p>
                  )}
                </div>

                {errors.general && (
                  <div
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {errors.general}
                  </div>
                )}

                {successMessage && (
                  <div
                    className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                    role="status"
                  >
                    {successMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="contact"
                  className="mt-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
