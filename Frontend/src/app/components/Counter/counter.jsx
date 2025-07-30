import { useState, useEffect } from 'react';

function Counter({ end, duration = 2000, label, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [end, duration]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-white mb-2">
        {count.toLocaleString()}
        {suffix}
      </div>
      <h2 className="text-white text-lg font-medium">{label}</h2>
    </div>
  );
}

export default Counter;
