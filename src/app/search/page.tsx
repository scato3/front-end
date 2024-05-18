"use client";

import styles from "./search.module.css";
import Search_Input from "../_component/input/Search_Input";
import Navigation from "../_component/navigation/page";
import Footer from "../_component/footer/footer";
import IconBell from "../../../public/icons/_main01/Icon_alert.svg";
import Image from "next/image";
import SearchTag from "./_component/SearchTag";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import GetRecentSearch from "../api/recentSearch";
import DeleteRecentSearch from "../api/deleteRecent";
import DeleteRecentSearchAll from "../api/deleteRecentAll";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useSearchStore from "./store/useSearchStore";
import GetPopularSearch from "../api/popularSearch";
import useSortStore from "../studyList/store/useSortStore";
import useFromStore from "@/utils/from";

const shortCutIcons = [
  {
    path: "/icons/search/Btn_전체.svg",
    alt: "전체",
    ref: "all",
  },
  {
    path: "/icons/search/Btn_마감임박.svg",
    alt: "마감임박",
    ref: "deadline",
  },
  {
    path: "/icons/search/Btn_신규.svg",
    alt: "신규",
    ref: "recent",
  },
  {
    path: "/icons/search/Btn_승인없는.svg",
    alt: "승인없는",
    ref: "quick",
  },
];

export default function Search() {
  interface SearchResult {
    searchId: number;
    keyword: string;
    totalCount: number;
  }
  const [popularKeywords, setPopularKeyword] = useState<string[] | null>(null);
  const {
    queryString,
    setQueryString,
    recentKeywords,
    setRecentKeywords,
    addRecentKeyword,
    inputValue,
    setInputValue,
  } = useSearchStore();
  const { accessToken, isLogin } = useAuth();
  const { setQuickMatch, setSortSelected } = useSortStore();
  const { setFrom } = useFromStore();

  const router = useRouter();

  // 어디 페이지에서 옮기는지 체크
  useEffect(() => {
    setFrom("search");
  }, []);

  useEffect(() => {
    if (isLogin) {
      console.log(recentKeywords);
      getRecent();
    } else {
      const recentNoLogin = sessionStorage.getItem("recentKeywords");
      if (recentNoLogin !== null) {
        const parsedRecent = JSON.parse(recentNoLogin);
        setRecentKeywords(parsedRecent);
      }
    }
    getPopular();
  }, []);

  useEffect(() => {
    if (!isLogin) {
      sessionStorage.setItem("recentKeywords", JSON.stringify(recentKeywords));
    }
  }, [recentKeywords]);

  const getRecent = async () => {
    try {
      const res = await GetRecentSearch(accessToken);
      setRecentKeywords(
        res.data.map((item: { keyword: string; id: number }) => ({ keyword: item.keyword, id: item.id })),
      );
      console.log(recentKeywords);
    } catch (error) {
      console.log(error);
    }
  };

  const getPopular = async () => {
    try {
      const res = await GetPopularSearch();
      const data: SearchResult[] = await res.data;
      setPopularKeyword(data.map((item) => item.keyword));
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      const newValue = (e.target as HTMLInputElement).value;
      setQueryString(newValue);
      addRecentKeyword({ keyword: newValue, id: recentKeywords.length });
      console.log(recentKeywords);

      router.push(`./search_result?queryString=${queryString}`);
    }
  };

  const handleDelete = async (id: number) => {
    if (isLogin) {
      try {
        await DeleteRecentSearch(accessToken, id);
        setRecentKeywords(recentKeywords.filter((keyword) => keyword.id !== id));
      } catch (error) {
        console.log(error);
      }
    } else {
      setRecentKeywords(recentKeywords.filter((keyword) => keyword.id !== id));
    }
  };

  const handleDeleteAll = async () => {
    if (isLogin) {
      try {
        await DeleteRecentSearchAll(accessToken);
        setRecentKeywords([]);
      } catch (error) {
        console.log(error);
      }
    } else {
      sessionStorage.removeItem("recentKeywords");
      setRecentKeywords([]);
    }
  };

  const handleGoKeyword = (keyword: string) => {
    setQueryString(keyword);
    setInputValue(keyword);
    router.push(`./search_result?queryString=${queryString}`);
  };

  const handleShortcut = (ref: string) => {
    if (ref === "quick") {
      setQuickMatch(true);
      setSortSelected("recent");
      router.push("./studyList");
    } else if (ref === "recent") {
      setQuickMatch(false);
      setSortSelected("recent");
      router.push(`./studyList`);
    } else if (ref === "deadline") {
      setSortSelected("deadline");
      router.push("./studyList");
    } else {
      setSortSelected("recent");
      router.push("./studyList");
    }
  };

  const handleGoBefore = () => {
    setInputValue("");
    router.push("./search");
  };

  return (
    <>
      <div className={styles.container}>
        <Navigation dark={true} onClick={handleGoBefore}>
          <Image className={styles.iconBell} src={IconBell} width={48} height={48} alt="bell" />
        </Navigation>
        <div className={styles.searchInputBox}>
          <Search_Input value={inputValue} onChange={handleChange} handleEnter={handleEnter} />
        </div>

        <div className={styles.recentSearchBox}>
          <div className={styles.recentBoxTop}>
            <p className={styles.recent}>최근 검색어</p>
            <p className={styles.delete} onClick={handleDeleteAll}>
              지우기
            </p>
          </div>
          <div>
            <Swiper className={styles.recentKeywordBox} modules={[FreeMode]} slidesPerView={4} spaceBetween={10}>
              {recentKeywords.map((item, idx) => (
                <SwiperSlide className={styles.recentKeyword} key={idx}>
                  <SearchTag goKeyword={() => handleGoKeyword(item.keyword)} handleDelete={() => handleDelete(item.id)}>
                    {item.keyword}
                  </SearchTag>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.hrLine}></div>
        <div className={styles.popularBox}>
          <p>인기 검색어</p>
          <div className={styles.popularKeywordBox}>
            {popularKeywords &&
              popularKeywords.map((keyword, index) => (
                <p
                  onClick={() => handleGoKeyword(keyword)}
                  key={index}
                  className={`${styles.popularKeyword} ${styles[`keyword${index + 1}`]}`}
                >{`${index + 1}. ${keyword}`}</p>
              ))}
          </div>
        </div>
        <div className={styles.hrLine}></div>
        <div className={styles.shortCutBox}>
          <p>바로가기</p>
          <div className={styles.iconBox}>
            {shortCutIcons.map((icon, index) => (
              <Image
                onClick={() => handleShortcut(icon.ref)}
                className={styles.icon}
                key={index}
                src={icon.path}
                width={96}
                height={96}
                alt={icon.alt}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footerBox}>
        <Footer selectedIndex={1} />
      </div>
    </>
  );
}
