<template>
  <editor
    v-model="editorValue"
    api-key="2xaqy2m3415xv7pqncemqbobdhyjo5xqipu61awmws7xmwig"
    :init="init"
  ></editor>
</template>

<script>
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver/theme'; // 主题文件
import 'tinymce/icons/default';
import 'tinymce/models/dom';
// 插件
import 'tinymce/plugins/image'; // 插入上传图片插件
import 'tinymce/plugins/importcss'; //图片工具

import 'tinymce/plugins/code'; // HTML代码模板编译
import 'tinymce/plugins/codesample'; // 代码实例模板 语法高亮
import 'tinymce/plugins/lists'; // 普通列表插件
import 'tinymce/plugins/advlist'; // 高级列表插件(改标志样式)
// import 'tinymce/plugins/anchor'; // 锚点
import 'tinymce/plugins/link'; // 相当于a标签
import 'tinymce/plugins/searchreplace'; // 文本查找替换功能
import 'tinymce/plugins/media';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/save';
import 'tinymce/plugins/wordcount';
export default {
  name: 'BlogEditor',
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editorValue: this.value,
      init: {
        // width: 720,
        height: '100%',
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        // 皮肤：这里引入的是public下的资源文件
        skin_url: '/tinymce/skins/ui/oxide',
        plugins:
          'code codesample lists advlist link image searchreplace emoticons save wordcount media save',
        toolbar:
          'undo redo | styles bold alignleft aligncenter alignright alignjustify' +
          'outdent indent code codesample numlist bullist | searchreplace emoticons wordcount ' +
          'image media save',
        emoticons_database_url: '/tinymce/js/emojis.js', // 配置表情来源
        paste_data_images: true, // 允许粘贴上传图片
        // 保存按钮
        save_onsavecallback: () => {
          this.$emit('saveBlog');
        },
        // 自定义文件上传
        file_picker_callback: (callback, value, meta) => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          input.addEventListener('change', e => {
            const file = e.path[0].files[0];
            const reader = new FileReader();
            reader.addEventListener('load', () => {
              const id = 'blobid' + new Date().getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              callback(blobInfo.blobUri(), { title: file.name });
            });
            reader.readAsDataURL(file);
          });

          input.click();
        },
        // 文件上传到oss
        images_upload_handler: (blobInfo, progress) => {
          return new Promise(async (resolve, reject) => {
            let file = blobInfo.blob();
            const result = await this.$store.dispatch('initUploadFile', { file, save: 'blog' });
            const newFileUrl = {
              localtion: result.uri
            };
            resolve(newFileUrl['localtion']);
          });
        }
      }
    };
  },
  methods: {},
  mounted() {
    // 初始化 tinymce
    tinymce.init({});
  },
  watch: {
    value(newVal) {
      this.editorValue = newVal;
    },
    editorValue(newVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>

<style lang="scss" scoped></style>
