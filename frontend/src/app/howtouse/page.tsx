'use client';

export default function HowToUsePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 prose prose-slate max-w-none">
      <style dangerouslySetInnerHTML={{ __html: `
/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   HERO
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.htu-hero {
    background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 60%, #1d4ed8 100%);
    padding: 80px 0 60px;
    position: relative;
    overflow: hidden;
}
.htu-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.025'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
}
.htu-hero-badge {
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
    margin-bottom: 20px;
}
.htu-hero h1 {
    font-size: clamp(2rem, 4.5vw, 3.2rem);
    font-weight: 800;
    line-height: 1.15;
    color: #fff;
    letter-spacing: -.5px;
    margin-bottom: 16px;
}
.htu-hero h1 span {
    background: linear-gradient(90deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.htu-hero-sub {
    color: #94a3b8;
    font-size: 1.05rem;
    line-height: 1.7;
    max-width: 580px;
}
.htu-hero-stats {
    display: flex;
    gap: 32px;
    margin-top: 28px;
}
.htu-hero-stats .stat {
    text-align: center;
}
.htu-hero-stats .stat-num {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    line-height: 1;
}
.htu-hero-stats .stat-label {
    font-size: .78rem;
    color: #64748b;
    margin-top: 4px;
    text-transform: uppercase;
    letter-spacing: .5px;
    font-weight: 600;
}

:root {
    --header-height: 58px;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CATEGORY FILTER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.htu-filters {
    background: #ffffff;
    border-bottom: 1px solid #e2e8f0;
    padding: 14px 0;
    position: sticky;
    top: var(--header-height, 58px);
    z-index: 1020;
    box-shadow: 0 4px 14px rgba(0,0,0,.06);
    overflow: visible;
}
.htu-filter-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    overflow: visible;
}
.htu-filter-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1.5px solid #e2e8f0;
    background: #fff;
    color: #475569;
    padding: 7px 18px;
    border-radius: 50px;
    font-size: .82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all .2s ease;
    white-space: nowrap;
}
.htu-filter-btn:hover {
    border-color: #bfdbfe;
    background: #eff6ff;
    color: #1d4ed8;
}
.htu-filter-btn.active {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 2px 10px rgba(37, 99, 235, .25);
}
.htu-filter-btn .count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 20px;
    height: 20px;
    border-radius: 50px;
    background: rgba(0,0,0,.06);
    font-size: .72rem;
    font-weight: 700;
    padding: 0 5px;
}
.htu-filter-btn.active .count {
    background: rgba(255,255,255,.25);
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   CATEGORY SECTIONS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.htu-section {
    padding: 48px 0 24px;
    scroll-margin-top: 140px;
}
.htu-section:first-child {
    padding-top: 36px;
}
.htu-section-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    padding-bottom: 12px;
    border-bottom: 2px solid #e2e8f0;
}
.htu-section-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    flex-shrink: 0;
}
.htu-section-title {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;
}
.htu-section-count {
    font-size: .8rem;
    color: #64748b;
    font-weight: 500;
    margin-top: 2px;
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   VIDEO CARDS
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
.htu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
}
.htu-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #e2e8f0;
    transition: all .3s cubic-bezier(.4,0,.2,1);
    position: relative;
}
.htu-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,.1);
    border-color: #bfdbfe;
}
.htu-card-video {
    position: relative;
    padding-top: 56.25%; /* 16:9 */
    background: #0f172a;
}
.htu-card-video iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}
.htu-card-body {
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.htu-card-title {
    font-size: .9rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    flex: 1;
    line-height: 1.3;
}
.htu-card-badge {
    display: inline-flex;
    align-items: center;
    font-size: .68rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 50px;
    white-space: nowrap;
    letter-spacing: .3px;
    flex-shrink: 0;
}

/* Category colors */
.cat-getting-started .htu-section-icon { background: #ecfdf5; color: #059669; }
.cat-getting-started .htu-card-badge { background: #ecfdf5; color: #059669; }

.cat-tally .htu-section-icon { background: #eff6ff; color: #2563eb; }
.cat-tally .htu-card-badge { background: #eff6ff; color: #2563eb; }

.cat-gst .htu-section-icon { background: #fef3c7; color: #d97706; }
.cat-gst .htu-card-badge { background: #fef3c7; color: #d97706; }

.cat-it .htu-section-icon { background: #fae8ff; color: #9333ea; }
.cat-it .htu-card-badge { background: #fae8ff; color: #9333ea; }

.cat-email .htu-section-icon { background: #fce4ec; color: #e11d48; }
.cat-email .htu-card-badge { background: #fce4ec; color: #e11d48; }



/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   RESPONSIVE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
media (max-width: 991px) {
    .htu-grid { grid-template-columns: repeat(2, 1fr); gap: 18px; }
    .htu-hero { padding: 60px 0 44px; }
}
media (max-width: 767px) {
    .htu-grid { grid-template-columns: 1fr; gap: 16px; }
    .htu-hero-stats { gap: 20px; }
    .htu-hero h1 { font-size: 1.8rem; }
}

/* Animations */
.htu-card {
    animation: fadeUp .4s ease both;
}
keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
}
.htu-section[style*="display: none"] .htu-card {
    animation: none;
}
` }} />


