import Vue from 'vue';
// 装备一个图标库
import { library } from '@fortawesome/fontawesome-svg-core';
// 导入图标使用组件
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
// 注入组件
Vue.component('font-awesome-icon', FontAwesomeIcon);
// 引入图标
import {
  faUser,
  faHouse,
  faInbox,
  faBook,
  faChevronDown,
  faArrowRight,
  faBars,
  faPlay,
  faForward,
  faUserSecret,
  faEnvelope,
  faLock,
  faShieldHeart,
  faBug,
  faCircleExclamation,
  faSkull,
  faPencil,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons';

import { faGithub, faWeixin } from '@fortawesome/free-brands-svg-icons';

library.add(
  faUser,
  faHouse,
  faInbox,
  faBook,
  faChevronDown,
  faArrowRight,
  faBars,
  faGithub,
  faPlay,
  faForward,
  faUserSecret,
  faEnvelope,
  faLock,
  faShieldHeart,
  faBug,
  faCircleExclamation,
  faSkull,
  faPencil,
  faTrashCan,
  faWeixin
);
