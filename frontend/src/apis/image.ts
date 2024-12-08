import api from '.';

const getAllImages = async (page: string) => {
  const response = await api.get(`/images?page=${parseInt(page) - 1}&limit=17`);
  return response.data;
};

const postImage = async (
  image_url: string,
  title: string,
  content: string,
  categories: string[]
) => {
  const response = await api.post(
    '/image',
    {
      image_url,
      title,
      content,
      categories,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    }
  );

  return response.data;
};

export { getAllImages, postImage };
