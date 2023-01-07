type FilterInfo = {
  id: number;
  name: string;
};

type Filters = Array<FilterInfo>;

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
  title: string;
  filters: Filters;
  studentList: Array<StudentInfo>;
}
