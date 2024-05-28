"use client";

import styles from "./todo.module.css";
import Image from "next/image";
import Navigation from "@/app/_component/navigation/page";
import { useRouter } from "next/navigation";
import DateCard from "./_component/DateCard";
import Member from "./_component/Member";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import ModalContainer from "@/app/_component/ModalContainer";
import ModalPortal from "@/app/_component/ModalPortal";
import { useModal } from "@/hooks/useModal";
import Calendar from "./_component/Calendar";
import { useEffect, useState } from "react";
import ToDoInputBox from "./_component/ToDoInputBox";
import { useSearchParams } from "next/navigation";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import GetStudyInfo from "@/app/api/getStudyInfo";
import Loading from "@/app/_component/Loading";
import useAuth from "@/hooks/useAuth";
import useToDoStore from "../store/useToDoStore";
import SetGroupToDo from "@/app/api/setGroupToDo";
import SetPersonalToDo from "@/app/api/setPersonalToDo";
import DeleteGroupToDo from "@/app/api/deleteGroupToDo";
import DeletePersonalToDo from "@/app/api/deletePersonalToDo";
import CheckToDo from "@/app/api/checkToDo";
import GetTodos from "@/app/api/getTodos";
import moment from "moment";
import IconChecked from "../../../../public/icons/chatting/Checked_Checkbox.svg";
import IconUnchecked from "../../../../public/icons/chatting/Unchecked_Checkbox.svg";
import IconEdit from "../../../../public/icons/chatting/Edit.svg";
import IconClose from "../../../../public/icons/chatting/Icon_close.svg";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

const FILTERS = ["전체", "미완료", "완료"];

interface ITodos {
    id:number;
    content: string;
    complete: boolean;
}

