interface MenuData {
    id: number;
    title: string;
    status: string;
    start_date: string;
    end_date: string;
    additionalInfos: string[];
    category: string;
    created_time: string;
    cur_participants_num: number;
    max_participants_num: number;
  }
  
  export interface IMenuDataProps {
    data: MenuData[];
    totalCount: number;
  }