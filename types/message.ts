import { StudentInfo } from '@/components/StudentList/type';

export type MessageType = 'text' | 'image' | 'reply' | 'plot';

/**聊天数据类型 */
export type Message = {
  /**消息id */
  id: string;
  /**消息内容 */
  content?: string;
  /**消息类型为回复时的内容 */
  body?: Array<{ id: string; content: string }>;
  /**消息类型 */
  messageType: MessageType;
  /**学生信息 */
  studentInfo: StudentInfo;
  /**是否为连续发言 */
  continuousSpeech: boolean;
};
export type MessageList = Array<Message>;
