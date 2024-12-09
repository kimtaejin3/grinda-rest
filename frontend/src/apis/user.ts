import api from '.';

const getUser = async () => {
  const response = await api.get('/users/me', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
  return response.data;
};

export { getUser };
