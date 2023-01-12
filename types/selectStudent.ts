import { MessageList } from './message';

/**选择的学生 */
export type SelectStudent = {
  studentId: number;
  messageList: MessageList;
};

export type SelectStudentList = Array<SelectStudent>;
