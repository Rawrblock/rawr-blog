import { get, post } from './index';

export const initUpload = fileUploadRequest => {
  return post('/files/upload_init', fileUploadRequest);
};

export const finishUpload = fileFinishUpload => {
  return post('/files/upload_finish', fileFinishUpload);
};

// 获取出默认封面图片
export const getDefaultCover = () => {
  return get('/files/');
};
