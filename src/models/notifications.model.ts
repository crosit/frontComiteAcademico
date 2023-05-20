export type NotificationModel = {
  id: number;
  receiverId: number;
  subject: string;
  content: string;
  redirectUrl: string | null;
  read: boolean;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  receiver: {
    id: number;
    firstName: string;
    lastName: string;
  }
};
