export interface QuickFilterType {
  save: boolean;
  category: string;
  duration: string;
  mem_scope: number[];
  tendency: string[];
  [key: string]: unknown;
}

export interface StudyInfoData {
  additional_infos: string[];
  category: string;
  created_time: string;
  cur_participants_num: number;
  description: string;
  duration: string;
  match_type: string;
  max_participants_num: number;
  start_date: string;
  study_id: number;
  tendency: string;
  title: string;
  user_relation: {
    is_owner: boolean;
    is_member: boolean;
    is_favorite: boolean;
  };
}

export interface FilterDataType {
  totalCount: number;
  data: StudyInfoData[];
}
