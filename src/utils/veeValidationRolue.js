// 引入校验规则
import { localize, extend, setInteractionMode } from 'vee-validate';
import { required, email, regex, image } from 'vee-validate/dist/rules';

// 统一设置校验文本框模式
// setInteractionMode('lazy');

// 配置中文消息提示
import zh_CN from 'vee-validate/dist/locale/zh_CN.json';
localize({
  zh_CN
});

extend('email', {
  ...email,
  message: '请输入正确的邮箱格式!'
});

extend('required', {
  ...required,
  message: '必填!'
});

// 注册
extend('checkName', {
  ...regex,
  message: '请输入5-10个字符的{_field_}'
});
extend('checkPwd', {
  ...regex,
  message: '请输入以字母开头,长度5~18之间'
});
extend('checkImage', {
  ...image,
  message: '请上传图片!'
});
