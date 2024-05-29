import api from "@/_lib/fetcher";
import { IUserState } from "@/hooks/useAuth";
import getChat from "./chat/getChat";
import postChat from "./chat/postChat";

interface ISetStudyProps {
  category: string | null;
  title: string;
  description: string;
  tags: string[];
  start_date: string | null;
  duration: string | null;
  max_participants_num: number;
  matching_type: string | null;
  tendency: string | null;
}

export default async function setStudy(body: ISetStudyProps, token: string, user: IUserState) {
  const data = await api.post({ endpoint: `study`, body, authorization: token });
  const isChat = await getChat(data, token);
  if (isChat.length == 0) {
    await postChat(
      {
        studyId: data.toString(),
        pk: user.userId.toString(),
        name: body.title,
      },
      token,
    );
  }
  return data;
}
