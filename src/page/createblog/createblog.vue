<template>
  <div class="container">
    <BlogCoverPreview v-model="coverPreview" :file="blogCover" />
    <header class="blog-page">
      <div class="page-site-title">
        <h1>{{ isEditor ? 'UPDATE BLOG' : 'CREATE BLOG' }}</h1>
      </div>
    </header>
    <main class="content">
      <!-- 创建博客标题封面区域 -->
      <div class="blog-info">
        <input v-model="blogTitle" class="titleInput" type="text" placeholder="Enter Blog Title" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            id="blog-photo"
            type="file"
            accept=".png, .jpg, .jpeg, .avif"
            @change="fileCoverChange"
          />

          <button :class="{ 'preview-inactive': !blogCover }" @click="openPreview">
            Preview Photo
          </button>
          <span v-if="blogCover">File Chosem: {{ blogCover.name + blogCover.ext }}</span>
        </div>
      </div>
      <div class="editor">
        <BlogEditor v-model="blogHTML" @saveBlog="savedBlog" />
      </div>
    </main>
  </div>
</template>

<script>
import BlogEditor from '@/components/BlogEditor.vue';
import BlogCoverPreview from '@/components/BlogCoverPreview.vue';

export default {
  name: 'CreateBlog',
  components: {
    BlogEditor,
    BlogCoverPreview
  },
  data() {
    return {
      blogTitle: null,
      blogHTML: null,
      blogCover: null,
      coverPreview: null,
      // 判断是否是编辑或创建
      isEditor: null,
      // 编辑模式的ID
      blogId: null
    };
  },
  methods: {
    // 自定义博客保存按钮
    async savedBlog() {
      let blogCreateRequest = {
        title: this.blogTitle,
        content: this.blogHTML,
        cover: this.blogCover
      };
      if (this.isEditor) {
        // 编辑模式
        await this.$store.dispatch('updateBlogs', {
          id: this.blogId,
          updateBlogRequest: blogCreateRequest
        });
      } else {
        // 发布模式
        let result = await this.$store.dispatch('releaseBlog', blogCreateRequest);
      }
    },
    // 博客封面图片上传
    async fileCoverChange(e) {
      let file = e.target.files[0];
      let result = await this.$store.dispatch('initUploadFile', { file, save: 'blog' });
      this.blogCover = result;
    },
    openPreview() {
      this.coverPreview = !this.coverPreview;
    },
    // 获取当前博客数据进行更新
    async getCurrentBlog(id) {
      let result = await this.$store.dispatch('getBlog', id);
      this.blogTitle = result.title;
      this.blogHTML = result.content;
      this.blogCover = result.cover;
    },
    clearInfo() {
      this.blogTitle = null;
      this.blogHTML = '';
      this.blogCover = null;
    }
  },
  mounted() {
    if (this.$route.params.blogid) {
      let id = this.$route.params.blogid;
      this.getCurrentBlog(id);
      this.isEditor = true;
      this.blogId = id;
    }
  },
  watch: {
    $route: 'clearInfo'
  }
};
</script>

<style lang="scss" scoped>
.container {
  .blog-page {
    position: relative;
    height: 400px;
    background-image: url('../../assets/images/blog-header.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    display: flex;
    align-items: center;
    justify-content: center;
    &::before {
      width: 100%;
      height: 100%;
      position: absolute;
      content: '';
      background: rgba(0, 0, 0, 0.3);
    }

    .page-site-title {
      position: absolute;
      width: 100%;
      top: 200px;
      padding: 0px 20px;
      h1 {
        color: #fff;
        font-family: 'Teko';
        letter-spacing: 2px;
        font-size: 45px;
        text-align: center;
      }
    }
  }
  // 内容区域
  .content {
    padding: 40px 16px;
    .blog-info {
      display: flex;
      flex-direction: column;
      .titleInput {
        min-width: 300px;
        padding: 10px 4px;
        border: none;
        border-bottom: 1px solid #303030;
        transition: 0.5s ease-in-out all;
        margin-bottom: 10px;
        font-size: 16px;
        font-family: 'PingFang';
        &:focus {
          outline: none;
          box-shadow: 0 1px 0 0 #303030;
        }
      }
      // 封面文件上传
      .upload-file {
        display: flex;
        flex-direction: column;
        gap: 5px;

        label,
        button,
        .router-button {
          background: #303030;
          align-self: flex-start;
          border-radius: 5px;
          color: #fff;
          text-align: center;
          font-family: 'PingFang';
          padding: 12px 24px;
          text-decoration: none;
          font-size: 16px;
          transition: 0.5s ease-in-out all;
        }
        // 文件上传控件 通过lebel 绑定id实现
        > input {
          display: none;
        }
        .preview-inactive {
          background: rgba(128, 128, 128, 0.5);
        }

        span {
          display: block;
          padding-left: 3px;
          font-size: 16px;
          font-family: 'PingFang';
        }
      }
      @media (min-width: 900px) {
        flex-direction: row;
        gap: 10px;
        .upload-file {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      }
    }
    .editor {
      height: 60vh;
      margin-top: 20px;
    }
  }
}
</style>

<!-- const file = blobInfo.blob();
            const newFileUrl = {
              localtion: ''
            };
            const uploadFile = {
              name: file.name.substring(0, file.name.lastIndexOf('.')),
              size: file.size,
              ext: file.name.substring(file.name.lastIndexOf('.'))
            };
            initUpload(uploadFile).then(async res => {
              let fileId = res.data.fileId;
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
              const headers = {
                // 指定该Object被下载时网页的缓存行为。
                'Cache-Control': 'no-cache',
                'Content-Type': this.fileTypeJpg(file.type)
              };
              const result = await client.put(file.name, file, { headers });
              const fileFinishUpload = {
                fileId: fileId,
                fileUri: result.url
              };
              finishUpload(fileFinishUpload).then(res => {
                // 将上传后的文件地址以key:localtion返回(自动替换掉临时显示的url)
                newFileUrl['localtion'] = res.data.uri;
                resolve(newFileUrl['localtion']);
              }); -->
