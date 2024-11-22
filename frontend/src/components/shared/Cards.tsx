import Image from 'next/image';

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
import { $ } from '@/lib/core';

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
];

export default function Cards({ className }: { className?: string }) {
  return (
    <ul className={$('flex flex-wrap mx-[-0.5rem]', className)}>
      {Array.from({ length: 10 }).map((_, index) => (
        <li className="w-[20%] px-2 py-2 h-[330px]" key={index}>
          <div className="bg-gray-100 rounded-lg overflow-hidden h-full flex items-center">
            <Image
              className="w-full object-cover"
              src={covers[index]}
              alt="logo"
              width={100}
              //   height={100}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
// export default function Cards({ className }: { className?: string }) {
//   return (
//     <ul className={$('flex flex-wrap mx-[-0.5rem]', className)}>
//       {Array.from({ length: 10 }).map((_, index) => (
//         <li className="w-[14.2857%] px-2 py-2" key={index}>
//           <div className="bg-blue-300 rounded-lg overflow-hidden">
//             <Image
//               className="w-full object-cover"
//               src={covers[index]}
//               alt="logo"
//               width={100}
//               height={100}
//             />
//           </div>
//         </li>
//       ))}
//     </ul>
//   );
// }
