import { createBlog, getList, getBlogInfo, updateBlog } from '../../api/blog';
const state = () => ({
  // 全部的blogs
  blogList: null
});

const mutations = {
  SET_BLOGS_LIST(state, payload) {
    state.blogList = payload;
  }
};

const actions = {
  // 发布
  async releaseBlog({ commit }, blogCreateRequest) {
    const result = await createBlog(blogCreateRequest);
    console.log(result);
  },
  // 获取全部blogs
  async getBlogsList({ commit }, blogPageNumber) {
    const result = await getList(blogPageNumber);
    commit('SET_BLOGS_LIST', result.data);
  },
  // 获取当前博客数据
  async getBlog({ commit }, id) {
    const result = await getBlogInfo(id);
    return result.data;
  },
  // 修改
  async updateBlogs({ commit }, data) {
    const result = await updateBlog(data.id, data.updateBlogRequest);
    console.log(result);
  }
};

const getter = {};

export default { state, mutations, actions, getter };