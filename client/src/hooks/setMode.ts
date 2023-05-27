import { useState } from "react";

const getMode = () => {
    if (localStorage.sidechatUIMode) {
        if (localStorage.sidechatUIMode === 'dark') {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
        }
        else {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
        }
        return (localStorage.sidechatUIMode)
    } else {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.classList.add('light')
            document.documentElement.classList.remove('dark')
            return ('light')
        }
        else {
            document.documentElement.classList.add('dark')
            document.documentElement.classList.remove('light')
            return ('dark')
        }
    }
}

export function useUIMode() {
    const [mode, setModeState] = useState(getMode());
    window.matchMedia('(prefers-color-scheme: light)').addEventListener("change", () => {
        setModeState(getMode());
    })
    const refereshMode = () => {
        setModeState(getMode());
    }
    const setModeByUser = (mode: string) => {
        localStorage.setItem("sidechatUIMode", mode);
        refereshMode();
    }

    return { mode, setModeByUser }
}