export interface CreateStudyDataType {
  category: string;
  title: string;
  description: string;
  tags: string[];
  startDate?: string;
  duration: string;
  max_participants_num: number;
  matching_type: string;
  tendency: string;
}
