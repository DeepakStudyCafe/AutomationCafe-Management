'use client';

export default function PrivacyPage() {
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
    .policy-content h3 { font-size: 1rem; font-weight: 700; color: var(--text-dark); margin: 20px 0 8px; }
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
        <div className="hero-badge"><i className="bi bi-shield-lock-fill"></i> Privacy Policy</div>
        <h1 >
            Your Privacy Matters to Us
        </h1>
        <p >
            Learn how Automation Cafe collects, uses, and protects your personal and business information.
        </p>
    </div>
</section>

<section className="policy-body">
    <div className="container">
        <div className="row g-5">
            
            <div className="col-lg-3 d-none d-lg-block">
                <div className="policy-toc">
                    <h4>Contents</h4>
                    <a href="#info-collect">1. Information We Collect</a>
                    <a href="#how-use">2. How We Use Your Information</a>
                    <a href="#data-security">3. Data Security</a>
                    <a href="#third-party">4. Third-Party Services</a>
                    <a href="#contact">5. Contact Us</a>
                </div>
            </div>
            
            <div className="col-lg-9">
                <div className="policy-content">
                    <p >
                        At Automation Cafe, we specialize in providing automation solutions, business tools, websites, and digital services for chartered accountants, tax professionals, consultants, and professional firms. We are committed to protecting your privacy and ensuring the security of your information.
                    </p>

                    <h2 id="info-collect">1. Information We Collect</h2>
                    <p>When you use our services, purchase software, request website development, or contact us, we may collect:</p>

                    <h3>Personal Information</h3>
                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Company/Firm name</li>
                        <li>Billing and communication details</li>
                    </ul>

                    <h3>Business Information</h3>
                    <ul>
                        <li>Firm logo and branding assets</li>
                        <li>Team member details</li>
                        <li>Business information required for website development or software setup</li>
                        <li>Content, documents, and media voluntarily provided by you</li>
                    </ul>

                    <h3>Technical Information</h3>
                    <ul>
                        <li>IP address</li>
                        <li>Browser type and device information</li>
                        <li>Website usage statistics</li>
                        <li>Cookies and analytics data</li>
                    </ul>

                    <h2 id="how-use">2. How We Use Your Information</h2>
                    <p>We use the information collected to:</p>
                    <ul>
                        <li>Deliver and manage our automation tools and digital services</li>
                        <li>Develop, customize, and maintain websites for clients</li>
                        <li>Process payments and generate invoices</li>
                        <li>Provide customer support and technical assistance</li>
                        <li>Improve our products, services, and user experience</li>
                        <li>Send important service updates and communication</li>
                        <li>Monitor website performance and security</li>
                    </ul>

                    <h2 id="data-security">3. Data Security</h2>
                    <p>Automation Cafe implements industry-standard security measures to protect your information from unauthorized access, disclosure, alteration, or destruction.</p>
                    <p>While we strive to use commercially acceptable means to safeguard your data, no method of transmission over the internet or electronic storage is completely secure. Therefore, we cannot guarantee absolute security.</p>

                    <h2 id="third-party">4. Third-Party Services</h2>
                    <p>We may work with trusted third-party service providers to facilitate our services, including:</p>
                    <ul>
                        <li>Payment gateways</li>
                        <li>Cloud hosting providers</li>
                        <li>Domain and DNS providers</li>
                        <li>Email service providers</li>
                        <li>Analytics and marketing tools</li>
                    </ul>
                    <p>These third parties are granted access only to the information necessary to perform their services and are obligated to maintain confidentiality.</p>

                    <h2 id="contact">5. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <p>
                        <strong>Email:</strong> <a href="mailto:contactstudycafe.in" >contactstudycafe.in</a><br />
                        <strong>Address:</strong> 1003, 10th Floor, Modi Tower, 98, Nehru Place, Delhi 110019
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>
    </div>
  );
}
