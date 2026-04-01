export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
};

export type ToastPreview = {
  id: string;
  label: string;
  description: string;
};

export type NotificationsContent = {
  title: string;
  subtitle: string;
  notifications: NotificationItem[];
  toastPreviews: ToastPreview[];
};
