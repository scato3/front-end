import Image from "next/image";
import calendarIcon from "../../../../../public/icons/_main01/Icon_calendar.svg";
import peopleIcon from "../../../../../public/icons/_main01/Icon_people.svg";
import styles from "./card.module.css";
import { IfilterType } from "@/app/type/filterType";
import moment from "moment";
import { useRouter } from "next/navigation";
import Button from "@/app/_component/button/Button";
import { useModal } from "@/hooks/useModal";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import CancelModal from "./CancelModal";

export default function DetailCard({
  data,
  isCancel,
  activeFilter,
}: {
  data: IfilterType;
  isCancel: boolean;
  activeFilter: string;
}) {
  const startDate = moment(data.start_date).format("MM-DD");
  const endDate = data.end_date ? moment(data.end_date).format("MM-DD") : "미정";
  const router = useRouter();
  const { openModal, handleOpenModal, handleCloseModal } = useModal();

  const handleCancel = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleOpenModal();
  };

  return (
    <div
      className={styles.container}
      onClick={() => {
        if (activeFilter === "참여중") {
          router.push(`../chat?studyId=${data.id}`);
        } else {
          router.push(`../studyInfo?studyId=${data.id}`);
        }
      }}
    >
      <div className={styles.cardBox}>
        <div className={styles.titleBox}>
          <p className={styles.flag}>{data.category}</p>
          <p className={styles.title}>{data.title}</p>
        </div>
        <div className={styles.tagBox}>
          {data.additionalInfos?.map((tag: string, index: number) => {
            return (
              <span key={index} className={styles.tagTitle}>
                #{tag}
              </span>
            ); // key 추가
          })}
        </div>
        <div className={styles.detailBox}>
          <Image src={peopleIcon} width={24} height={24} alt="사람아이콘" />
          <p className={styles.detail}>
            {data.cur_participants_num}/{data.max_participants_num}
          </p>
          <Image src={calendarIcon} width={24} height={24} alt="달력아이콘" />
          <p className={styles.detail}>
            {startDate} - {endDate}
          </p>
        </div>
        {isCancel && (
          <div className={styles.BtnContainer} onClick={handleCancel}>
            <Button size="very_small">신청취소</Button>
          </div>
        )}
      </div>
      {openModal && (
        <ModalPortal>
          <ModalContainer handleCloseModal={handleCloseModal}>
            <CancelModal handleCloseModal={handleCloseModal} data={data} />
          </ModalContainer>
        </ModalPortal>
      )}
    </div>
  );
}
