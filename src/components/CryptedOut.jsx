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
            setCrypt(temp.toLocaleUpperCase().split('').reverse().join(''))
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
        if(type == "Cord"){
            setCrypt(Cord(temp));
        }
        if(type == "Playfair"){

        }
    }, [plain, cKey, type, value])

    function Cord(plainText){
        const lookUpArray = generate2dLookupArrayForCord(handleVietNameseNormal(value.toLowerCase()))
        let res = ""
        let x,y;
        for(let i = 0; i < plainText.length; i++){
            if(plainText.charAt(i) != " "){
                ({x,y} = (searchLookUpArray(plainText.charAt(i), lookUpArray)))
                res = res + (x+1).toString() + (y+1).toString() + " "; 
            }
            else{
                res += "/ "
            }
        }
        return res;
    }

    function searchLookUpArray(char, array){
        for(let x = 0; x < 5; x++){
            for(let y = 0; y < 5; y++){
                if(char == array[x][y]) return {x,y}
            }
        }
        return {x: -1,y: -1}
    }

    function generate2dLookupArrayForCord(plainText){
        if(typeof(plainText) != "string"){
            return;
        }
        const letters = new Set(plainText.replaceAll(" ", ""));
        const chars = "abcdefghijklmnopqrstuvwxyz";
        let lettersItr = letters.values()
        
        for(let i = 0; i < 26; i++){
            letters.add(chars[i])
        }
        
        let lookUpArray = [];
        for(let i = 0; i < 5; i++){
            lookUpArray.push([])
            for(let j = 0; j < 5; j++){
                lookUpArray[i].push(lettersItr.next().value)
            }
        }
        return lookUpArray;
    }

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
        for(let i = 0; i < temp.length; i++){
            if(temp.charAt(i) != " ") res += temp.charAt(i) + createRandomString(value)
        }
        return res.toLocaleUpperCase();
    }

    function WtW(temp){
        let res = "";

        if(typeof(cKey) !== "string") cKey = "a";
        if(typeof(value) !== "string") value = "a";

        // IMPORTANT:
        // a=k means k decrypts to a
        // therefore encryption uses inverse shift

        const shift =
            cKey.charCodeAt(0) - value.charCodeAt(0);

        for(let i = 0; i < temp.length; i++){
            const char = temp.charAt(i);

            if(char === ' '){
                res += ' ';
                continue;
            }

            const index =
                char.charCodeAt(0) - 'a'.charCodeAt(0);

            const shifted =
                (index + shift + 26) % 26;

            res += String.fromCharCode(
                shifted + 'a'.charCodeAt(0)
            );
        }

        return res.toUpperCase();
    }

    function WtN(temp){
        let res = [];

        if(typeof(cKey) !== "string") cKey = "a";
        if(typeof(value) !== "number") value = 1;

        // key shift (a = 0, b = 1, ..., z = 25)
        const keyShift = cKey.charCodeAt(0) - 'a'.charCodeAt(0);

        // additional numeric shift
        const totalShift = (keyShift + (value - 1)) % 26;

        for(let i = 0; i < temp.length; i++){
            const char = temp.charAt(i);

            if(char === ' '){
                res.push("/");
                continue;
            }

            // original position: 0-25
            const alphabetIndex = char.charCodeAt(0) - 'a'.charCodeAt(0);

            // shifted position: 0-25
            const shiftedIndex = (alphabetIndex + totalShift) % 26;

            // convert to A1Z26: 1-26
            if (i==0){
                res.push(shiftedIndex + 1);
            } else {
                res.push("-", shiftedIndex + 1);
            }
                
        }

        return res.join("");
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