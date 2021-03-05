import React from "react";
import AttackCardModal from "../attack_card/AttackCardModal";

const SearchHistoryCard = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className="pb-2">
                <article className="card bg-main-grey">
                    <div className="card-header pb-0">
                        <p className="text-main-secondary">id: {props.data["id"]}</p>
                        <button
                            type="button"
                            className="btn btn-close position-absolute end-0 top-0"
                            onClick={() => props.close(props.data)}/>
                    </div>
                    <div className="card-body rounded bg-main-grey-extra text-main m-1">
                        <h5 className="card-title link" onClick={showModal}>{props.data["name"]}</h5>
                    </div>
                </article>
                <AttackCardModal data={props.data} isOpen={isOpen} hideModal={hideModal}/>
            </div>
        </>
    )
}

export default SearchHistoryCard