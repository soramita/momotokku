type FilterInfo = {
  id: number;
  name: string;
};

type Path = '/students' | '/studentMessage';

export type Filters = Array<FilterInfo>;

export type StudentInfo = {
  id: number;
  name: string;
  avatar: string;
  introduce: string;
  kizunaRank: number;
  birthday: string;
  lastSpeech: string;
  school: string;
};

export interface StudentListProps {
  /**路由跳转路径 */
  path: Path;
  /**标题 */
  title: string;
  /**过滤的字段 */
  filters: Filters;
  /**学生信息列表 */
  studentList: Array<StudentInfo>;
}
