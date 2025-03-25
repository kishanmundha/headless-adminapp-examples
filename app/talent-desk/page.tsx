import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/talent-desk/data/jobs');

  return <div>Home</div>;
}
