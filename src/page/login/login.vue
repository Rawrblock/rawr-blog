<template>
  <div class="form-wrap">
    <!-- 左侧表单 -->
    <form class="form-container" @submit.prevent>
      <p><router-link style="color: black" :to="{ name: 'Home' }">Go to Home</router-link></p>
      <p class="toToggleContainer">
        Dont't have an account?
        <router-link class="router-link" :to="{ name: 'Register' }">Register</router-link>
      </p>
      <h2>Login to RawrBlogs</h2>
      <div class="inputs">
        <FormInput :placeholderValue="'请输入邮箱'" v-model="email"></FormInput>
        <FormInput :placeholderValue="'请输入密码'" v-model="password">
          <template v-slot:icon>
            <ion-icon name="lock-closed"></ion-icon>
          </template>
        </FormInput>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >Forgot your password?</router-link
      >
      <button class="formBtn" @click="goLogin">SIGN IN</button>
      <div class="angle"></div>
    </form>

    <!-- 右侧背景 -->
    <div class="background"></div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue';
export default {
  name: 'Login',
  components: { FormInput },
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    async goLogin() {
      const loginUser = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch('toLogin', loginUser);
        await this.$store.dispatch('getCurrentUser');
        this.$notify.success({
          message: '登录成功!',
          onClose: () => {
            this.$router.push({ name: 'Home' });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss"></style>
