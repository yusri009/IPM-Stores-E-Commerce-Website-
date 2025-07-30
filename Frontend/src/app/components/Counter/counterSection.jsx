'use client';
import Counter from './counter';

function CounterSection() {
  return (
    <section className="py-12 bg-blue-600 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Counter end={2} label="Branches" duration={2200} />
          <Counter end={20} label="Years" duration={2000} />
          <Counter end={750} label="Customers/Day" suffix="+" duration={2400} />
          <Counter end={7000} label="Trusted Customers" suffix="+" duration={2600} />
        </div>
      </div>
    </section>
  );
}

export default CounterSection;
