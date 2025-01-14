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
      <body>{children}</body>
    </html>
  );
}
