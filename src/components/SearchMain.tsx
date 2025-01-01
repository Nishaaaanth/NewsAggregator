import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { searchCategoryAtom, searchFromDateAtom, searchNewsAtom, searchNewsResultAtom, searchSourceAtom, searchToDateAtom } from "../store/store";
import { filterMetaData, newsSource, validateDate } from "../config";
import { FeedType, FetchProps, FilteredMetaData } from "../types";
import Filter from "./Filter";
import SearchBar from "./SearchBar";
import "./searchmain.css";

const fetchNews = async ({ searchNews, searchSource, searchFromDate, searchToDate, searchCategory }: FetchProps): Promise<FeedType[]> => {
    const URL: string = newsSource(searchCategory, searchSource, searchFromDate, searchToDate, searchNews);
    const res = await axios.get(URL);

    if (searchSource == "guardian") {
        return await res.data.response.results;
    } else if (searchSource == "nyt") {
        return await res.data.response.docs;
    } else {
        return await res.data.articles;
    }
}

export default function SearchMain() {
    const [pressed, setPressed] = useState<boolean>(false);
    const searchNews = useRecoilValue<string>(searchNewsAtom);
    const searchSource = useRecoilValue<string>(searchSourceAtom);
    const searchFromDate = useRecoilValue<string>(searchFromDateAtom);
    const searchToDate = useRecoilValue<string>(searchToDateAtom);
    const searchCategory = useRecoilValue<string>(searchCategoryAtom);
    const navigate = useNavigate();
    const setSearchResult = useSetRecoilState<FilteredMetaData[]>(searchNewsResultAtom);

    const handleClick = useCallback(async () => {

        if (!searchNews) {
            alert("Please tell me what to search for?");
            return;
        }

        if (!validateDate(searchFromDate, searchToDate)) {
            alert("Invalid Dates");
            return;
        }

        setPressed(true);
        try {
            const fetchedData = await fetchNews({ searchNews, searchSource, searchFromDate, searchToDate, searchCategory });
            const filteredData = filterMetaData(fetchedData, searchSource);

            setSearchResult(filteredData);
            navigate("/articles");
        } catch(err) {
            console.error("Error while fetching");
            alert("For NewsAPI make sure the date is filtered after 2024-11-30");
        } finally {
            setPressed(false);
        }

    }, [searchFromDate, searchToDate, searchNews, searchSource, searchCategory]);

    return (
        <div className="search-main">
            <h2><span id="search-text">Search</span> for the <span id="news-text">News</span> with the filters.</h2>
            <Filter date={true} />
            <SearchBar />
            <button onClick={handleClick} className={pressed ? "pressed" : ""}>Search</button>
        </div>
    );
}
