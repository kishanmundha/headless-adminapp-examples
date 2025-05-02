import dynamic from 'next/dynamic';
const RootLayout = dynamic(() => import('./RootLayout'), {
  ssr: false,
});
export const metadata = {
  title: 'Sales Hub',
  description: 'Sales Hub',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootLayout>{children}</RootLayout>;
}
