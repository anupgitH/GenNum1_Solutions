import { useState } from "react";
import { ArrowRight, CheckCircle, LoaderCircle } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const response = await fetch("/api/v1/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || `Request failed (${response.status})`);
      }

      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setError(
        "We couldn't submit your enquiry. Please check that the backend is running and try again."
      );
      console.error("Contact form submission failed:", err);
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-intro">
        <p className="eyebrow">LET'S WORK TOGETHER</p>
        <h2>Have a project in mind?</h2>
        <p>
          Tell us what you need. Submit your enquiry and our team can follow up
          with you.
        </p>

        <div className="contact-detail">
          <span>Email</span>
          <a href="mailto:anup0kumar1singh@gmail.com">
            anup0kumar1singh@gmail.com
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Full name *
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              maxLength={100}
              autoComplete="name"
              required
            />
          </label>

          <label>
            Email address *
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              maxLength={254}
              autoComplete="email"
              required
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              maxLength={20}
              autoComplete="tel"
            />
          </label>

          <label>
            Service required *
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Select a service</option>
              <option value="AI Integration & Automation">
                AI Integration & Automation
              </option>
              <option value="Custom Software Development">
                Custom Software Development
              </option>
              <option value="Website & Full-Stack Development">
                Website & Full-Stack Development
              </option>
              <option value="API Development & Integration">
                API Development & Integration
              </option>
              <option value="Cybersecurity & Application Security">
                Cybersecurity & Application Security
              </option>
              <option value="Software Testing & Bug Fixing">
                Software Testing & Bug Fixing
              </option>
              <option value="Other">Other</option>
            </select>
          </label>
        </div>

        <label>
          Project details *
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your project, requirements, and goals..."
            rows={5}
            maxLength={5000}
            required
          />
        </label>

        {status === "success" && (
          <p className="form-success" role="status">
            <CheckCircle size={19} />
            Your enquiry was submitted successfully!
          </p>
        )}

        {status === "error" && (
          <p className="form-error" role="alert">{error}</p>
        )}

        <button
          className="button primary submit-button"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <LoaderCircle size={17} /> Submitting...
            </>
          ) : (
            <>
              Submit Enquiry <ArrowRight size={17} />
            </>
          )}
        </button>

        <p className="form-note">* Required fields</p>
      </form>
    </section>
  );
}
