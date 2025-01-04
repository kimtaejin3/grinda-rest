import { createClient } from '@/utils/supabase/client';

const BUCKET_NAME = 'images';

export const uploadImage = async (file: File) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(file.name.split('.')[0], file);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
};
