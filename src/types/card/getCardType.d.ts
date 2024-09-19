export interface GetCardType {
  quickMatch?: string;
  category?: string;
  startDate?: string;
  duration?: string;
  minParticipants?: number | string;
  maxParticipants?: number | string;
  tendency?: string;
  orderType: string;
  search?: string;
  [key: string]: unknown;
}

type ProgressTodo = {
  total_num: number;
  complete_num: number;
  percent: number;
};

export interface StudyCardType {
  data: {
    id: number;
    title: string;
    category: string;
    status: string;
    start_date: string;
    end_date: string;
    max_participants_num: number;
    cur_participants_num: number;
    progress_todo: {
      total_num: number;
      complete_num: number;
      percent: number;
    };
  };
}
