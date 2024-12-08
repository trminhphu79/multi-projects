export type Conversation = {
  sender: string;
  lassMessage: string;
  unread: boolean;
  time: string;
  avatarUrl?: string;
  profileId: number;
};

export type MessageCategory = {
  label: string;
  selected: boolean;
};

export type Message = {
  id: number; // Unique identifier for the message
  conversationId: number;
  senderId: number;
  isSender: boolean;
  isReceiver: boolean;
  sender: {
    id: string; // Sender's unique identifier
    name: string; // Sender's display name
    avatarUrl?: string; // Optional avatar URL of the sender
  };
  recipient: {
    id: string; // Recipient's unique identifier
    name: string; // Recipient's display name
  };
  content: string; // Message content (text)
  contentType: 'text' | 'image' | 'video' | 'file'; // Type of the message content
  timestamp: string; // Timestamp when the message was sent
  status: 'sent' | 'delivered' | 'read'; // Status of the message
  attachments?: Array<{
    url: string; // URL of the attachment
    fileName: string; // Name of the attached file
    fileType: string; // MIME type (e.g., 'image/png', 'application/pdf')
    fileSize: number; // Size of the file in bytes
  }>; // Optional array of attachments
  reactions?: Array<{
    type: string; // Type of reaction (e.g., 'like', 'love', 'laugh')
    userId: string; // User who reacted
  }>; // Optional reactions to the message
  isEdited?: boolean; // Optional flag to indicate if the message has been edited
  isDeleted?: boolean; // Optional flag to indicate if the message has been deleted
};

export type Messages = Array<Partial<Message>>;
