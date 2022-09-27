<template>
  <div class="home" id="home">
    <header class="full_page" :style="{ backgroundImage: `url(${$store.getters.homeCoverUri})` }">
      <!-- h1标题 -->
      <div class="site-info">
        <h1>Welcome! to Rawr's Blog</h1>
        <p class="info-p" ref="info-p">
          {{ Text }}
        </p>
        <font-awesome-icon icon="fa-solid fa-chevron-down fa-lg" class="icon" />
        <!-- <arrowDownIcon class="icon" /> -->
      </div>
    </header>
    <!-- 内容 -->
    <main class="layout">
      <div class="layout-blog">
        <RecommendedBlog
          v-for="(blog, index) in $store.state.blog.blogList.slice(0, 2)"
          :key="index"
          :item="blog"
        />
      </div>
      <!-- github信息 -->
      <div class="layout-content">
        <!-- 左侧 -->
        <div class="content-user">
          <!-- Author标题 -->
          <div class="author">Author</div>
          <div class="user-info">
            <img
              class="cover"
              src="http://rawrblock.oss-cn-hangzhou.aliyuncs.com/blog/ellipse.png"
              alt=""
            />
            <h3>Rawrblock</h3>
            <span>Rawr-Blog</span>
            <ul>
              <li>
                <span class="tag">文章</span>
                <span class="num">227</span>
              </li>
            </ul>
            <a href="https://github.com/Rawrblock">
              <font-awesome-icon icon="fa-brands fa-github" />
              Find Me
            </a>
          </div>
        </div>
        <!-- 右侧 -->
        <div class="content-register-play">
          <div class="col col-1">
            <!-- 封面 -->
            <div class="music-cover">
              <img src="../../assets/images/musicCover.jpg" alt="" />
            </div>
            <!-- playBtn -->
            <div class="music-playbtn">
              <div class="top">
                <!-- coverTitle -->
                <h2 class="coverTitle">小时光</h2>
                <!-- author -->
                <span class="coverAuthor">胡期皓</span>
              </div>
              <div class="bottom">
                <button>
                  <font-awesome-icon icon="fa-solid fa-play" />
                </button>
                <button>
                  <font-awesome-icon icon="fa-solid fa-forward" />
                </button>
              </div>
            </div>
          </div>
          <div class="col col-2">
            <h2>never miss a post. Register for your free acount today!</h2>
            <router-link class="router-button" :to="{ name: 'Register' }">
              Register for VillagersBlogs
              <font-awesome-icon icon="fa-solid fa-arrow-right" />
            </router-link>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import RecommendedBlog from '@/page/home/RecommendedBlog.vue';
export default {
  name: 'Home',
  components: {
    RecommendedBlog
  },
  data() {
    return {
      Text: 'Life was like a box of chocolates, you never know what you are going to get.'
      // showText: '',
      // timer: null,
      // count: 1
    };
  },
  methods: {
    // 文字逐个显示
    writeText() {
      let content = this.Text.slice(0, this.count);
      this.showText = content;
      this.count += 5;

      if (this.count > content.length) {
        this.count += 1;
      }

      this.timer = setTimeout(this.writeText, 800);
    },
    async getBlogs() {
      await this.$store.dispatch('getBlogsList');
    }
  },
  mounted() {
    // this.writeText();'
    this.getBlogs();
  }
};
</script>

<style lang="scss">
@import '../../assets/style/colorglobal.sass';
.home {
  // 背景
  .full_page {
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    overflow: hidden;
    position: relative;
    // 标题
    .site-info {
      width: 100%;
      padding: 35px;
      h1 {
        font-size: 40px;
        font-family: 'Teko';
        text-align: center;
        color: $white;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-shadow: 0px 5px 0px rgba(255, 255, 255, 0.25);
        animation-name: titleRotate;
        animation-duration: 4s; // 动画时间
        animation-timing-function: linear; // 动画的速度曲线 linear开始结束相同
        animation-iteration-count: infinite; // 动画次数
        animation-direction: alternate; // 动画是否轮流反向播放
      }
      .info-p {
        font-family: 'PingFang';
        text-align: center;
        color: $white;
        font-size: 18px;
        font-weight: bold;
        text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        position: relative;

        &::before {
          content: '[';
        }

        &::after {
          content: ']';
        }

        &::before,
        &::after {
          color: #16a085;
          font-size: 24px;
          animation: opacity;
          animation: opacity 2s infinite;
        }
      }
      // 箭头
      .icon {
        font-size: 25px;
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 50%;
        animation: opacity;
        animation: opacity 3s infinite;
      }
    }
  }
}

