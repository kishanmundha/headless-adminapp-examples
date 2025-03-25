import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/talent-desk/dashboard');

  return <div>Home</div>;
}
