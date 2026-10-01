'use client';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 prose prose-slate max-w-none">
      <style dangerouslySetInnerHTML={{ __html: `
    :root {
        --primary: #2563eb;
        --primary-dark: #1d4ed8;
        --text-dark: #0f172a;
        --text-mid: #475569;
        --text-lo: #94a3b8;
        --bg-soft: #f8fafc;
        --border: #e2e8f0;
        --radius-lg: 18px;
        --radius-md: 12px;
        --shadow-md: 0 4px 24px rgba(0,0,0,.08);
        --transition: all .25s cubic-bezier(.4,0,.2,1);
    }

    /* Hero */
    .about-hero {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%);
        padding: 96px 0 80px;
        position: relative;
        overflow: hidden;
    }
    .about-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    }
    .about-hero h1 {
        font-size: clamp(2rem, 4.5vw, 3.4rem);
        font-weight: 800;
        line-height: 1.15;
        color: #fff;
        letter-spacing: -.5px;
    }
    .about-hero h1 span {
        background: linear-gradient(90deg, #60a5fa, #a78bfa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline-block;
        padding-bottom: 6px;
        margin-bottom: -6px;
    }
    .hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: rgba(255,255,255,.1);
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 50px;
        padding: 6px 16px;
        font-size: .8rem;
        font-weight: 600;
        color: #93c5fd;
        letter-spacing: .4px;
        margin-bottom: 22px;
    }
    .hero-sub {
        color: #94a3b8;
        font-size: 1.1rem;
        line-height: 1.8;
        max-width: 620px;
    }

    /* General */
    .section-eyebrow {
        font-size: .75rem;
        font-weight: 700;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: var(--primary);
        margin-bottom: 10px;
    }
    .section-title {
        font-size: clamp(1.6rem, 3vw, 2.2rem);
        font-weight: 800;
        color: var(--text-dark);
        letter-spacing: -.3px;
        line-height: 1.2;
    }
    .section-sub {
        color: var(--text-mid);
        font-size: 1rem;
        line-height: 1.75;
        max-width: 640px;
        margin: 0 auto;
    }

    /* Pillar cards */
    .pillar-card {
        background: #fff;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 32px 26px;
        height: 100%;
        transition: var(--transition);
        position: relative;
        overflow: hidden;
    }
    .pillar-card:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-md);
        border-color: #bfdbfe;
    }
    .pillar-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), #7c3aed);
        opacity: 0;
        transition: var(--transition);
    }
    .pillar-card:hover::before { opacity: 1; }
    .pillar-icon {
        width: 52px; height: 52px;
        border-radius: var(--radius-md);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.4rem;
        margin-bottom: 18px;
    }
    .pillar-card h3 {
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-dark);
        margin-bottom: 10px;
    }
    .pillar-card p {
        color: var(--text-mid);
        font-size: .9rem;
        line-height: 1.7;
        margin: 0;
    }

    /* What We Do grid */
    .tool-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: #fff;
        border: 1px solid var(--border);
        border-radius: 50px;
        padding: 10px 20px;
        font-size: .875rem;
        font-weight: 600;
        color: var(--text-dark);
        transition: var(--transition);
    }
    .tool-chip:hover {
        border-color: #93c5fd;
        background: #eff6ff;
        color: var(--primary);
    }
    .tool-chip i { font-size: 1rem; }

    /* StudyCafe section */
    .studycafe-section {
        background: var(--bg-soft);
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
    }
    .studycafe-card {
        background: #fff;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 44px 40px;
        position: relative;
        overflow: hidden;
    }
    .studycafe-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 4px;
        background: linear-gradient(90deg, #2563eb, #7c3aed, #059669);
    }

    /* Why section */
    .why-item {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 24px;
        background: #fff;
        border: 1px solid var(--border);
        border-radius: var(--radius-md);
        transition: var(--transition);
    }
    .why-item:hover {
        border-color: #bfdbfe;
        box-shadow: var(--shadow-md);
    }
    .why-dot {
        width: 42px; height: 42px;
        border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        font-size: 1.1rem;
    }

    /* CTA section */
    .cta-section {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 70%, #1d4ed8 100%);
        padding: 80px 0;
        position: relative;
        overflow: hidden;
    }
    .cta-section::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    }
    .audience-tag {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.15);
        border-radius: 50px;
        padding: 7px 16px;
        font-size: .82rem;
        font-weight: 600;
        color: #e2e8f0;
        margin: 4px;
    }
` }} />


