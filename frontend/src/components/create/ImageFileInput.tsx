import { useMemo } from 'react';

import useDragAndDrop from '@/hooks/useDragAndDrop';

import Box from '../icon/Box';
import Camera from '../icon/Camera';

export default function ImageFileInput({
  files,
  setFiles,
}: {
  files: File[];
  setFiles: (files: File[]) => void;
}) {
  const { dragActive, handleDragOver, handleDragLeave, handleDrop } =
    useDragAndDrop<HTMLLabelElement>({
      onAfterDrop: (event) => {
        const files = event.dataTransfer.files;
        setFiles(Array.from(files));
      },
    });

  const image_preview = useMemo(() => {
    if (files.length > 0) {
      return URL.createObjectURL(files[0]);
    }
    return null;
  }, [files]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    setFiles(Array.from(files));
  };

  return (
    <div>
      <label
        htmlFor="pin"
        className="cursor-pointer overflow-hidden shrink-0 w-[300px] h-[400px]  bg-gray-200 rounded-2xl flex justify-center items-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {files.length > 0 && (
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {image_preview && <img src={image_preview} alt="uploaded" />}
          </div>
        )}
        {files.length === 0 && (
          <div className="flex flex-col items-center">
            {!dragActive ? <Camera /> : <Box className="w-10 h-10" />}
            <p className="text-center">
              파일을 선택하거나
              <br /> 여기로 끌어다 놓으세요.
            </p>
          </div>
        )}
      </label>
      <input
        id="pin"
        type="file"
        accept="image/*"
        className="hidden"
        multiple={false}
        onChange={handleFileChange}
      />
    </div>
  );
}
