import Script from 'next/script';
import './styles.css';

const isDev = process.env.NODE_ENV === 'development';

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
      <head>{!isDev && <Script src="/clarity.js" />}</head>
      <body>{children}</body>
    </html>
  );
}
