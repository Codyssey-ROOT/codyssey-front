export interface NotificationDto {
  id: string;
  title: string;
  message: string;
  /** ISO 8601 */
  createdAt: string;
}
