import OverviewBody from "./OverviewBody";
import SideBar from "./SideBar";
import {useState} from "react";


function Overview(){
    const[open, setOpen] = useState(false);
    const handleSideBar = () => {
        setOpen(prevState=>!prevState);
    }

    return(
        <>
            <SideBar open={open} handleSideBar = {()=>handleSideBar()}/>
            <OverviewBody/>
        </>
    )
}

export default Overview;