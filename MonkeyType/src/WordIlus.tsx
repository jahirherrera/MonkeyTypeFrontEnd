import type { WordIlustrationprops } from './vite-env';
import { useEffect, useState } from 'react';


export default function WordIlustration({ word, wordtyping, goodOnes, isIn }: WordIlustrationprops) {

    const [isGood, setIsGood] = useState<boolean>(false);


    const changeColor = (i: number): string => {
        if (!wordtyping) return "";
        const lastone = wordtyping.length - 1;
        if (i === lastone && isIn) return "animate-pulse border-b-2 text-blue-400";
        if (word[i] === wordtyping[i]) return "text-green-500"; 
        return "text-red-500"
    }

    useEffect(() => {
        if (!wordtyping) return;
        if (word === wordtyping) {
            setIsGood(!isGood);
        }

        if (isGood && word !== wordtyping) {
            setIsGood(!isGood);
        }
    }, [wordtyping]);

    useEffect(() => {
        if (!wordtyping) return;
        if (isGood) {
            goodOnes(prev => prev + 1);
        } else {
            goodOnes(prev => prev - 1);
        }   
    }, [isGood]);


    return (
        <>
            <div className={`inline-flex flex-col `}>

                <div className={`flex`}>
                    {word.split('').map((w, index) =>
                        <div className={`flex justify-center items-center content-center px-0.5 text-3xl font-bold  text-white`} key={index}>{w}</div>
                    )}
                </div>



                <div className={`flex mt-2 min-h-15`}>
                    {wordtyping?.split('').map((w, index) =>
                        <div className={`flex justify-center items-center content-center px-0.5 text-3xl font-bold text-black transition-colors duration-200  ${changeColor(index)} `} key={index}>{w}</div>
                    )}
                </div>

            </div>

            <div className='w-4'></div>


        </>
    )
}
