import { createContext, useContext, useEffect, useState } from 'react';

export const WindowSizeCtx = createContext(null);

export const useWindowSizeCtx = () => {
    return useContext(WindowSizeCtx);
};

export const WindowSizeProvider = ({ children, value }) => {
    const [windowSize, setWindowSize] = useState({
        windowWidth: null,
        windowHeight: null,
    });

    function getWindowSize() {
        setWindowSize({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    }

    useEffect(() => {
        getWindowSize();
        window.addEventListener('resize', getWindowSize);
        return () => window.removeEventListener('resize', getWindowSize);
    }, []);

    return <WindowSizeCtx.Provider value={{ ...windowSize, value }}>{children}</WindowSizeCtx.Provider>;
};
