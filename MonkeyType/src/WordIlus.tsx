import { useState } from 'react';


interface WordIlustrationprops {
    word: string;
    wordtyping?: string;
}

export default function WordIlustration({ word, wordtyping }: WordIlustrationprops) {


    const words: string[] = word.split('');


    const changeColor = (i: number): string => {
        if (!wordtyping) return "";
        if (wordtyping[i] === undefined) return "";
        if (word[i] === wordtyping[i]) return "text-green-500";
        return "text-red-500"
    }





    return (
        <>
            <div className='inline-flex h-auto '>
                <div className={`flex`}>
                    {words.map((w, index) =>
                        <div className={`flex justify-center items-center content-center px-0.5 text-3xl font-bold m-0 p-0 ${changeColor(index)}`} key={index}>{w}</div>
                    )}
                </div>

            </div>
        </>
    )
}
