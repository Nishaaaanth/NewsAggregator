import { useCallback, useMemo } from "react";
import { calcReadTime, cleanAuthor } from "../config";
import { FilteredMetaData } from "../types";
import "./feedcard.css";

const FeedCard: React.FC<{ feed: FilteredMetaData }> = ({ feed }) => {
    const feedImage: string = feed["imageUrl"] ? feed["imageUrl"] : "./news-img.jpg";
    const feedTitle: string = `${feed["title"].slice(0, 60)}${feed.title.length > 61 ? "..." : ""}`;
    const feedAuthor: string | null = feed["author"] ? `${cleanAuthor(feed["author"]).slice(0, 20)}${cleanAuthor(feed.author).length > 20 ? "..." : ""}` : null;

    const readTime: number = useMemo(() => calcReadTime(feed["content"]), [feed["content"]]);
    const readTimeVerb: string = feed["content"] ? readTime + " min | " : "";

    const handleClick = useCallback(() => {
            window.open(feed["url"]);
    }, [feed["url"]]);

    return (
        <section onClick={handleClick} className="feedcard-container">

            {<img src={feedImage} />}

            <article>
                <a className="feedcard-title">{feedTitle}</a>

                <section className="feedcard-meta">
                    <p>{readTimeVerb}</p>
                    {feedAuthor}
                </section>
            </article>
        </section>
    );
}


export default FeedCard;
