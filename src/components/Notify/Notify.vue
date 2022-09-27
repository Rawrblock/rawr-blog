<template>
  <transition name="notify-fade" @after-leave="handlerAfterLeave">
    <div v-show="visible" :class="styleClass" :style="positionStyle">
      <!-- 图标区域 -->
      <div class="left">
        <font-awesome-icon v-if="type === 'success'" icon="fa-solid fa-shield-heart" />
        <font-awesome-icon v-else-if="type === 'warning'" icon="fa-solid fa-skull" />
        <font-awesome-icon v-else-if="type === 'info'" icon="fa-solid fa-circle-exclamation" />
        <font-awesome-icon v-else icon="fa-solid fa-bug" />
      </div>
      <!-- 消息区域 -->
      <div class="right">
        <p>{{ message }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notify',
  data() {
    return {
      // 定时器
      timer: null,
      // 延迟时间
      duration: 3000,
      // 消息状态类型
      type: null,
      // 消息
      message: null,
      // 控制隐藏显示
      visible: false,
      // 监听显示隐藏变化
      closed: false,
      // 控制每条消息的top距离
      verticalOffset: 20,
      // 回调函数(返回销毁前的实例)
      onClose: null
    };
  },
  computed: {
    styleClass() {
      return ['container', this.type];
    },
    positionStyle() {
      return {
        top: `${this.verticalOffset}px`
      };
    }
  },
  methods: {
    handlerAfterLeave() {
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    startTime() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        // 触发回调函数
        this.onClose(this);
      }
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
      }
    }
  },
  mounted() {
    // 组件调用触发定时器 隐藏组件
    this.startTime();
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 380px;
  padding: 15px 15px 15px 20px;
  border-radius: 4px;
  position: fixed;
  z-index: 9999;
  left: 0;
  right: 0;
  top: 20px;
  margin: auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: top 0.3s ease-out;

  &.success {
    background: #f0f9eb;
    color: #67c23a;
    border-color: #e1f3d8;
  }

  &.info {
    background: #edf2fc;
    color: #909399;
    border-color: #ebeef5;
  }
  &.warning {
    background: #fdf6ec;
    color: #e6a23c;
    border-color: #faecd8;
  }
  &.error {
    background: #fef0f0;
    color: #f56c6c;
    border-color: #fde2e2;
  }

  .left {
    display: flex;
    align-items: center;
    ion-icon {
      font-size: 18px;
    }
  }

  .right {
    p {
      font-family: 'PingFang';
    }
  }
}

.notify-fade-enter-active {
  transition: all 0.3s ease-in;
}
.notify-fade-leave-active {
  transition: all 0.3s ease-out;
}

.notify-fade-enter,
.notify-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