<section className="about-hero">
    <div className="container position-relative">
        <div className="row justify-content-center text-center">
            <div className="col-lg-8">
                <div className="hero-badge">
                    <i className="bi bi-info-circle-fill"></i> About AutomationCafe
                </div>
                <h1>Transforming Finance Work<br /><span>Through Automation &amp; AI</span></h1>
                <p className="hero-sub mx-auto mt-3">
                    AutomationCafe is a specialized technology platform built exclusively for Chartered Accountants, Tax Professionals, Accountants, Finance Teams, Consultants, and Business Owners who want to save time, reduce manual work, and improve productivity through automation.
                </p>
*                 <div className="mt-4" >
                    <span >A product of</span>
                     <div >
                        <img src="~/Images/studycafe-black.png" alt="StudyCafe Private Limited"  />
                    </div> 
                </div> *
            </div>
        </div>
    </div>
</section>


<section >
    <div className="container">
        <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-7">
                <p className="section-eyebrow">Our Mission</p>
                <h2 className="section-title mb-3">Eliminate Repetitive Work</h2>
                <p className="section-sub">
                    Every month, finance professionals spend countless hours downloading reports, reconciling data, preparing returns, collecting client information, sending reminders, managing spreadsheets, and performing repetitive compliance tasks.
                </p>
                <p className="section-sub mt-3">
                    We believe these activities should be automated. That's why we built AutomationCafe â€” so professionals can focus on <strong>advisory, growth, and client service</strong>.
                </p>
            </div>
        </div>

        
        <div className="row g-4 justify-content-center">
            <div className="col-md-6 col-lg-4">
                <div className="pillar-card">
                    <div className="pillar-icon" >
                        <i className="bi bi-eye-fill" ></i>
                    </div>
                    <h3>Our Vision</h3>
                    <p>A future where finance professionals spend less time on repetitive tasks and more time on advisory, analysis, strategy, and business growth â€” by combining Automation, AI, and Professional Expertise.</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-4">
                <div className="pillar-card">
                    <div className="pillar-icon" >
                        <i className="bi bi-bullseye" ></i>
                    </div>
                    <h3>Our Mission</h3>
                    <p>To eliminate repetitive work so finance and tax professionals can focus on what they do best â€” delivering exceptional advisory, growing their practice, and serving their clients.</p>
                </div>
            </div>
            <div className="col-md-6 col-lg-4">
                <div className="pillar-card">
                    <div className="pillar-icon" >
                        <i className="bi bi-shield-check-fill" ></i>
                    </div>
                    <h3>Our Objective</h3>
                    <p>Not to replace professionals â€” but to help them work <strong>faster, smarter, and more efficiently</strong>. Every module is designed around real-world workflows and practical problems in professional practice.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<section >
    <div className="container">
        <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-7">
                <p className="section-eyebrow">What We Do</p>
                <h2 className="section-title mb-3">Automation Solutions Built for Indian Finance Workflows</h2>
                <p className="section-sub">
                    AutomationCafe develops practical automation solutions designed specifically for Indian finance and compliance workflows.
                </p>
            </div>
        </div>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            <span className="tool-chip"><i className="bi bi-receipt-cutoff" ></i> GST Compliance Workflows</span>
            <span className="tool-chip"><i className="bi bi-arrow-left-right" ></i> GSTR Reconciliations</span>
            <span className="tool-chip"><i className="bi bi-calculator-fill" ></i> Income Tax Processes</span>
            <span className="tool-chip"><i className="bi bi-file-earmark-pdf-fill" ></i> Invoice to Tally (PDF & Excel)</span>
            <span className="tool-chip"><i className="bi bi-database-fill" ></i> Tally XML Integrations</span>
            <span className="tool-chip"><i className="bi bi-person-lines-fill" ></i> Client Data Collection</span>
            <span className="tool-chip"><i className="bi bi-cloud-arrow-down-fill" ></i> Bulk Downloads from Govt Portals</span>
            <span className="tool-chip"><i className="bi bi-file-earmark-pdf-fill" ></i> PDF Processing &amp; Document Utilities</span>
            <span className="tool-chip"><i className="bi bi-envelope-fill" ></i> Email Automation</span>
            <span className="tool-chip"><i className="bi bi-file-earmark-excel-fill" ></i> Excel-Based Workflows</span>
            <span className="tool-chip"><i className="bi bi-cpu-fill" ></i> AI-Powered Productivity Tasks</span>
        </div>
    </div>
