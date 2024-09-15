export interface CardType {
  additionalInfos: string[];
  category: string;
  created_time: string;
  cur_participants_num: number;
  end_date: string;
  id: number;
  max_participants_num: number;
  start_date: string;
  status: string;
  title: string;
  user_relation: {
    is_owner: boolean;
    is_member: boolean;
  };
}
