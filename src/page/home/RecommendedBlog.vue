<template>
  <div class="blog-wrapper">
    <!-- 标题内容 -->
    <div class="blog-content">
      <div>
        <!-- 标题 -->
        <h2>THIS IS A TESTING POST! #7</h2>
        <!-- 简介 -->
        <p class="content-preview">THIS IS A TESTING POST! #7</p>
        <!-- 跳转 -->
        <router-link to="#" class="link">
          View The Post
          <ion-icon name="arrow-forward-sharp"></ion-icon
        ></router-link>
      </div>
    </div>
    <!-- 封面 -->
    <div class="blog-photo">
      <img src="../../assets/images/ryan.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// (默认移动端样式)
.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  @media (min-width: 700px) {
    min-height: 650px;
    max-height: 650px;
    flex-direction: row;
  }
  // 标题内容(默认移动端样式)
  .blog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 4;
    order: 2;
    @media (min-width: 700px) {
      order: 1;
    }
    @media (min-width: 800px) {
      flex: 3;
    }

    div {
      max-width: 375px;
      padding: 72px 24px;
      font-family: 'PingFang';
      @media (min-width: 700px) {
        padding: 0px 24px;
      }

      h2 {
        font-size: 32px;
        font-weight: 300;
        text-transform: uppercase;
        margin-bottom: 24px;
        @media (min-width: 700px) {
          font-size: 40px;
        }
      }

      p {
        font-size: 15px;
        font-weight: 300;
        line-height: 1.7;
      }

      .content-preview {
        font-size: 13px;
        max-height: 24px;
        width: 250px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .link {
        color: #000;
        display: inline-flex;
        align-items: center;
        margin-top: 32px;
        padding-bottom: 4px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease-in all;

        &:hover {
          border-bottom-color: #303030;
        }
      }
    }
  }
  // 封面
  .blog-photo {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    flex: 3;
    order: 1;
    @media (min-width: 700px) {
      flex: 4;
    }

    img {
      display: block;
      width: 100%;
      height: 290px;
      object-fit: cover;
      @media (min-width: 700px) {
        height: 100%;
      }
    }
  }
  &:nth-child(even) {
    .blog-content {
      order: 2;
    }
    .blog-photo {
      order: 1;
    }
  }
}
</style>
