import React from "react";
import Modal from "react-bootstrap/Modal";

const AttackCardModal = (props) => {
    return (
        <div>
            <Modal show={props.isOpen} onHide={props.hideModal} size="lg" centered>
                <div className="modal-content bg-main-blue">
                    <div className="modal-header text-main-secondary">
                        <p>id: {props.data["id"]}</p>
                        <div className="modal-title">
                            {props.data["name"]}
                        </div>
                    </div>
                    <div className="modal-body text-main bg-main-darkblue">

                        <label>description: </label>
                        <p>{props.data["description"]}</p>

                        <label>platforms: </label>
                        <p>{props.data["x_mitre_platforms"].toString()}</p>

                        <label>detection: </label>
                        <p>{props.data["x_mitre_detection"]}</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AttackCardModal