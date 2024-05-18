export interface IFastType {
  category: string;
  created_time: string;
  cur_participants_num: number;
  duration: string;
  max_participants_num: number;
  start_date: string;
  study_id: number;
  tendency: string;
  title: string;
  description: string;
  additional_infos: string[];
  is_member: boolean;
}

export interface fetchType {
  category: string;
  duration: string;
  mem_scope: number[];
  start_date: string;
  tendency: string[];
}
