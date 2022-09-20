import Notify from '@/components/Notify';

const success = message => {
  Notify({
    type: 'success',
    message: message
  });
};

const error = message => {
  Notify({
    type: 'error',
    message: message
  });
};

const warning = message => {
  Notify({
    type: 'warning',
    message: message
  });
};

const info = message => {
  Notify({
    type: 'info',
    message: message
  });
};

export default { success, error, warning, info };
