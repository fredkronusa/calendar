import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <div class="logo-wrapper"><img src='logo.jpg' className='logo'/></div>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
