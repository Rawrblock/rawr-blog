<template>
  <div class="form-wrap">
    <!-- 左侧表单 -->
    <div class="form-container">
      <p class="toToggleContainer">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2>Create Your FireBlog Account</h2>
      <ValidationObserver tag="div" v-slot="{ handleSubmit }">
        <form class="inputs" @submit.prevent="handleSubmit(createUserBtn)">
          <avatarUploadVue @setFileInfo="uploadFile"></avatarUploadVue>
          <FormInput
            name="用户名"
            :placeholderValue="'请输入用户名'"
            v-model="userName"
            :rules="{ required: true, checkName: /^.{5,10}$/ }"
          >
            <template v-slot:icon>
              <font-awesome-icon icon="fa-solid fa-user-secret" />
            </template>
          </FormInput>
          <FormInput
            name="邮箱"
            placeholderValue="请输入邮箱"
            v-model="userEmail"
            :rules="{ required: true, email: true }"
            type="email"
          >
            <template v-slot:icon>
              <font-awesome-icon icon="fa-solid fa-envelope" />
            </template>
          </FormInput>
          <FormInput
            name="密码"
            placeholderValue="请输入密码"
            type="text"
            v-model="userPassword"
            :rules="{ required: true, checkPwd: /^[a-zA-Z]\w{4,17}$/ }"
          >
            <template v-slot:icon>
              <font-awesome-icon icon="fa-solid fa-lock" />
            </template>
          </FormInput>
          <button class="formBtn">SIGN UP</button>
        </form>
      </ValidationObserver>

      <div class="angle"></div>
    </div>

    <!-- 右侧背景 -->
    <div
      class="background"
      :style="{ backgroundImage: `url(${$store.getters.loginCoverUri})` }"
    ></div>
  </div>
</template>

<script>
import AvatarUploadVue from '@/components/AvatarUpload/AvatarUpload.vue';
import FormInput from '@/components/FormInput.vue';
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'register',
  components: { ValidationObserver, FormInput, AvatarUploadVue },
  data() {
    return {
      userName: null,
      userEmail: null,
      userPassword: null,
      avatarFile: null // 用户头像文件
    };
  },
  methods: {
    // 接收上传组件返回的信息
    uploadFile(value) {
      this.avatarFile = value;
    },
    //注册方法
    async createUserBtn() {
      // 整理参数
      const userCreateRequest = {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword,
        avatar: this.avatarFile
      };
      try {
        await this.$store.dispatch('toRegister', userCreateRequest);
        this.$notify.success({
          message: '注册成功',
          onClose: () => {
            this.$router.push({ name: 'Login' });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container {
  h2 {
    margin-bottom: 0px !important;
  }
}
</style>
