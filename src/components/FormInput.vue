<template>
  <div class="input">
    <slot name="icon" class="icon">
      <ion-icon name="mail-outline"></ion-icon>
    </slot>
    <input
      type="text"
      :placeholder="placeholderValue"
      :value="value"
      @input="$emit('updateValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: ['placeholderValue', 'value'],
  model: {
    prop: 'value',
    event: 'updateValue'
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.input {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    border: none;
    background-color: #f2f7f6;
    padding: 4px 4px 4px 30px;
    height: 50px;
  }
  ion-icon {
    position: absolute;
    left: 6px;
    font-size: 14px;
  }
}
</style>
