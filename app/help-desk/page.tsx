import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/help-desk/data/tickets');

  return <div>Home</div>;
}
