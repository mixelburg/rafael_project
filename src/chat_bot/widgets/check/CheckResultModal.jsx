import React from "react";
import Modal from "react-bootstrap/Modal";
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";

const CheckResultModal = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };

    const tableBody = Object.keys(props.data["scans"]).map((key, index) => {
        const style = props.data["scans"][key]["detected"] ? "text-success" : "text-danger"
        return (
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{key}</td>
                <td className={style}>
                    {props.data["scans"][key]["detected"] ?
                        props.data["scans"][key]["result"] :
                        "undetected"}
                </td>
            </tr>
        )
    })

    const positive = props.data["positives"]
    const total = props.data["total"]

    return (
        <>
            <button className="btn-primary rounded" onClick={showModal}>show more</button>
            <Modal show={isOpen} onHide={hideModal} size="lg" centered>
                <div className="modal-content bg-main-blue">
                    <div className="modal-header text-main-secondary">
                        <div className="modal-title">
                            <p className="text-white">Scan results</p>
                        </div>
                    </div>
                    <div className="modal-body text-main bg-main-darkblue">
                        <div className="d-flex flex-row">
                            <div className="me-auto">
                                <p>md5: {props.data["md5"]}</p>
                                <p>sha1: {props.data["sha1"]}</p>
                                <p>sha265: {props.data["sha256"]}</p>
                            </div>
                            <div style={{width: "20%", height: "20%"}}>
                                <CircularProgressbarWithChildren value={positive} maxValue={total}
                                     styles={buildStyles({
                                         // Rotation of path and trail, in number of turns (0-1)
                                         rotation: 0,

                                         // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                         strokeLinecap: 'round',

                                         // How long animation takes to go from one percentage to another, in seconds
                                         pathTransitionDuration: 0.5,

                                         // Colors
                                         pathColor: `rgba(187, 0, 0, ${100})`,
                                         textColor: '#000000',
                                         trailColor: '#ffffff',
                                         backgroundColor: '#000000',
                                     })}
                                >
                                    <p className="text-white fs-1">{positive}/{total}</p>
                                </CircularProgressbarWithChildren>
                            </div>
                        </div>


                        <hr/>

                        <table className="table table-dark table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">engine</th>
                                    <th scope="col">result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CheckResultModal