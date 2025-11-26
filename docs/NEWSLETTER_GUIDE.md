# Trendy Tech Tribe Newsletter Guide

## 1. Strategy & Voice
**The Vibe:** "Tribal Cyberpunk." We separate signal from noise.
**The Voice:** Authoritative, forward-looking, slightly edgy, but helpful.
**The Goal:** Drive traffic back to the site and build a loyal "Tribe."

### Content Mix
*   **The Manifesto (Welcome Email):** Sets the tone. "You didn't just subscribe, you joined the Tribe."
*   **The Curated Drop (Weekly):** 
    *   1 Featured Story (Deep dive)
    *   2-3 "Fresh Drops" (Quick links to new articles/deals)
    *   1 "Quick Hit" (Text-only link to a high-value article)

## 2. Technical Best Practices (CRITICAL)
Email clients are old and picky. Follow these rules or your email will break.

*   **Absolute URLs Only:** NEVER use `/images/logo.png`. ALWAYS use `https://trendytechtribe.com/images/logos/logo.png`.
*   **Images:**
    *   Use **PNG** or **JPG**. Avoid WebP (Outlook hates it).
    *   Always set `width` and `height` attributes on `<img>` tags.
    *   Always include `alt` text.
*   **CSS:** Keep it inline or in the `<head>` style block. Do not use external stylesheets.
*   **Layout:** Tables are king. We use nested `<table>` structures for compatibility.

## 3. Templates

### A. The "Welcome to the Tribe" Template
Use this for the very first email a user receives.

