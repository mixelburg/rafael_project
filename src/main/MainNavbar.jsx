import React from "react";

const MainNavbar = (props) => {
    return (
        <div className="rounded bg-main-dark mt-2 mb-3 mx-2">
            <div className="row g-0 px-4 py-3">
                <div className="col-6 d-flex">
                    <input
                        name="searchText"
                        value={props.searchText}
                        onChange={(event => props.setSearchText(event.target.value))}
                        className="form-control me-1"
                        type="search"
                        placeholder="Type to search"
                    />
                </div>
                <div className="col-auto d-flex align-items-center ms-2">
                    <div className="spinner-border text-primary" role="status"
                         style={{visibility: props.isLoading ? "visible" : "hidden"}}/>
                </div>
                <div className="col-auto d-flex ms-2">
                    <label className="col-form-label text-white me-1">cards to load: </label>
                    <select
                        value={props.toLoad}
                        onChange={(event => props.setToLoad(parseInt(event.target.value, 10)))}
                        name="toLoad"
                        className="form-select w-auto"
                    >
                        <option value={50}>50</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={100}>100</option>
                        <option value={0}>All</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default MainNavbar