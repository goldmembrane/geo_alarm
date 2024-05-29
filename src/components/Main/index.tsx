'use client';
import HeaderDrawer from "../Header";
import GoogleMaps from "../Maps";


const MainPage = ():JSX.Element => {
    return (
        <>
            <div>홈 화면</div>
            <HeaderDrawer />
            <GoogleMaps />
        </>
    )
}

export default MainPage;