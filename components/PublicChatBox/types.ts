import { MessageType } from '@/types/message';

export type SendMessage = (messageType: MessageType, imgUrl?: string) => void;

export type ClearMessage = () => void;

export type SetMode = (state: React.SetStateAction<boolean>) => void;
