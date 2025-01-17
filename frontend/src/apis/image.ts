import { getAuthHeaders } from '@/utils/auth';

import api from '.';

const getAllImages = async (page: number, search: string | undefined) => {
  const append_search = search ? `&search=${search}` : '';
  const response = await api.get(
    `/images/?page=${page}&limit=10${append_search}`
  );
  return response.data;
};

const postImage = async (
  image_url: string,
  title: string,
  content: string,
  categories: string[]
) => {

  const response = await api.post(
    '/image/',
    {
      image_url,
      title,
      content,
      categories,
    },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
};

const likeImage = async (image_id: number) => {
  const response = await api.post(
    `/like/${image_id}`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

const deleteLike = async (image_id: number) => {
  const response = await api.delete(`/like/${image_id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export { deleteLike, getAllImages, likeImage, postImage };
