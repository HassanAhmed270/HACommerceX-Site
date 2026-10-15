import { Link } from "react-router-dom";
import { Seo } from "../components/Seo.jsx";

export function Privacy() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Seo
        path="/privacy"
        title="Privacy Policy | HACommerceX"
        description="How HACommerceX handles the information you send through our contact form and what the website loads from other services."
      />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted-foreground">
        <Link to="/">Home</Link> / <span>Privacy Policy</span>
      </nav>
      <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: 15 October 2026</p>

      <div className="space-y-8 text-muted-foreground">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Who we are</h2>
          <p>
            HACommerceX is a web development business based in Karachi, Pakistan, founded by Hassan Ahmed. You can
            contact us at{" "}
            <a className="underline" href="mailto:hacommercex@gmail.com">hacommercex@gmail.com</a>.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">What we collect</h2>
          <p>
            When you use the contact form, we receive the details you type in: your name, your email address, the
            project type you choose and your message. If you contact us by email or WhatsApp instead, we receive
            whatever you send us there.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">How we use it</h2>
          <p>
            We use your details only to reply to your enquiry and to discuss and quote your project. We do not sell
            your information.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">How your message reaches us</h2>
          <p>
            The contact form sends your message to our email inbox through our website's server. The website is
            hosted on Vercel, which processes the requests made to the site.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Cookies, analytics and other services</h2>
          <p>
            Our website does not set its own cookies and does not currently use analytics or advertising trackers. The
            site loads its fonts from Google Fonts, so your browser connects to Google to fetch them. If we add
            analytics in the future, we will update this page.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Keeping and deleting your information</h2>
          <p>
            We keep your message while we deal with your enquiry. You can ask us to delete it, or to tell you what we
            hold about you, by emailing us.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to this page</h2>
          <p>If we change how we handle information, we will update this page and its date.</p>
        </div>
      </div>
    </section>
  );
}
