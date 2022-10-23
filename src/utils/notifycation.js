import { notification } from 'antd';

export const notificationAlert = (
  type,
  title,
  desc = '',
  placement = 'top'
) => {
  notification[type]({
    message: title,
    description: desc,
    placement,
    duration: 3,
  });
};
