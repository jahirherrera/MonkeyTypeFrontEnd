import WordIlustration from './WordIlus'
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const arrayofwords: string[] = ["Hello", "word", "this", "is", "monkey", "type", "Hello", "word",
    "this", "is", "monkey", "type", "Hello", "word", "this", "is", "monkey", "type"
    , "Hello", "word", "this", "is", "monkey", "type", "Hello", "word", "this", "is", "monkey", "type", "Hello", "word", "this", "is", "monkey",
     "monkey", "type", "Hello", "word", "this", "is", "monkey"
  ]

  const [index, setIndex] = useState<number>(0);
  const [writing, setWriting] = useState<string[]>([]);
  const [typing, setTyping] = useState<string>('');
  const [goodOnes, setGoodOnes] = useState<number>(0);




  function updateAtIndex(index: number, newValue: string) {
    if (newValue.length > 10) return;
    setTyping(newValue);

    setWriting(prev => {
      const copy = [...prev];
      copy[index] = newValue;
      return copy;
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " " && typing[0].trim() !== " ") {
      e.preventDefault();
      setIndex(prev => prev + 1);
    }
  }


  useEffect(() => {
    setTyping('');
  }, [index]);

  useEffect(() => {
    console.log(goodOnes);
  }, [goodOnes]); 

  return (
    <>
      <div className="grid grid-rows-[1fr_4fr] justify-center items-center content-center h-screen w-full">
        <section className='flex justify-center items-center content-center'>
          <h1 className='text-4xl '>Monkeytype</h1>
        </section>
        <section className='flex flex-wrap justify-center items-center gap-2 mt-20 w-350 h-150  overflow-hidden relative border-2 border-black rounded-lg p-4'>
            {
              arrayofwords.map((word, index) => (
                <WordIlustration key={index} word={word} wordtyping={writing[index]} goodOnes={setGoodOnes} />
              ))
            }


          <input type="text" className="absolute w-350 size-auto text-3xl opacity-0 h-150 bg-amber-50" value={typing} onKeyDown={handleKeyDown} onChange={e => updateAtIndex(index, e.target.value)} />
        </section>
      </div>

    </>
  )
}

export default App
