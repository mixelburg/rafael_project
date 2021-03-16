import React, {useEffect, useState} from "react";

import ChatBotWindow from "./main/ChatBotWindow";
import MainNavbar from "./main/MainNavbar";
import MainGrid from "./main/MainGrid";
import fetchData from "./util";
import {createGlobalStyle, ThemeProvider} from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
      background-color: ${props => props.theme.mode === 'dark' ? "#222222" : "#80CBC4"};
    },
    .react-chatbot-kit-chat-message-container {
      background-color: black !important;
    }
`

const App = () => {
    const [searchText, setSearchText] = useState("")
    const [toLoad, setToLoad] = useState(10)
    const [isLoading, setIsLoading] = useState(false)
    const [attackPatterns, setAttackPatterns] = useState([])
    const [theme, setTheme] = useState("dark")

    useEffect(() => {
        setIsLoading(true)
        fetchData(searchText, toLoad).then(data => {
            setAttackPatterns(data)
            setIsLoading(false)
        })
    }, [searchText, toLoad])

    const changeTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <ThemeProvider theme={{mode: theme}}>
            <>
                <GlobalStyle/>
                <MainNavbar searchText={searchText} setSearchText={setSearchText}
                            isLoading={isLoading}
                            toLoad={toLoad} setToLoad={setToLoad}
                            changeTheme={changeTheme} theme={theme}
                />
                <MainGrid attackPatterns={attackPatterns} isLoading={isLoading}/>
                <ChatBotWindow/>
            </>
        </ThemeProvider>
    )
}

export default App