<template>
  <div class="blog">
    <BlogHeader
      :title="'Blog'"
      coverUrl="http://rawrblock.oss-cn-hangzhou.aliyuncs.com/blog-header.jpg"
    />
    <div class="blog-card-warp">
      <div class="blog-edit-toggle">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="isEditor" />
      </div>
      <div class="blog-cards">
        <BlogCard
          v-for="(blog, index) in $store.state.blog.blogList"
          :key="index"
          :blogItem="blog"
          :isShow="isEditor"
        ></BlogCard>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from '@/components/BlogCard.vue';
import BlogHeader from '@/components/BlogHeader.vue';
export default {
  name: 'Blog',
  components: { BlogCard, BlogHeader },
  data() {
    return {
      isEditor: null,
      pageNumber: {
        currentPage: 0,
        size: 5
      }
    };
  },
  mounted() {
    this.$store.dispatch('getBlogsList', this.pageNumber);
  }
};
</script>

<style lang="scss" scoped>
@import '../../assets/style/colorglobal.sass';
.blog {
  /* .blog-page {
    position: relative;
    height: 400px;
    background-image: url('../../assets/images/blog-header.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      width: 100%;
      height: 100%;
      position: absolute;
      content: '';
      background: rgba(0, 0, 0, 0.3);
    }

    .page-site-title {
      position: absolute;
      width: 100%;
      top: 200px;
      padding: 0px 20px;
      h1 {
        color: #fff;
        font-family: 'Teko';
        letter-spacing: 2px;
        font-size: 45px;
        text-align: center;
      }
    }
  } */
  // 博客卡片区域
  .blog-card-warp {
    position: relative;
    padding: 80px 16px;
    background-color: #f1f1f1;
    @media (min-width: 500px) {
      padding: 100px 16px;
    }
    .blog-cards {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      gap: 32px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }
      @media (min-width: 1200px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    // 显示 编辑
    .blog-edit-toggle {
      position: absolute;
      right: 40px;
      top: 35px;
      display: flex;
      align-items: center;

      span {
        margin-right: 16px;
        font-family: 'PingFang';
        font-size: 17px;
      }

      input[type='checkbox'] {
        width: 80px;
        height: 30px;
        outline: none;
        background: #fff;
        border: none;
        // 取消Input的默认边框
        -webkit-appearance: none;
        border-radius: 20px;
        box-shadow: $blackShadow;
        position: relative;

        &::before {
          content: '';
          width: 30px;
          height: 30px;
          background: $footerblack;
          box-shadow: $blackShadow;
          border-radius: 50px;
          position: absolute;
          transition: 750ms ease all;
        }
      }
      input:checked[type='checkbox'] {
        background: $navActive;
      }
      input:checked[type='checkbox']::before {
        background: $white;
        transform: translateX(50px);
      }
    }
  }
}
</style>
