import axios from "axios";
const API_URL = "http://localhost:3000/api/v2/";
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const PostService = {
  getAllPosts: async (page = 1, limit = 10) => {
    try {
      const response = await api.get("posts/getPosts", {
        params: { page, limit },
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  getPostById: async (id: string) => {
    try {
      const response = await api.get(`posts/getPostById/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  createPost: async (postData: Record<string, any>) => {
    try {
      const response = await api.post("posts/createPost", postData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  updatePost: async (id: string, postData: Record<string, any>) => {
    try {
      const response = await api.patch(`posts/updatePost/${id}`, postData);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  deletePost: async (id: string) => {
    try {
      const response = await api.delete(`posts/deletePost/${id}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  searchPosts: async (term: string) => {
    try {
      const response = await api.get("posts/search", { params: { term } });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  getPostsByUser: async (id_usuario: string) => {
    try {
      const response = await api.get(`posts/user/${id_usuario}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  getPostsByCategory: async (id_categoria: string) => {
    try {
      const response = await api.get(`posts/category/${id_categoria}`);
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },

  getPostByTitle: async (titulo: string) => {
    try {
      const response = await api.get(
        `posts/getPostByTitle/${encodeURIComponent(titulo)}`
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error;
    }
  },
};

export default PostService;
