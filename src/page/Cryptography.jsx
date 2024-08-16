import { useState } from "react"
import CryptedOut from "../components/CryptedOut";

export default function Cryptography(){
    const [plain, setPlain] = useState("");
    const [cryptType, setCryptType] = useState("WtW");
    const [key, setKey] = useState("a");
    const [value, setValue] = useState("a");

    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    return(
        <>
            <div className="w-full flex justify-center mt-10">
                <div className="w-3/4 flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <p className="text-2xl text-zinc-50 select-none">Text Input</p>
                        <textarea autoFocus={true} type="text" name="inputMorse" className="outline-none rounded-sm px-3 text-slate-950 w-full h-36 resize-none py-3" onChange={(e) => setPlain(e.target.value)}></textarea>
                    </div>
                    <div className="flex gap-3">
                        <label htmlFor="crypt" className="text-2xl text-zinc-50 select-none">Choose Crypt type: </label>
                        <select name="crypt" className="text-black rounded-md text-center" id="" onChange={(e) => {
                    setCryptType(e.target.value)}}>
                            <option value="WtW">Chữ Thay Chữ (Caesar)</option>
                            <option value="WtN">Số Thay Chữ</option>
                            <option value="R">Đảo Ngược</option>
                            <option value="OfN">Một Đổi N</option>
                            <option value="S">Xoáy</option>
                        </select>
                    </div>
                    {cryptType == "WtW" &&
                        <div className="flex gap-3">
                            <label htmlFor="key" className="text-2xl text-zinc-50 select-none">Select key: </label>
                            <select name="key" className="text-black rounded-md text-center" onChange={(e) => setKey(e.target.value)}>
                            {
                                [...Array(26)].map((_, i) => (
                                <option key={i} value={String.fromCharCode(97 + i)}>
                                    {String.fromCharCode(97 + i)}
                                </option>
                                ))
                            }
                            </select>
                            <label htmlFor="value" className="text-2xl text-zinc-50 select-none">Select value: </label>
                            <select name="value" className="text-black rounded-md text-center" onChange={(e) => setValue(e.target.value)}>
                            {
                                [...Array(26)].map((_, i) => (
                                <option key={i} value={String.fromCharCode(97 + i)}>
                                    {String.fromCharCode(97 + i)}
                                </option>
                                ))
                            }
                            </select>
                        </div>
                    }
                    {cryptType == "WtN" &&
                        <div className="flex gap-3">
                            <label htmlFor="key" className="text-2xl text-zinc-50 select-none">Select key: </label>
                            <select name="key" className="text-black rounded-md text-center" onChange={(e) => setKey(e.target.value)}>
                            {
                                [...Array(26)].map((_, i) => (
                                <option key={i} value={String.fromCharCode(97 + i)}>
                                    {String.fromCharCode(97 + i)}
                                </option>
                                ))
                            }
                            </select>
                            <label htmlFor="value" className="text-2xl text-zinc-50 select-none">Select value: </label>
                            <select name="value" className="text-black rounded-md text-center" onChange={(e) => setValue(Number(e.target.value))}>
                            {
                                [...Array(26)].map((_, i) => (
                                <option key={i} value={i+1}>
                                    {i+1}
                                </option>
                                ))
                            }
                            </select>
                        </div>
                    }
                    {cryptType == "OfN" &&
                        <div className="flex gap-3">
                            <label htmlFor="key" className="text-2xl text-zinc-50 select-none">Select key: </label>
                            <input type="number" name="key" className="text-center" min={1} onKeyDown={preventMinus} onChange={(e) => setKey(Number(e.target.value))}/>
                        </div>
                    }
                    <CryptedOut cKey={key} plain={plain} type={cryptType} value={value}/>
                </div>
            </div>
        </>
    )
}