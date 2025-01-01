export type NewsAPIFeedType = {
    source: {
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
};

export type NYTFeedType = {
    abstract: string,
    web_url: string,
    snippet: string,
    lead_paragraph: string,
    source: string,
    multimedia: [{
        url: string
    }],
    headline: {},
    keywords: [{}],
    pub_date: string,
    document_type: string,
    news_desk: string,
    section_name: string,
    byline: {
        original: string,
        person: [{}]
    },
    organization: string | null,
    type_of_material: string,
    _id: string,
    word_count: number,
    uri: string
}

export type GuardianFeedType = {
    id: string,
    type: string,
    sectionId: string,
    sectionName: string,
    webPublicationDate: string,
    webTitle: string,
    webUrl: string,
    apiUrl: string,
    fields: {
        thumbnail: string
    },
    tags: [{
        id: string,
        type: string,
        webTitle: string,
        webUrl: string,
        apiUrl: string,
        references: [],
        bio: string,
        firstName: string,
        lastName: string,
    }],
    isHosted: boolean,
    pillarId: string,
    pillarName: string
}

export type FeedType = NewsAPIFeedType | NYTFeedType | GuardianFeedType;

export interface FilteredMetaData {
    author: string,
    title: string,
    url: string,
    imageUrl: string,
    content: string
}

export interface FetchProps {
    searchNews: string,
    searchSource: string,
    searchFromDate: string,
    searchToDate: string,
    searchCategory: string
}
