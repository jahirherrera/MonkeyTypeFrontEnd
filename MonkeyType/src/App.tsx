import WordIlustration from './WordIlus'
//@ts-ignore
import sprite from './sprite.svg';
//@ts-ignore
import './App.css'
import { useRef, useEffect, useState, use } from 'react';

function App() {
  // JavaScript, Java, Python
  const preterminadeWords: string[][] = [[
    "function", "const", "let", "var", "return", "if", "else", "switch", "case", "()=>", "break",
    "continue", "for", "while", "do", "try", "catch", "finally", "throw", "class", "extends",
    "constructor", "super", "import", "export", "default", "from", "new", "this", "await", "async",
    "promise", "resolve", "reject", "then", "map", "filter", "reduce", "find", "includes", "push",
    "pop", "shift", "unshift", "length", "array", "object", "string", "number", "boolean", "null",
    "undefined", "true", "false", "NaN", "parseInt", "parseFloat", "JSON", "stringify", "parse", "fetch",
    "response", "request", "status", "header", "body", "text", "data", "url", "path", "error",
    "log", "console", "document", "window", "element", "query", "selector", "event", "listener", "add",
    "remove", "target", "value", "click", "input", "submit", "prevent", "default", "set", "get",
    "timer", "interval", "timeout", "async", "await", "resolve", "reject", "import", "export", "module"
  ], [
    "public", "private", "protected", "class", "interface", "extends", "implements", "abstract",
    "static", "final", "void", "int", "double", "float", "boolean", "char", "String", "null", "true", "false",
    "if", "else", "switch", "case", "break", "continue", "for", "while", "do", "try", "catch", "finally", "throw", "throws",
    "return", "import", "package", "new", "this", "super", "instanceof", "enum", "synchronized", "volatile",
    "transient", "assert", "default", "native", "strictfp",
    "System", "out", "println", "print", "Scanner", "InputStream", "File", "IOException", "ArrayList", "HashMap", "HashSet",
    "LinkedList", "List", "Map", "Set", "Iterator", "Thread", "Runnable", "extends", "implements", "override", "toString",
    "equals", "hashCode", "compareTo", "main", "args", "length", "Math", "sqrt", "pow", "random", "StringBuilder", "append",
    "charAt", "substring", "indexOf", "parseInt", "parseDouble", "Integer", "Double", "Boolean", "Character", "Object",
    "try", "catch", "throw", "finally", "Exception", "RuntimeException", "Error", "ArrayIndexOutOfBoundsException",
    "NullPointerException", "System", "exit", "println"
  ], [
    "def", "class", "return", "if", "elif", "else", "for", "while", "break", "continue", "try", "except", "finally",
    "raise", "import", "from", "as", "with", "lambda", "pass", "yield", "global", "nonlocal", "assert", "del",
    "True", "False", "None", "and", "or", "not", "is", "in",
    "print", "input", "open", "read", "write", "close", "len", "range", "list", "dict", "set", "tuple", "int", "float", "str", "bool",
    "sum", "min", "max", "sorted", "map", "filter", "zip", "enumerate", "reversed", "abs", "pow", "round",
    "type", "isinstance", "id", "dir", "help", "vars", "locals", "globals",
    "__init__", "__str__", "__repr__", "__len__", "__iter__", "__next__", "__getitem__", "__setitem__", "__call__",
    "self", "super", "object", "Exception", "ValueError", "TypeError", "KeyError", "IndexError",
    "os", "sys", "math", "random", "json", "time", "datetime", "re", "requests", "pandas", "numpy",
    "append", "extend", "insert", "remove", "pop", "clear", "copy", "keys", "values", "items", "update"
  ]];

  const [state, setState] = useState({
    typing: "",
    index: 0,
    writing: [] as string[],
  });

  const [arrayofwords, setArrayofwords] = useState<string[]>([]);
  const [goodOnes, setGoodOnes] = useState<number>(0);
  const [mode, setMode] = useState<string>("time");
  const [secT, setSecT] = useState<number>(0);
  const [secW, setSecW] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);

  const [showResults, setShowResults] = useState<boolean>(false);

  const [lenguage, setLenguage] = useState<number>(0);

  const [time, setTime] = useState<number>(15);
  const [word, setWord] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstScroll = useRef(true);
  const scrollAmount = 12;


  useEffect(() => {
    if (firstScroll.current || goodOnes < 13) {
      firstScroll.current = false;
      return;
    }

    if (containerRef.current) {
      containerRef.current.scrollBy({
        top: scrollAmount,
        behavior: "smooth",
      });
    }
  }, [goodOnes]);


  function settingArrayOfWords(n: number) {
    const randomWords: string[] = [];
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * preterminadeWords[lenguage].length);
      randomWords.push(preterminadeWords[lenguage][randomIndex]);
    }
    setArrayofwords(randomWords);
    setState(prev => ({ ...prev, writing: Array(n).fill("") }));
  }

  function updateAtIndex(index: number, newValue: string) {
    if (newValue.length > 20) return;

    setState(prev => {
      const copy = [...prev.writing];
      copy[index] = newValue;
      return { ...prev, typing: newValue, writing: copy };
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === " " && state.typing.trim() !== "") {
      e.preventDefault();

      const currentWord = state.typing.trim();
      const correct = currentWord === arrayofwords[state.index];

      setGoodOnes(prev => (correct ? prev + 1 : prev));

      setState(prev => {
        const updatedWriting = [...prev.writing];
        updatedWriting[prev.index] = currentWord;

        return {
          ...prev,
          index: prev.index + 1,
          typing: "",
          writing: updatedWriting,
        };
      });
    }



    if (e.key === "Backspace" && state.typing.length === 0 && state.index > 0) {
      e.preventDefault();

      setState(prev => {
        const newIndex = prev.index - 1;
        const prevWord = prev.writing[newIndex] || "";
        return {
          ...prev,
          index: newIndex,
          typing: prevWord,
        };
      });
    }
  }




  const method = (m: string) => setMode(m);
  const methodSelected = (m: string): string => (m === mode ? "text-white" : "text-gray-500");


  useEffect(() => {
    if (!start) return;
    if (mode === "time") {
      return startTestWithTime();
    } else {
      return startTestWithWord();
    }
  }, [secT, start, secW]);

  function startTestWithTime() {
    if (secT === 0) {
      setStart(false);
      setShowResults(true);
      return;
    }
    if (secT > 0) {
      const timeout = setTimeout(() => {
        setSecT(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }

  function startTestWithWord() {
    if (word <= state.index) {
      setStart(false);
      setShowResults(true);
      return;
    }


    const timeout = setTimeout(() => {
      setSecW(prev => prev + 1);
    }, 1000);

    return () => clearTimeout(timeout);

  }

  const settingTime = (s: number) => {
    settingArrayOfWords(200);
    setSecT(s);
    resetTest();
  };

  const settingWord = (w: number) => {
    settingArrayOfWords(w);
    setSecW(0);
    resetTest();
  }





  function resetTest() {
    setState({ typing: "", index: 0, writing: [] });
    setGoodOnes(0);
    setSecT(time);
    setSecW(0);
    firstScroll.current = true;
    if (containerRef.current) containerRef.current.scrollTo({ top: 0, behavior: "auto" });
    setShowResults(false);
  }

  function results(): number {
    if (mode === "time") {
      return Math.floor(goodOnes / (time / 60));
    } else {
      return Math.floor(goodOnes / ((secW - 1) / 60));
    }
  }

  const timeSelected = (s: number): string => (s === time ? "text-white" : "text-gray-500");

  const wordSelected = (s: number): string => (s === word ? "text-white" : "text-gray-500");

  useEffect(() => {
    settingTime(time);
  }, [time]);

  useEffect(() => {
    settingWord(word);
  }, [word]);

  useEffect(() => {
    if (mode === "time") { settingTime(time) } else { settingWord(word) }
  }, [lenguage]);
  return (
    <>
      <div className="grid grid-rows-[4fr_12fr_1fr] justify-center items-center content-center h-screen w-full bg-[#212830]">
        <section className="grid grid-rows-3 justify-around items-end min-h-full ">
          <div className="flex justify-center items-center ">
            <h1 className="text-4xl text-[#41ce5c] h-14">Monkeytype</h1>
          </div>

          <div className="w-200 h-14 bg-gray-900 rounded-3xl flex justify-around items-center">
            <div className="flex justify-around items-center w-50">
              <button className={`${methodSelected("time")} hover:cursor-pointer`} onClick={() => { method("time"); settingTime(15) }}>Time</button>
              <button className={`${methodSelected("words")} hover:cursor-pointer`} onClick={() => { method("words"); settingWord(10) }}>Words</button>
            </div>

            <div>
              <select className="p-1 bg-gray-900 text-white hover:cursor-pointer" onChange={(e) => setLenguage(parseInt(e.target.value))}>
                <option value={0} >JavaScript</option>
                <option value={1} >Java</option>
                <option value={2} >Python</option>
              </select>
            </div>

            {mode === "time" ? (
              <div className="min-w-50 flex justify-around items-center">
                <p className={`hover:cursor-pointer ${timeSelected(15)}`} onClick={() => setTime(15)}>15</p>
                <p className={`hover:cursor-pointer ${timeSelected(30)}`} onClick={() => setTime(30)}>30</p>
                <p className={`hover:cursor-pointer ${timeSelected(60)}`} onClick={() => setTime(60)}>60</p>
              </div>
            ) : (
              <div className="min-w-50 flex justify-around items-center">
                <p className={`hover:cursor-pointer ${wordSelected(10)}`} onClick={() => setWord(10)}>10</p>
                <p className={`hover:cursor-pointer ${wordSelected(25)}`} onClick={() => setWord(25)}>25</p>
                <p className={`hover:cursor-pointer ${wordSelected(50)}`} onClick={() => setWord(50)}>50</p>
              </div>
            )}
          </div>

          {mode === "time" && (
            <h1 className="text-white flex justify-center items-center text-3xl">
              {secT}
            </h1>
          )}
        </section>

        <section
          className="flex border-t border-b border-white flex-wrap justify-center items-center gap-2 mt-20 w-350 max-h-100 min-h-100 overflow-hidden transform ttransition-all duration-[1500ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          ref={containerRef}
        >
          {arrayofwords.map((word, i) => (
            <WordIlustration
              key={i}
              word={word}
              wordtyping={state.writing[i]}
              isIn={i === state.index}
              start={setStart}
            />
          ))}
          <input
            autoFocus
            type="text"
            className="absolute w-350 size-auto text-3xl opacity-0 h-150 bg-amber-50"
            value={state.typing}
            onKeyDown={handleKeyDown}
            onChange={(e) => updateAtIndex(state.index, e.target.value)}
          />
        </section>

        <footer className="flex justify-center items-center w-full rounded-2xl  m-1">
          <div className='flex w-40 rounded-2xl bg-gray-900 justify-around items-center '>
            <a href="https://github.com/jahirherrera/ChatAppFrontend"
              target="_blank"
              rel="noreferrer">
              <svg width="30" height="30" className="hover:cursor-pointer m-1">
                <use href={`${sprite}#gitlogin`} />
              </svg>
            </a>
            <svg width="26" height="26" className="hover:cursor-pointer m-1">
              <use href={`${sprite}#score`} />
            </svg>
            <svg width="26" height="26" className="hover:cursor-pointer m-1">
              <use href={`${sprite}#info`} />
            </svg>
          </div>


        </footer>

        {showResults && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white '>
            <div className='bg-gradient-to-tl from-gray-900 to-sky-900 p-4 rounded-lg w-100 h-100 flex flex-col justify-center items-center border-4 border-white'>
              <h2 className='text-2xl mb-4'>Results</h2>
              <p className='text-4xl'>WPM: {results()}</p>
              <button
                className='mt-4 px-4 py-2 text-white text-xl'
                onClick={() => { setShowResults(false); if (mode === "time") { settingTime(time) } else { settingWord(word) } }}
              >
                &#x21ba;
              </button>

            </div>
          </div>
        )}


      </div>
    </>
  );
}

export default App;