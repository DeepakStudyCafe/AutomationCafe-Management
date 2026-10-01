'use client';

export default function ServicesPage() {
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
        --shadow-sm: 0 1px 3px rgba(0,0,0,.06);
        --shadow-md: 0 4px 16px rgba(0,0,0,.08);
        --shadow-lg: 0 12px 36px rgba(0,0,0,.12);
        --transition: all .25s cubic-bezier(.4,0,.2,1);
    }

    /* â”€â”€ Hero â”€â”€ */
    .services-hero {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%);
        padding: 90px 0 70px;
        position: relative;
        overflow: hidden;
    }
    .services-hero::before {
        content: '';
        position: absolute; inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    }
    .hero-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
        border-radius: 50px; padding: 6px 16px;
        font-size: .8rem; font-weight: 600; color: #93c5fd;
        letter-spacing: .4px; margin-bottom: 22px;
    }
    .section-eyebrow {
        font-size: .75rem; font-weight: 700; letter-spacing: 1.2px;
        text-transform: uppercase; color: var(--primary); margin-bottom: 10px;
    }

    /* â”€â”€ Filter tabs â”€â”€ */
    .filter-bar {
        background: #fff;
        border-bottom: 1px solid var(--border);
        padding: 18px 0;
    }
    .filter-btn {
        display: inline-flex; align-items: center; gap: 7px;
        background: var(--bg-soft); border: 1px solid var(--border);
        border-radius: 50px; padding: 8px 18px;
        font-size: .82rem; font-weight: 600; color: var(--text-mid);
        cursor: pointer; transition: var(--transition);
        white-space: nowrap;
    }
    .filter-btn:hover, .filter-btn.active {
        background: var(--primary); border-color: var(--primary);
        color: #fff;
    }
    .filter-dot {
        width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;
    }

    /* â”€â”€ Service cards â”€â”€ */
    .service-card {
        background: #fff;
        border: 1px solid var(--border);
        border-radius: var(--radius-lg);
        padding: 32px 28px 28px;
        height: 100%;
        display: flex; flex-direction: column;
        position: relative; overflow: hidden;
        transition: var(--transition);
    }
    .service-card::before {
        content: '';
        position: absolute; top: 0; left: 0; right: 0;
        height: 4px;
        background: var(--card-accent, var(--primary));
        border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .3s cubic-bezier(.4,0,.2,1);
    }
    .service-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); border-color: transparent; }
    .service-card:hover::before { transform: scaleX(1); }

    .service-icon {
        width: 56px; height: 56px;
        border-radius: var(--radius-md);
        display: flex; align-items: center; justify-content: center;
        font-size: 1.5rem; margin-bottom: 20px; flex-shrink: 0;
    }
    .service-title {
        font-size: 1.1rem; font-weight: 700;
        color: var(--text-dark); margin-bottom: 10px; line-height: 1.3;
    }
    .service-desc {
        font-size: .875rem; color: var(--text-mid);
        line-height: 1.7; flex-grow: 1; margin-bottom: 20px;
    }
    .service-features {
        list-style: none; padding: 0; margin: 0 0 20px;
    }
    .service-features li {
        display: flex; align-items: flex-start; gap: 8px;
        font-size: .82rem; color: var(--text-mid);
        padding: 5px 0; border-bottom: 1px solid var(--bg-soft);
    }
    .service-features li:last-child { border-bottom: none; }
    .service-features li i { font-size: .75rem; margin-top: 3px; flex-shrink: 0; }

    .service-tags {
        display: flex; flex-wrap: wrap; gap: 5px; margin-top: auto;
    }
    .service-tag {
        font-size: .72rem; font-weight: 600; padding: 4px 10px;
        border-radius: 50px;
        background: var(--tag-bg, #eff6ff);
        color: var(--tag-color, #2563eb);
    }

    /* â”€â”€ Stats bar â”€â”€ */
    .stats-bar {
        background: var(--bg-soft);
        border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border);
        padding: 28px 0;
    }
    .stat-num {
        font-size: 2rem; font-weight: 800;
        color: var(--text-dark); line-height: 1;
    }
    .stat-label {
        font-size: .8rem; color: var(--text-lo); margin-top: 4px;
    }

    /* â”€â”€ CTA â”€â”€ */
    .services-cta {
        background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 70%, #1d4ed8 100%);
        padding: 72px 0;
        position: relative; overflow: hidden;
    }
    .services-cta::before {
        content: '';
        position: absolute; inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    }

    media (max-width:767px) {
        .filter-bar .d-flex { overflow-x: auto; padding-bottom: 4px; }
    }
` }} />


<section className="services-hero">
    <div className="container position-relative">
        <div className="row justify-content-center text-center">
            <div className="col-lg-8">
                <div className="hero-badge">
                    <i className="bi bi-grid-3x3-gap-fill"></i> Our Services
                </div>
                <h1 >
                    30+ Automation Modules.<br />
                    <span >One Desktop App.</span>
                </h1>
                <p >
                    Every module automates an actual manual process your team does every month â€” built specifically for CA firms, CSs, lawyers and tax professionals.
                </p>
                <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
                    <a asp-controller="Home" asp-action="Download"
                       >
                        <i className="bi bi-download me-2"></i>Download Free
                    </a>
                    <a asp-controller="Account" asp-action="Register"
                       >
                        Register Free
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>


<div className="stats-bar">
    <div className="container">
        <div className="row g-3 text-center justify-content-center">
            <div className="col-6 col-md-2">
                <div className="stat-num">30+</div>
                <div className="stat-label">Automation Modules</div>
            </div>
            <div className="col-6 col-md-2">
                <div className="stat-num">10k+</div>
                <div className="stat-label">Downloads</div>
            </div>
            <div className="col-6 col-md-2">
                <div className="stat-num">4.9/5</div>
                <div className="stat-label">User Rating</div>
            </div>
            <div className="col-6 col-md-2">
                <div className="stat-num">100%</div>
                <div className="stat-label">Secure & Offline</div>
            </div>
        </div>
    </div>
</div>


<div className="filter-bar">
    <div className="container">
        <div className="d-flex align-items-center gap-2 flex-wrap">
            <button className="filter-btn active">
                <i className="bi bi-grid-fill"></i> All Tools
            </button>
            <button className="filter-btn">
                <span className="filter-dot" ></span> GST
            </button>
            <button className="filter-btn">
                <span className="filter-dot" ></span> Income Tax
            </button>
            <button className="filter-btn">
                <span className="filter-dot" ></span> Tally
            </button>
            <button className="filter-btn">
                <span className="filter-dot" ></span> PDF
            </button>
            <button className="filter-btn">
                <span className="filter-dot" ></span> Email
            </button>
            <button className="filter-btn">
                <span className="filter-dot" ></span> WhatsApp
            </button>
        </div>
    </div>
</div>


<section >
    <div className="container">
        <div className="row g-4" id="servicesGrid">

            
            <div className="col-md-6 col-lg-4 service-item" data-category="gst">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-cloud-arrow-down-fill"></i>
                    </div>
                    <div className="service-title">Bulk GST Downloads</div>
                    <p className="service-desc">Download GST returns for all your clients at once via automated browser â€” no manual portal login loops. Covers all major return types.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> GSTR-1 (JSON + PDF) bulk download</li>
                        <li><i className="bi bi-check-circle-fill" ></i> GSTR-2B, GSTR-3B, GST Challans</li>
                        <li><i className="bi bi-check-circle-fill" ></i> IMS data for all clients at once</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Automated browser â€” no portal logins</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >GSTR-1 PDF</span>
                        <span className="service-tag" >GSTR-2B</span>
                        <span className="service-tag" >GSTR-3B</span>
                        <span className="service-tag" >Challan</span>
                        <span className="service-tag" >IMS</span>
                    </div>
                </div>
            </div>

            
            <div className="col-md-6 col-lg-4 service-item" data-category="gst">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-patch-check-fill"></i>
                    </div>
                    <div className="service-title">GSTIN Verifier</div>
                    <p className="service-desc">Verify hundreds of GSTINs in bulk directly from the GST portal. Get live compliance data for every client in one go.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> Bulk GSTIN lookup from Excel list</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Live filing history & return status</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Trade name & compliance details</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Full results exported to Excel</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >Bulk Lookup</span>
                        <span className="service-tag" >Filing History</span>
                        <span className="service-tag" >Excel Export</span>
                    </div>
                </div>
            </div>

            
            <div className="col-md-6 col-lg-4 service-item" data-category="gst">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-arrow-left-right"></i>
                    </div>
                    <div className="service-title">GST Reconciliation</div>
                    <p className="service-desc">Reconcile GSTR-2B portal data against your Tally or purchase register. Maximise ITC claims and reduce compliance risk automatically.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> GSTR-2B vs Tally / purchase register</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Intelligent invoice matching</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Automated exception reports</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Save 80% reconciliation time</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >GSTR-2B vs Books</span>
                        <span className="service-tag" >ITC Maximiser</span>
                        <span className="service-tag" >Mismatch Report</span>
                    </div>
                </div>
            </div>

            
            <div className="col-md-6 col-lg-4 service-item" data-category="gst">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-file-earmark-spreadsheet-fill"></i>
                    </div>
                    <div className="service-title">JSON & 3B to Excel</div>
                    <p className="service-desc">Convert GST portal exports into structured Excel workbooks instantly. Consolidate multiple files into a single unified report.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> GSTR-1 JSON â†’ multi-sheet Excel</li>
                        <li><i className="bi bi-check-circle-fill" ></i> GSTR-3B PDF â†’ Excel conversion</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Consolidate multiple GSTR-1 files</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Clean, structured output format</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >GSTR-1 JSON â†’ Excel</span>
                        <span className="service-tag" >3B PDF â†’ Excel</span>
                        <span className="service-tag" >Consolidation</span>
                    </div>
                </div>
            </div>

            
            <div className="col-md-6 col-lg-4 service-item" data-category="tally">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-diagram-3-fill"></i>
                    </div>
                    <div className="service-title">AI Invoice to Tally & Tally Automation</div>
                    <p className="service-desc">AI-powered extraction of PDF & scanned invoices, Excel sheets, and GSTR-2B data directly into Tally-ready XML files. Auto-maps ledgers and eliminates manual data entry.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> AI Invoice to Tally (with PDF & Excel)</li>
                        <li><i className="bi bi-check-circle-fill" ></i> GSTR-2B data â†’ Tally XML</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Auto-maps supplier & customer ledgers</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Generates Tally vouchers automatically</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Batch processing for multi-client firms</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >AI PDF Invoice â†’ Tally</span>
                        <span className="service-tag" >GSTR-2B â†’ Tally XML</span>
                        <span className="service-tag" >Auto Mapping</span>
                        <span className="service-tag" >Batch Import</span>
                    </div>
                </div>
            </div>

            
            <div className="col-md-6 col-lg-4 service-item" data-category="income-tax">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-calculator-fill"></i>
                    </div>
                    <div className="service-title">Income Tax Suite</div>
                    <p className="service-desc">Complete income tax workflow automation. Download all key reports in bulk and automate ITR filing for your entire client list.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> Bulk 26AS / AIS / TIS downloads</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Outstanding demand checker</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Refund status checker</li>
                        <li><i className="bi bi-check-circle-fill" ></i> ITR Bot for automated filing</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >26AS / AIS / TIS</span>
                        <span className="service-tag" >Demand Checker</span>
                        <span className="service-tag" >Refund Checker</span>
                        <span className="service-tag" >ITR Bot</span>
                    </div>
                </div>
            </div>

            
            <div className="col-md-6 col-lg-4 service-item" data-category="email">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-envelope-paper-fill"></i>
                    </div>
                    <div className="service-title">Bulk Email Automation</div>
                    <p className="service-desc">Send personalised bulk emails via Outlook in one click. Communicate with all your clients without composing a single email manually.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> GST return data request emails</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Invoice dispatch with PDF attachments</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Payment reminder campaigns</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Auto-filled from Excel data</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >GST Return Request</span>
                        <span className="service-tag" >Invoice Sender</span>
                        <span className="service-tag" >Payment Reminder</span>
                    </div>
                </div>
            </div>

            
            <div className="col-md-6 col-lg-4 service-item" data-category="pdf">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-file-earmark-pdf-fill"></i>
                    </div>
                    <div className="service-title">PDF Toolkit</div>
                    <p className="service-desc">A full PDF utility suite built right into the app. Handle every common document task without needing third-party software or online tools.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> Merge multiple PDF files</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Split & extract specific pages</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Compress to reduce file size</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Permanently redact sensitive data</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >Merge</span>
                        <span className="service-tag" >Split</span>
                        <span className="service-tag" >Extract</span>
                        <span className="service-tag" >Compress</span>
                        <span className="service-tag" >Redact</span>
                    </div>
                </div>
            </div>

            
            <div className="col-md-6 col-lg-4 service-item" data-category="whatsapp">
                <div className="service-card" >
                    <div className="service-icon" >
                        <i className="bi bi-whatsapp"></i>
                    </div>
                    <div className="service-title">WhatsApp Automation</div>
                    <p className="service-desc">Automate client communications directly through WhatsApp. Connect your WhatsApp Business account to send updates, reminders, and alerts seamlessly.</p>
                    <ul className="service-features">
                        <li><i className="bi bi-check-circle-fill" ></i> WhatsApp Business account integration</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Send tax filing reminders & alerts</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Automated document collection requests</li>
                        <li><i className="bi bi-check-circle-fill" ></i> Official pre-approved message templates</li>
                    </ul>
                    <div className="service-tags">
                        <span className="service-tag" >Tax Filing Reminders</span>
                        <span className="service-tag" >Document Requests</span>
                        <span className="service-tag" >Template Messages</span>
                        <span className="service-tag" >Client Updates</span>
                    </div>
                </div>
            </div>

        </div>

        
        <div id="noResults"  className="text-center py-5">
            <i className="bi bi-search" ></i>
            <p >No tools found in this category.</p>
        </div>
    </div>
</section>


<section >
    <div className="container">
        <div className="text-center mb-5">
            <p className="section-eyebrow">Why Automation Cafe</p>
            <h2 >
                Built Differently. Designed for Your Practice.
            </h2>
        </div>
        <div className="row g-4 justify-content-center">
            <div className="col-sm-6 col-lg-3">
                <div >
                    <div >
                        <i className="bi bi-windows"></i>
                    </div>
                    <h3 >Windows Native</h3>
                    <p >Desktop app that runs entirely on your PC. No browser, no internet required for core functions.</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3">
                <div >
                    <div >
                        <i className="bi bi-shield-lock-fill"></i>
                    </div>
                    <h3 >100% Secure & Offline</h3>
                    <p >Your client data never leaves your machine. No cloud storage, no data sharing.</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3">
                <div >
                    <div >
                        <i className="bi bi-arrow-repeat"></i>
                    </div>
                    <h3 >Free Regular Updates</h3>
                    <p >Portal changes? We update the tools. Registered users get every new module free.</p>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3">
                <div >
                    <div >
                        <i className="bi bi-people-fill"></i>
                    </div>
                    <h3 >Built for CA Firms</h3>
                    <p >Every workflow is designed around real CA practice needs, not generic automation.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="services-cta">
    <div className="container position-relative text-center">
        <p className="section-eyebrow" >Get Started Today</p>
        <h2 >
            Start Automating Your Practice
        </h2>
        <p >
            Join thousands of CA firms already saving hours every month with Automation Cafe.
        </p>
        <div className="d-flex flex-wrap gap-3 justify-content-center">
            <a asp-controller="Home" asp-action="Download"
               >
                <i className="bi bi-download me-2"></i>Download Free
            </a>
            <a asp-controller="Home" asp-action="Contact"
               >
                Contact Us
            </a>
        </div>
    </div>
</section>


<script dangerouslySetInnerHTML={{ __html: `
function filterCards(category, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    var items = document.querySelectorAll('.service-item');
    var visible = 0;

    items.forEach(function(item) {
        var cat = item.dataset.category;
        var show = category === 'all' || cat === category || cat === 'all';
        item.style.display = show ? '' : 'none';
        if (show) visible++;
    });

    document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
}
` }} />
    </div>
  );
}






