import { useState } from "react";
import Drawer from '@mui/material/Drawer';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';

const HeaderDrawer = ():JSX.Element =>  {
    const [open, setOpen] = useState<boolean>(false);

    const toggleDrawer = (newOpen: boolean) => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <>
            <div style = {{ width: '250px'}} onClick={() => toggleDrawer(false)}>
                <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
                ))}
                </List>
            </div>
        </>
    )

    return (
        <>
            <div>
                <div style = {{ cursor: 'pointer', color: 'blue', fontSize: '20px', textAlign: 'center'}} onClick={() => toggleDrawer(true)}>OPEN DRAWER</div>
                <Drawer open={open} onClose={() => toggleDrawer(false)}>
                    {DrawerList}
                </Drawer>
            </div>
        </>
    )
};

export default HeaderDrawer;