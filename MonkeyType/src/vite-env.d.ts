export interface WordIlustrationprops {
    word: string;
    wordtyping?: string;
    isIn: boolean;
    start: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface UserWithScore {
    username: string;
    maxValue: number;
}

export interface User {
    username: string;
    password: string;
}

declare module '*.css';