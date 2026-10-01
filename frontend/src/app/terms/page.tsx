'use client';

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 prose prose-slate max-w-none">
      <style dangerouslySetInnerHTML={{ __html: `
    :root {
        --primary: #2563eb;
        --text-dark: #0f172a;
        --text-mid: #475569;
        --text-lo: #94a3b8;
        --bg-soft: #f8fafc;
        --border: #e2e8f0;
        --radius-lg: 18px;
        --radius-md: 12px;
    }
    .policy-hero {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%);
        padding: 64px 0 52px;
        position: relative; overflow: hidden;
    }
    .policy-hero::before {
        content: '';
        position: absolute; inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    }
    .policy-body { padding: 64px 0; background: #fff; }
    .policy-content h2 { font-size: 1.3rem; font-weight: 700; color: var(--text-dark); margin: 36px 0 12px; padding-top: 8px; border-top: 1px solid var(--border); }
    .policy-content p { color: var(--text-mid); line-height: 1.8; font-size: .93rem; margin-bottom: 12px; }
    .policy-content ul { color: var(--text-mid); line-height: 1.8; font-size: .93rem; padding-left: 20px; margin-bottom: 12px; }
    .policy-content ul li { margin-bottom: 6px; }
    .policy-toc { background: var(--bg-soft); border: 1px solid var(--border); border-radius: var(--radius-md); padding: 24px; position: sticky; top: 90px; }
    .policy-toc h4 { font-size: .85rem; font-weight: 700; color: var(--text-dark); text-transform: uppercase; letter-spacing: .8px; margin-bottom: 14px; }
    .policy-toc a { display: block; font-size: .85rem; color: var(--text-mid); text-decoration: none; padding: 5px 0; border-bottom: 1px solid var(--border); transition: color .2s; }
    .policy-toc a:last-child { border-bottom: none; }
    .policy-toc a:hover { color: var(--primary); }
    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); border-radius: 50px; padding: 6px 16px; font-size: .8rem; font-weight: 600; color: #93c5fd; letter-spacing: .4px; margin-bottom: 16px; }
    .last-updated { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.15); border-radius: 8px; padding: 5px 12px; font-size: .8rem; color: #94a3b8; margin-top: 14px; }
` }} />

<section className="policy-hero">
    <div className="container position-relative">
        <div className="hero-badge"><i className="bi bi-file-text-fill"></i> Terms of Use</div>
        <h1 >
            Terms of Use
        </h1>
        <p >
            By accessing and using this website, you agree to comply with these Terms of Use.
        </p>
        <div className="last-updated"><i className="bi bi-calendar3"></i> Last Updated: June 2026</div>
    </div>
</section>

<section className="policy-body">
    <div className="container">
        <div className="row g-5">
            <div className="col-lg-3 d-none d-lg-block">
                <div className="policy-toc">
                    <h4>Contents</h4>
                    <a href="#usage">Website Usage</a>
                    <a href="#ip">Intellectual Property</a>
                    <a href="#conduct">User Conduct</a>
                    <a href="#links">Third-Party Links</a>
                    <a href="#disclaimer">Disclaimer</a>
                    <a href="#liability">Limitation of Liability</a>
                    <a href="#changes">Changes to Terms</a>
                    <a href="#law">Governing Law</a>
                    <a href="#contact">Contact Us</a>
                </div>
            </div>
            <div className="col-lg-9">
                <div className="policy-content">
                    <p >
                        Welcome to Automation Cafe. By accessing and using this website, you agree to comply with these Terms of Use. If you do not agree with any part of these terms, please discontinue using the website.
                    </p>

                    <h2 id="usage">Website Usage</h2>
                    <p>The content available on this website is provided for general informational and business purposes only. While we strive to keep information accurate and up to date, Automation Cafe makes no warranties regarding the completeness, reliability, or accuracy of the information provided.</p>

                    <h2 id="ip">Intellectual Property</h2>
                    <p>All content on this website, including text, graphics, logos, images, designs, software, and other materials, is the property of Automation Cafe unless otherwise stated.</p>
                    <p>You may not reproduce, distribute, modify, copy, or commercially exploit any content without prior written permission.</p>

                    <h2 id="conduct">User Conduct</h2>
                    <p>By using this website, you agree not to:</p>
                    <ul>
                        <li>Violate any applicable laws or regulations.</li>
                        <li>Attempt unauthorized access to our systems or servers.</li>
                        <li>Upload harmful software, malware, or malicious code.</li>
                        <li>Use the website for fraudulent or unlawful purposes.</li>
                        <li>Interfere with the operation or security of the website.</li>
                    </ul>

                    <h2 id="links">Third-Party Links</h2>
                    <p>This website may contain links to third-party websites for your convenience. Automation Cafe does not control or endorse such websites and is not responsible for their content, policies, or practices.</p>

                    <h2 id="disclaimer">Disclaimer</h2>
                    <p>All information provided on this website is offered on an "As Is" and "As Available" basis. Automation Cafe does not guarantee that the website will always be available, error-free, secure, or free from interruptions.</p>
                    <p>Any reliance placed on information available through this website is at your own risk.</p>

                    <h2 id="liability">Limitation of Liability</h2>
                    <p>Automation Cafe shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of, or inability to use, this website.</p>

                    <h2 id="changes">Changes to Terms</h2>
                    <p>We reserve the right to update or modify these Terms of Use at any time without prior notice. Continued use of the website after changes are posted constitutes acceptance of the updated terms.</p>

                    <h2 id="law">Governing Law</h2>
                    <p>These Terms of Use shall be governed by and interpreted in accordance with the laws of India. Any disputes shall be subject to the jurisdiction of the courts of New Delhi, India.</p>

                    <h2 id="contact">Contact Us</h2>
                    <p>
                        <strong>Automation Cafe</strong><br />
                        <strong>Website:</strong> <a href="https://www.automationcafe.in" >www.automationcafe.in</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
    </div>
  );
}
