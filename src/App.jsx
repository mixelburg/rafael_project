import React, {useEffect, useState} from "react";
import {createGlobalStyle, ThemeProvider} from "styled-components";
import storage from "local-storage-fallback"

import ChatBotWindow from "./main/ChatBotWindow";
import MainNavbar from "./main/MainNavbar";
import MainGrid from "./main/MainGrid";
import fetchData from "./util";

// global style for changing theme
const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${props => props.theme.mode === 'dark' ? "#222222" : "#80CBC4"};
    }
`
// returns initial theme from browser storage
const getInitTheme = () => {
    const savedTheme = storage.getItem("theme")
    return savedTheme ? JSON.parse(savedTheme) : { mode: "dark" }
}

const App = () => {
    const [searchText, setSearchText] = useState("")
    const [toLoad, setToLoad] = useState(10)
    const [isLoading, setIsLoading] = useState(false)
    const [attackPatterns, setAttackPatterns] = useState([])
    const [theme, setTheme] = useState(getInitTheme)

    // loads data on search box change
    useEffect(() => {
        setIsLoading(true)
        fetchData(searchText, toLoad).then(data => {
            setAttackPatterns(data)
            setIsLoading(false)
        })
    }, [searchText, toLoad])

    // stores theme on change
    useEffect(() => {
        storage.setItem('theme', JSON.stringify(theme))
    }, [theme])

    // returns initial theme
    const onFocus = () => {
        setTheme(getInitTheme())
    }

    // changes the theme
    const changeTheme = () => {
        setTheme({ mode: theme.mode === "light" ? "dark" : "light"})
    }

    return (
        <ThemeProvider theme={theme}>
            <>
                <GlobalStyle/>
                <MainNavbar searchText={searchText} setSearchText={setSearchText}
                            isLoading={isLoading}
                            toLoad={toLoad} setToLoad={setToLoad}
                            changeTheme={changeTheme} theme={theme}
                />
                <MainGrid attackPatterns={attackPatterns} isLoading={isLoading} onFocus={onFocus}/>
                <ChatBotWindow/>
            </>
        </ThemeProvider>
    )
}

export default App