import WordIlustration from './WordIlus'
//@ts-ignore
import sprite from './sprite.svg';
//@ts-ignore
import './App.css'
import { useRef, useEffect, useState } from 'react';
import type { UserWithScore, User } from './vite-env';
import { motion, AnimatePresence } from "framer-motion";

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

  useEffect(() => {
    if (localStorage.getItem('conected') === null) {
      localStorage.setItem('conected', 'false');
    }
  }, []);

  const [state, setState] = useState({
    typing: "",
    index: 0,
    writing: [] as string[],
  });

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const [userScores, setUserScores] = useState<UserWithScore[]>([]);
  const [showUSerScores, setShowUserScores] = useState<boolean>(false);

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

  useEffect(() => {
    if(localStorage.getItem('conected')==='false' || goodOnes === 0) return;
    sendValue();
  }, [showResults]);


  const sendValue = async () => {

    const value = results();
    try {
      const response = await fetch('http://localhost:8080/addScore', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ value: value }),
      });
      if (!response.ok) {
        console.error('Network response was not ok');
      }
      console.log("Value sent successfully");
    } catch (error) {
      console.error("Error sending value:", error);
    }
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
      return Math.floor((goodOnes) / ((secW - 1) / 60));
    }
  }

  function raw(): number {
    if (mode === "time") {
      return Math.floor(state.index / (time / 60));
    } else {
      return Math.floor((state.index) / ((secW - 1) / 60));
    }
  }

  const getUSerScores = async () => {
    try {
      const response = await fetch('http://localhost:8080/getResults', {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data: UserWithScore[] = await response.json();
      setUserScores(data);
      setShowUserScores(true);
    } catch (error) {
      console.error("Error fetching user scores:", error);
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

  const handleLogin = async () => {

    const user: User = {
      username: username,
      password: password
    }

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('Something went wrong during login');
      }

      const data = await response.text();
      console.log(data);
      localStorage.setItem('conected', 'true');
      setShowLogin(false);
      setUsername("");
      setPassword("");


    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  
  

  return (
    <>
      <div className="grid grid-rows-[4fr_12fr_1fr] justify-center items-center content-center h-screen w-full bg-[#212830]">
        <section className="grid grid-rows-3 justify-around items-end min-h-full ">
          <button onClick={() => setShowLogin(true)} className="absolute top-4 right-4 bg-[#41ce5c] text-white px-2 py-1 rounded hover:cursor-pointer hover:bg-green-600 hover:scale-105 transition-all duration-300 ease-in-out shadow-xl/40">
            Login
          </button>


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
            <svg width="26" height="26" className="hover:cursor-pointer m-1" onClick={getUSerScores}>
              <use href={`${sprite}#score`} />
            </svg>
            <svg width="26" height="26" className="hover:cursor-pointer m-1">
              <use href={`${sprite}#info`} />
            </svg>
          </div>


        </footer>

        {showResults && (
          <div className='fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white  '>
            <div className='w-110 h-80 grid grid-rows-[1fr_4fr] rounded-2xl shadow-xl/40 overflow-hidden'>

              <div className='p-3 bg-sky-900 flex justify-between items-center rounded-t-2xl'>
                <h1 className='text-xl'>MONKEYTYPE</h1>

                <svg width="30" height="30" className="m-1">
                  <use href={`${sprite}#monkey`} />
                </svg>

              </div>

              <div className='bg-gray-900 flex flex-col justify-around  rounded-b-2xl '>
                <div className='flex justify-around items-center '>
                  <div>
                    <p className='text-white text-xl'>WPM</p>
                    <p className='text-4xl text-[#41ce5c] '>{results()}</p>
                    <p className='text-gray-500 m-1'>words per minute</p>
                  </div>
                  <div className='flex flex-col justify-center items-start'>
                    <p className='text-white text-xl'>Accuracy</p>
                    <p className='text-4xl text-[#41ce5c]'>{Math.floor((goodOnes / (state.index === 0 ? 1 : state.index)) * 100)}%</p>
                    <p className='text-gray-500 m-1'>correct words</p>
                  </div>
                </div>

                <p className='min-w-full border border-gray-700'></p>

                <div className='flex justify-around items-center w-full '>
                  <p className='text-white text-xl'>Raw</p>
                  <p className='text-white text-xl'>{raw()}</p>
                </div>

                <div className='flex justify-around items-center w-full '>
                  <p className='text-white text-xl'>Time</p>
                  <p className='text-white text-xl'>{mode === "time" ? time : secW - 1}s</p>
                </div>

                <p className='min-w-full border border-gray-700'></p>

                <button
                  className=' text-white text-xl hover:cursor-pointer mx-auto'
                  onClick={() => { setShowResults(false); if (mode === "time") { settingTime(time) } else { settingWord(word) } }}
                >
                  &#x21ba;
                </button>
              </div>



            </div>
          </div>
        )}

        <AnimatePresence>
          {showUSerScores &&
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white"
            >
              <motion.div
                key="scores-modal"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className='w-100 h-150 grid grid-rows-[1fr_8fr] rounded-2xl shadow-xl/40 overflow-hidden'
              >
                <div className='p-3 bg-sky-900 flex justify-between items-center rounded-t-2xl'>
                  <h1 className='text-xl'>LEADERBOARD</h1>

                  <svg width="30" height="30" className="m-1 hover:cursor-pointer" onClick={() => setShowUserScores(false)}>
                    <use href={`${sprite}#monkey`} />
                  </svg>

                </div>

                <div className='bg-gray-900 flex flex-col rounded-b-2xl overflow-y-auto '>

                  <div className=' flex justify-between items-center w-full border-b border-gray-700 p-3 max-h-10'>
                    <p className='text-white text-2xl'>User</p>
                    <p className='text-white text-2xl'>Score</p>
                  </div>

                  {
                    userScores.map((user, index) => (
                      <div key={index} className='flex justify-between items-center w-full border-b border-gray-700 p-3 max-h-8'>
                        <p className='text-white text-lg'>{index + 1}. {user.username}</p>
                        <p className='text-[#41ce5c] text-lg'>{user.maxValue}</p>
                      </div>
                    ))
                  }

                </div>

              </motion.div>
            </motion.div>

          }
        </AnimatePresence>

        <AnimatePresence>
          {showLogin &&
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center items-center text-white"
            >
              <motion.div
                key="scores-modal"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className='w-100 h-110 grid grid-rows-[1fr_8fr] rounded-2xl shadow-xl/40 overflow-hidden'
              >
                <div className='p-3 bg-sky-900 flex justify-between items-center rounded-t-2xl'>
                  <h1 className='text-xl'>LOGIN</h1>

                  <svg width="30" height="30" className="m-1 hover:cursor-pointer" onClick={() => setShowLogin(false)}>
                    <use href={`${sprite}#monkey`} />
                  </svg>

                </div>

                <div className='bg-gray-900 flex flex-col rounded-b-2xl overflow-y-auto '>

                  <div className='flex flex-col p-3'>
                    <h1 className='text-xl mb-1'>Username</h1>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='bg-gray-700 rounded-lg p-1 text-white w-auto' />
                  </div>

                  <div className='flex flex-col p-3'>
                    <h1 className='text-xl mb-1'>Password</h1>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='bg-gray-700 rounded-lg p-1 text-white w-auto' />
                    <p className='text-xs m-1'>Forgot Password?</p>
                  </div>

                  <button onClick={handleLogin} className='bg-sky-900 w-20 flex justify-center items-center mx-auto rounded-lg p-2 hover:cursor-pointer hover:bg-sky-700 transition-all duration-200 ease-in-out '>
                    Log in
                  </button>

                  <div className='flex justify-center items-center mt-3'>
                    New here? <p className="underline pl-1 hover:cursor-pointer">Create an account</p>
                  </div>



                  <div className='flex flex-col justify-center items-center mt-5'>
                    <div className='flex justify-around w-40 items-center mt-2'>
                      <svg width="28" height="28" className="hover:cursor-pointer " >
                        <use href={`${sprite}#github`} />
                      </svg>
                      <svg width="19" height="19" className="hover:cursor-pointer ">
                        <use href={`${sprite}#x`} />
                      </svg>
                      <svg width="26" height="26" className="hover:cursor-pointer">
                        <use href={`${sprite}#google`} />
                      </svg>
                    </div>
                  </div>


                </div>

              </motion.div>
            </motion.div>

          }
        </AnimatePresence>



      </div>
    </>
  );
}

export default App;