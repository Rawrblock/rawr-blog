import { initUpload, finishUpload, getDefaultCover } from '@/api/file';
import OSS from 'ali-oss';

const state = () => ({
  setting: {},
  defaultCover: {
    homeCover: null,
    blogCover: null,
    loginCover: null
  }
});

const mutations = {
  SET_DEFAULT_COVER(state, payload) {
    state.defaultCover = payload;
  }
};

const actions = {
  // 文件上传方法(file上传文件，save保存到oss地址目录)
  async initUploadFile({ commit }, { file, save = '/' }) {
    const uploadFile = {
      name: file.name.substring(0, file.name.lastIndexOf('.')),
      size: file.size,
      ext: file.name.substring(file.name.lastIndexOf('.'))
    };
    // 保存基本信息
    const fileResult = await initUpload(uploadFile);
    let fileId = fileResult.data.fileId;
    // 创建OSS实例(上传文件)
    const client = new OSS({
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
      region: 'oss-cn-hangzhou',
      // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
      accessKeyId: fileResult.data.accessKeyId,
      accessKeySecret: fileResult.data.accessKeySecret,
      // 从STS服务获取的安全令牌（SecurityToken）。
      stsToken: fileResult.data.stsToken,
      // 填写Bucket名称。
      bucket: 'rawrblock'
    });
    const headers = {
      // 指定该Object被下载时网页的缓存行为。
      'Cache-Control': 'no-cache',
      'Content-Type': fileTypeJpg(file.type)
    };
    const result = await client.put(`${save}/${file.name}`, file, { headers });
    // console.log(result);
    const fileFinishUpload = {
      fileId: fileId,
      fileUri: result.url
    };
    // 上传完毕
    const finishResult = await finishUpload(fileFinishUpload);
    return finishResult.data;

    function fileTypeJpg(type) {
      if (type == 'image/jpeg' || type == 'image/png') {
        return 'image/jpg';
      }
    }
  },
  // 获取默认封面图片
  async defaultCover({ commit }) {
    let result = await getDefaultCover();
    let cover = {};
    result.data.forEach(item => {
      if (item.belong == 'HOME_COVER') {
        cover.homeCover = item.uri;
      } else if (item.belong == 'BLOG_COVER') {
        cover.blogCover = item.uri;
      } else {
        cover.loginCover = item.uri;
      }
    });
    commit('SET_DEFAULT_COVER', cover);
  }
};

const getters = {
  homeCoverUri(state) {
    return state.defaultCover.homeCover;
  },
  blogCoverUri(state) {
    return state.defaultCover.blogCover;
  },
  loginCoverUri(state) {
    return state.defaultCover.loginCover;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
