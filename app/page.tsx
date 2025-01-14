import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/help-desk');

  return <div>Home</div>;
}
