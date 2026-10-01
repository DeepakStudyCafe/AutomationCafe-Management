# AutomationCafe Website Content Inventory

## Page: ForgotPassword

| Field | Details |
|---|---|
| **Original URL** | `/Account/ForgotPassword` |
| **Page name** | ForgotPassword (Account\ForgotPassword.cshtml) |
| **Sections** | Forgot password? |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/automationcafe-black.png |
| **Buttons/Links** | [Send OTP] -> button action |
| **SEO** | Title: ForgotPassword |
| **New route** | `/account/forgotpassword` |
| **Verification** | Pending |

## Page: Login

| Field | Details |
|---|---|
| **Original URL** | `/Account/Login` |
| **Page name** | Login (Account\Login.cshtml) |
| **Sections** | Welcome back |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/automationcafe-black.png |
| **Buttons/Links** | [Log In] -> button action |
| **SEO** | Title: Login |
| **New route** | `/account/login` |
| **Verification** | Pending |

## Page: Profile

| Field | Details |
|---|---|
| **Original URL** | `/Account/Profile` |
| **Page name** | Profile (Account\Profile.cshtml) |
| **Sections** | Welcome, @Model.UserInfo.FullName!, Your Current Plan |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Upgrade to Premium] -> /Home/Pricing<br>[View Earnings Dashboard &rarr;] -> /Referral/dashboard<br>[Copy Link] -> button action |
| **SEO** | Title: Profile |
| **New route** | `/account/profile` |
| **Verification** | Pending |

## Page: Register

| Field | Details |
|---|---|
| **Original URL** | `/Account/Register` |
| **Page name** | Register (Account\Register.cshtml) |
| **Sections** | Start YourFree Trial Today, You're all set!, Create your account |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/automationcafe-white.png |
| **Buttons/Links** | [Download Now] -> /Downloads<br>[Verify Email] -> button action<br>[Resend OTP] -> button action<br>[Start Free Trial] -> button action |
| **SEO** | Title: Register |
| **New route** | `/account/register` |
| **Verification** | Pending |

## Page: VerifyOtp

| Field | Details |
|---|---|
| **Original URL** | `/Account/VerifyOtp` |
| **Page name** | VerifyOtp (Account\VerifyOtp.cshtml) |
| **Sections** | Enter OTP |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/automationcafe-black.png |
| **Buttons/Links** | [Verify & Reset Password] -> button action |
| **SEO** | Title: VerifyOtp |
| **New route** | `/account/verifyotp` |
| **Verification** | Pending |

## Page: GlobalSettings

| Field | Details |
|---|---|
| **Original URL** | `/AdminReferral/GlobalSettings` |
| **Page name** | GlobalSettings (AdminReferral\GlobalSettings.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Save Changes] -> button action |
| **SEO** | Title: GlobalSettings |
| **New route** | `/adminreferral/globalsettings` |
| **Verification** | Pending |

## Page: Referral Accounts

| Field | Details |
|---|---|
| **Original URL** | `/AdminReferral/` |
| **Page name** | Referral Accounts (AdminReferral\Index.cshtml) |
| **Sections** | User Referral Accounts |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Settings] -> /admin/referrals/settings/@r.UserID |
| **SEO** | Title: Referral Accounts |
| **New route** | `/adminreferral/` |
| **Verification** | Pending |

## Page: Referrer Settings

| Field | Details |
|---|---|
| **Original URL** | `/AdminReferral/Settings` |
| **Page name** | Referrer Settings (AdminReferral\Settings.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Back to Accounts] -> /admin/referrals<br>[Save Settings] -> button action |
| **SEO** | Title: Referrer Settings |
| **New route** | `/adminreferral/settings` |
| **Verification** | Pending |

## Page: Withdrawal Requests

