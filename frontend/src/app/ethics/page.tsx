'use client';

export default function EthicsPage() {
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
` }} />

<section className="policy-hero">
    <div className="container position-relative">
        <div className="hero-badge"><i className="bi bi-patch-check-fill"></i> Ethics Policy</div>
        <h1 >
            Our Commitment to Ethical Practices
        </h1>
        <p >
            At Automation Cafe, we maintain the highest standards of professionalism, transparency, and integrity in every service we provide.
        </p>
    </div>
</section>

<section className="policy-body">
    <div className="container">
        <div className="row g-5">
            <div className="col-lg-3 d-none d-lg-block">
                <div className="policy-toc">
                    <h4>Contents</h4>
                    <a href="#accuracy">1. Accuracy and Reliability</a>
                    <a href="#transparency">2. Transparency and Honesty</a>
                    <a href="#independence">3. Professional Independence</a>
                    <a href="#privacy">4. Client Privacy</a>
                    <a href="#corrections">5. Corrections & Improvement</a>
                    <a href="#commitment">6. Ethical Business Practices</a>
                    <a href="#contact">Contact Us</a>
                </div>
            </div>
            <div className="col-lg-9">
                <div className="policy-content">
                    <p >
                        At Automation Cafe, we are committed to maintaining the highest standards of professionalism, transparency, integrity, and ethical business practices. As a provider of automation solutions, websites, software tools, and digital services for businesses and professional firms, we strive to deliver reliable, honest, and value-driven solutions to our clients.
                    </p>
                    <p >
                        Our mission is to help businesses grow through technology while maintaining trust and accountability in every service we provide.
                    </p>

                    <h2 id="accuracy">1. Accuracy and Reliability</h2>
                    <ul>
                        <li>We are committed to providing accurate information, reliable automation solutions, and high-quality digital services.</li>
                        <li>All content, recommendations, and technical guidance shared through our platform are based on industry best practices and practical experience.</li>
                        <li>We do not knowingly publish, promote, or distribute false, misleading, or deceptive information.</li>
                        <li>We continuously review and improve our services to ensure quality and effectiveness.</li>
                    </ul>

                    <h2 id="transparency">2. Transparency and Honesty</h2>
                    <ul>
                        <li>We communicate clearly about our services, pricing, deliverables, and project timelines.</li>
                        <li>Any limitations, requirements, or risks associated with our solutions will be disclosed to clients before project implementation.</li>
                        <li>Sponsored collaborations, partnerships, or promotional content, if any, will be clearly identified.</li>
                    </ul>

                    <h2 id="independence">3. Professional Independence</h2>
                    <ul>
                        <li>Our recommendations are based on the best interests of our clients and their business goals.</li>
                        <li>We maintain independence in our professional decisions and do not allow external influences to compromise the quality of our services.</li>
                        <li>We strive to provide unbiased advice and solutions tailored to each client's requirements.</li>
                    </ul>

                    <h2 id="privacy">4. Client Privacy and Confidentiality</h2>
                    <ul>
                        <li>We respect the confidentiality of all client information, business data, and project details.</li>
                        <li>Information shared with Automation Cafe is handled securely and used only for the purpose of delivering agreed-upon services.</li>
                        <li>We do not share, sell, or disclose client information without proper authorization unless required by law.</li>
                    </ul>

                    <h2 id="corrections">5. Corrections and Continuous Improvement</h2>
                    <ul>
                        <li>If any error, technical issue, or inaccurate information is identified, we are committed to addressing it promptly and transparently.</li>
                        <li>We actively seek feedback from clients to improve our products, services, and customer experience.</li>
                        <li>Our processes and standards are regularly reviewed to ensure ongoing improvement and innovation.</li>
                    </ul>

                    <h2 id="commitment">6. Commitment to Ethical Business Practices</h2>
                    <ul>
                        <li>We conduct our business with honesty, fairness, and respect toward clients, partners, and employees.</li>
                        <li>We are committed to delivering services that create genuine value and long-term benefits for our clients.</li>
                        <li>We promote responsible use of technology and automation while maintaining compliance with applicable laws and regulations.</li>
                    </ul>

                    <h2 id="contact">Contact Us</h2>
                    <p>If you have any questions regarding this ethics policy or our business practices, please contact us:</p>
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
