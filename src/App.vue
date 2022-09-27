<template>
  <div class="app" :class="navMobileToggle ? 'active' : ''">
    <Navigation v-if="!navigation" @getNavToggle="getNavToggle"></Navigation>
    <router-view></router-view>
    <BlogFooter v-if="!navigation"></BlogFooter>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue';
import BlogFooter from './components/BlogFooter.vue';

export default {
  name: 'App',
  components: { Navigation, BlogFooter },
  data() {
    return {
      navMobileToggle: false,
      // 控制底部与头部是否显示
      navigation: true
    };
  },
  methods: {
    // 获取移动菜单栏显示隐藏标识
    getNavToggle(value) {
      this.navMobileToggle = value;
    },
    checkRoute() {
      if (
        this.$route.name === 'Login' ||
        this.$route.name === 'Register' ||
        this.$route.name === 'ForgotPassword'
      ) {
        this.navigation = true;
        return;
      }
      this.navigation = false;
    },
    async getDefaultCover() {
      await this.$store.dispatch('defaultCover');
    }
  },
  created() {
    this.checkRoute();
  },
  watch: {
    $route() {
      this.checkRoute();
    }
  },
  mounted() {
    this.getDefaultCover();
  }
};
</script>

<style lang="scss">
@import './assets/style/colorglobal.sass';

.app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  &.active {
    overflow: hidden;
  }
  @media (min-width: 700px) {
    position: relative;
    &.active {
      overflow: auto;
    }
  }
}

// 登录与注册页面公共样式
.form-wrap {
  width: 90%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-self: center;
  font-family: 'PINGFANG';
  margin: 0 auto;
  @media (min-width: 900px) {
    width: 100%;
  }
  .form-container {
    position: relative;
    padding: 0 10px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    @media (min-width: 900px) {
      padding: 0 50px;
    }

    .toToggleContainer {
      margin-bottom: 32px;
      .router-link {
        color: $footerblack;
        text-decoration: underline;
        transition: 500ms ease all;
        &:hover {
          color: $navActive;
        }
      }
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: $footerblack;
      margin-bottom: 20px;
      letter-spacing: 2px;
      font-family: 'Teko';
      @media (min-width: 900px) {
        font-size: 55px;
      }
    }

    .inputs {
      min-width: 350px;
      max-width: 350px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .forgot-password {
      text-decoration: none;
      color: $black;
      cursor: pointer;
      font-size: 14px;
      margin-top: 16px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;
      &:hover {
        border-bottom: 1px solid $footerblack;
      }
    }

    .formBtn {
      margin: 0 auto;
      cursor: pointer;
      padding: 12px 24px;
      color: #fff;
      background-color: #303030;
      border-radius: 20px;
      border: none;
      text-transform: uppercase;
      transition: 500ms ease all;
      width: 35%;
      &:hover {
        transform: scale(1.1);
        background: rgba(48, 48, 48, 0.7);
      }
    }
    .angle {
      width: 60px;
      height: 101%;
      background: $white;
      position: absolute;
      right: -30px;
      transform: rotateZ(3deg);
      display: none;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
  .background {
    flex: 2;
    // background-image: url('./assets/images/background.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    display: none;
    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
