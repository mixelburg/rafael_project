import React from "react";
import HistoryAttackCard from "./HistoryAttackCard";

function SearchHistory(props) {
    const cards = [...props.data].map(pattern => <HistoryAttackCard data={pattern} close={props.close}/>)
    return (
        <>
            <div className="d-flex mb-3">
                <label className="fs-3 text-main me-auto">history: </label>
                <button className="btn btn-danger btn-main-danger-outline" onClick={props.clear}>
                    clear
                    <span className="badge">{cards.length}</span>
                </button>
            </div>
            {cards}
        </>
    )
}

export default SearchHistory