import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <div className="logo-wrapper"><img src='logo.png' className='logo'/></div>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
