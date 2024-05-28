interface IJoinedMember {
    join_date: string;
    nickname: string;
    profile_image: string;
    study_id: number;
    user_id: number;
}

interface IRequestMember {
    study_id: number;
    user_id: number;
    request_date: string;
    join_status: string;
    nickname: string;
    profile_image: string;
}