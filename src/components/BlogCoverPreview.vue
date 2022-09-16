<template>
  <div class="modal" v-if="show">
    <div class="modal-content">
      <ion-icon name="close-sharp" @click="toggleShow"></ion-icon>
      <img :src="file.uri" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogCoverPreview',
  props: ['file', 'show'],
  model: {
    prop: 'show',
    event: 'changeShow'
  },
  methods: {
    toggleShow() {
      // this.show = !this.show;
      this.$emit('changeShow', !this.show);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-content {
    width: 300px;
    height: 300px;
    border-radius: 12px;
    padding: 20px;
    background: #fff;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    position: relative;
    @media (min-width: 800px) {
      width: 600px;
      height: 400px;
      padding: 50px;
    }

    ion-icon {
      font-size: 24px;
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
    }
  }
  img {
    // margin-top: 16px;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
}
</style>
