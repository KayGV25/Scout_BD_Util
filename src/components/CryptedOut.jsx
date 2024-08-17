import { useEffect, useState } from "react";
import { handleVietNameseNormal } from "../hooks/handleVietnamese";
import { LT, LTd, T, Td, RT, RTd, R, Rd, RB, RBd, B, Bd, LB, LBd, L, Ld, C, Cd, VT, VTd, VR, VRd, VB, VBd, VL, VLd } from "../svg/CB"

const CBLookUp = [ <LT/>, <T/>, <RT/>, <L/>, <C/>, <R/>, <LB/>, <B/>, <RB/>, <LTd/>, <Td/>, <RTd/>, <Ld/>, <Cd/>, <Rd/>, <LBd/>, <Bd/>, <RBd/>, <VT/>, <VL/>, <VR/>, <VB/>, <VTd/>, <VLd/>, <VRd/>, <VBd/> ]

export default function CryptedOut({ cKey, value, type, plain }){
    let matrix = Array.from({ length: 200 }, () => new Array(200).fill(" ")); // Create " " filled 2d array
    const [crypt, setCrypt] = useState("");
    const [cryptArr, setCryptArr] = useState([])
    const [cryptCB, setCryptCB] = useState([])
    
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
            setCryptArr(S(temp.toLocaleUpperCase()));
        }
        if(type == "CB"){
            setCryptCB(CB(temp))
        }
        if(type == "R"){

        }
     }, [plain, cKey, type, value])


    function CB(temp){
        let res = []
        for(let i = 0; i < temp.length; i++){
            if(temp.charAt(i) != ' ') res.push(temp.charCodeAt(i) - 'a'.charCodeAt(0));
        }
        return res;
    }

    function S(temp){
        let size = findNearestSquareRoot(temp.length)
        let limit = size;   
        let x = 0, y = 0, limTop = 0, limLeft = 0
        let dir = 0
        for(let i = 0; i<temp.length; i++){
            matrix[y][x] = temp.charAt(i);
            if (dir % 4 === 0) {  // Moving right
                x++;
                if (x === limit - 1) {
                    dir++;
                }
            } else if (dir % 4 === 1) {  // Moving down
                y++;
                if (y === limit - 1) {
                    dir++;
                }
            } else if (dir % 4 === 2) {  // Moving left
                x--;
                if (x === limLeft) {
                    dir++;
                }
            } else if (dir % 4 === 3) {  // Moving up
                y--;
                if (y === limTop + 1) {
                    dir++;
                    limit--;   // Shrink the outer boundary
                    limTop++;  // Shrink the top boundary
                    limLeft++; // Shrink the left boundary
                }
            }
        }
        let resArr = [];
        for(let i = 0; i<size; i++){
            let tempArr = []
            for(let j = 0; j<size; j++){
                tempArr.push(matrix[i][j])
            }
            resArr.push(tempArr);
            tempArr = []
        }
        resetMatrix(size);
        return resArr;
    }

    function OfN(temp){
        let res=""
        if(typeof(cKey) == "string") cKey = 1
        for(let i = 0; i < temp.length; i++){
            if(temp.charAt(i) != " ") res += temp.charAt(i) + createRandomString(cKey)
        }
        return res.toLocaleUpperCase();
    }

    function WtW(temp){
        let res = ""
        let shiftedValue = Math.abs(cKey.charCodeAt(0) - value.charCodeAt(0))
        for(let i = 0; i < temp.length; i++){
            if(temp.charAt(i) == ' ') res += " ";
            else res += String.fromCharCode(((temp.charCodeAt(i) - 'a'.charCodeAt(0) + shiftedValue) % 26) + 'a'.charCodeAt(0));
        }
        return res.toLocaleUpperCase();
    }

    function WtN(temp){
        let res = ""
        if(typeof(value) == "string") value = 1
        let shiftedValue = Math.abs((cKey.charCodeAt(0) - "a".charCodeAt(0) + 1) - Number(value))
        for(let i = 0; i < temp.length; i++){
            if(temp.charAt(i) == ' ') res += " ";
            else res += (((temp.charCodeAt(i) - 'a'.charCodeAt(0) + shiftedValue) % 26) + 1) + " / ";
        }
        return res;
    }
    
    function findNearestSquareRoot(num){
        for(let i = 0; i <= num; i++){
            if(i*i >= num) return i;
        }
        return 0;
    }
    
    function createRandomString(length) {
        const chars = "abcdefghijklmnopqrstuvwxyz";
        let result = "";
        for (let i = 0; i < length; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    function resetMatrix(size){
        for(let i=0; i<size; i++){
            for(let j=0; j<size; j++){
                matrix[i][j] = " "
            }
        }
    }

    if(type == "S") return(
        <div className="flex flex-col gap-3">
            <p className="text-2xl text-zinc-50 select-none">Crypted Output</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-6 text-zinc-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>

            <table className="bg-zinc-50 text-center border-2 first-line:first:font-bold">
                <tbody>
                    {
                    cryptArr.map((element, rowIndex) => (
                        <tr key={rowIndex} className="border-2">
                        {
                            element.map((char, colIndex) => (
                            <td key={colIndex} className="border-2">{char}</td>
                            ))
                        }
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    )
    else if(type == "CB") return(
        <div className="flex flex-col gap-3">
            <p className="text-2xl text-zinc-50 select-none">Crypted Output</p>
            <div className="outline-none bg-gray-50 rounded-sm px-3 text-slate-950 w-full h-36 py-3 overflow-y-scroll flex flex-wrap"> 
                {
                    cryptCB.map((char, key) => (
                        <span key={key}>{CBLookUp[Number(char)]}</span>
                    ))
                }
            </div>
        </div>
    )
    else return(
        <div className="flex flex-col gap-3">
            <p className="text-2xl text-zinc-50 select-none">Crypted Output</p>
            <div className="outline-none bg-gray-50 rounded-sm px-3 text-slate-950 w-full h-36 py-3 overflow-y-scroll"> 
                {crypt}
            </div>
        </div>
    )
}