<section className="htu-hero">
    <div className="container position-relative text-center">
        <div className="row justify-content-center">
            <div className="col-lg-8">
                <div className="htu-hero-badge">
                    <i className="bi bi-play-circle-fill"></i> Video Tutorials
                </div>
                <h1>Learn How to Use<br /><span>Our Automation Tools</span></h1>
                <p className="htu-hero-sub mx-auto">
                    Step-by-step video guides for every tool in AutomationCafe. 
                    From GST automation to Tally entries â€” master each tool in minutes.
                </p>
                <div className="htu-hero-stats justify-content-center">
                    <div className="stat">
                        <div className="stat-num">33</div>
                        <div className="stat-label">Tutorials</div>
                    </div>
                    <div className="stat">
                        <div className="stat-num">5</div>
                        <div className="stat-label">Categories</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className="htu-filters">
    <div className="container">
        <div className="htu-filter-wrap">
            <button className="htu-filter-btn active" data-filter="all">
                <i className="bi bi-grid-3x3-gap-fill"></i> All <span className="count">33</span>
            </button>
            <button className="htu-filter-btn" data-filter="getting-started">
                <i className="bi bi-rocket-takeoff-fill"></i> Getting Started <span className="count">1</span>
            </button>
            <button className="htu-filter-btn" data-filter="tally">
                <i className="bi bi-journal-code"></i> Tally Suite <span className="count">14</span>
            </button>
            <button className="htu-filter-btn" data-filter="gst">
                <i className="bi bi-receipt-cutoff"></i> GST Suite <span className="count">15</span>
            </button>
            <button className="htu-filter-btn" data-filter="it">
                <i className="bi bi-bank2"></i> Income Tax Suite <span className="count">2</span>
            </button>
            <button className="htu-filter-btn" data-filter="email">
                <i className="bi bi-envelope-at-fill"></i> Email Suite <span className="count">1</span>
            </button>
        </div>
    </div>
</section>


