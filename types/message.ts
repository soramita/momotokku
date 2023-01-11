import { StudentInfo } from '@/components/StudentList/type';

/**聊天数据类型 */
export type Message = {
  /**消息id */
  id: string;
  /**消息内容 */
  content: string;
  /**消息类型 */
  messageType: 'text' | 'image';
  /**学生信息 */
  studentInfo: StudentInfo;
  /**是否为连续发言 */
  continuousSpeech: boolean;
};
export type MessageList = Array<Message>;
