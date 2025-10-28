
interface Conversation {
  id?: number;
  user_id: number | null;
  customer_id: string;
  role_type: string;
  message: string;
  message_seen: boolean;
  message_time: string;
  created_at?: string;
  updated_at?: string;
  message_count?: number;
}

interface ChatUserProps {
  customers: Conversation[];
  allmessage: Conversation[];
}

export type { ChatUserProps, Conversation }; 




