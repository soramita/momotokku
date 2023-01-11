import { MessageList } from './message';

/**选择的学生 */
export type SelectStudent = {
  studentId: number;
  MessageList: MessageList;
};

export type SelectStudentList = Array<SelectStudent>;
