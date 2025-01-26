import Script from 'next/script';

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
      <head>
        <Script src="/clarity.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
