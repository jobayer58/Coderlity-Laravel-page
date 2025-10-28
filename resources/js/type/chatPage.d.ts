interface DirectContact {
  id: number;
  roomId: number;
  status: string;
  name: string;
  image: string;
  number: string;
  email: string;
  bgColor: string;
  badge: string | number;
  location: string;
}
interface channelsListType {
  id: number;
  name: string;
  unReadMessage?: number;
  image: string;
}
interface chatContactType {
  direactContact?: DirectContact[];
  channelsList?: channelsListType[];
}

type UserMessage = {
  id: number;
  from_id: number;
  to_id: number;
  msg: string | null;
  reply: { sender: string; msg: string; id: number };
  isImages: boolean;
  has_images: { id: number; image: string }[];
  datetime: string;
};

type userMessagesType = {
  id: number;
  roomId: number;
  sender: string;
  createdAt: string;
  usermessages: UserMessage[];
};

export { chatContactType, userMessagesType , UserMessage};
