import { useState } from "react";
import { useRouter } from "next/navigation"

import Drawer from '@mui/material/Drawer';
import { Divider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const HeaderDrawer = ():JSX.Element =>  {

    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <>
            <div style = {{ width: '250px'}} onClick={() => toggleDrawer(false)}>
                <div style = {{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px', flexDirection: 'column'}}>
                    <div style = {{ cursor: 'pointer'}} onClick={() => router.push('/Login')}>
                        <AccountCircleIcon style = {{ width: '50px', height: '50px'}}/>
                    </div>

                    <div 
                        style = {{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', marginBottom: '10px', cursor: 'pointer'}} 
                        onClick = {() => router.push('/Login')}>
                        <span style = {{ fontSize: '20px' }}>로그인 하기</span>
                    </div>
                </div>
            <Divider />
                <div style = {{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0px 20px', cursor: 'pointer'}}>
                    <FormatListBulletedIcon style = {{ width: '30px', height: '30px'}}/>

                    <span style = {{ fontSize: '20px' }}>즐겨찾기 목록</span>
                </div>
            </div>
        </>
    )

    return (
        <>
            <div>
                <div 
                    style = {{ cursor: 'pointer', color: 'blue', fontSize: '20px', 
                               textAlign: 'center', position: 'absolute', 
                               top: 100, left: 20, zIndex: 999, backgroundColor: '#fff', 
                               padding: '10px 20px', borderRadius: '15px', border: '1px solid #000' }} onClick={() => toggleDrawer(true)}>OPEN DRAWER</div>
                <Drawer open={open} onClose={() => toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </div>
        </>
    )
};

export default HeaderDrawer;