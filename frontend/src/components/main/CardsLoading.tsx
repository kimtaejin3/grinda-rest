import { $ } from '@/lib/core';

const heightClasses = [
  'h-[180px]',
  'h-[200px]',
  'h-[250px]',
  'h-[300px]',
  'h-[400px]',
];

interface CardsLoadingProps {
  className?: string;
  columns?: number;
  itemsPerColumn?: number;
}

export default function CardsLoading({
  className,
  columns = 4,
  itemsPerColumn = 5,
}: CardsLoadingProps) {
  const getHeightClass = (index: number) => {
    const seed = (index * 13) % heightClasses.length;
    return heightClasses[seed];
  };

  return (
    <div className={$(`grid md:grid-cols-4 grid-cols-2 gap-5`, className)}>
      {Array.from({ length: columns }).map((_, columnIndex) => (
        <div key={columnIndex} className="flex flex-col gap-4">
          {Array.from({ length: itemsPerColumn }).map((_, index) => {
            const heightClass = getHeightClass(
              columnIndex * itemsPerColumn + index
            );
            return (
              <div
                key={index}
                className={`bg-gray-200 ${heightClass} rounded-lg shadow animate-pulse duration-200`}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
