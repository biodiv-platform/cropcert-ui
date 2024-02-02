import { SITE_TITLE } from "@static/constants";
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
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
          <link
            rel="stylesheet"
            href="https://unpkg.com/react-leaflet-markercluster/dist/styles.min.css"
          />
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
