import React from "react";
import {Moon, Sun} from "react-bootstrap-icons";

const MainNavbar = (props) => {
    return (
        <div className="rounded bg-main-dark mt-2 mb-3 mx-2">
            <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row ps-3 py-3">
                    {/*search box*/}
                    <div className="bg-white rounded w-auto">
                        <input
                            name="searchText"
                            value={props.searchText}
                            onChange={(event => props.setSearchText(event.target.value))}
                            className="form-control  me-1"
                            type="search"
                            placeholder="Type to search"
                        />
                    </div>

                    {/*load spinner*/}
                    <div className="d-flex align-items-center ms-2">
                        <div className="spinner-border text-primary" role="status"
                             style={{visibility: props.isLoading ? "visible" : "hidden"}}/>
                    </div>

                    {/*num load changer*/}
                    <div className="d-flex flex-row ms-4">
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

                {/*theme change button*/}
                <div className="d-flex align-self-center me-3" onClick={props.changeTheme}>
                    {props.theme === "dark"
                        ? <Sun size={50} color="white"/>
                        : <Moon size={50} color="white"/>
                    }
                </div>
            </div>
        </div>
    )
}

export default MainNavbar