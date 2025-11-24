import type { colorProps } from "./vite-env"


export default function Colors({color,selected}:colorProps){


    return(
        <button onClick={()=>selected(color)} className={`flex ${color} m-3 border-b w-29 h-8`}>
            <div className="bg-[var(--title)] w-5 h-5 rounded-full m-1"></div>
            <div className="bg-[var(--bar)] w-5 h-5 rounded-full m-1"></div>
            <div className="bg-[var(--bg)] w-5 h-5 rounded-full m-1"></div>
            <div className="bg-[var(--icons)] w-5 h-5 rounded-full m-1"></div>
        </button>
    )
}