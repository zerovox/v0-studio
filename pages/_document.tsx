import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto+Slab&family=Source+Serif+Pro:ital,wght@0,300;0,400;1,300;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="selection:bg-red-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
