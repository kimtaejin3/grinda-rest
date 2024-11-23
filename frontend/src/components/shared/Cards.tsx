import Cover01 from '@/assets/cover01.jpeg';
import Cover02 from '@/assets/cover02.jpeg';
import Cover03 from '@/assets/cover03.jpeg';
import Cover04 from '@/assets/cover04.jpeg';
import Cover05 from '@/assets/cover05.jpeg';
import Cover06 from '@/assets/cover06.jpeg';
import Cover07 from '@/assets/cover07.jpeg';
import Cover08 from '@/assets/cover08.jpeg';
import Cover09 from '@/assets/cover09.jpeg';
import Cover10 from '@/assets/cover10.jpeg';
import Cover11 from '@/assets/cover11.jpeg';
import Cover12 from '@/assets/cover12.jpg';
import { $ } from '@/lib/core';

import Card from './Card';

const covers = [
  Cover01,
  Cover02,
  Cover03,
  Cover04,
  Cover05,
  Cover06,
  Cover07,
  Cover08,
  Cover09,
  Cover10,
  Cover11,
  Cover12,
  Cover01,
  Cover02,
  Cover03,
  Cover04,
  Cover05,
  Cover06,
];

export default function Cards({ className }: { className?: string }) {
  return (
    <div className={$(`columns-2 md:columns-4 space-y-5 gap-4`, className)}>
      {covers.map((cover, index) => (
        <Card key={index} cover={cover} />
      ))}
    </div>
  );
}
// export default function Cards({ className }: { className?: string }) {
//   return (
//     <ul
//       className={$(
//         'columns-4 gap-2 sm:gap-4 md:columns-5 lg:columns-5 space-y-3',
//         className
//       )}
//     >
//       {covers.map((cover, index) => (
//         <li className="" key={index}>
//           <div className="bg-gray-100 rounded-lg overflow-hidden">
//             <Image
//               className="w-full object-cover"
//               src={cover}
//               alt="logo"
//               width={100}
//             />
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
