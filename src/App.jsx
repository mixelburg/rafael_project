import React, {useEffect, useState} from "react";

import ChatBotWindow from "./main/ChatBotWindow";
import MainNavbar from "./main/MainNavbar";
import MainGrid from "./main/MainGrid";
import fetchData from "./util";

const App = () => {
    const [searchText, setSearchText] = useState("")
    const [toLoad, setToLoad] = useState(10)
    const [isLoading, setIsLoading] = useState(false)
    const [attackPatterns, setAttackPatterns] = useState([])

    useEffect(() => {
        setIsLoading(true)
        fetchData(searchText, toLoad).then(data => {
            setAttackPatterns(data)
            setIsLoading(false)
        })
    }, [searchText, toLoad])

    return (
        <>
            <MainNavbar searchText={searchText} setSearchText={setSearchText}
                        isLoading={isLoading}
                        toLoad={toLoad} setToLoad={setToLoad}/>
            <MainGrid attackPatterns={attackPatterns} isLoading={isLoading}/>
            <ChatBotWindow/>
        </>
    )
}

export default App