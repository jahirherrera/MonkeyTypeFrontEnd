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

export interface colorProps{
    color : string;
    selected : (str:string)=>void;
}

export interface creatingUser{
    fullname : string;
    username : string;
    password : string;
    email : string;
}

declare module '*.css';