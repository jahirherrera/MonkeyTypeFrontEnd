import WordIlustration from './WordIlus'
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const arrayofwords: string[] = ["Hello", "word", "this", "is", "monkey", "type"]

  const [writing, setWriting] = useState('');

  function writingChanging(e: React.ChangeEvent<HTMLInputElement>) {
    setWriting(e.target.value);
  }


  return (
    <>
      <section>
        <h1>Monkeytype</h1>
      </section>
      <div>
        <WordIlustration word="sdfsdf" wordtyping={writing} />

        <input type="text" className="absolute w-auto text-3xl opacity-0" value={writing} onChange={writingChanging} />
      </div>
    </>
  )
}

export default App
