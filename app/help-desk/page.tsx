import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/help-desk/board');

  return <div>Home</div>;
}
