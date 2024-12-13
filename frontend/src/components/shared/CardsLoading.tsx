import { $ } from '@/lib/core';

export default function CardsLoading({
  className,
  count,
}: {
  className?: string;
  count: number;
}) {
  // Define the possible height classes
  const heightClasses = ['h-[180px]', 'h-[300px]', 'h-[250px]', 'h-[200px]'];
  
  return (
    <div className={$(`columns-2 md:columns-4 space-y-5 gap-5`, className)}>
      {Array.from({ length: count }).map((_, index) => {
        // Select a random height class
        const randomHeightClass =
          heightClasses[Math.floor(Math.random() * heightClasses.length)];
        return (
          <div
            key={index}
            className={`bg-gray-200 ${randomHeightClass} rounded-lg shadow animate-pulse duration-700`}
          >
            <span className="text-gray-200">this is for skeleton ui</span>
          </div>
        );
      })}
    </div>
  );
}
