import Script from 'next/script';
import './styles.css';
import ThemeLayout from './ThemeLayout';
import { Viewport } from 'next';

const isDev = process.env.NODE_ENV === 'development';
const clarityDisabled = process.env.CLARITY_DISABLED === 'true';

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  minimumScale: 1,
};

export const metadata = {
  title: 'Headless AdminApp',
  description: 'Headless AdminApp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>{!isDev && !clarityDisabled && <Script src="/clarity.js" />}</head>
      <body>
        <ThemeLayout>{children}</ThemeLayout>
      </body>
    </html>
  );
}
