import { useEffect, useState } from "react";
import { handleVietNameseNormal } from "../hooks/handleVietnamese";

export default function CryptedOut({ cKey, value, type, plain }){

    const [crypt, setCrypt] = useState("")
     useEffect(() => {
        var temp = handleVietNameseNormal(plain.toLowerCase());
        if(type == "WtW"){
            setCrypt(WtW(temp))
        }
        if(type == "WtN"){
            setCrypt(WtN(temp))
        }
        if(type == "R"){
            setCrypt(temp.split('').reverse().join(''))
        }
        if(type == "OfN"){
            setCrypt(OfN(temp))
        }
        if(type == "S"){
            
        }
     }, [plain, cKey, type, value])

    function createRandomString(length) {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function OfN(temp){
        let res=""
        for(let i = 0; i < temp.length; i++){
            res += temp.charAt(i) + createRandomString(cKey)
        }
        return res;
    }

    function WtW(temp){
        let res = ""
        let shiftedValue = Math.abs(cKey.charCodeAt(0) - value.charCodeAt(0))
        for(let i = 0; i < temp.length; i++){
            if(temp.charAt(i) == ' ') res += " ";
            else res += String.fromCharCode(((temp.charCodeAt(i) - 'a'.charCodeAt(0) + shiftedValue) % 26) + 'a'.charCodeAt(0));
        }
        return res;
    }

    function WtN(temp){
        let res = ""
        if(value == "a") value = 1
        let shiftedValue = Math.abs((cKey.charCodeAt(0) - "a".charCodeAt(0) + 1) - Number(value))
        for(let i = 0; i < temp.length; i++){
            if(temp.charAt(i) == ' ') res += " ";
            else res += (((temp.charCodeAt(i) - 'a'.charCodeAt(0) + shiftedValue) % 26) + 1) + " / ";
        }
        return res;
    }

    return(
        <>
            {type != "S" &&
                <div className="flex flex-col gap-3">
                    <p className="text-2xl text-zinc-50 select-none">Crypted Output</p>
                    <div className="outline-none bg-gray-50 rounded-sm px-3 text-slate-950 w-full h-36 py-3 overflow-y-scroll"> 
                        {crypt}
                    </div>
                </div>
            }
        </>
    )
}