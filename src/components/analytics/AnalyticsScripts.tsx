import Script from "next/script";

/**
 * Validates whether a Google Analytics Measurement ID is well-formed and not a placeholder.
 * Must match format: G-[A-Za-z0-9]+
 */
export function isValidGaId(id?: string): id is string {
  if (!id) return false;
  const trimmed = id.trim();
  if (!trimmed.startsWith("G-")) return false;
  if (/^G-X+$/i.test(trimmed)) return false; // Ignore placeholders like G-XXXXXXXXXX
  return /^G-[A-Za-z0-9]+$/.test(trimmed);
}

/**
 * Validates whether a Google Tag Manager Container ID is well-formed and not a placeholder.
 * Must match format: GTM-[A-Za-z0-9]+
 */
export function isValidGtmId(id?: string): id is string {
  if (!id) return false;
  const trimmed = id.trim();
  if (!trimmed.startsWith("GTM-")) return false;
  if (/^GTM-X+$/i.test(trimmed)) return false; // Ignore placeholders like GTM-XXXXXX
  return /^GTM-[A-Za-z0-9]+$/.test(trimmed);
}

/**
 * High-Performance Analytics Scripts Loader (GA4 + GTM).
 *
 * Designed according to Core Web Vitals best practices:
 * 1. Zero-Cost when inactive: If IDs are missing or placeholders, renders nothing (0 KB footprint).
 * 2. Asynchronous Execution: Uses `strategy="afterInteractive"` so scripts never block hydration,
 *    FCP (First Contentful Paint), or LCP (Largest Contentful Paint).
 * 3. Auto-Activation: As soon as NEXT_PUBLIC_GA_ID or NEXT_PUBLIC_GTM_ID is added in .env.local,
 *    tracking begins automatically without touching codebase.
 */
export function AnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  const hasGa = isValidGaId(gaId);
  const hasGtm = isValidGtmId(gtmId);

  if (!hasGa && !hasGtm) {
    return null;
  }

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Google Analytics 4 (GA4) Script Injection                          */}
      {/* ------------------------------------------------------------------ */}
      {hasGa && (
        <>
          <Script
            id="google-analytics-gtag"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          />
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `,
            }}
          />
        </>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Google Tag Manager (GTM) Container Script Injection                 */}
      {/* ------------------------------------------------------------------ */}
      {hasGtm && (
        <Script
          id="google-tag-manager-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `,
          }}
        />
      )}
    </>
  );
}

/**
 * GTM No-Script Fallback.
 * Safely renders the standard GTM iframe inside <body> for users with JavaScript disabled.
 */
export function GoogleTagManagerNoScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!isValidGtmId(gtmId)) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