// 内容区域
.layout {
  font-family: 'PingFang';
  // min-height: 100vh;
  .layout-content {
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    // 左侧 github
    .content-user {
      flex: 1;
      padding: 20px 35px;
      background: $white;
      box-shadow: $blackShadow;
      border-radius: 10px;
      transition: all 0.2s ease-in;
      &:hover {
        transform: translateY(-1px);
      }

      .author {
        font-family: 'Teko';
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 1px;
        margin-bottom: 25px;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        .cover {
          width: 40%;
          height: auto;
          object-fit: cover;
          margin-bottom: 10px;
        }

        h3 {
          font-size: 25px;
        }

        > span {
          font-size: 16px;
          margin-bottom: 20px;
        }

        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: all 0.2s ease-in;
          .tag {
            font-size: 19px;
          }
          .num {
            font-size: 19px;
          }
          &:hover {
            color: #52d0cf;
          }
        }

        a {
          padding: 7px 75px;
          color: #fff;
          border: none;
          background: #49b1f5;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }
    }
    // 右侧
    .content-register-play {
      flex: 3;
      display: flex;
      flex-direction: column;
      gap: 10px;
      .col {
        flex: 1;
        border-radius: 20px;
        box-shadow: $blackShadow;
        padding: 20px;
      }

      // 音乐
      .col-1 {
        background: #49b1f5;
        display: flex;
        gap: 20px;
        .music-cover {
          padding: 5px;
          background: #2449e1;
          flex: 1;
          opacity: 0.9;
          border-radius: 10px;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .music-playbtn {
          flex: 2;
          display: flex;
          flex-direction: column;
          .top {
            flex: 1;
            color: $white;
            .coverTitle {
              font-weight: bold;
              font-size: 18px;
              @media (min-width: 800px) {
                margin-bottom: 5px;
                font-size: initial;
              }
            }
            .coverAuthor {
              font-size: 12px;
              color: #eeeeeebf;
              @media (min-width: 800px) {
                font-size: 16px;
              }
            }
          }
          .bottom {
            display: flex;
            gap: 10px;
            .icon {
              font-size: 20px;
            }
            @media (min-width: 800px) {
              font-size: 30px;
            }
          }
          @media (min-width: 800px) {
            flex: 4;
          }
        }
      }

      .col-2 {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 15px;
        h2 {
          max-width: 340px;
          font-size: 27px;
          font-weight: 300;
          text-transform: uppercase;
          text-align: center;
        }
        .router-button {
          cursor: pointer;
          color: #fff;
          background-color: $footerblack;
          padding: 14px;
          border-radius: 50px;
          text-transform: uppercase;
          padding: 10px 15px;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: 0.3s all ease-in;
          .icon {
            font-size: 20px;
          }
          &:hover {
            background-color: rgba(48, 48, 48, 0.7);
          }
        }
        @media (min-width: 800px) {
          flex-direction: row;
          justify-content: space-around;

          h2 {
            text-align: inherit;
          }
        }
      }
    }
    @media (min-width: 800px) {
      flex-direction: row;
      padding: 20px 20px;
      .content-user {
        padding: 15px 20px;
        .user-info {
          h3 {
            font-size: 17px;
          }
          > span {
            font-size: 14px;
          }

          li {
            font-size: 14px;
          }

          a {
            padding: 7px 70px;
            font-size: 14px;
          }
        }
      }
    }
    @media (min-width: 1100px) {
      padding: 20px 70px;
    }
  }
}

// 透明度显示隐藏动画
@keyframes opacity {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

// 微旋转动画
@keyframes titleRotate {
  0% {
    transform: rotateZ(-2deg);
  }
  50% {
    transform: rotateZ(2deg);
  }
  80% {
    transform: rotateZ(-2deg);
  }
  100% {
    transform: rotateZ(2deg);
  }
}
</style>
