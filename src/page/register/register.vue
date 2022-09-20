<template>
  <div class="form-wrap">
    <!-- 左侧表单 -->
    <form class="form-container" @submit.prevent>
      <p class="toToggleContainer">
        Already have an account?
        <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <input type="file" @change="uploadFile" />
        <FormInput :placeholderValue="'请输入用户名'" v-model="userName">
          <template v-slot:icon>
            <ion-icon name="person-outline"></ion-icon>
          </template>
        </FormInput>
        <FormInput :placeholderValue="'请输入邮箱'" v-model="userEmail"></FormInput>
        <FormInput :placeholderValue="'请输入密码'" v-model="userPassword">
          <template v-slot:icon>
            <ion-icon name="lock-closed"></ion-icon>
          </template>
        </FormInput>
      </div>
      <button class="formBtn" @click="createUserBtn">SIGN UP</button>
      <div class="angle"></div>
    </form>

    <!-- 右侧背景 -->
    <div class="background"></div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput.vue';
import { initUpload, finishUpload } from '../../api/file';
import { create } from '../../api/user';
import OSS from 'ali-oss';

export default {
  name: 'register',
  components: { FormInput },
  data() {
    return {
      userName: null,
      userEmail: null,
      userPassword: null,
      avatarId: null, // 用户头像文件上传ID
      avatarFile: null
    };
  },
  methods: {
    uploadFile(e) {
      let file = e.target.files[0];

      const uploadFile = {
        name: file.name.substring(0, file.name.lastIndexOf('.')),
        size: file.size,
        ext: file.name.substring(file.name.lastIndexOf('.'))
      };
      // 调用 后端获取阿里云stsToken信息
      initUpload(uploadFile).then(async res => {
        // console.log(res);
        let avatarId = res.data.fileId;
        // 创建OSS实例(上传文件)
        const client = new OSS({
          // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
          region: 'oss-cn-hangzhou',
          // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
          accessKeyId: res.data.accessKeyId,
          accessKeySecret: res.data.accessKeySecret,
          // 从STS服务获取的安全令牌（SecurityToken）。
          stsToken: res.data.stsToken,
          // 填写Bucket名称。
          bucket: 'rawrblock'
        });
        try {
          // 设置文件上传请求头 改变文件类型(图片只有jpg才能预览访问)
          const headers = {
            // 指定该Object被下载时网页的缓存行为。
            'Cache-Control': 'no-cache',
            'Content-Type': this.fileTypeJpg(file.type)
          };

          const result = await client.put(file.name, file, { headers });
          console.log(result);
          const fileFinishUpload = {
            fileId: avatarId,
            fileUri: result.url
          };
          const fileUploaded = await finishUpload(fileFinishUpload);
          this.avatarFile = fileUploaded.data;
          console.log(this.avatarFile);
        } catch (e) {
          console.log(e);
        }
      });
    },
    // 控制阿里云图片上传统一格式为jpg
    fileTypeJpg(type) {
      if (type == 'image/jpeg' || type == 'image/png') {
        return 'image/jpg';
      }
      return type;
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

<style></style>
