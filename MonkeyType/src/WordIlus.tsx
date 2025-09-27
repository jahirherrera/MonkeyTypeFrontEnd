import type { WordIlustrationprops } from './vite-env';
import { useEffect } from 'react';


export default function WordIlustration({ word, wordtyping, goodOnes }: WordIlustrationprops) {



    const changeColor = (i: number): string => {
        if (!wordtyping) return "";
        if (wordtyping[i] === undefined) return "";
        if (word[i] === wordtyping[i]) return "text-green-500";
        return "text-red-500"
    }

    const opacityColor = (i: number): string => {
        if (i < word.length) return "opacity-100";
        return "opacity-100";
    }

    const checkGoodOnes = () => {
        if (word === wordtyping) {
            goodOnes(prev => prev + 1);
        }
    };

    useEffect(() => {
        if (!wordtyping) return;
        if (word === wordtyping) {
            goodOnes(prev => prev + 1);
        }
    }, [wordtyping]);

    return (
        <>
            <div className='inline-flex flex-col '>

                <div className={`flex`}>
                    {word.split('').map((w, index) =>
                        <div className={`flex justify-center items-center content-center px-0.5 text-3xl font-bold  ${changeColor(index)}`} key={index}>{w}</div>
                    )}
                </div>



                <div className={`flex mt-2 min-h-15`}>
                    {wordtyping?.split('').map((w, index) =>
                        <div className={`flex justify-center items-center content-center px-0.5 text-3xl font-bold text-black  ${opacityColor(index)}`} key={index}>{w}</div>
                    )}
                </div>

            </div>

            <div className='w-4'></div>


        </>
    )
}
