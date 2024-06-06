interface IUserProfileType {
    email: string | null;
    nickname: string;
    profile_img: string;
    rating: number | null;
    user_id: number;
}

interface IUserStudyType {
    in_complete: number;
    in_progress: number;
}

interface Imember {
    nickname: string;
    profileImage: string;
    _owner: boolean;
    exit_status: string;
}