<section >
    <div className="container">

        
        <div className="htu-section cat-getting-started" data-category="getting-started">
            <div className="htu-section-header">
                <div className="htu-section-icon"><i className="bi bi-rocket-takeoff-fill"></i></div>
                <div>
                    <h2 className="htu-section-title">Getting Started</h2>
                    <div className="htu-section-count">1 tutorial</div>
                </div>
            </div>
            <div className="htu-grid">

                <div className="htu-card" data-name="Download & Install AutomationCafe">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/bzB5viFiAUU" title="Download & Install AutomationCafe" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Download &amp; Install AutomationCafe</h3>
                        <span className="htu-card-badge">Getting Started</span>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="htu-section cat-tally" data-category="tally">
            <div className="htu-section-header">
                <div className="htu-section-icon"><i className="bi bi-journal-code"></i></div>
                <div>
                    <h2 className="htu-section-title">Tally Suite â€” Entry Modules</h2>
                    <div className="htu-section-count">14 tutorials</div>
                </div>
            </div>
            <div className="htu-grid">
                <div className="htu-card" data-name="GSTR 2B to Tally">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/c0BnaKabdQY" title="GSTR 2B to Tally" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GSTR 2B to Tally</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Bank Statement to Tally">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/Igd2fKwq5R4" title="Bank Statement to Tally" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Bank Statement to Tally</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Credit Note Accounting">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/SSEkSXRWI9E" title="Credit Note Accounting" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Credit Note Accounting</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Debit Note Accounting">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/8UNMK0TOLRc" title="Debit Note Accounting" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Debit Note Accounting</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Debit Note Item">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/aCQdlOTQVCI" title="Debit Note Item" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Debit Note Item</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Credit Note Item">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/krP16Xz5aNg" title="Credit Note Item" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Credit Note Item</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Receipt Bank Entry">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/jzj4ilBsgjE" title="Receipt Bank Entry" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Receipt Bank Entry</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Payment Bank Entry">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/mt-sCzTTy4A" title="Payment Bank Entry" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Payment Bank Entry</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Purchase Accounting">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/WNPiTY5t-cU" title="Purchase Accounting" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Purchase Accounting</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Purchase Item">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/6t6mcK8R4Vw" title="Purchase Item" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Purchase Item</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Purchase Journal">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/upv_23scfTk" title="Purchase Journal" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Purchase Journal</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Sales Journal">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/__NNNFfyO0w" title="Sales Journal" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Sales Journal</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Sales Item">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/w3Yox1AVUFo" title="Sales Item" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Sales Item</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Sales Accounting">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/jrWbKws3sLY" title="Sales Accounting" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Sales Accounting</h3>
                        <span className="htu-card-badge">Tally</span>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="htu-section cat-gst" data-category="gst">
            <div className="htu-section-header">
                <div className="htu-section-icon"><i className="bi bi-receipt-cutoff"></i></div>
                <div>
                    <h2 className="htu-section-title">GST Suite</h2>
                    <div className="htu-section-count">15 tutorials</div>
                </div>
            </div>
            <div className="htu-grid">
                <div className="htu-card" data-name="GST Challan Downloader">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/ggcfZGJM6BA" title="GST Challan Downloader" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GST Challan Downloader</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GST Verifier">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/3Y5HLc5kIn0" title="GST Verifier" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GST Verifier</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="IMS (Invoice Management System)">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/PrnYMhN6_Ys" title="IMS" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">IMS (Invoice Management System)</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GSTR-1 PDF">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/uECJw27j9Tw" title="GSTR-1 PDF" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GSTR-1 PDF</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GSTR-3B">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/bzc3AF8xF4k" title="GSTR-3B" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GSTR-3B</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GST Reports Downloader">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/xi1Cv8tusCw" title="GST Reports Downloader" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GST Reports Downloader</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GSTR-1 JSON">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/nuZ2MhxI1CU" title="GSTR-1 JSON" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GSTR-1 JSON</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GSTR-3B to Excel">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/5REevFEUb6c" title="GSTR-3B to Excel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GSTR-3B to Excel</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="B2B Reconciliation">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/TW_bFEP6AMI" title="B2B Reconciliation" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">B2B Reconciliation</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Credit Note vs Debit Note">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/fxm6qVqOCzA" title="Credit Note vs Debit Note" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Credit Note vs Debit Note</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GSTR JSON to Excel">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/sY2x5Xuarv0" title="GSTR JSON to Excel" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GSTR JSON to Excel</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GSTR-2B">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/vzGYA27M0Rk" title="GSTR-2B" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GSTR-2B</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Purchase vs GSTR-2B">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/9tFtZGsnE3s" title="Purchase vs GSTR-2B" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Purchase vs GSTR-2B</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Purchase vs GSTR-2A">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/yMkmktuEsCQ" title="Purchase vs GSTR-2A" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Purchase vs GSTR-2A</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
                <div className="htu-card" data-name="GSTR-2B vs GSTR-2A">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/3P1aQLZLx6A" title="GSTR-2B vs GSTR-2A" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">GSTR-2B vs GSTR-2A</h3>
                        <span className="htu-card-badge">GST</span>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="htu-section cat-it" data-category="it">
            <div className="htu-section-header">
                <div className="htu-section-icon"><i className="bi bi-bank2"></i></div>
                <div>
                    <h2 className="htu-section-title">Income Tax Suite</h2>
                    <div className="htu-section-count">2 tutorials</div>
                </div>
            </div>
            <div className="htu-grid">
                <div className="htu-card" data-name="Refund Checker">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/yxJ6Cwa8zbM" title="Refund Checker" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Refund Checker</h3>
                        <span className="htu-card-badge">Income Tax</span>
                    </div>
                </div>
                <div className="htu-card" data-name="Demand Checker">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/Cc9vZMdQ5Ws" title="Demand Checker" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">Demand Checker</h3>
                        <span className="htu-card-badge">Income Tax</span>
                    </div>
                </div>
            </div>
        </div>

        
        <div className="htu-section cat-email" data-category="email">
            <div className="htu-section-header">
                <div className="htu-section-icon"><i className="bi bi-envelope-at-fill"></i></div>
                <div>
                    <h2 className="htu-section-title">Email Suite</h2>
                    <div className="htu-section-count">1 tutorial</div>
                </div>
            </div>
            <div className="htu-grid">
                <div className="htu-card" data-name="App Password Setup">
                    <div className="htu-card-video">
                        <iframe src="https://www.youtube.com/embed/zVW2h0SPSsM" title="App Password Setup" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="htu-card-body">
                        <h3 className="htu-card-title">App Password Setup</h3>
                        <span className="htu-card-badge">Email</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>


<script dangerouslySetInnerHTML={{ __html: `
    // â”€â”€â”€ Dynamic Header Height Alignment â”€â”€â”€
    function updateStickyOffset() {
        var header = document.querySelector('header.sticky-top') || document.querySelector('header');
        if (header) {
            var h = header.getBoundingClientRect().height;
            document.documentElement.style.setProperty('--header-height', (h > 0 ? h : 58) + 'px');
        }
    }
    window.addEventListener('resize', updateStickyOffset);
    window.addEventListener('load', updateStickyOffset);
    document.addEventListener('DOMContentLoaded', updateStickyOffset);
    updateStickyOffset();

    // â”€â”€â”€ Category Filter â”€â”€â”€
    function filterCategory(cat, btn) {
        document.querySelectorAll('.htu-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        var sections = document.querySelectorAll('.htu-section');
        sections.forEach(function (sec) {
            if (cat === 'all' || sec.dataset.category === cat) {
                sec.style.display = '';
                sec.querySelectorAll('.htu-card').forEach(function (card, i) {
                    card.style.display = '';
                    card.style.animation = 'none';
                    card.offsetHeight;
                    card.style.animation = 'fadeUp .4s ease ' + (i * 0.05) + 's both';
                });
            } else {
                sec.style.display = 'none';
            }
        });
    }
` }} />
    </div>
  );
}






