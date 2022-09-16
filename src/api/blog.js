import { post, get } from './index';

export const createBlog = createBlogRequest => {
  return post('/blogs/', createBlogRequest);
};

export const updateBlog = (id, updateBlogRequest) => {
  return post(`/blogs/${id}`, updateBlogRequest);
};

export const getList = pageNumber => {
  return get('/blogs/', { params: pageNumber });
};

export const getBlogInfo = id => {
  return get(`/blogs/${id}`);
};
