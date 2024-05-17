interface IUserProfileType {
    email: string;
    nickname: string;
    profile_img: string;
    rating: number | null;
    user_id: number;
}

interface IUserStudyType {
    in_complete: number;
    in_progress: number;
}