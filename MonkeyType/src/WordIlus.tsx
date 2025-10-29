import type { WordIlustrationprops } from './vite-env';
import { useEffect, useState } from 'react';


export default function WordIlustration({ word, wordtyping, isIn, start }: WordIlustrationprops) {

    const [isGood, setIsGood] = useState<boolean>(false);


    const changeColor = (i: number): string => {
        if (!wordtyping) return "";
        if (word[i] === wordtyping[i]) return "text-green-500";
        return "text-red-500 "
    }

    const bar = (i: number) => {
        if (!wordtyping) return "";
        const lastone = wordtyping.length - 1;
        if (i === lastone && isIn) return "relative animate-pulse after:content-[''] after:absolute after:right-0 after:top-[10%] after:h-[80%] after:border-r after:border-white";
        return "";
    }

    useEffect(() => {
        if (!wordtyping) return;
        start(true);
        if (word === wordtyping) {
            setIsGood(!isGood);
        }

        if (isGood && word !== wordtyping) {
            setIsGood(!isGood);
        }
    }, [wordtyping]);


    const barwithnoletter= () => {
        if (isIn && !wordtyping) return " animate-pulse border-r border-white  h-10";
    }


    return (
        <>
            <div className={`inline-flex flex-col `}>

                <div className={`flex`}>
                    {word.split('').map((w, index) =>
                        <div className={`flex justify-center items-center content-center px-0.5 text-3xl font-bold  text-white `} key={index}>{w}</div>
                    )}
                </div>



                <div className={`flex mt-2 min-h-15`}>
                    {wordtyping ? wordtyping?.split('').map((w, index) =>
                        <div className={`flex justify-center items-center content-center px-0.5 text-3xl font-bold text-black transition-colors  ${bar(index)} ${changeColor(index)} `} key={index}>{w}</div>
                    ) : <div className={`flex justify-center items-center px-0.5 text-3xl font-bold text-black relative`}>
                            <span className={`${barwithnoletter()}`}/>
                        </div>}
                </div>

            </div>

            <div className='w-4'></div>


        </>
    )
}
