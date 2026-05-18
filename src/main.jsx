import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { CalendarClock, CheckCircle2, Droplets, Mail, Phone, Wrench } from "lucide-react";
import "../styles.css";

const servicePrices = {
  drain: { base: 145, label: "Drain cleaning" },
  leak: { base: 185, label: "Leak repair" },
  fixture: { base: 165, label: "Fixture installation" },
  heater: { base: 225, label: "Water heater service" },
  inspection: { base: 120, label: "Inspection and diagnosis" }
};

const propertyAdjustments = {
  house: 0,
  condo: 25,
  commercial: 65
};

const accessAdjustments = {
  easy: 0,
  standard: 35,
  tight: 95
};

const distanceAdjustments = {
  local: 0,
  nearby: 35,
  far: 75
};

const urgencyAdjustments = {
  standard: { fee: 0, window: "Next available" },
  "same-day": { fee: 85, window: "Same day" },
  emergency: { fee: 175, window: "Emergency dispatch" }
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const navItems = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" }
];

function App() {
  const [page, setPage] = useState("home");

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Header page={page} navigate={navigate} />
      <main className="page-shell">
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "services" && <ServicesPage navigate={navigate} />}
        {page === "about" && <AboutPage navigate={navigate} />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer />
    </>
  );
}

function Header({ page, navigate }) {
  return (
    <header className="site-header">
      <nav className="nav" aria-label="Main navigation">
        <button className="brand link-button" type="button" onClick={() => navigate("home")}>
          <span className="brand-mark">G</span>
          GoodPipe
        </button>
        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              className="nav-link-button"
              type="button"
              aria-current={page === item.id ? "page" : undefined}
              onClick={() => navigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button className="button" type="button" onClick={() => navigate("contact")}>
          Get Instant Price
        </button>
      </nav>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner">
          <p className="eyebrow">Licensed residential and commercial plumbers</p>
          <h1 id="hero-title">Plumbing help without the runaround.</h1>
          <p className="hero-copy">
            GoodPipe handles leaks, clogged drains, water heaters, fixture installs, and urgent repairs
            with clear arrival windows and upfront pricing.
          </p>
          <div className="hero-actions">
            <button className="button sun" type="button" onClick={() => navigate("contact")}>
              Price My Job
            </button>
            <button className="button secondary" type="button" onClick={() => navigate("services")}>
              View Services
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>Fast service for the calls plumbers get every day.</h2>
          <p>
            Tell us what is happening and we will send the right technician, parts, and tools instead of
            turning a simple fix into a second visit.
          </p>
        </div>
        <div className="grid-3">
          <Panel number="01" title="Leaks and pipe repairs">
            Dripping fixtures, burst pipes, shutoff valves, supply lines, and water damage prevention.
          </Panel>
          <Panel number="02" title="Drains and backups">
            Kitchen sinks, bathroom drains, laundry lines, floor drains, and main-line clogs.
          </Panel>
          <Panel number="03" title="Water heaters and fixtures">
            Repair, replacement, and installation for the equipment your home depends on daily.
          </Panel>
        </div>
      </section>

      <section className="section split">
        <div className="media-frame">
          <img
            src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1200&q=80"
            alt="A plumber repairing pipes under a sink"
          />
        </div>
        <div className="feature-copy">
          <p className="eyebrow">Built for real homes</p>
          <h2>Clean work, clear options, tested repairs.</h2>
          <p>
            Every GoodPipe visit starts with a practical diagnosis. We protect the workspace, explain the
            fix before work begins, and test water flow, pressure, and drainage before leaving.
          </p>
          <button className="button secondary" type="button" onClick={() => navigate("about")}>
            How We Work
          </button>
          <Metrics />
        </div>
      </section>

      <CallToAction
        title="Know your likely price before you book."
        body="Use the instant estimator to pick your service, urgency, property type, and access level. It gives a live range before you send the request."
        button="Open Price Form"
        onClick={() => navigate("contact")}
      />
    </>
  );
}

function ServicesPage({ navigate }) {
  const services = [
    ["Emergency leak repair", "Burst pipes, active leaks, failed shutoff valves, and urgent water control before damage spreads.", "From $185"],
    ["Drain cleaning", "Blocked sinks, tubs, toilets, laundry drains, and main lines cleared with the right cable or inspection approach.", "From $145"],
    ["Water heater service", "Troubleshooting, replacement quotes, expansion tanks, valves, and same-day swaps when equipment is available.", "From $225"],
    ["Fixture installation", "Faucets, toilets, disposals, laundry boxes, hose bibs, and practical upgrades installed and tested.", "From $165"],
    ["Inspection and diagnosis", "Pressure checks, leak tracing, camera inspections, and repair plans for recurring or unclear plumbing problems.", "From $120"]
  ];

  return (
    <>
      <PageHero
        eyebrow="GoodPipe services"
        title="Plumbing repairs and installs, handled cleanly."
        body="GoodPipe covers common residential and light commercial plumbing calls with practical pricing, careful prep, and clear next steps."
      />
      <section className="section">
        <div className="service-list">
          {services.map(([title, body, price]) => (
            <article className="service-row" key={title}>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="badge">{price}</span>
            </article>
          ))}
        </div>
      </section>
      <section className="section compact">
        <div className="section-heading">
          <h2>What to expect on every visit.</h2>
          <p>
            We keep the work visible and practical so you know what is being done, why it matters, and
            what it will cost.
          </p>
        </div>
        <div className="timeline">
          <TimelineStep number="01" title="Confirm">
            We review the issue, photos, urgency, and access details before dispatch.
          </TimelineStep>
          <TimelineStep number="02" title="Diagnose">
            The technician checks the likely cause and explains realistic repair options.
          </TimelineStep>
          <TimelineStep number="03" title="Repair">
            Approved work is completed with floor protection and careful cleanup.
          </TimelineStep>
          <TimelineStep number="04" title="Test">
            We test flow, pressure, drainage, and shutoffs before closing the job.
          </TimelineStep>
        </div>
      </section>
      <CallToAction
        title="Want a price range now?"
        body="The GoodPipe estimator adjusts in real time based on service type, urgency, property, and access."
        button="Use Estimator"
        onClick={() => navigate("contact")}
      />
    </>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <PageHero
        eyebrow="About GoodPipe"
        title="A plumbing company built around trust and tidy work."
        body="GoodPipe was shaped for homeowners and property managers who want plain answers, careful repairs, and fewer surprises."
      />
      <section className="section split">
        <div className="feature-copy">
          <p className="eyebrow">Our standard</p>
          <h2>Prepared technicians, practical recommendations.</h2>
          <p>
            We do not turn every visit into a full replacement pitch. If a repair makes sense, we explain
            it. If replacement is the smarter move, we show the reason and price it clearly.
          </p>
          <div className="action-row">
            <button className="button" type="button" onClick={() => navigate("contact")}>
              Book Service
            </button>
            <button className="button secondary" type="button" onClick={() => navigate("services")}>
              See Services
            </button>
          </div>
        </div>
        <div className="media-frame">
          <img
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
            alt="A technician reviewing tools and parts in a service area"
          />
        </div>
      </section>
      <section className="section compact">
        <div className="section-heading">
          <h2>The details that make service easier.</h2>
          <p>Small habits matter when water, walls, floors, and time are involved.</p>
        </div>
        <div className="grid-3">
          <Panel number="Clean arrival" title="Floor protection">
            Technicians arrive with mats, shoe covers when needed, and cleanup supplies.
          </Panel>
          <Panel number="Clear quote" title="Approval first">
            You see the scope and expected price before repair or replacement work begins.
          </Panel>
          <Panel number="Real closeout" title="Tested before leaving">
            We verify pressure, drainage, hot water, fixture operation, and visible leaks.
          </Panel>
        </div>
      </section>
      <CallToAction
        title="Send the issue. We will price the likely path."
        body="The contact form gives you an instant planning range and helps us arrive with the right parts."
        button="Start Contact Form"
        onClick={() => navigate("contact")}
      />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact GoodPipe"
        title="Price the job before you request a plumber."
        body="Use the instant estimator for a live planning range, then send the details so GoodPipe can confirm timing and parts."
      />
      <section className="section contact-layout">
        <aside className="contact-card" aria-label="GoodPipe contact information">
          <p className="eyebrow">Service desk</p>
          <h2>Ready for urgent calls and scheduled work.</h2>
          <p className="lead">
            For active flooding or water shutoff issues, call first. For everything else, the estimator is
            the fastest way to give us the right job details.
          </p>
          <div className="contact-methods">
            <ContactMethod icon={<Phone size={20} />} title="Phone" body="(555) 014-PIPE" />
            <ContactMethod icon={<Mail size={20} />} title="Email" body="service@goodpipe.example" />
            <ContactMethod
              icon={<CalendarClock size={20} />}
              title="Hours"
              body="Emergency service 24/7. Standard appointments Monday to Saturday."
            />
          </div>
        </aside>
        <Estimator />
      </section>
    </>
  );
}

function Estimator() {
  const [form, setForm] = useState({
    service: "drain",
    property: "house",
    access: "easy",
    distance: "local",
    urgency: "standard",
    name: "",
    phone: "",
    details: ""
  });
  const [sent, setSent] = useState(false);

  const estimate = useMemo(() => {
    const service = servicePrices[form.service];
    const urgency = urgencyAdjustments[form.urgency];
    const adjustment =
      propertyAdjustments[form.property] +
      accessAdjustments[form.access] +
      distanceAdjustments[form.distance] +
      urgency.fee;
    const low = service.base + adjustment;
    const high = Math.round(low * 1.42 + 30);

    return {
      service,
      urgency,
      adjustment,
      low,
      high,
      range: `${currency.format(low)}-${currency.format(high)}`
    };
  }, [form.access, form.distance, form.property, form.service, form.urgency]);

  function updateField(event) {
    const { name, value } = event.target;
    setSent(false);
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submitEstimate(event) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <section className="estimate-card" id="price-form" aria-labelledby="estimate-title">
      <div className="estimate-header">
        <div>
          <p className="eyebrow">Instant price form</p>
          <h2 id="estimate-title">Build your estimate.</h2>
        </div>
        <div className="live-price" aria-live="polite">
          <span>Estimated range</span>
          <strong>{estimate.range}</strong>
        </div>
      </div>

      <form className="estimator" onSubmit={submitEstimate}>
        <div className="field-grid">
          <SelectField label="Service type" name="service" value={form.service} onChange={updateField}>
            <option value="drain">Drain cleaning</option>
            <option value="leak">Leak repair</option>
            <option value="fixture">Fixture installation</option>
            <option value="heater">Water heater service</option>
            <option value="inspection">Inspection and diagnosis</option>
          </SelectField>
          <SelectField label="Property type" name="property" value={form.property} onChange={updateField}>
            <option value="house">House</option>
            <option value="condo">Condo or apartment</option>
            <option value="commercial">Light commercial</option>
          </SelectField>
          <SelectField label="Access" name="access" value={form.access} onChange={updateField}>
            <option value="easy">Easy access</option>
            <option value="standard">Standard cabinet or utility access</option>
            <option value="tight">Tight crawlspace or wall access</option>
          </SelectField>
          <SelectField label="Distance from GoodPipe" name="distance" value={form.distance} onChange={updateField}>
            <option value="local">0-10 miles</option>
            <option value="nearby">11-25 miles</option>
            <option value="far">26-40 miles</option>
          </SelectField>
        </div>

        <div className="field full">
          <span className="field-label">How soon do you need help?</span>
          <div className="choice-grid">
            {[
              ["standard", "Next available"],
              ["same-day", "Same day"],
              ["emergency", "Emergency"]
            ].map(([value, label]) => (
              <label className="choice" key={value}>
                <input
                  type="radio"
                  name="urgency"
                  value={value}
                  checked={form.urgency === value}
                  onChange={updateField}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="field-grid">
          <InputField label="Name" name="name" value={form.name} placeholder="Your name" onChange={updateField} />
          <InputField label="Phone" name="phone" value={form.phone} placeholder="(555) 000-0000" onChange={updateField} />
          <div className="field full">
            <label htmlFor="details">What is happening?</label>
            <textarea
              id="details"
              name="details"
              value={form.details}
              onChange={updateField}
              placeholder="Example: kitchen sink drains slowly and backs up when dishwasher runs"
            />
            <span className="field-hint">Photos, exact parts, and site conditions can change the final quote.</span>
          </div>
        </div>

        <div className="price-breakdown" aria-label="Estimate breakdown">
          <PriceLine label="Service baseline" value={currency.format(estimate.service.base)} />
          <PriceLine label="Adjustments" value={currency.format(estimate.adjustment)} />
          <PriceLine label="Likely visit window" value={estimate.urgency.window} />
        </div>

        <p className="price-note">
          {sent
            ? `Thanks, ${form.name || "there"}. GoodPipe received your ${estimate.service.label.toLowerCase()} estimate request.`
            : "This is a planning estimate, not a final contract price. GoodPipe confirms final pricing after diagnosis and approval."}
        </p>
        <button className="button" type="submit">
          {sent ? "Estimate Request Sent" : "Request This Estimate"}
        </button>
      </form>
    </section>
  );
}

function SelectField({ label, name, value, onChange, children }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={onChange}>
        {children}
      </select>
    </div>
  );
}

function InputField({ label, name, value, placeholder, onChange }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} value={value} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}

function PriceLine({ label, value }) {
  return (
    <div className="price-line">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ContactMethod({ icon, title, body }) {
  return (
    <div className="contact-method">
      <div className="contact-icon" aria-hidden="true">
        {icon}
      </div>
      <div>
        <strong>{title}</strong>
        <span>{body}</span>
      </div>
    </div>
  );
}

function Panel({ number, title, children }) {
  return (
    <article className="panel">
      <span className="panel-number">{number}</span>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

function Metrics() {
  return (
    <div className="metrics" aria-label="GoodPipe service metrics">
      <div className="metric">
        <strong>24/7</strong>
        <span>emergency response</span>
      </div>
      <div className="metric">
        <strong>15+</strong>
        <span>years of experience</span>
      </div>
      <div className="metric">
        <strong>1-year</strong>
        <span>workmanship warranty</span>
      </div>
    </div>
  );
}

function TimelineStep({ number, title, children }) {
  return (
    <article className="timeline-step">
      <strong>{number}</strong>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

function PageHero({ eyebrow, title, body }) {
  return (
    <section className="page-hero">
      <div className="section">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </section>
  );
}

function CallToAction({ title, body, button, onClick }) {
  return (
    <section className="cta">
      <div className="section">
        <div>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
        <button className="button sun" type="button" onClick={onClick}>
          {button}
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <span>GoodPipe</span>
        <span>Licensed plumbing repairs, drains, and installations.</span>
      </div>
    </footer>
  );
}

createRoot(document.querySelector("#root")).render(<App />);
