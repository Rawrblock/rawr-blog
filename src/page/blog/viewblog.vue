<template>
  <div>
    <BlogHeader v-if="blogInfo != null" :coverUrl="blogInfo.cover.uri" :title="blogInfo.title">
      <template>
        <p>{{ blogInfo.createdTime }}</p>
      </template>
    </BlogHeader>
    <main>
      <div v-if="blogInfo != null" class="content" v-html="blogInfo.content"></div>
    </main>
  </div>
</template>

<script>
import BlogHeader from '@/components/BlogHeader.vue';
export default {
  name: 'ViewBlog',
  components: { BlogHeader },
  data() {
    return {
      blogInfo: null
    };
  },
  mounted() {
    let id = this.$route.params.blogid;
    this.getCurrentBlog(id);
  },
  methods: {
    async getCurrentBlog(id) {
      let result = await this.$store.dispatch('getBlog', id);
      this.blogInfo = result;
    }
  }
};
</script>

<style lang="scss" scoped></style>
