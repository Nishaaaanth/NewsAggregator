import { atom, AtomEffect, DefaultValue, RecoilState } from "recoil";
import { FilteredMetaData } from "../types";

export const searchFromDateAtom: RecoilState<string> = atom({
    key: "searchFromDateAtom",
    default: ""
});

export const searchToDateAtom: RecoilState<string> = atom({
    key: "searchToDateAtom",
    default: ""
});

export const searchCategoryAtom: RecoilState<string> = atom({
    key: "searchCategoryAtom",
    default: ""
});

export const searchSourceAtom: RecoilState<string> = atom({
    key: "searchSourceAtom",
    default: ""
});

export const searchNewsAtom: RecoilState<string> = atom({
    key: "searchNewsAtom",
    default: ""
});

const sessionStorageEffect = (key: string): AtomEffect<FilteredMetaData[]> => ({ setSelf, onSet}) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue != null) setSelf(JSON.parse(savedValue));

    onSet((newValue: FilteredMetaData[] | DefaultValue) => {
        if (newValue instanceof DefaultValue) sessionStorage.removeItem(key);
        else sessionStorage.setItem(key, JSON.stringify(newValue));
    });
}

export const searchNewsResultAtom: RecoilState<FilteredMetaData[]> = atom({
    key: "searchNewsResultAtom",
    default: [{
        author: "",
        title: "",
        url: "",
        imageUrl: "",
        content: ""
    }],
    effects_UNSTABLE: [
        sessionStorageEffect("searchNewsResultAtom")
    ]
});

export const feedPrefAuthorAtom: RecoilState<string> = atom({
    key: "feedPrefAuthorAtom",
    default: ""
});

export const feedPrefCategoryAtom: RecoilState<string> = atom({
    key: "feedPrefCategoryAtom",
    default: ""
});

export const feedPrefSourceAtom: RecoilState<string> = atom({
    key: "feedPrefSourceAtom",
    default: ""
});

export const feedNewsResultAtom: RecoilState<FilteredMetaData[]> = atom({
    key: "feedNewsResultAtom",
    default: [{
        author: "author",
        title: "title",
        url: "",
        imageUrl: "",
        content: "content"
    }]
});
