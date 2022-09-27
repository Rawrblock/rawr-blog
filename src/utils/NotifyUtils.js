import Notify from '@/components/Notify';

const success = options => {
  Notify({
    type: 'success',
    message: options.message,
    onClose: options.onClose
  });
};

const error = options => {
  Notify({
    type: 'error',
    message: options.message,
    onClose: options.onClose
  });
};

const warning = options => {
  Notify({
    type: 'warning',
    message: options.message,
    onClose: options.onClose
  });
};

const info = options => {
  Notify({
    type: 'info',
    message: options.message,
    onClose: options.onClose
  });
};

export default { success, error, warning, info };
