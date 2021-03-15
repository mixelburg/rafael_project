import React, {useState} from "react";
import CuckooModal from "./CuckooModal";

const WidgetCuckoo = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [phase, setPhase] = useState("init");

    const serverIp = "http://192.168.1.27:8090/"

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleSubmition = async () => {
        if (!selectedFile) return

        setPhase("uploaded")

        let formData = new FormData()
        formData.append("file", selectedFile)

        const response = await fetch(serverIp + "tasks/create/file", {
            method: "POST",
            body: formData
        })
        const data = await response.json()
        setPhase("processing")

        const timer = ms => new Promise(res => setTimeout(res, ms))
        while (true) {
            const result_response = await fetch(serverIp + "tasks/summary/" + data["task_id"].toString(), {
                method: "GET"
            })
            const result_data = await result_response.json()

            if(result_response.status !== 404) {
                setSelectedFile(result_data)
                setPhase("finished")
                break
            }

            await timer(3000)
        }
    }

    return (
        <>
            {
                phase === "init" &&
                    <div>
                        <div className="file-input mb-1">
                            <input className="file" id="file" type="file" onChange={handleChange}/>
                            <label htmlFor="file" className="rounded">select file</label>
                        </div>
                        {
                            selectedFile &&
                            <div>
                            <div style={{fontSize: "0.9rem"}}>name: {selectedFile.name}</div>
                            <div style={{fontSize: "0.9rem"}}>type: {selectedFile.type}</div>
                            </div>
                        }
                        <button className="btn-sm btn-primary" onClick={handleSubmition}>submit</button>
                    </div>
            }

            {
                phase === "uploaded" &&
                    <div>
                        <div className="spinner-border" style={{width: "4rem", height: "4rem"}} role="status"/>
                        <div>Loading...</div>
                    </div>
            }

            {
                phase === "processing" &&
                    <div>
                        <div className="spinner-border text-success" style={{width: "4rem", height: "4rem"}} role="status"/>
                        <div>Processing...</div>
                    </div>
            }

            {
                phase === "finished" &&
                    <div>
                        <p className="text-success">{selectedFile["info"]["score"]}/10</p>
                        <CuckooModal data={selectedFile} server={serverIp}/>
                    </div>
            }
        </>
    )
}


export default WidgetCuckoo