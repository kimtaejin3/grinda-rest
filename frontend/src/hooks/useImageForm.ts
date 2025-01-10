import { useState } from 'react';

import { ImageFormData } from '@/types';

function useImageForm({ initialForm }: { initialForm: ImageFormData }) {
  const [form, setForm] = useState<ImageFormData>(initialForm);

  const updateField = (field: keyof ImageFormData, value: string | File[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const addCategory = (category: string) => {
    if (form.categories.includes(category)) return;
    setForm((prev) => ({
      ...prev,
      categories: [...prev.categories, category],
      category: '',
    }));
  };

  const removeCategory = (category: string) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== category),
    }));
  };

  return { form, updateField, addCategory, removeCategory };
}

export default useImageForm;
