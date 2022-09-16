import { initUpload, finishUpload } from '@/api/file';
import OSS from 'ali-oss';

const state = () => ({});

const mutations = {};

const actions = {
  // 文件上传方法(file上传文件，save保存到oss地址目录)
  async initUploadFile({ commit }, { file, save = '/' }) {
    const uploadFile = {
      name: file.name.substring(0, file.name.lastIndexOf('.')),
      size: file.size,
      ext: file.name.substring(file.name.lastIndexOf('.'))
    };
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
    const fileFinishUpload = {
      fileId: fileId,
      fileUri: result.url
    };
    const finishResult = await finishUpload(fileFinishUpload);
    return finishResult.data;

    function fileTypeJpg(type) {
      if (type == 'image/jpeg' || type == 'image/png') {
        return 'image/jpg';
      }
    }
  }
};

const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
