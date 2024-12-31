import { getAuthHeaders } from '@/utils/auth';

import api from '.';

const getUser = async () => {
  const response = await api.get('/users/me', {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export { getUser };
