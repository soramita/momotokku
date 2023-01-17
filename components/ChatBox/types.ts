import { MessageType } from '@/types/message';

export type SendMessage = (messageType: MessageType, imgUrl?: string) => void;
