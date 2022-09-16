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
      // console.log(uploadFile.ext, file);
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
            /* // 指定该Object被下载时的内容编码格式。
            'Content-Encoding': 'utf-8',
            // 指定过期时间，单位为毫秒。
            Expires: '1000',
            // 指定Object的存储类型。
            // 'x-oss-storage-class': 'Standard',
            // 指定Object标签，可同时设置多个标签。
            'x-oss-tagging': 'Tag1=1&Tag2=2' */
          };
          /* const options = {
            // 获取分片上传进度、断点和返回值。
            progress: (p, cpt, res) => {
              console.log(p);
            },
            // 设置并发上传的分片数量。
            parallel: 4,
            // 设置分片大小。默认值为1 MB，最小值为100 KB。
            partSize: 1024 * 1024,
            headers,
            // 自定义元数据，通过HeadObject接口可以获取Object的元数据。
            meta: { year: 2020, people: 'test' },
            mime: 'text/plain'
          }; */

          // 分片上传。
          // const result = await client.multipartUpload(file.name, file, { ...options });

          // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
          // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
          // data对象可以自定义为file对象、Blob数据或者OSS Buffer。
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
    createUserBtn() {
      const userCreateRequest = {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword,
        avatar: this.avatarFile
      };
      create(userCreateRequest).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style></style>
