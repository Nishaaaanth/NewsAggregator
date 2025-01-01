import { useSetRecoilState } from "recoil";
import "./searchbar.css";
import { feedPrefAuthorAtom, feedPrefCategoryAtom, feedPrefSourceAtom, searchCategoryAtom, searchFromDateAtom, searchSourceAtom, searchToDateAtom } from "../store/store";
import { ChangeEvent, useCallback, useRef } from "react";

export default function Filter({ author, date }: { author?: boolean, date: boolean }) {
    const setSearchCategory = useSetRecoilState(searchCategoryAtom);
    const setSearchSource = useSetRecoilState(searchSourceAtom);
    const setFeedCategory = useSetRecoilState(feedPrefCategoryAtom);
    const setFeedSource = useSetRecoilState(feedPrefSourceAtom);
    const setFromDate = useSetRecoilState(searchFromDateAtom);
    const setToDate = useSetRecoilState(searchToDateAtom);
    const setAuthor = useSetRecoilState(feedPrefAuthorAtom);
    const debounceTimeout = useRef<number | null>(null);

    const debounceAuthorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if(debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            setAuthor(e.target.value);
        }, 500);
    }, [setAuthor]);

    const handleChangeCategory = useCallback((e: ChangeEvent<HTMLSelectElement>) =>  {
        if (date) setSearchCategory(e.target.value);
        else setFeedCategory(e.target.value);
    }, [date, setSearchCategory, setFeedCategory]);

    const handleChangeSource = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        if (date) setSearchSource(e.target.value);
        else setFeedSource(e.target.value);
    }, [date, setSearchCategory, setFeedCategory]);

    const handleChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>, context: string) => {
        if (context == "fromDate") setFromDate(e.target.value);
        else setToDate(e.target.value);
    }, [setFromDate, setToDate]);

    return (
        <div className="search-bar-filter">
            {date &&
                <div className="search-bar-filter-date">
                    <span>
                        <h6>From </h6>
                        <input type="date" onChange={(e) => handleChangeDate(e, "fromDate")} />
                    </span>
                    <span>
                        <h6>To </h6>
                        <input type="date" onChange={(e) => handleChangeDate(e, "toDate")} />
                    </span>
                </div>
            }

            <section className="search-bar-filter-select">
                <select onChange={handleChangeCategory}>
                    <option value={""}>Category</option>
                    <option value={"business"}>Business</option>
                    <option value={"entertainment"}>Entertainment</option>
                    <option value={"general"}>General</option>
                    <option value={"health"}>Health</option>
                    <option value={"science"}>Science</option>
                    <option value={"sport"}>Sport</option>
                    <option value={"technology"}>Technology</option>
                </select>

                <select onChange={handleChangeSource}>
                    <option value={""}>Source</option>
                    <option value={""}>News API</option>
                    <option value={"bbc-news"}>BBC News</option>
                    <option value={"nyt"}>New York Times</option>
                    <option value={"guardian"}>The Gaurdian</option>
                </select>

                {author &&
                    <input type="text" placeholder="author" className="search-bar-filter-author" onChange={(e) => debounceAuthorChange(e)} />
                }

            </section>
        </div>
    );
}
