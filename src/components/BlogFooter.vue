<template>
  <footer class="footer">
    <div class="left">
      <div class="col-1">
        <router-link class="header" :to="{ name: 'Home' }">RawrBlogs</router-link>
        <ul>
          <li>
            <a href="/">
              <font-awesome-icon class="svg-icon" icon="fa-brands fa-weixin" />
            </a>
          </li>
          <li>
            <a href="/">
              <font-awesome-icon class="svg-icon" icon="fa-brands fa-github" />
            </a>
          </li>
        </ul>
      </div>
      <div class="col-2">
        <ul>
          <li>
            <router-link to="#" class="link">HOME</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Blog' }" class="link">BLOG</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Register' }" class="link">REGISTER</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <p>Copyright 2022 All Rights Reserved</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BlogFooter',
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/style/colorglobal.sass';

.footer {
  margin-top: auto;
  padding: 45px 65px;
  background-color: $footerblack;
  font-family: 'Teko';
  display: flex;
  flex-direction: column;
  gap: 32px;
  color: $white;
  @media (min-width: 800px) {
    flex-direction: row;
    gap: 0px;
  }

  > div {
    display: flex;
    flex: 1;
  }

  .left {
    gap: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: initial;
      gap: 0;
    }

    .col-1,
    .col-2 {
      gap: 32px;
      display: flex;
      flex: 1;
      @media (min-width: 800px) {
        gap: 0;
      }
    }
    ul {
      display: flex;
      gap: 16px;
    }

    .col-1 {
      flex-direction: column;
      .header {
        font-size: 50px;
        letter-spacing: 1.5px;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }

      ul {
        margin-top: auto;
        justify-content: center;
        li {
          display: flex;
          align-items: center;
          .svg-icon {
            width: 24px;
            height: auto;
          }
        }
        @media (min-width: 800px) {
          justify-content: initial;
        }
      }
    }

    .col-2 {
      ul {
        height: 100%;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        @media (min-width: 800px) {
          flex-direction: column;
        }
        .link {
          font-size: 20px;
          font-weight: 500;
        }
      }
    }
  }

  .right {
    gap: 32px;
    align-items: center;
    flex-direction: column;
    @media (min-width: 800px) {
      align-items: flex-end;
      gap: 0px;
    }
    p {
      margin-top: auto;
      font-size: 20px;
    }
  }
}
</style>
