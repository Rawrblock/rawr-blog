import { createBlog, getList, getBlogInfo, updateBlog, deleteBlog } from '../../api/blog';

function updateTime(time) {
  return (
    time.substring(0, 4) +
    '-' +
    time.substring(4, 6) +
    '-' +
    time.substring(6, 8) +
    ' ' +
    time.substring(8, 10) +
    ':' +
    time.substring(10, 12) +
    ':' +
    time.substring(12, 14)
  );
}

const state = () => ({
  // 全部的blogs
  blogList: [],
  blogPageNumber: {
    currentPage: 0,
    size: 5
  }
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
  async getBlogsList({ commit, state }) {
    const result = await getList(state.blogPageNumber);
    result.data.forEach(item => {
      item.createdTime = updateTime(item.createdTime);
    });
    commit('SET_BLOGS_LIST', result.data);
  },
  // 获取当前博客数据
  async getBlog({ commit }, id) {
    const result = await getBlogInfo(id);
    result.data.createdTime = updateTime(result.data.createdTime);
    return result.data;
  },
  // 修改
  async updateBlogs({ commit }, data) {
    const result = await updateBlog(data.id, data.updateBlogRequest);
    console.log(result);
  },
  // 删除
  async deleteBlogs({ commit }, id) {
    await deleteBlog(id);
  }
};

const getters = {};

export default { state, mutations, actions, getters };
