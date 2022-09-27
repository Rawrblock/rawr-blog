<template>
  <div>
    <BlogHeader v-if="blogInfo != null" :coverUrl="blogInfo.cover.uri" :title="blogInfo.title">
      <template>
        <p class="time">{{ blogInfo.createdTime }}</p>
      </template>
    </BlogHeader>
    <main class="container">
      <div class="content">
        <!-- 左侧内容 -->
        <div class="left">
          <p v-if="blogInfo" v-html="blogInfo.content"></p>
        </div>
        <!-- 右侧信息 -->
        <div class="right">
          <div class="first-box"></div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader.vue';
export default {
  name: 'ViewBlog',
  components: { BlogHeader },
  data() {
    return {
      blogInfo: null
    };
  },
  mounted() {
    let id = this.$route.params.blogid;
    this.getCurrentBlog(id);
  },
  methods: {
    async getCurrentBlog(id) {
      let oldBlogList = this.$store.state.blog.blogList;
      oldBlogList.forEach(item => {
        if (item.id === id) {
          this.blogInfo = item;
          return;
        }
      });
      if (this.blogInfo == null) {
        let result = await this.$store.dispatch('getBlog', id);
        this.blogInfo = result;
        return;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 20px 0px;
  .content {
    width: 1200px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    gap: 15px;
    .left {
      flex: 3;
      background: #fff;
      padding: 50px 40px;
      border-radius: 15px;
      box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
    }
    .right {
      flex: 1;
      .first-box {
        background: #fff;
        height: 340px;
        border-radius: 15px;
        box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.05);
      }
    }
  }
}
</style>
