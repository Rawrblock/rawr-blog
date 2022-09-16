<template>
  <header class="blog-page">
    <img :src="coverUrl" alt="" />
    <div class="page-site-title">
      <h1>{{ title }}</h1>
      <slot></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'BlogHeader',
  props: {
    coverUrl: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-page {
  position: relative;
  height: 400px;
  // background-image: url('../../assets/images/blog-header.jpg');
  // background-repeat: no-repeat;
  // background-size: cover;
  // background-position: center center;

  &::before {
    width: 100%;
    height: 100%;
    position: absolute;
    content: '';
    background: rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .page-site-title {
    position: absolute;
    width: 100%;
    top: 200px;
    padding: 0px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
      color: #fff;
      font-family: 'Teko';
      letter-spacing: 2px;
      font-size: 45px;
      text-align: center;
    }
  }
}
</style>