</section>


<section >
    <div className="container">
        <div className="row align-items-center g-5">
            <div className="col-lg-5">
                <p className="section-eyebrow">Why AutomationCafe?</p>
                <h2 className="section-title mb-4">Built by Professionals Who Understand Your Work</h2>
                <p >
                    Unlike generic software platforms, AutomationCafe is built by professionals who understand the day-to-day challenges faced by CA firms, tax consultants, accountants, and finance teams.
                </p>
                <p >
                    Whether you manage 10 clients or 1,000 clients, our solutions are designed to <strong>reduce manual effort, improve accuracy, and save valuable working hours</strong>.
                </p>
            </div>
            <div className="col-lg-7">
                <div className="d-flex flex-column gap-3">
                    <div className="why-item">
                        <div className="why-dot" >
                            <i className="bi bi-people-fill" ></i>
                        </div>
                        <div>
                            <h5 >Designed Around Real Workflows</h5>
                            <p >Every module is built around practical problems encountered in professional practice â€” not hypothetical use cases.</p>
                        </div>
                    </div>
                    <div className="why-item">
                        <div className="why-dot" >
                            <i className="bi bi-graph-up-arrow" ></i>
                        </div>
                        <div>
                            <h5 >Scales With Your Practice</h5>
                            <p >From solo practitioners to large CA firms with thousands of clients â€” our tools scale to match your workload.</p>
                        </div>
                    </div>
                    <div className="why-item">
                        <div className="why-dot" >
                            <i className="bi bi-patch-check-fill" ></i>
                        </div>
                        <div>
                            <h5 >Accuracy You Can Trust</h5>
                            <p >Automation reduces human error in repetitive tasks, giving you reliable, consistent results across all workflows.</p>
                        </div>
                    </div>
                    <div className="why-item">
                        <div className="why-dot" >
                            <i className="bi bi-clock-fill" ></i>
                        </div>
                        <div>
                            <h5 >Hours Saved Every Month</h5>
                            <p >Professionals using AutomationCafe report saving significant hours monthly on tasks that used to take days.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="studycafe-section" >
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-9">
                <div className="studycafe-card">
                    <div className="row align-items-center g-5">
                        <div className="col-md-4 text-center">
                            <img src="~/Images/studycafe-black.png" alt="StudyCafe Private Limited"  />
                            <p >StudyCafe Private Limited</p>
                        </div>
                        <div className="col-md-8">
                            <p className="section-eyebrow">Backed By</p>
                            <h2 className="section-title mb-3">StudyCafe Private Limited</h2>
                            <p >
                                AutomationCafe is proudly developed and managed by <strong>StudyCafe Private Limited</strong> â€” one of India's leading professional learning and technology companies serving finance and taxation professionals across the country.
                            </p>
                            <p >
                                StudyCafe has empowered thousands of finance professionals through training programs, certification courses, AI workshops, automation programs, and professional development initiatives. With a strong community of Chartered Accountants, Tax Professionals, Finance Experts, and Business Leaders, StudyCafe continuously identifies operational challenges and develops technology solutions to solve them.
                            </p>
                            <p >
                                <strong>AutomationCafe is a result of that vision.</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section >
    <div className="container">
        <div className="text-center mb-5">
            <p className="section-eyebrow">Who We Serve</p>
            <h2 className="section-title">Built for Finance &amp; Tax Professionals</h2>
            <p className="section-sub mt-3">Our tools are designed specifically for professionals who deal with Indian compliance, taxation, and finance workflows every day.</p>
        </div>
        <div className="row g-4 justify-content-center">
            <div className="col-sm-6 col-lg-3">
                <div className="pillar-card text-center">
                    <div className="pillar-icon mx-auto" >
                        <i className="bi bi-calculator-fill" ></i>
                    </div>
                    <h3>Chartered Accountants</h3>
                    <p>Automate GST filings, reconciliations, client workflows, and compliance reporting at scale.</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3">
                <div className="pillar-card text-center">
                    <div className="pillar-icon mx-auto" >
                        <i className="bi bi-receipt-cutoff" ></i>
                    </div>
                    <h3>Tax Professionals</h3>
                    <p>Handle income tax, TDS, GST returns, and bulk government portal downloads with automation.</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3">
                <div className="pillar-card text-center">
                    <div className="pillar-icon mx-auto" >
                        <i className="bi bi-bar-chart-fill" ></i>
                    </div>
                    <h3>Finance Teams</h3>
                    <p>Streamline Tally integrations, Excel workflows, data collection, and financial reporting processes.</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3">
                <div className="pillar-card text-center">
                    <div className="pillar-icon mx-auto" >
                        <i className="bi bi-briefcase-fill" ></i>
                    </div>
                    <h3>Business Owners &amp; Consultants</h3>
                    <p>Reduce manual compliance overhead and improve operational efficiency through smart automation.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<section >
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-lg-9">
                <div className="text-center mb-5">
                    <p className="section-eyebrow">Legal &amp; Contact</p>
                    <h2 className="section-title">Brand &amp; Company Information</h2>
                </div>
                <div >
                    <div className="row g-0">
                        <div className="col-md-6" >
                            <p >Product Brand</p>
                            <p >AutomationCafe</p>
                        </div>
                        <div className="col-md-6" >
                            <p >Parent Company</p>
                            <p >StudyCafe Private Limited</p>
                        </div>
                        <div className="col-md-6" >
                            <p >Contact Desks</p>
                            <p >
                                <i className="bi bi-headset" ></i>
                                <strong>Sales:</strong> +91 97738 44877, +91 80762 44551 (<a href="mailto:salesstudycafe.in" >salesstudycafe.in</a>)
                            </p>
                            <p >
                                <i className="bi bi-telephone-fill" ></i>
                                <strong>Support:</strong> +91 96250 80264, +91 92177 08811 (<a href="mailto:supportstudycafe.in" >supportstudycafe.in</a>)
                            </p>
                            <p >
                                <i className="bi bi-tools" ></i>
                                <strong>Tech Support:</strong> +91 92181 92459, +91 92181 92466 (<a href="mailto:supportstudycafe.in" >supportstudycafe.in</a>)
                            </p>
                            <p >
                                <i className="bi bi-envelope-fill" ></i>
                                <strong>General:</strong> <a href="mailto:contactstudycafe.in" >contactstudycafe.in</a>, <a href="mailto:infostudycafe.in" >infostudycafe.in</a>
                            </p>
                        </div>
                        <div className="col-md-6" >
                            <p >Registered Address</p>
                            <p >
                                <i className="bi bi-geo-alt-fill" ></i>
                                1003, 10th Floor, Modi Tower â€“ 98,<br />
                                Nehru Place, Delhi â€“ 110019
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="cta-section">
    <div className="container position-relative text-center">
        <p className="section-eyebrow" >Join the Automation Revolution</p>
        <h2 >
            Work Less on Repetition.<br />
            <span >Work More on Growth.</span>
        </h2>
        <p >
            Thousands of professionals are already using automation to save time, improve efficiency, and scale their practice. AutomationCafe is here to help you automate smarter and grow faster.
        </p>
        <div className="d-flex flex-wrap gap-2 justify-content-center mb-5">
            <span className="audience-tag"><i className="bi bi-check2-circle"></i> Chartered Accountants</span>
            <span className="audience-tag"><i className="bi bi-check2-circle"></i> Tax Consultants</span>
            <span className="audience-tag"><i className="bi bi-check2-circle"></i> Finance Managers</span>
            <span className="audience-tag"><i className="bi bi-check2-circle"></i> Accountants</span>
            <span className="audience-tag"><i className="bi bi-check2-circle"></i> Business Owners</span>
        </div>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a asp-controller="Account" asp-action="Register"
               >
                Get Started Free
            </a>
            <a asp-controller="Home" asp-action="Contact"
               >
                Contact Us
            </a>
        </div>
    </div>
</section>
    </div>
  );
}
