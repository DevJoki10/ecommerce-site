import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import CategoryMegaMenu from '@/components/navigation/CategoryMegaMenu';
import Script from 'next/script';
import AuthProvider from '@/components/auth/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KJ Electronics - Nigeria\'s No. 1 Electronics & Components Store',
  description: 'Shop for Arduino, Raspberry Pi, sensors, resistors, capacitors, audio equipment, and electronics components. Fast delivery across Nigeria. Quality guaranteed.',
  keywords: 'electronics, components, Arduino, Raspberry Pi, sensors, resistors, capacitors, Nigeria, online store',
  authors: [{ name: 'KJ Electronics' }],
  openGraph: {
    title: 'KJ Electronics - Nigeria\'s Premier Electronics Store',
    description: 'Discover quality electronics components, sensors, and technology solutions with fast delivery across Nigeria.',
    url: 'https://kjelectronics.com',
    siteName: 'KJ Electronics',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KJ Electronics - Electronics Components Store',
      },
    ],
    locale: 'en_NG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KJ Electronics - Nigeria\'s No. 1 Electronics Store',
    description: 'Shop for quality electronics components with fast delivery across Nigeria.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://kjelectronics.com" />
        <link rel="alternate" hrefLang="en-ng" href="https://kjelectronics.com" />
        <link rel="alternate" hrefLang="en" href="https://kjelectronics.com/en" />
        <meta name="geo.region" content="NG" />
        <meta name="geo.placename" content="Nigeria" />
        <meta name="ICBM" content="9.0820, 8.6753" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
        
        {/* Tidio Chat Widget */}
        <Script
          src="//code.tidio.co/your-tidio-key.js"
          strategy="afterInteractive"
        />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "KJ Electronics",
              "url": "https://kjelectronics.com",
              "logo": "https://kjelectronics.com/logo.png",
              "description": "Nigeria's premier electronics and components store",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "NG",
                "addressRegion": "Lagos"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+234-123-456-7890",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://facebook.com/kjelectronics",
                "https://twitter.com/kjelectronics",
                "https://instagram.com/kjelectronics"
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
