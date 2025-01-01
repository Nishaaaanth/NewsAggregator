import { useRecoilValue } from "recoil";
import { searchNewsResultAtom, searchSourceAtom } from "../store/store";
import { FilteredMetaData } from "../types";
import FeedCard from "../components/FeedCard";
import { cleanFeed } from "../config";
import "./article.css";

export default function Article() {
    const searchResult = useRecoilValue(searchNewsResultAtom);
    const searchSource = useRecoilValue(searchSourceAtom);

    return (
        <main className="article">
            {searchResult && searchResult.length > 0 ? searchResult.map((feed: FilteredMetaData, id: number) => {
            if(cleanFeed(feed, searchSource)) return null;
                return <FeedCard key={id} feed={feed} />
            }) : (
                <div className="no-feed">No Feeds</div>
            )}
        </main>
    );
}
