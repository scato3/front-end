import { useEffect } from "react";
import useCreateStore from "../store/CreateStore";

export default function CreateLast() {
  const { selectedDate, selectedField, selectedDuration, recruit, tendency, matchingType } = useCreateStore();
  useEffect(() => {
    console.log(selectedDate, selectedField, selectedDuration, recruit, tendency, matchingType);
  }, []);
  return <></>;
}
