import React from "react";

import AttackCardModal from "./AttackCardModal";

const AttackCard = (props) => {
    const wordTarget = 200
    const description = props.data["description"].slice(0, wordTarget)
    const detection = props.data["x_mitre_detection"].slice(0, wordTarget)

    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
        props.onClick(props.data);
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
                        <p>{props.data["x_mitre_platforms"].join(", ")}</p>

                        <label>detection: </label>
                        <p>{detection}{description.length === 200 ? "...": ""}</p>

                        <label>phases: </label>
                        <p>{props.data["phase_names"].join(", ")}</p>
                    </div>
                </div>
            </article>
            <AttackCardModal data={props.data} isOpen={isOpen} hideModal={hideModal}/>
        </div>

    )
}

export default AttackCard