import SITE_CONFIG from "@configs/site-config";
import { SITE_TITLE } from "@static/constants";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import { DefaultSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function Metadata() {
  const router = useRouter();
  const canonical = SITE_CONFIG.SITE.URL + router.asPath;
  const { lang } = useTranslation();

  return (
    <>
      <DefaultSeo
        title={SITE_TITLE}
        canonical={canonical}
        description={SITE_CONFIG.SITE.DESCRIPTION}
        openGraph={{
          type: "website",
          locale: lang,
          url: canonical,
          title: SITE_TITLE,
          site_name: SITE_TITLE,
          description: SITE_CONFIG.SITE.DESCRIPTION,
        }}
        twitter={{
          handle: SITE_CONFIG.FOOTER.SOCIAL.TWITTER.HANDLE,
          site: SITE_CONFIG.FOOTER.SOCIAL.TWITTER.HANDLE,
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      {SITE_CONFIG.TRACKING.ENABLED && (
        <>
          <Script
            type="text/partytown"
            strategy="worker"
            src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.TRACKING.GA_ID}`}
          />
          <Script
            type="text/partytown"
            strategy="worker"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'SITE_CONFIG.TRACKING.GA_ID');
        `,
            }}
          />
        </>
      )}
    </>
  );
}
