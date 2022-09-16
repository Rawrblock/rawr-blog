<template>
  <div class="form-wrap">
    <!-- 左侧表单 -->
    <form class="form-container">
      <p class="toToggleContainer">
        Back to
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2 style="margin-bottom: 0px">Reset Password</h2>
      <p style="margin-bottom: 15px; text-align: center">
        Forgot your password? Enter your email to reset it
      </p>
      <div class="inputs">
        <FormInput></FormInput>
      </div>
      <button class="formBtn">RESET</button>
      <div class="angle"></div>
    </form>

    <!-- 右侧背景 -->
    <div class="background"></div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue';
export default {
  name: 'ForgotPassword',
  components: { FormInput }
};
</script>

<style></style>
