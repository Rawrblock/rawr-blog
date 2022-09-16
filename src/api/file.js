import { post } from './index';

export const initUpload = fileUploadRequest => {
  return post('/files/upload_init', fileUploadRequest);
};

export const finishUpload = fileFinishUpload => {
  return post('/files/upload_finish', fileFinishUpload);
};
