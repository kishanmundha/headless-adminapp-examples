import dynamic from 'next/dynamic';
const AppLayout = dynamic(() => import('./AppLayout'), {
  ssr: false,
});

export const metadata = {
  title: 'Help Desk',
  description: 'Help Desk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
