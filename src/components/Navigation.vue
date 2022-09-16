<template>
  <div>
    <!-- 导航栏 -->
    <header class="nav" :class="navColorToggle ? 'active' : 'hide'">
      <div class="nav-left">
        <a href="#">
          <h1>Rawr's Blog</h1>
        </a>
      </div>
      <div class="nav-right">
        <ul class="menu-list">
          <li>
            <router-link :to="{ name: 'Home' }" class="menu-item">
              <ion-icon class="icon" name="planet-sharp"></ion-icon>
              <span>Home</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Blog' }" class="menu-item">
              <ion-icon class="icon" name="reader-sharp"></ion-icon>
              <span>Blog</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'CreateBlog' }" class="menu-item">
              <ion-icon name="file-tray-full-sharp"></ion-icon>
              <span>CreateBlog</span>
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Login' }" class="menu-item">
              <ion-icon name="person-sharp"></ion-icon>
              <span>Login</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="userInfo-container"></div>
      <!-- 菜单栏按钮 -->
      <ion-icon class="menuIcon" name="menu-outline" @click="toggleNavMobile()"></ion-icon>
    </header>
    <!-- 移动端导航栏 -->
    <nav @click="toggleNavMobile()" class="nav-mobile">
      <!-- 隔离层 -->
      <div class="mask" :style="{ display: navMobileToggle ? 'block' : 'none' }"></div>
      <!-- 导航内容区域 -->
      <div class="mobile-content" :class="navMobileToggle ? 'show' : 'hide'">
        <!-- 导航内容 -->
        <ul>
          <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          <router-link class="link" :to="{ name: 'Blog' }">Blog</router-link>
          <router-link class="link" :to="{ name: 'CreateBlog' }">CreateBlog</router-link>
          <router-link class="link" :to="{ name: 'Login' }">Login</router-link>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navigation',

  data() {
    return {
      navList: [
        {
          navTitle: 'Search',
          path: '/search',
          iconSvg: 'search'
        },
        {
          navTitle: 'Blog',
          path: '/blog',
          iconSvg: 'reader-sharp'
        },
        {
          navTitle: 'Login',
          path: '/login',
          iconSvg: 'person-sharp'
        }
      ],
      // 滚动条移动距离
      oldScrollTop: 0,
      // 控制头部导航栏底部颜色
      navColorToggle: true,
      // 控制移动端导航栏
      navMobileToggle: false
    };
  },
  mounted() {
    // 滚动条的获取
    window.addEventListener('scroll', this.handlerScroll);
  },
  methods: {
    // 滚动条事件控制头部显示隐藏
    handlerScroll() {
      // 获取滚动条的距离
      let scrollTop =
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // 求出滚动条移动的距离
      let scrollSetp = scrollTop - this.oldScrollTop;
      // 将上一次移动的距离保存
      this.oldScrollTop = scrollTop;
      if (scrollSetp < 0) {
        // 向上
        this.navColorToggle = true;
      } else {
        // 向下
        this.navColorToggle = false;
      }
    },
    // 切换移动端导航栏
    toggleNavMobile() {
      this.navMobileToggle = !this.navMobileToggle;
      this.$emit('getNavToggle', this.navMobileToggle);
    }
  }
};
</script>

<style lang="scss">
@import '../assets/style/colorglobal.sass';

.nav {
  position: relative;
  font-family: 'Teko';
  width: 100%;
  padding: 15px;
  transition: all 0.5s;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 1;
  &.active {
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    animation: opacityNav 0.2s ease-in;
  }
  &.hide {
    transform: translate3d(0, -100%, 0);
  }
  @keyframes opacityNav {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  // 左侧标题
  .nav-left {
    flex: 1;
    h1 {
      font-size: 30px;
      letter-spacing: 1px;
    }
  }

  // 右侧导航栏
  .nav-right {
    display: none;
    .menu-list {
      display: flex;
      gap: 30px;
      li {
        font-size: 20px;
        .menu-item {
          padding-bottom: 2px;
          position: relative;
          display: flex;
          align-items: center;
          gap: 5px;
          &:hover {
            transition: 0.3s ease-in all;
            color: $navActive;
          }
          // :not匹配的元素条件不存在时 触发
          &:not(.child):after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 3px;
            background-color: $navActive;
            border-radius: 5px;
            transition: 0.3s ease-in all;
          }
          &:hover:not(.child):after {
            width: 100%;
          }
          .icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
  // 菜单栏按钮
  .menuIcon {
    font-size: 32px;
    color: white;
  }

  @media (min-width: 800px) {
    padding: 15px 25px;
    .nav-right {
      display: block;
    }
    .menuIcon {
      display: none;
    }
  }
}

.nav-mobile {
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    animation: to_show 0.3s ease-in;
    @keyframes to_show {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
  .mobile-content {
    position: fixed;
    min-width: 270px;
    height: 100%;
    padding: 50px 25px;
    background: #fff;
    z-index: 1;
    transition: 0.3s all ease-in;

    &.show {
      transform: translateX(0);
    }
    &.hide {
      transform: translateX(-100%);
    }
    ul {
      display: flex;
      flex-direction: column;
      gap: 35px;
      .link {
        color: #000;
        font-size: 20px;
        font-family: 'PINGFANG';
      }
    }
  }
  @media (min-width: 800px) {
    display: none;
  }
}

.userInfo-container {
  width: 36px;
  height: 36px;
  background: white;
  border-radius: 50%;
  margin: 0px 5px;
}
</style>
