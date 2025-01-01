import { FeedType, FilteredMetaData } from "./types";

export const NEWS_API_KEY: string = "e98ef84f78f54e4080282bdfd948ad8d";
export const NYT_API_KEY: string = "RlJXsFJK199PykrjlnRTVi6wuRgGK604";
export const GUARDIAN_API_KEY: string = "21afadf5-c8d1-4eab-99db-8d7639d39ba9";

export function cleanAuthor(author: string): string {
    const start = author.indexOf("(");
    const end = author.indexOf(")");

    if (start !== -1 && end !== -1 && start < end) {
        return author.substring(start + 1, end);
    }

    try {
        const targetWord = "Author: ";
        const targetIndex = author.indexOf(targetWord);

        if (targetIndex === -1) return author;
        return author.substring(targetIndex + targetWord.length);
    } catch {
        console.log("Error while filtering author");
        return author;
    }
}

export function calcReadTime(content: string): number {
    return Math.round(content.length / 100);
}

export function validateDate(searchFromDate: string, searchToDate: string): boolean {
    const fromDate = new Date(searchFromDate);
    const toDate = new Date(searchToDate);

    if (fromDate > toDate) {
        return false;
    }

    return true;
}

export function filterMetaData(data: FeedType[], source: string): FilteredMetaData[] {
    const newArray = data.map((obj) => {
        if (source == "nyt" && "byline" in obj) {
            return {
                author: obj.byline.original,
                title: obj.abstract,
                url: obj.web_url,
                imageUrl: "",
                content: obj.abstract
            };
        } else if (source == "guardian" && "tags" in obj) {
            return {
                author: obj.tags.length > 0 ? obj.tags[0].webTitle : "",
                title: obj.webTitle,
                url: obj.webUrl,
                imageUrl: obj.fields.thumbnail,
                content: ""
            };
        } else if ("author" in obj && "title" in obj && "url" in obj && "urlToImage" in obj) {
            return {
                author: obj.author,
                title: obj.title,
                url: obj.url,
                imageUrl: obj.urlToImage,
                content: obj.content
            };
        }
        return undefined;
    }).filter((item): item is FilteredMetaData => item !== undefined);

    return newArray;
}

export function newsSource(category: string, source: string, fromDate?: string, toDate?: string, search?: string): string {
    search = search && search.replace(' ', '+');

    if (source == "nyt") {
        return `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${search}&fq=news_desk:("${category}")&fq=pub_date:("${fromDate}")&api-key=${NYT_API_KEY}`;
    } else if (source == "guardian") {

        let URL: string = `https://content.guardianapis.com/search?q=${search}&show-fields=thumbnail&api-key=${GUARDIAN_API_KEY}&show-tags=contributor`;

        if (category) URL += `&section=${category}`;
        else {
            if (category) URL += `&section=${category}`;
            if (fromDate) URL += `from-date=${fromDate?.replace('/', '-')}`;
            if (toDate) URL += `to-date=${toDate?.replace('/', '-')}`;
        }

        return URL;
    } else {
        search = search == "" ? "general" : search;
        return `https://newsapi.org/v2/everything?q=${search}${category != "" ? "+" + category : ""}&sources=${source}&from=${fromDate}&to=${toDate}&apiKey=${NEWS_API_KEY}`;
    }
}

export function cleanFeed(feed: FilteredMetaData, source: string): boolean {
    if (source == "" || source == "bbc-news") {
        return (feed["author"] == "[Removed]" ||
            feed["title"] == "[Removed]" ||
            feed["content"] == "[Removed]" ||
            feed["author"] == "[Removed]" ||
            feed["author"] == ""
        );
    }
    return false;
}

export function filterAuthor(filteredData: FilteredMetaData[], author: string): FilteredMetaData[] {
    if (author.trim() == "") return filteredData;
    const lowerCaseAuthor = author.trim().toLowerCase();
    return filteredData.filter(data => data.author && data.author.trim().toLowerCase().includes(lowerCaseAuthor));
}
