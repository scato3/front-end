export interface MyProfileType {
  profile: {
    nickname: string;
    profile_img: string | null;
    email: string;
    user_id: number;
    rating: number | null;
  };
  study_count: {
    in_progress: number;
    in_proposal: number;
    in_favorite: number;
    in_complete: number;
  };
  massage: string;
}
