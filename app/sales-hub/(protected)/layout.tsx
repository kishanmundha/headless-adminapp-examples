import dynamic from 'next/dynamic';
const AppLayout = dynamic(() => import('./AppLayout'), {
  ssr: false,
});

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppLayout>{children}</AppLayout>;
}
