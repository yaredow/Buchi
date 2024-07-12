export type Conversation = {
  id: string;
  lastMessageAt: string; // Assuming this is a ISO 8601 formatted date string
  messages: {
    id: string;
    body: string;
    createdAt: string; // Assuming this is a ISO 8601 formatted date string
    senderId: string; // Assuming this refers to the ID of the sender
  }[];
  users: {
    id: string;
    name: string;
    username: string;
    bio: string;
    image: string; // URL of the user's image
  }[];
};
