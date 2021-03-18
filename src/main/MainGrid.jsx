import React, {useEffect, useState} from "react";
import SearchHistory from "../history/SearchHistory";
import AttackCard from "../attack_card/AttackCard";
import {CSSTransition} from "react-transition-group";
import storage from "local-storage-fallback"

// gets initial history from browser window
const getInitHistory = () => {
    const savedHistory = storage.getItem('history')
    return savedHistory ? JSON.parse(savedHistory) : []
}

const MainGrid = (props) => {
    const [searchHistory, setSearchHistory] = useState(getInitHistory)

    // adds card to history
    const pushHistory = (data) => {
        setSearchHistory(prevState => {
            if (prevState.filter(x => x.id === data.id).length !== 0)
                return prevState

            return [...prevState, data]
        })
    }

    const remHistory = (data) => {
        setSearchHistory(prevState => prevState.filter(x => x["id"] !== data["id"]))
    }

    const clearHistory = () => {
        setSearchHistory([])
    }

    // stores history in browser storage on change
    useEffect(() => {
        storage.setItem('history', JSON.stringify([...searchHistory]))
    }, [searchHistory])

    // adds focus listeners on component mount
    useEffect(() => {
        window.addEventListener("focus", onFocus)

        return () => {
            window.removeEventListener("focus", onFocus)
        }
    })

    // gets history from browser storage on window focus
    const onFocus = () => {
        setSearchHistory(getInitHistory())
        props.onFocus()
    }

    let attacks = props.attackPatterns.map(pattern => (
            <AttackCard data={pattern} key={pattern["id"]} onClick={pushHistory}/>
        )
    )

    return (
        <div className="row g-4 mx-3 mb-5 ">
            {/*main grid items*/}
            <div className="col col-10">
                <CSSTransition in={!props.isLoading} timeout={100000} classNames="main-item">
                    <div className="row row-cols-md-3 g-3">
                        {attacks}
                    </div>
                </CSSTransition>
            </div>

            {/*search history*/}
            <div className="col col-2">
                <SearchHistory data={searchHistory} close={remHistory} clear={clearHistory}/>
            </div>
        </div>
    )
}

export default MainGrid