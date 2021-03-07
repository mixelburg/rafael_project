import React from "react";
import AttackCardModal from "../../../attack_card/AttackCardModal";

const WidgetSearchResultItem = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="mb-1">
            <div className="bg-main-blue rounded" onClick={showModal}>
                <p className="link-light p-1 m-0">{props.data["name"]}</p>
            </div>
            <AttackCardModal data={props.data} isOpen={isOpen} hideModal={hideModal}/>
        </div>
    )
}

export default WidgetSearchResultItem