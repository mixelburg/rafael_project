import React from "react";

import AttackCardModal from "./AttackCardModal";

const AttackCard = (props) => {
    const wordTarget = 200
    let description = props.data["description"].slice(0, wordTarget)
    let detection = props.data["x_mitre_detection"].slice(0, wordTarget)

    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return(
        <div className="col">
            <article className="zoom-main card h-100 bg-main-blue stretched-link" onClick={showModal}>
                <div className="card-header">
                    <p className="text-main-secondary">id: {props.data["id"]}</p>
                </div>
                <div className="card-body rounded bg-main-darkblue text-main m-2">
                    <h5 className="card-title">{props.data["name"]}</h5>

                    <div className="card-text">
                        <label>description: </label>
                        <p>{description}{description.length === 200 ? "..." : ""}</p>

                        <label>platforms: </label>
                        <p>{props.data["x_mitre_platforms"].toString()}</p>

                        <label>detection: </label>
                        <p>{detection}{description.length === 200 ? "...": ""}</p>
                    </div>
                </div>
            </article>
            <div className="card-footer">
                <AttackCardModal data={props.data} isOpen={isOpen} hideModal={hideModal}/>
            </div>
        </div>

    )
}

export default AttackCard