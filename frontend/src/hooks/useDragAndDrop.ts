import { useState } from 'react';

const useDragAndDrop = <T extends HTMLElement>({
  onAfterDrop,
}: {
  onAfterDrop: (event: React.DragEvent<T>) => void;
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (event: React.DragEvent<T>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<T>) => {
    event.preventDefault();
    setDragActive(false);
    onAfterDrop(event);
  };

  return {
    dragActive,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};

export default useDragAndDrop;