| Field | Details |
|---|---|
| **Original URL** | `/AdminReferral/Withdrawals` |
| **Page name** | Withdrawal Requests (AdminReferral\Withdrawals.cshtml) |
| **Sections** | Withdrawal Requests |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Pending] -> ?status=PENDING<br>[Approved] -> ?status=APPROVED<br>[All] -> ?status=<br>[Mark Paid] -> button action<br>[Reject] -> button action |
| **SEO** | Title: Withdrawal Requests |
| **New route** | `/adminreferral/withdrawals` |
| **Verification** | Pending |

## Page: CreateBlog

| Field | Details |
|---|---|
| **Original URL** | `/Authors/CreateBlog` |
| **Page name** | CreateBlog (Authors\CreateBlog.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Edit slug] -> button action<br>[Save Draft] -> button action<br>[Publish Now] -> button action |
| **SEO** | Title: CreateBlog |
| **New route** | `/authors/createblog` |
| **Verification** | Pending |

## Page: Dashboard

| Field | Details |
|---|---|
| **Original URL** | `/Authors/Dashboard` |
| **Page name** | Dashboard (Authors\Dashboard.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | @b.FeaturedImage |
| **Buttons/Links** | [Add your bio now] -> /Authors/Profile |
| **SEO** | Title: Dashboard |
| **New route** | `/authors/dashboard` |
| **Verification** | Pending |

## Page: EditBlog

| Field | Details |
|---|---|
| **Original URL** | `/Authors/EditBlog` |
| **Page name** | EditBlog (Authors\EditBlog.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | @Model.FeaturedImage |
| **Buttons/Links** | [Save as Draft] -> button action<br>[@(Model.Status == "Published" ? "Update & Keep Published" : "Publish Now")] -> button action<br>[Cancel] -> @(isAdminEdit ?  |
| **SEO** | Title: EditBlog |
| **New route** | `/authors/editblog` |
| **Verification** | Pending |

## Page: Login

| Field | Details |
|---|---|
| **Original URL** | `/Authors/Login` |
| **Page name** | Login (Authors\Login.cshtml) |
| **Sections** | Welcome back |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/automationcafe-black.png |
| **Buttons/Links** | [Sign In] -> button action<br>[&larr; Back to main site] -> / |
| **SEO** | Title: Login |
| **New route** | `/authors/login` |
| **Verification** | Pending |

## Page: Profile

| Field | Details |
|---|---|
| **Original URL** | `/Authors/Profile` |
| **Page name** | Profile (Authors\Profile.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | @Model.ProfileImageUrl |
| **Buttons/Links** | [Change Photo] -> button action<br>[Save Profile] -> button action |
| **SEO** | Title: Profile |
| **New route** | `/authors/profile` |
| **Verification** | Pending |

## Page: AuthorDetails

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/AuthorDetails` |
| **Page name** | AuthorDetails (AuthorsAdmin\AuthorDetails.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | @Model.ProfileImageUrl |
| **Buttons/Links** | [@(Model.IsActive ? "Disable Author" : "Enable Author")] -> button action<br>[Back to Admin] -> /AuthorsAdmin |
| **SEO** | Title: AuthorDetails |
| **New route** | `/authorsadmin/authordetails` |
| **Verification** | Pending |

## Page: Coupons

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/Coupons` |
| **Page name** | Coupons (AuthorsAdmin\Coupons.cshtml) |
| **Sections** | Coupon Management |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Create Coupon] -> button action<br>[Edit] -> button action<br>[@(c.IsActive ? "Disable" : "Enable")] -> button action<br>[@(c.IsLive ? "Hide" : "Go Live")] -> button action<br>[Delete] -> button action |
| **SEO** | Title: Coupons |
| **New route** | `/authorsadmin/coupons` |
| **Verification** | Pending |

## Page: CreateAuthor

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/CreateAuthor` |
| **Page name** | CreateAuthor (AuthorsAdmin\CreateAuthor.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Create Author] -> button action<br>[Cancel] -> /AuthorsAdmin |
| **SEO** | Title: CreateAuthor |
| **New route** | `/authorsadmin/createauthor` |
| **Verification** | Pending |

## Page: DemoBookings

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/DemoBookings` |
| **Page name** | DemoBookings (AuthorsAdmin\DemoBookings.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [All (@totalCount)] -> button action<br>[Confirmed (@confirmedCount)] -> button action<br>[Completed (@completedCount)] -> button action<br>[Cancelled (@cancelledCount)] -> button action<br>[@item.Email] -> mailto:@item.Email |
| **SEO** | Title: DemoBookings |
| **New route** | `/authorsadmin/demobookings` |
| **Verification** | Pending |

## Page: DemoSettings

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/DemoSettings` |
| **Page name** | DemoSettings (AuthorsAdmin\DemoSettings.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Add Holiday] -> button action<br>[Save Settings] -> button action |
| **SEO** | Title: DemoSettings |
| **New route** | `/authorsadmin/demosettings` |
| **Verification** | Pending |

## Page: Index

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/` |
| **Page name** | Index (AuthorsAdmin\Index.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [All Referrals
                        View, activate or suspend] -> /admin/Referrals<br>[Add Referral
                        Create login &amp; referral code] -> /admin/Referrals/create<br>[Commissions
                        Review &amp; mark payouts as paid] -> /admin/Referrals/commissions<br>[Partner Queries
                            @if (pendingQueries > 0)
                            {
                                
                                    @pendingQueries Pending
                                
                            }
                        
                        @partnerQueries.Count total inquiries &bull; View &amp; update response notes] -> /AuthorsAdmin/PartnerInquiries<br>[New Author] -> /AuthorsAdmin/CreateAuthor |
| **SEO** | Title: Index |
| **New route** | `/authorsadmin/` |
| **Verification** | Pending |

## Page: PartnerInquiries

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/PartnerInquiries` |
| **Page name** | PartnerInquiries (AuthorsAdmin\PartnerInquiries.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [All (@totalCount)] -> button action<br>[Pending (@pendingCount)] -> button action<br>[Contacted (@contactedCount)] -> button action<br>[@item.Email] -> mailto:@item.Email<br>[@item.Mobile] -> tel:@item.Mobile |
| **SEO** | Title: PartnerInquiries |
| **New route** | `/authorsadmin/partnerinquiries` |
| **Verification** | Pending |

## Page: PaymentLogs

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/PaymentLogs` |
| **Page name** | PaymentLogs (AuthorsAdmin\PaymentLogs.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Live Updates (Active)] -> button action<br>[Refresh Now] -> button action<br>[All] -> button action<br>[Success] -> button action<br>[Callbacks] -> button action |
| **SEO** | Title: PaymentLogs |
| **New route** | `/authorsadmin/paymentlogs` |
| **Verification** | Pending |

## Page: SendEmail

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/SendEmail` |
| **Page name** | SendEmail (AuthorsAdmin\SendEmail.cshtml) |
| **Sections** | Compose & Send, ${title}, ${title} |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | /Images/automationcafe-black.png, ${uploadedHolidayImage}, ${uploadedUpdateImage} |
| **Buttons/Links** | [Send Test Email] -> button action<br>[Broadcast to ALL Registered Users] -> button action<br>[automationcafe.in] -> https://automationcafe.in<br>[Close] -> button action<br>[Remove Photo] -> button action |
| **SEO** | Title: SendEmail |
| **New route** | `/authorsadmin/sendemail` |
| **Verification** | Pending |

## Page: TallyPartnerInquiries

| Field | Details |
|---|---|
| **Original URL** | `/AuthorsAdmin/TallyPartnerInquiries` |
| **Page name** | TallyPartnerInquiries (AuthorsAdmin\TallyPartnerInquiries.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [All (@totalCount)] -> button action<br>[Pending (@pendingCount)] -> button action<br>[Contacted (@contactedCount)] -> button action<br>[@item.Email] -> mailto:@item.Email<br>[WA] -> https://wa.me/@waNumber |
| **SEO** | Title: TallyPartnerInquiries |
| **New route** | `/authorsadmin/tallypartnerinquiries` |
| **Verification** | Pending |

## Page: Index

| Field | Details |
|---|---|
| **Original URL** | `/Blog/` |
| **Page name** | Index (Blog\Index.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | @blog.FeaturedImage |
| **Buttons/Links** | [@if (!string.IsNullOrEmpty(blog.FeaturedImage))
                                {
                                    
                                }
                                else
                                {
                                    
                                        
                                    
                                }
                                
                                    @if (!string.IsNullOrEmpty(firstTag))
                                    {
                                        @firstTag
                                    }
                                    @blog.Title
                                    @excerpt
                                    
                                        
                                            @(blog.AuthorName?[0].ToString().ToUpper() ?? "A")
                                            
                                                @blog.AuthorName
                                                
                                                    @(blog.PublishedAt.HasValue ? blog.PublishedAt.Value.ToString("MMM d, yyyy") : "")
                                                
                                            
                                        
                                        Read] -> /Blog/@blog.Slug<br>[@p] -> /Blog?page=@p |
| **SEO** | Title: Index |
| **New route** | `/blog/` |
| **Verification** | Pending |

## Page: Post

| Field | Details |
|---|---|
| **Original URL** | `/Blog/Post` |
| **Page name** | Post (Blog\Post.cshtml) |
| **Sections** | @Model.Title, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | @Model.FeaturedImage, @Model.AuthorImage |
| **Buttons/Links** | [Home] -> /<br>[Blog] -> /Blog<br>[@tag.Trim()] -> /Blog?tag=@Uri.EscapeDataString(tag.Trim())<br>[Twitter] -> https://twitter.com/intent/tweet?text=@Uri.EscapeDataString(Model.Title)&url=@Uri.EscapeDataString(canonical)<br>[LinkedIn] -> https://www.linkedin.com/sharing/share-offsite/?url=@Uri.EscapeDataString(canonical) |
| **SEO** | Title: Post |
| **New route** | `/blog/post` |
| **Verification** | Pending |

## Page: Index

| Field | Details |
|---|---|
| **Original URL** | `/Demo/` |
| **Page name** | Index (Demo\Index.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Book My Demo Call] -> button action<br>[🕐 ${s.display}] -> button action |
| **SEO** | Title: Index |
| **New route** | `/demo/` |
| **Verification** | Pending |

## Page: About

| Field | Details |
|---|---|
| **Original URL** | `/About` |
| **Page name** | About (Home\About.cshtml) |
| **Sections** | Section tag, Section tag, Section tag, Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/studycafe-black.png, ~/Images/studycafe-black.png |
| **Buttons/Links** | [sales@studycafe.in] -> mailto:sales@studycafe.in<br>[support@studycafe.in] -> mailto:support@studycafe.in<br>[support@studycafe.in] -> mailto:support@studycafe.in<br>[contact@studycafe.in] -> mailto:contact@studycafe.in<br>[info@studycafe.in] -> mailto:info@studycafe.in |
| **SEO** | Title: About |
| **New route** | `/about` |
| **Verification** | Pending |

## Page: Contact

| Field | Details |
|---|---|
| **Original URL** | `/Contact` |
| **Page name** | Contact (Home\Contact.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Send Message] -> button action<br>[+91 97738 44877] -> tel:+919773844877<br>[+91 80762 44551] -> tel:+918076244551<br>[sales@studycafe.in] -> mailto:sales@studycafe.in<br>[+91 96250 80264] -> tel:+919625080264 |
| **SEO** | Title: Contact |
| **New route** | `/contact` |
| **Verification** | Pending |

## Page: Disclaimer

| Field | Details |
|---|---|
| **Original URL** | `/Disclaimer` |
| **Page name** | Disclaimer (Home\Disclaimer.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [No Professional Advice] -> #no-advice<br>[No Guarantees] -> #no-guarantees<br>[Third-Party Services] -> #third-party<br>[Website Availability] -> #availability<br>[Limitation of Liability] -> #liability |
| **SEO** | Title: Disclaimer |
| **New route** | `/disclaimer` |
| **Verification** | Pending |

## Page: Download

| Field | Details |
|---|---|
| **Original URL** | `/Download` |
| **Page name** | Download (Home\Download.cshtml) |
| **Sections** | Section tag, Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Automation Cafe 1.0] -> /Downloads/AutomationCafe.exe<br>[Automation Cafe 2.0] -> /Downloads/@(ViewBag.Download20File ?? <br>[Don't run] -> button action<br>[Don't run] -> button action<br>[Run anyway] -> button action |
| **SEO** | Title: Download |
| **New route** | `/download` |
| **Verification** | Pending |

## Page: Ethics

| Field | Details |
|---|---|
| **Original URL** | `/Ethics` |
| **Page name** | Ethics (Home\Ethics.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [1. Accuracy and Reliability] -> #accuracy<br>[2. Transparency and Honesty] -> #transparency<br>[3. Professional Independence] -> #independence<br>[4. Client Privacy] -> #privacy<br>[5. Corrections & Improvement] -> #corrections |
| **SEO** | Title: Ethics |
| **New route** | `/ethics` |
| **Verification** | Pending |

## Page: HowToUse

| Field | Details |
|---|---|
| **Original URL** | `/HowToUse` |
| **Page name** | HowToUse (Home\HowToUse.cshtml) |
| **Sections** | Section tag, Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [All 33] -> button action<br>[Getting Started 1] -> button action<br>[Tally Suite 14] -> button action<br>[GST Suite 15] -> button action<br>[Income Tax Suite 2] -> button action |
| **SEO** | Title: HowToUse |
| **New route** | `/howtouse` |
| **Verification** | Pending |

## Page: Index

| Field | Details |
|---|---|
| **Original URL** | `/` |
| **Page name** | Index (Home\Index.cshtml) |
| **Sections** | Section tag, Section tag, Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/partners/Meta_tech_provider.svg, ~/Images/partners/Tally_authorised_partner.svg |
| **Buttons/Links** | [Download Free] -> @Url.Action(<br>[GST Returns] -> #features<br>[GST Reconciliation] -> #features<br>[AI Invoice to Tally (PDF)] -> #features<br>[Income Tax] -> #features |
| **SEO** | Title: Index |
| **New route** | `/` |
| **Verification** | Pending |

## Page: IndividualTools

| Field | Details |
|---|---|
| **Original URL** | `/IndividualTools` |
| **Page name** | IndividualTools (Home\IndividualTools.cshtml) |
| **Sections** | Section tag, Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Download Individual Tools (.ZIP)] -> /Downloads/IndividualTools.zip |
| **SEO** | Title: IndividualTools |
| **New route** | `/individualtools` |
| **Verification** | Pending |

## Page: NotFound404

| Field | Details |
|---|---|
| **Original URL** | `/NotFound404` |
| **Page name** | NotFound404 (Home\NotFound404.cshtml) |
| **Sections** | Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | None |
| **SEO** | Title: NotFound404 |
| **New route** | `/notfound404` |
| **Verification** | Pending |

## Page: Partner

| Field | Details |
|---|---|
| **Original URL** | `/Partner` |
| **Page name** | Partner (Home\Partner.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Submit Another Inquiry] -> /Partner<br>[Submit Partnership Inquiry] -> button action |
| **SEO** | Title: Partner |
| **New route** | `/partner` |
| **Verification** | Pending |

## Page: Pricing

| Field | Details |
|---|---|
| **Original URL** | `/Pricing` |
| **Page name** | Pricing (Home\Pricing.cshtml) |
| **Sections** | Section tag, Section tag, Section tag, Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Buy Now — ₹@planPrice.ToString("N0")/year] -> /Payment/Checkout<br>[Buy Now — ₹@planPrice.ToString("N0")] -> /Payment/Checkout<br>[+91 97738 44877] -> tel:+919773844877<br>[+91 80762 44551] -> tel:+918076244551<br>[sales@studycafe.in] -> mailto:sales@studycafe.in |
| **SEO** | Title: Pricing |
| **New route** | `/pricing` |
| **Verification** | Pending |

## Page: Privacy

| Field | Details |
|---|---|
| **Original URL** | `/Privacy` |
| **Page name** | Privacy (Home\Privacy.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [1. Information We Collect] -> #info-collect<br>[2. How We Use Your Information] -> #how-use<br>[3. Data Security] -> #data-security<br>[4. Third-Party Services] -> #third-party<br>[5. Contact Us] -> #contact |
| **SEO** | Title: Privacy |
| **New route** | `/privacy` |
| **Verification** | Pending |

## Page: Referral

| Field | Details |
|---|---|
| **Original URL** | `/Referral` |
| **Page name** | Referral (Home\Referral.cshtml) |
| **Sections** | Section tag, Section tag, Section tag, Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Go to Dashboard] -> /Referral/dashboard<br>[How It Works] -> #how-it-works<br>[Go to Dashboard] -> /Referral/dashboard<br>[Start Referring] -> /Referral/dashboard<br>[contact@studycafe.in] -> mailto:contact@studycafe.in |
| **SEO** | Title: Referral |
| **New route** | `/referral` |
| **Verification** | Pending |

## Page: Refund

| Field | Details |
|---|---|
| **Original URL** | `/Refund` |
| **Page name** | Refund (Home\Refund.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [1. Custom Development] -> #custom<br>[2. Digital Products] -> #digital<br>[3. Subscriptions] -> #subscription<br>[4. Project Cancellation] -> #cancellation<br>[5. Service Delays] -> #delays |
| **SEO** | Title: Refund |
| **New route** | `/refund` |
| **Verification** | Pending |

## Page: Services

| Field | Details |
|---|---|
| **Original URL** | `/Services` |
| **Page name** | Services (Home\Services.cshtml) |
| **Sections** | Section tag, Section tag, Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [All Tools] -> button action<br>[GST] -> button action<br>[Income Tax] -> button action<br>[Tally] -> button action<br>[PDF] -> button action |
| **SEO** | Title: Services |
| **New route** | `/services` |
| **Verification** | Pending |

## Page: TallyPartner

| Field | Details |
|---|---|
| **Original URL** | `/TallyPartner` |
| **Page name** | TallyPartner (Home\TallyPartner.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Submit Another Inquiry] -> /TallyPartner<br>[Submit Application] -> button action |
| **SEO** | Title: TallyPartner |
| **New route** | `/tallypartner` |
| **Verification** | Pending |

## Page: Terms

| Field | Details |
|---|---|
| **Original URL** | `/Terms` |
| **Page name** | Terms (Home\Terms.cshtml) |
| **Sections** | Section tag, Section tag |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Website Usage] -> #usage<br>[Intellectual Property] -> #ip<br>[User Conduct] -> #conduct<br>[Third-Party Links] -> #links<br>[Disclaimer] -> #disclaimer |
| **SEO** | Title: Terms |
| **New route** | `/terms` |
| **Verification** | Pending |

## Page: Checkout

| Field | Details |
|---|---|
| **Original URL** | `/Payment/Checkout` |
| **Page name** | Checkout (Payment\Checkout.cshtml) |
| **Sections** | Complete your purchase |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/automationcafe-white.png |
| **Buttons/Links** | [Call +91 97738 44877] -> tel:+919773844877<br>[Request Quick Callback] -> button action<br>[Available Offers (@liveCoupons.Count)] -> javascript:void(0)<br>[Apply] -> button action<br>[Apply] -> button action |
| **SEO** | Title: Checkout |
| **New route** | `/payment/checkout` |
| **Verification** | Pending |

## Page: ThankYou

| Field | Details |
|---|---|
| **Original URL** | `/Payment/ThankYou` |
| **Page name** | ThankYou (Payment\ThankYou.cshtml) |
| **Sections** | Payment Successful! |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Download Automation Cafe] -> /Downloads<br>[contact@studycafe.in] -> mailto:contact@studycafe.in |
| **SEO** | Title: ThankYou |
| **New route** | `/payment/thankyou` |
| **Verification** | Pending |

## Page: Dashboard

| Field | Details |
|---|---|
| **Original URL** | `/Referral/Dashboard` |
| **Page name** | Dashboard (Referral\Dashboard.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Copy Link] -> button action<br>[Share] -> https://api.whatsapp.com/send?text=@waShareText<br>[View all earnings →] -> /Referral/earnings |
| **SEO** | Title: Dashboard |
| **New route** | `/referral/dashboard` |
| **Verification** | Pending |

## Page: Earnings

| Field | Details |
|---|---|
| **Original URL** | `/Referral/Earnings` |
| **Page name** | Earnings (Referral\Earnings.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Request Withdrawal] -> button action |
| **SEO** | Title: Earnings |
| **New route** | `/referral/earnings` |
| **Verification** | Pending |

## Page: Profile

| Field | Details |
|---|---|
| **Original URL** | `/Referral/Profile` |
| **Page name** | Profile (Referral\Profile.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | [Save Bank Details] -> button action |
| **SEO** | Title: Profile |
| **New route** | `/referral/profile` |
| **Verification** | Pending |

## Page: Error

| Field | Details |
|---|---|
| **Original URL** | `/Shared/Error` |
| **Page name** | Error (Shared\Error.cshtml) |
| **Sections** | Error., An error occurred while processing your request., Development Mode |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | None |
| **SEO** | Title: Error |
| **New route** | `/shared/error` |
| **Verification** | Pending |

## Page: _AuthorsLayout

| Field | Details |
|---|---|
| **Original URL** | `/Shared/_AuthorsLayout` |
| **Page name** | _AuthorsLayout (Shared\_AuthorsLayout.cshtml) |
| **Sections** | @(ViewData["Title"] ?? "Authors Portal") |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/automationcafe-white.png |
| **Buttons/Links** | [Dashboard] -> /AuthorsAdmin<br>[Partner Queries] -> /AuthorsAdmin/PartnerInquiries<br>[Tally Partners] -> /AuthorsAdmin/TallyPartnerInquiries<br>[Demo Bookings] -> /AuthorsAdmin/DemoBookings<br>[Create Author] -> /AuthorsAdmin/CreateAuthor |
| **SEO** | Title: _AuthorsLayout |
| **New route** | `/shared/_authorslayout` |
| **Verification** | Pending |

## Page: _ReferralLayout

| Field | Details |
|---|---|
| **Original URL** | `/Shared/_ReferralLayout` |
| **Page name** | _ReferralLayout (Shared\_ReferralLayout.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | ~/Images/automationcafe-white.png |
| **Buttons/Links** | [Dashboard] -> /Referral/dashboard<br>[My Earnings] -> /Referral/earnings<br>[My Profile] -> /Referral/profile<br>[Main Site] -> /<br>[Logout] -> button action |
| **SEO** | Title: _ReferralLayout |
| **New route** | `/shared/_referrallayout` |
| **Verification** | Pending |

## Page: _ValidationScriptsPartial

| Field | Details |
|---|---|
| **Original URL** | `/Shared/_ValidationScriptsPartial` |
| **Page name** | _ValidationScriptsPartial (Shared\_ValidationScriptsPartial.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | None |
| **SEO** | Title: _ValidationScriptsPartial |
| **New route** | `/shared/_validationscriptspartial` |
| **Verification** | Pending |

## Page: _ViewImports

| Field | Details |
|---|---|
| **Original URL** | `/_ViewImports` |
| **Page name** | _ViewImports (_ViewImports.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | None |
| **SEO** | Title: _ViewImports |
| **New route** | `/_viewimports` |
| **Verification** | Pending |

## Page: _ViewStart

| Field | Details |
|---|---|
| **Original URL** | `/_ViewStart` |
| **Page name** | _ViewStart (_ViewStart.cshtml) |
| **Sections** | None |
| **Content source** | Hardcoded HTML / Razor Model |
| **Images/videos** | None |
| **Buttons/Links** | None |
| **SEO** | Title: _ViewStart |
| **New route** | `/_viewstart` |
| **Verification** | Pending |

