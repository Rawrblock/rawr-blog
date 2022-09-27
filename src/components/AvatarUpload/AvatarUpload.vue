<template>
  <ValidationProvider
    ref="uploadfile"
    tag="div"
    class="box"
    rules="required|checkImage"
    v-slot="{ errors }"
  >
    <label v-if="!inputFile" for="avatarfile"> + </label>
    <div v-else class="box-img">
      <img class="avatar" :src="currentFileUrl" />
      <span @click="deleteAvatar">X</span>
    </div>
    <span>{{ errors[0] }}</span>
    <input id="avatarfile" type="file" @change="changeFile" />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
export default {
  name: 'AvatarUpload',
  components: { ValidationProvider },
  data() {
    return {
      // 文本框上传文件
      inputFile: null,
      currentFileUrl: null
    };
  },
  methods: {
    async changeFile(e) {
      const { valid } = await this.$refs.uploadfile.validate(e);
      if (valid) {
        let file = (this.inputFile = e.target.files[0]);
        // 解析出上传图片进行预览
        let reader = new FileReader();
        reader.addEventListener('load', e => {
          this.currentFileUrl = e.target.result;
        });
        reader.readAsDataURL(file);

        // 开始上传
        try {
          let result = await this.$store.dispatch('initUploadFile', { file, save: 'user' });
          this.inputFile = result;
          this.$notify({
            type: 'success',
            message: '头像上传成功',
            duration: 1500
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    deleteAvatar() {
      this.inputFile = null;
      this.currentFileUrl = null;
    }
  },
  watch: {
    inputFile(newVal) {
      this.$emit('setFileInfo', newVal);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  label {
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 15%;
    border: 2px dashed #b6bcbb;
    font-size: 24px;
    color: #303030;
    line-height: 90px;
    text-align: center;
  }
  .box-img {
    position: relative;
    width: 100px;
    height: 100px;
    text-align: center;
    border: 2px dashed;
    border-radius: 15%;
    .avatar {
      width: 99%;
      height: 99%;
      border-radius: 15%;
    }
    > span {
      display: inline-block;
      width: 20px;
      height: 20px;
      position: absolute;
      top: 4px;
      right: 2px;
      font-size: 5px;
      text-align: center;
      color: #000;
    }
  }
  > span {
    font-size: 12px;
    color: red;
    position: absolute;
    transform: translateY(58px);
  }
  > input {
    display: none;
  }
}
</style>
