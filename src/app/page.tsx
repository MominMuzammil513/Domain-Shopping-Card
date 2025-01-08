import { Challenge } from '@/components/Challenge';

export default function Home() {
  return (
    <main>
      {/* Render the Challenge component with the required number of domains */}
      <Challenge numDomainsRequired={5} />
    </main>
  );
}
