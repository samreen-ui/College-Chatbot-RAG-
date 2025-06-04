// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="KMIT College Website Chatbot - Interact with Vidya, your personal assistant." />
                <title>KMIT College Website</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}