**Subject:** Welcome to the Tribe 🌐
**Preview Text:** You're in. Inside: Agentic AI, the best tech gifts under $100, and more.

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Welcome to the Tribe</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Space+Grotesk:wght@700&display=swap" rel="stylesheet" type="text/css" />
  <style type="text/css">
    /* Reset & Basics */
    *{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}
    body{margin:0;padding:0;font-family:'Inter',helvetica,arial,sans-serif;background-color:#0a0614;color:#f0f0ff;}
    table{border-spacing:0;border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}
    img{border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;display:block;}
    a{color:#00ffff;text-decoration:none;}
    
    /* Utilities */
    .btn-primary:hover {
      box-shadow: 0 0 20px rgba(255, 0, 255, 0.6) !important;
    }

    /* Responsive */
    @media screen and (max-width:640px){
      .container{width:100%!important;max-width:100%!important;}
      .mobile-padding{padding-left:20px!important;padding-right:20px!important;}
      .stack-column{display:block!important;width:100%!important;max-width:100%!important;direction:ltr!important;}
      .mobile-center{text-align:center!important;}
      .mobile-image{width:100%!important;height:auto!important;}
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#0a0614;font-family:'Inter',helvetica,arial,sans-serif;">
  <center>
    <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#0a0614">
      <tr>
        <td align="center" valign="top" style="padding:20px 0;">
          
          <!-- PREHEADER -->
          <div style="display:none;font-size:1px;color:#0a0614;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
            You're in. Inside: Agentic AI, the best tech gifts under $100, and why your cat needs a robot.
          </div>

          <!-- MAIN CONTAINER -->
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0" bgcolor="#0a0614" style="width:600px;max-width:600px;">
            
            <!-- LOGO / HEADER -->
            <tr>
              <td align="center" style="padding:30px 0 40px;">
                <a href="https://trendytechtribe.com" target="_blank">
                  <img src="https://trendytechtribe.com/images/logos/logo.svg" width="200" height="200" alt="Trendy Tech Tribe" style="display:block;width:200px;height:auto;" />
                </a>
              </td>
            </tr>

            <!-- MANIFESTO INTRO -->
            <tr>
              <td class="mobile-padding" align="left" style="padding:0 20px 40px;">
                <h2 style="margin:0 0 15px;font-family:'Space Grotesk',helvetica,arial,sans-serif;font-size:24px;font-weight:700;color:#f0f0ff;">
                  Welcome to the <span style="color:#ff00ff;">Future.</span>
                </h2>
                <p style="margin:0;font-size:16px;line-height:26px;color:#b8b8d4;">
                  You didn't just subscribe to a newsletter; you joined the Tribe. We are here to separate the signal from the noise, navigating the neon-soaked landscape of tomorrow's tech.
                  <br><br>
                  Here is your first download.
                </p>
              </td>
            </tr>

            <!-- FEATURED STORY CARD -->
            <tr>
              <td class="mobile-padding" style="padding:0 20px 40px;">
                <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#1a0f3d" style="background-color:#1a0f3d;border:1px solid #2d1b69;border-radius:12px;overflow:hidden;">
                  <tr>
                    <td class="mobile-image" height="200" style="background-color:#2d1b69;background-image:url('https://trendytechtribe.com/images/articles/agentic-ai-rise-2025.png');background-size:cover;background-position:center;">
                      <!-- Fallback Image -->
                      <a href="https://trendytechtribe.com/ai/agentic-ai-rise-2025" style="text-decoration:none;">
                        <img src="https://trendytechtribe.com/images/articles/agentic-ai-rise-2025.png" width="600" height="200" alt="Agentic AI" style="width:100%;height:auto;display:block;opacity:0;" />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:30px;">
                      <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#00ffff;text-transform:uppercase;letter-spacing:1px;">Featured Story</p>
                      <h3 style="margin:0 0 15px;font-family:'Space Grotesk',helvetica,arial,sans-serif;font-size:22px;font-weight:700;color:#f0f0ff;">
                        Agentic AI is Here. Are You Ready?
                      </h3>
                      <p style="margin:0 0 25px;font-size:15px;line-height:24px;color:#b8b8d4;">
                        We are moving beyond chatbots. 2025 is the year AI starts <em>doing</em> things for you. Discover how Agentic AI is rewriting the rules of productivity.
                      </p>
                      <table cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td align="center" style="background:linear-gradient(135deg, #ff00ff 0%, #00ffff 100%);border-radius:6px;">
                            <a href="https://trendytechtribe.com/ai/agentic-ai-rise-2025" style="display:block;padding:12px 25px;font-family:'Inter',sans-serif;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;">Read the Story</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- SECTION HEADER: FRESH DROPS -->
            <tr>
              <td class="mobile-padding" align="left" style="padding:0 20px 20px;">
                <h3 style="margin:0;font-family:'Space Grotesk',helvetica,arial,sans-serif;font-size:18px;font-weight:700;color:#f0f0ff;border-bottom:1px solid #2d1b69;padding-bottom:10px;">
                  Fresh Drops & Picks
                </h3>
              </td>
            </tr>

            <!-- TWO COLUMN GRID -->
            <tr>
              <td class="mobile-padding" style="padding:0 20px 40px;">
                <table width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <!-- Left Column -->
                    <td class="stack-column" width="270" valign="top" style="padding-bottom:20px;">
                      <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#1a0f3d" style="background-color:#1a0f3d;border-radius:8px;border:1px solid #2d1b69;">
                        <tr>
                          <td height="150" style="background-color:#2d1b69;border-radius:8px 8px 0 0;background-image:url('https://trendytechtribe.com/images/articles/tech-gifts-under-100-2025.png');background-size:cover;background-position:center;">
                             <a href="https://trendytechtribe.com/picks/best-tech-gifts-under-100-holiday-2025" style="text-decoration:none;">
                               <img src="https://trendytechtribe.com/images/articles/tech-gifts-under-100-2025.png" width="270" height="150" alt="Tech Gifts Under $100" style="width:100%;height:auto;display:block;opacity:0;" />
                             </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px;">
                            <h4 style="margin:0 0 10px;font-family:'Space Grotesk',sans-serif;font-size:16px;color:#f0f0ff;">Best Tech Under $100</h4>
                            <p style="margin:0 0 15px;font-size:14px;line-height:22px;color:#b8b8d4;">Premium gear doesn't have to break the bank. Here is our curated list.</p>
                            <a href="https://trendytechtribe.com/picks/best-tech-gifts-under-100-holiday-2025" style="font-size:14px;font-weight:600;color:#00ffff;">Get the List &rarr;</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                    
                    <!-- Spacer -->
                    <td class="stack-column" width="20" style="font-size:0;line-height:0;">&nbsp;</td>

                    <!-- Right Column -->
                    <td class="stack-column" width="270" valign="top" style="padding-bottom:20px;">
                      <table width="100%" cellspacing="0" cellpadding="0" border="0" bgcolor="#1a0f3d" style="background-color:#1a0f3d;border-radius:8px;border:1px solid #2d1b69;">
                        <tr>
                          <td height="150" style="background-color:#2d1b69;border-radius:8px 8px 0 0;background-image:url('https://trendytechtribe.com/images/articles/tech-cat-gifts-2025.png');background-size:cover;background-position:center;">
                             <a href="https://trendytechtribe.com/picks/tech-christmas-gifts-for-cats" style="text-decoration:none;">
                               <img src="https://trendytechtribe.com/images/articles/tech-cat-gifts-2025.png" width="270" height="150" alt="Tech Gifts for Cats" style="width:100%;height:auto;display:block;opacity:0;" />
                             </a>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:20px;">
                            <h4 style="margin:0 0 10px;font-family:'Space Grotesk',sans-serif;font-size:16px;color:#f0f0ff;">Tech Gifts for Cats?</h4>
                            <p style="margin:0 0 15px;font-size:14px;line-height:22px;color:#b8b8d4;">Smart feeders, laser bots, and more. Upgrade your feline's life.</p>
                            <a href="https://trendytechtribe.com/picks/tech-christmas-gifts-for-cats" style="font-size:14px;font-weight:600;color:#00ffff;">See the Guide &rarr;</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- QUICK HIT TEXT LINK -->
            <tr>
              <td class="mobile-padding" align="center" style="padding:0 20px 40px;">
                <p style="margin:0;font-size:14px;color:#b8b8d4;">
                  Thinking about an EV? <a href="https://trendytechtribe.com/evs/used-tesla-model-3-value-analysis-2025" style="color:#ff00ff;text-decoration:underline;">Read why a used Model 3 might be the best value in 2025.</a>
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td align="center" style="padding:40px 20px;border-top:1px solid #2d1b69;background-color:#0f091f;">
                <p style="margin:0 0 20px;font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:#f0f0ff;text-transform:uppercase;letter-spacing:1px;">
                  Trendy Tech Tribe
                </p>
                <p style="margin:0 0 20px;font-size:12px;color:#8787a8;">
                  Separating signal from noise.
                </p>
                <p style="margin:0;font-size:12px;color:#555577;">
                  <a href="{{ unsubscribe }}" style="color:#555577;text-decoration:underline;">Unsubscribe</a> | <a href="{{ mirror }}" style="color:#555577;text-decoration:underline;">View in Browser</a>
                </p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>
```

## 4. Brevo Setup
1.  Go to **Campaigns > Email**.
2.  Create a new campaign.
3.  In the **Design** step, choose **"Code your own"** (or "Paste your code").
4.  Paste the HTML from above.
5.  **Important:** Check the "Preview" on Mobile to ensure the logo and columns stack correctly.
