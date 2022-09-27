<template>
  <ValidationProvider
    class="input"
    tag="div"
    :rules="rules"
    :name="name"
    :vid="vid"
    v-slot="{ errors }"
  >
    <div class="content">
      <slot name="icon" class="icon"></slot>
      <input
        :type="type"
        :placeholder="placeholderValue"
        v-model="inputValue"
        @input="$emit('updateValue', $event.target.value)"
      />
    </div>
    <span class="info">{{ errors[0] }}</span>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate';
export default {
  name: 'FormInput',
  components: {
    ValidationProvider
  },
  data() {
    return {
      inputValue: ''
    };
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    // 文本框属性
    type: {
      type: String,
      default: 'text'
    },
    placeholderValue: {
      type: String,
      default: ''
    },
    // 校验组件属性
    rules: {
      type: [String, Object],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    vid: {
      type: String,
      default: undefined
    }
  },
  watch: {
    inputValue(newVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>

<style lang="scss">
.input {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .content {
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      border: none;
      background-color: #f2f7f6;
      padding: 4px 4px 4px 30px;
      height: 50px;
    }
    svg {
      position: absolute;
      left: 6px;
      font-size: 14px;
    }
  }
  .info {
    font-size: 12px;
    color: red;
    position: absolute;
    transform: translateY(32px);
  }
}
</style>
