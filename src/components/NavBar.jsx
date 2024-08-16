import { Link, NavLink, Outlet } from "react-router-dom";

export default function NavBar(){
    return(
        <>
            <nav className="w-full bg-sky-950 h-14 flex justify-center">
                <div className="w-3/4 flex flex-row justify-center gap-10 h-full text-xl text-zinc-50">
                    <NavLink to="/" className={`${({ isActive }) =>
                    isActive ? "active" : "" } content-center`}>
                        <h1>Cryptography</h1>
                    </NavLink>
                    <NavLink to="/morse-translator" className={`${({ isActive }) =>
                    isActive ? "active" : "" } content-center`}>
                        <h1>Morse</h1>
                    </NavLink>
                </div>
            </nav>
            <Outlet />
        </>
    )
}