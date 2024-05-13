import styles from "./popularKeyword.module.css";
import { useState, useEffect } from "react";
import GetPopularSearch from "@/app/api/popularSearch";

interface SearchResult {
    searchId: number;
    keyword: string;
    totalCount: number;
}

export default function PopularKeyword({slideNum} : {slideNum: 1 | 2 | 3}) {

    const [ popularKeywords, setPopularKeyword ] = useState<string[] | null>(null);

    useEffect(() => {
        getPopular();
    }, []);

    const getPopular = async () => {
        try {
            const res = await GetPopularSearch();
            const data: SearchResult[] = await res.data;
            setPopularKeyword(data.map(item => item.keyword));
            } catch (error) {
            console.error(error);
            }
    };

    return(
        <div className={styles.container}>
            {popularKeywords && 
                popularKeywords.map((keyword, index) => (
                    <p key={index} className={styles.keyword}>{`${index+1}. ${keyword}`}</p> 
                ))}
        </div>
    );
}