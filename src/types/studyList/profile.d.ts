export interface UserProfileType {
  profile: {
    nickname: string;
    profile_img: string;
    email: string;
    user_id: number;
    rating: number;
  };
  study_count: {
    in_progress: number;
    in_proposal: number;
    in_favorite: number;
    in_complete: number;
  };
  message: string;
}
