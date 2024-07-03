'use client';
import HeaderDrawer from "../Header";
import GoogleMaps from "../Maps";


const MainPage = ():JSX.Element => {
    return (
        <>
            <div style = {{ position: 'relative' }}>
                <HeaderDrawer />
                <GoogleMaps />
            </div>
        </>
    )
}

export default MainPage;