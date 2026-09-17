import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 15000
});

// Response interceptor to format errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || error.message || 'Có lỗi xảy ra khi kết nối server.',
      errors: error.response?.data?.errors || []
    };
    return Promise.reject(customError);
  }
);

export const resourceApi = {
  // 1. Get all resources with search, filter, sort, pagination
  getAll: async (params = {}) => {
    const response = await apiClient.get('/api/resources', { params });
    return response.data;
  },

  // 2. Get resource detail by ID
  getById: async (id) => {
    const response = await apiClient.get(`/api/resources/${id}`);
    return response.data;
  },

  // 3. Create new resource
  create: async (data) => {
    const response = await apiClient.post('/api/resources', data);
    return response.data;
  },

  // 4. Update resource
  update: async (id, data) => {
    const response = await apiClient.put(`/api/resources/${id}`, data);
    return response.data;
  },

  // 5. Delete resource
  delete: async (id) => {
    const response = await apiClient.delete(`/api/resources/${id}`);
    return response.data;
  },

  // 6. Upvote resource
  upvote: async (id) => {
    const response = await apiClient.patch(`/api/resources/${id}/upvote`);
    return response.data;
  }
};

export default resourceApi;
