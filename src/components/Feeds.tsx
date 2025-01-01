import { FeedType, FilteredMetaData } from "../types";
import "./feedcard.css";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { useCallback, useEffect, useState } from "react";
import Filter from "./Filter";
import { cleanFeed, filterAuthor, filterMetaData, newsSource } from "../config";
import { useRecoilValue, useRecoilState } from "recoil";
import { feedPrefAuthorAtom, feedPrefCategoryAtom, feedPrefSourceAtom, feedNewsResultAtom } from "../store/store";
import FeedCard from "./FeedCard";
import axios from "axios";

const fetchNews = async ({ feedSource, feedCategory }: { feedSource: string, feedCategory: string }): Promise<FeedType[]> => {
    let data: FeedType[] = [];
    const URL: string = newsSource(feedCategory, feedSource);
    const res = await axios.get(URL);

    if (feedSource == "guardian") {
        data = await res.data.response.results;
        return data;
    } else if (feedSource == "nyt") {
        data = await res.data.response.docs;
        return data;
    } else {
        data = await res.data.articles;
        return data;
    }
}

export default function Feeds() {
    const [clicked, setClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchFeedCategory = useRecoilValue<string>(feedPrefCategoryAtom);
    const searchFeedSource = useRecoilValue<string>(feedPrefSourceAtom);
    const searchFeedAuthor = useRecoilValue<string>(feedPrefAuthorAtom);
    const [feedNews, setFeedNews] = useRecoilState<FilteredMetaData[]>(feedNewsResultAtom);

    const handleClick = useCallback(() => {
        setClicked(prev => !prev);
    }, []);

    const fetchAndFilterFeed = useCallback(async () => {
        const fetchedData = await fetchNews({ feedSource: searchFeedSource, feedCategory: searchFeedCategory });
        const filteredData = filterMetaData(fetchedData, searchFeedSource);
        const filteredAuthor = filterAuthor(filteredData, searchFeedAuthor);
        setFeedNews(filteredAuthor);
    }, [searchFeedAuthor, searchFeedCategory, searchFeedSource, setFeedNews]);

    useEffect(() => {
        setIsLoading(true);
        try {
            fetchAndFilterFeed();
        } catch (err) {
            console.error("error while fetching: " + err);
        } finally {
            setIsLoading(false);
        }
    }, [searchFeedAuthor, searchFeedCategory, searchFeedSource]);

    return (
        <main className="feed-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <FeedHeader handleClick={handleClick} />

                    {clicked && <div className="feed-filter-container">
                        <Filter date={false} author={true} />
                    </div>}

                    <FeedList feedNews={feedNews} searchFeedSource={searchFeedSource} />
                </>
            )}
        </main>
    );
}

const FeedHeader = ({ handleClick }: {handleClick: any}) => {
    return (
        <div className="feed-header">
            <header>Feeds (Headlines)</header>
            <div className="nav-bar-cog">
                <HiOutlineCog6Tooth onClick={handleClick} />
            </div>
        </div>

    );
}

const FeedList = ({ feedNews, searchFeedSource }: {feedNews: FilteredMetaData[], searchFeedSource: string}) => {
    return (
        <div className="feedcard-main-container">
            {feedNews && feedNews.length > 0 ? feedNews.map((feed: FilteredMetaData, id: number) => {
                if (cleanFeed(feed, searchFeedSource)) return null;
                return <FeedCard key={id} feed={feed} />
            }) : (
                <div>No Feeds</div>
            )}
        </div>
    );
}
