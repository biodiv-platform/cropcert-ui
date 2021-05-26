import { SITE_TITLE } from "@static/constants";
import { customTheme } from "@static/theme";
import { jsontocss } from "@utils/style";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content="#2f855a" />
          <meta name="Description" content={SITE_TITLE} />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" href="/android-chrome-192x192.png" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.6.0/leaflet.css"
          />
          <style>{jsontocss(customTheme)}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
