import {Outlet} from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";


const Sharedlayout=()=>{
    return <>

        <Navbar></Navbar>

        <Outlet/>

        <Footer/>

    </>
}

export default Sharedlayout