import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/service-booking/calendar');

  return <div>Home</div>;
}
