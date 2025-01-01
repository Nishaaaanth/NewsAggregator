import { IoNewspaperOutline } from "react-icons/io5";
import "./searchbar.css";
import { useSetRecoilState } from "recoil";
import { searchNewsAtom } from "../store/store";
import { ChangeEvent, useCallback } from "react";

export default function SearchBar() {
    const setSearchNews = useSetRecoilState(searchNewsAtom);

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setSearchNews(e.target.value)
    },[setSearchNews])

    return (
        <div className="search-bar-container">
            <input type="text" aria-label="Search News" className="search-bar-input" placeholder="Search News" onChange={handleChange}/>
            <IoNewspaperOutline />
        </div>
    );
}
