import { useState, useEffect } from "react";
import useFastStore from "../store/FastStore";
import FastSearch from "@/app/api/fastSearch";
import useAuth from "@/hooks/useAuth";
import { IFastType } from "../type/fastType";

export default function LastFast() {
  const { save, selectedDuration, selectedField, selectedDate, recruitArr, tendency } = useFastStore();
  const { accessToken } = useAuth();
  const [postData, setPostData] = useState<IFastType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let duration = selectedDuration !== "미정" ? selectedDuration : "";

        const data = await FastSearch(
          {
            save,
            category: selectedField,
            startDate: selectedDate,
            duration,
            mem_scope: recruitArr,
            tendency,
          },
          accessToken,
        );
        setPostData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [save, selectedDuration, selectedField, selectedDate, recruitArr, tendency, accessToken]);

  const check = () => {
    console.log(postData);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div onClick={check}>
          {postData.map((item: IFastType, index: number) => (
            <div key={index}>{item.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}
