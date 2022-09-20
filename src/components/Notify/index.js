import _Notify from './Notify';
import Vue from 'vue';

// 创建组件子类
let NotifyComponent = Vue.extend(_Notify);
// 接收组件实例
let instance;
// 存储多个组件实例
let instances = [];
// 生成唯一标识
let seed = 1;

const Notify = options => {
  // 1. 创建id
  let id = 'message_' + seed++;
  // console.log(options);
  // 7. 接收自定义回调方法
  let userOnClose = options.onClose;
  // 8. 替换自定义函数为  当定时结束时 触发组件对应事件
  options.onClose = () => {
    // 这里userOnClose就是保存了一份自定义回调函数
    Notify.close(id, userOnClose);
  };

  // 2. 声明创建实体
  instance = new NotifyComponent({ data: options });
  instance.id = id;
  // 3. 挂载实例
  instance.$mount();
  // 4. 添加DOM
  document.body.appendChild(instance.$el);

  // 计算出 每个消息出现时的高度
  let verticalOffset = options.verticalOffset || 20;
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;

  // 5. 设置动画显示状态
  instance.visible = true;
  // 6. 数组添加实例
  instances.push(instance);
  return instance;
};

// 当组件定时器结束时触发：将当前结束的组件实例从数组中删除,触发回调函数
Notify.close = (id, userOnClose) => {
  // 获取出 实例数组长度
  let len = instances.length;
  let index = -1;
  let removedHeight;
  // 遍历实例数组
  for (let i = 0; i < len; i++) {
    // 组件销毁后,也要将该数组中对应的删除
    if (id === instances[i].id) {
      // 获取出当前实例容器的高度
      removedHeight = instances[i].$el.offsetHeight;
      // 将当前移除的实例索引保存
      index = i;
      // 判断回调函数是否存在,存在就调用
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      // 移除
      instances.splice(i, 1);
      break;
    }
  }
  // 判断是否数组中的实例(是否处于第一个)
  if (len <= 1 || index === -1 || index > instances.length - 1) return;
  // 计算出 每个消息的退出时高度top值
  for (let i = index; i < len - 1; i++) {
    let dom = instances[i].$el;
    dom.style['top'] = parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
  }
};

['success', 'info', 'warning', 'error'].forEach(type => {
  Notify[type] = options => {
    return Notify({
      type,
      message: options.message,
      ...options
    });
  };
});

export default Notify;