export default function Todo(){
    const router = useRouter();
    const queryClient = new QueryClient();
    const now = moment().format('YYYY-MM-DD');
    const { openModal:openCalender , handleOpenModal:handleOpenCalendar, handleCloseModal:handleCloseCalendar} = useModal();
    const searchParams = useSearchParams();
    const studyIdString = searchParams.get("studyId");
    const studyId: number = studyIdString ? parseInt(studyIdString) : -1;
    const [ activeFilter, setActiveFilter ] = useState<string>(FILTERS[0]);
    const [ memberList, setMemberList ] = useState<Imember[]>([]);
    const [ isOwner, setIsOwner ] = useState<boolean>(false);
    const [ toDoId, setToDoId ] = useState<number>(-1);
    const [ todos, setTodos ] = useState<ITodos[]>([]);
    const [ groupTodos, setGroupTodos ] = useState<ITodos[]>([]);
    const [ teamPercent, setTeamPercent ] = useState<number>(0);
    const [ percent, setPercent ] = useState<number>(0);
    const { user, accessToken } = useAuth();
    const { selectedDate, 
            watchNickname, 
            setWatchNickname,
            toDo
            } = useToDoStore();

    const { data:studyData, isLoading, error } = useQuery({
        queryKey: ["MEMBER_INFO"],
        queryFn: async () => {
            const res = await GetStudyInfo(studyId);
            return res;
        },
    });

    useEffect(() => {
        if(studyData){
            const members = studyData.membersList;
            members.sort((a:Imember, b:Imember) => {
                if (a.nickname === user?.nickname) {
                    return -1;
                }
                if (b.nickname === user?.nickname) {
                    return 1;
                }
                return 0;
            });
            setMemberList(members.filter((member: Imember ) => member.exit_status === "None"));
            setWatchNickname(members[0].nickname);
            if (members[0]?._owner) setIsOwner(true);
        }
    },[studyData]);

    const { data:toDoData, isLoading: isToDoLoading, error:toDoError } = useQuery({
        queryKey: ["TODO_INFO", watchNickname, selectedDate],
        queryFn: async () => {
            const res = await GetTodos(studyId, watchNickname, selectedDate, accessToken);
            return res;
        }
    });

    useEffect(() => {
        if(toDoData){
            console.log(toDoData);
            setGroupTodos(toDoData.member_todo.public_todos);
            setTodos(toDoData.member_todo.personal_todos);
            setPercent(toDoData.percent);
            setTeamPercent(toDoData.group_percent);
        }
        if(toDoError) {
            console.log(toDoError);
        }
    },[toDoData]);

    const setPersonalToDo = useMutation({
        mutationFn: () => SetPersonalToDo({content:toDo, date:now}, studyId, accessToken),
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["TODO_INFO", watchNickname, selectedDate] });
        },
    });

    const { mutate: setGroupToDo } = useMutation({
        mutationFn: () => SetGroupToDo({content:toDo, date:now}, studyId, accessToken),
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["TODO_INFO", watchNickname, selectedDate] });
        },
    });

    const { mutate: deletePersonalToDo } = useMutation({
        mutationFn: (todo_id:number) => DeletePersonalToDo(studyId, todo_id, accessToken),
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["TODO_INFO", watchNickname, selectedDate] });
        },
    });

    const { mutate: deleteGroupToDo } = useMutation({
        mutationFn: (todo_id:number) => DeleteGroupToDo(studyId, todo_id, accessToken),
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["TODO_INFO", watchNickname, selectedDate] });
        },
    });

    const { mutate: checkToDo } = useMutation({
        mutationFn: ({ todo_id, complete }: { todo_id: number; complete: boolean }) => CheckToDo(studyId, accessToken, {todo_id, complete}),
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["TODO_INFO", watchNickname, selectedDate] });
        },
        onSuccess: () => console.log("toggle"),
    });

    const handleMemberClick = (member:Imember) => {
        setWatchNickname(member.nickname);
    };

    const handleSetPersonalToDo = () => {
        setPersonalToDo.mutate();
    };

    const handleSetGroupToDo = () => {
        setGroupToDo();
    };

    const deletePublic = (todo_id:number) => {
        deleteGroupToDo(todo_id);
    };

    const deletePersonal = (todo_id: number) => {
        deletePersonalToDo(todo_id);
    };

    const toggleCheckBox = (todo: ITodos) => {
        const id:number = todo.id;
        const changeStatus:boolean = !todo.complete;

        checkToDo({todo_id: id, complete: changeStatus});
    };

    return(
        <div className={styles.Container}>
            {isLoading || isToDoLoading ? <><Loading /></> : <>
            <Navigation isBack={true} dark={false} onClick={()=>{router.back()}}>목표관리</Navigation>
            <div className={styles.TopContainer}>
                <div className={styles.Top}>
                    <DateCard openModal={handleOpenCalendar}/>
                    <div className={styles.PercentageBox}>
                        <p className={styles.PercentTitle}>팀 평균 달성률<span className={styles.Percent}>{teamPercent}%</span></p>
                        <p className={styles.PercentTitle}>나의 달성률<span className={styles.Percent}>{percent}%</span></p>
                    </div>
                </div>
                <div className={styles.MemberBox}>
                    <Swiper
                        modules={[FreeMode]}
                        slidesPerView={5}
                        spaceBetween={12}
                        autoHeight={true}
                    >
                        {memberList.map((member, index) => (
                            <SwiperSlide><Member key={index} member={member} handleMemberClick={() => handleMemberClick(member)}/></SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            <div className={styles.Hr}></div>
            <div className={styles.BottomContainer}>
                <div className={styles.FilterBox}>
                    {FILTERS.map((filter) => (
                        <p className={`${styles.Filter} ${activeFilter === filter ? styles.active : ""}`}
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            >
                            {filter}
                        </p>
                    ))}
                </div>
                <div className={styles.ContentBox}>
                    {activeFilter === "전체" && <>
                        <p className={styles.ToDoTitle}>공통 할 일</p>
                        {groupTodos.length === 0 ? 
                            <p className={styles.TodoContent}>등록된 할 일이 없어요</p>
                        : groupTodos.map((todo) => (
                        <div className={styles.ToDoBox}>
                        <Image
                            className={styles.CheckBox}
                            src={todo.complete ? IconChecked : IconUnchecked}
                            width={24}
                            height={24}
                            alt="uncheckedBox"
                            onClick={()=>{toggleCheckBox(todo)}}
                        />
                        <p className={styles.TodoContent} key={todo.id}>{todo.content}</p>
                        
                        <Image
                            src={IconEdit}
                            width={16}
                            height={16}
                            alt="edit"
                        />
                        <Image
                            className={styles.DeleteIcon}
                            src={IconClose}
                            width={10.5}
                            height={10.5}
                            alt="DeleteBtn"
                            onClick={()=>deletePublic(todo.id)}
                        />
                        </div>                       
                    ))}
                        {isOwner &&
                            <ToDoInputBox onClick={handleSetGroupToDo}/>
                        }
                        <p className={styles.ToDoTitle}>나의 할 일</p>
                        {todos.length === 0 ? 
                            <p className={styles.TodoContent}>등록된 할 일이 없어요</p>
                        : todos.map((todo) => (
                        <div className={styles.ToDoBox}>
                            <Image
                                className={styles.CheckBox}
                                src={todo.complete ? IconChecked : IconUnchecked}
                                width={24}
                                height={24}
                                alt="uncheckedBox"
                                onClick={()=>{toggleCheckBox(todo)}}
                            />
                            <p className={styles.TodoContent} key={todo.id}>{todo.content}</p>
                            <Image
                                src={IconEdit}
                                width={16}
                                height={16}
                                alt="edit"
                            />
                            <Image
                                className={styles.DeleteIcon}
                                src={IconClose}
                                width={10.5}
                                height={10.5}
                                alt="DeleteBtn"
                                onClick={() => deletePersonal(todo.id)}
                            />
                            </div>                       
                        ))}
                    <ToDoInputBox onClick={handleSetPersonalToDo}/>
                    </>}
                    {activeFilter === "미완료" && <>
                    
                    </>}
                    {activeFilter === "완료" && <>
                    
                    </>}
                </div>
            </div>
            
            {openCalender &&
            <ModalPortal>
                <ModalContainer handleCloseModal={handleCloseCalendar}>
                    <Calendar handleCloseModal={handleCloseCalendar}></Calendar>
                </ModalContainer>
            </ModalPortal>
            }
            </> }
        </div>
    );
}