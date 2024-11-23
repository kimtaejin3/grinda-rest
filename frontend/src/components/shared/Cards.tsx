import Image, { StaticImageData } from 'next/image';

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

import Like from '../icon/Like';

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
  Cover07,
  Cover08,
  Cover09,
  Cover10,
  Cover11,
  Cover12,
  Cover10,
  Cover11,
  Cover12,
  Cover07,
  Cover08,
  Cover09,
  Cover10,
];

export default function Cards({ className }: { className?: string }) {
  return (
    <div className={$(`grid grid-cols-2 md:grid-cols-4 gap-4`, className)}>
      {covers.map((cover, index) => (
        <div
          key={index}
          className="rounded-lg overflow-hidden cursor-pointer h-[250px] relative hover:scale-105 transition-all duration-300"
        >
          <div className="h-full relative">
            <Image
              className=" h-full object-cover"
              src={cover as StaticImageData}
              alt=""
            />
          </div>
          <div className="absolute flex justify-between z-10 bottom-0 bg-black text-white opacity-60 right-0 left-0 py-2 px-4">
            <p className="text-sm">짱구는 잘말려</p>
            <div className="flex items-center gap-1">
              <Like />
              <p className="text-sm">12</p>
            </div>
          </div>
        </div>
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
