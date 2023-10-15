import 'tailwindcss/tailwind.css'

function SafeHydrate({ children }) {
  return (
    <div suppressHydrationWarning>
      <title>Med Info</title>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return <SafeHydrate><Component {...pageProps} /></SafeHydrate>
}

export default MyApp