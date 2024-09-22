import { useState } from "react";
import { handleVietNamese } from "../hooks/handleVietnamese";

export default function Morse(){
    const TextToMorseLib = {
        "_" : "----",
        "0": "-----",
        "1": ".----",
        "2": "..---",
        "3": "...--",
        "4": "....-",
        "5": ".....",
        "6": "-....",
        "7": "--...",
        "8": "---..",
        "9": "----.",
        "a": ".-",
        "b": "-...",
        "c": "-.-.",
        "d": "-..",
        "e": ".",
        "f": "..-.",
        "g": "--.",
        "h": "....",
        "i": "..",
        "j": ".---",
        "k": "-.-",
        "l": ".-..",
        "m": "--",
        "n": "-.",
        "o": "---",
        "p": ".--.",
        "q": "--.-",
        "r": ".-.",
        "s": "...",
        "t": "-",
        "u": "..-",
        "v": "...-",
        "w": ".--",
        "x": "-..-",
        "y": "-.--",
        "z": "--..",
        ".": ".-.-.-",
        ",": "--..--",
        "?": "..--..",
        "!": "-.-.--",
        "-": "-....-",
        "/": "-..-.",
        "@": ".--.-.",
        "(": "-.--.",
        ")": "-.--.-"
      }
    const [morse, setMorse] = useState("");

    function handleInput(text){
        var temp = handleVietNamese(text.toLocaleLowerCase());
        setMorse(() => {
            let res = ""
            for(let i = 0; i < temp.length; i++){
                if(temp[i] != " ") res += TextToMorseLib[temp[i]] + " / ";
            }
            return res    
        });
    }

    return(
        <>
            <div className="w-full flex justify-center mt-10">
                <div className="w-3/4 flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <p className="text-2xl text-zinc-50 select-none">Text Input</p>
                        <textarea autoFocus={true} type="text" name="inputMorse" className="outline-none rounded-sm px-3 text-slate-950 w-full h-36 resize-none py-3" onChange={(e) => handleInput(e.target.value)}></textarea>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-2xl text-zinc-50 select-none">Morse Output</p>
                        <div className="outline-none bg-gray-50 rounded-sm px-3 text-slate-950 w-full h-36 py-3 overflow-y-scroll">
                            {morse} 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}