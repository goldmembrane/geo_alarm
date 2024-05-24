import { createContext, useState } from "react";

export type DrawerButtonType = 'CLOSE' | 'SHOWDRAWER';

interface DrawerProps {
    children: React.ReactNode
}

export const DrawerContext = createContext({
    isDrawerShown: false,
    goBack: () => {},
    showDrawer: () => {},
})