import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/sales-hub/dashboard');

  return <div>Home</div>;
}
