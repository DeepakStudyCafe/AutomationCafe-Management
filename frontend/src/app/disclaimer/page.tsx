'use client';

export default function DisclaimerPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 prose prose-slate max-w-none">
      <style dangerouslySetInnerHTML={{
        __html: `
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
` }} />

      <section className="policy-hero">
        <div className="container position-relative">
          <div className="hero-badge"><i className="bi bi-exclamation-triangle-fill"></i> Disclaimer</div>
          <h1 >
            Disclaimer
          </h1>
          <p >
            The information, services, tools, and content provided by Automation Cafe are intended for general informational and business purposes only.
          </p>
        </div>
      </section>

      <section className="policy-body">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="policy-toc">
                <h4>Contents</h4>
                <a href="#no-advice">No Professional Advice</a>
                <a href="#no-guarantees">No Guarantees</a>
                <a href="#third-party">Third-Party Services</a>
                <a href="#availability">Website Availability</a>
                <a href="#liability">Limitation of Liability</a>
                <a href="#external">External Links</a>
                <a href="#contact">Contact Us</a>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="policy-content">
                <p >
                  The information, services, tools, and content provided by Automation Cafe are intended for general informational and business purposes only.
                </p>

                <h2 id="no-advice">No Professional Advice</h2>
                <p>Content available on this website does not constitute legal, financial, accounting, tax, investment, or professional advice.</p>
                <p>Users should seek advice from qualified professionals before making business, financial, legal, or operational decisions.</p>

                <h2 id="no-guarantees">No Guarantees</h2>
                <p>While Automation Cafe strives to provide accurate information and reliable solutions, we make no guarantees regarding:</p>
                <ul>
                  <li>Specific business outcomes</li>
                  <li>Revenue growth</li>
                  <li>Lead generation results</li>
                  <li>Search engine rankings</li>
                  <li>Operational performance improvements</li>
                </ul>
                <p>Results may vary depending on individual circumstances and implementation.</p>

                <h2 id="third-party">Third-Party Services</h2>
                <p>Our solutions may integrate with third-party providers including hosting companies, payment gateways, cloud services, CRM platforms, and APIs.</p>
                <p>Automation Cafe is not responsible for outages, policy changes, service interruptions, or issues arising from third-party services.</p>

                <h2 id="availability">Website Availability</h2>
                <p>We make reasonable efforts to maintain website availability and performance. However, we do not guarantee uninterrupted access and shall not be liable for downtime, technical errors, or temporary unavailability.</p>

                <h2 id="liability">Limitation of Liability</h2>
                <p>Under no circumstances shall Automation Cafe be liable for any direct, indirect, incidental, consequential, or special damages arising from the use of our website, software, services, or content.</p>

                <h2 id="external">External Links</h2>
                <p>Our website may contain links to third-party websites. We are not responsible for the content, accuracy, privacy practices, or policies of any external website.</p>

                <h2 id="contact">Contact Us</h2>
                <p>If you have any questions regarding this Disclaimer, please contact:</p>
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
