export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  /** ISO 8601 */
  createdAt: string;
  /** In-app page the notification opens, if any. */
  link?: string;
}
