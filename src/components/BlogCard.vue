<template>
  <div class="blog-card">
    <!-- 编辑删除区域 -->
    <div class="icons" :class="isShow ? 'active' : ''">
      <div class="icon" @click="editBlog">
        <ion-icon name="pencil-sharp"></ion-icon>
      </div>
      <div class="icon" @click="deleteBlog(blogItem.id)">
        <ion-icon name="trash-sharp"></ion-icon>
      </div>
    </div>
    <img :src="blogItem.cover.uri" alt="" />
    <div class="info">
      <h4>{{ blogItem.title }}</h4>
      <h6>Posted on: {{ time }}</h6>
      <router-link class="link" :to="{ name: 'ViewBlog', params: { blogid: blogItem.id } }">
        View The Post <ion-icon class="icon" name="arrow-forward-outline"></ion-icon>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogCard',
  props: ['blogItem', 'isShow'],
  methods: {
    editBlog() {
      this.$router.push({ name: 'UpdateBlog', params: { blogid: this.blogItem.id } });
    },
    async deleteBlog(id) {
      await this.$store.dispatch('deleteBlogs', id);
      await this.$store.dispatch('getBlogsList');
    }
  },
  computed: {
    time() {
      return (
        this.blogItem.createdTime.substring(0, 4) +
        '-' +
        this.blogItem.createdTime.substring(4, 6) +
        '-' +
        this.blogItem.createdTime.substring(6, 8) +
        ' ' +
        this.blogItem.createdTime.substring(8, 10) +
        ':' +
        this.blogItem.createdTime.substring(10, 12) +
        ':' +
        this.blogItem.createdTime.substring(12, 14)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/colorglobal.sass';

.blog-card {
  cursor: pointer;
  position: relative;
  height: 420px;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg);
    box-shadow: $blackShadow;
  }

  .icons {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 99;
    display: flex;
    gap: 5px;
    transition: 0.5s ease all;
    opacity: 0;

    &.active {
      opacity: 1;
    }
    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;

        ion-icon {
          color: #fff;
        }
      }
    }
  }

  img {
    display: block;
    border-radius: 8px 8px 0 0;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }
  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 32px 16px;
    color: #000;
    gap: 10px;

    h4 {
      font-size: 20px;
      font-family: 'PingFang';
      letter-spacing: 1px;
      font-weight: 300;
    }
    h6 {
      font-family: 'PingFang';
      font-size: 12px;
      font-weight: 400;
    }
    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      color: #000;
      font-family: 'PingFang';
      font-weight: 500;
      font-size: 12px;
      text-transform: uppercase;
      gap: 6px;
      transition: 0.5s ease-in all;

      &:hover {
        color: #303030;
      }
    }
  }
}
</style>
