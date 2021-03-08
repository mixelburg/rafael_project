import React, {useState} from "react";

const WidgetCuckoo = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleSubmition = () => {
        if (!selectedFile) return

        setIsFileUploaded(true)

    }

    return (
        <>
            <div className="file-input mb-1">
                <input className="file" id="file" type="file" onChange={handleChange}/>
                <label htmlFor="file" className="rounded">select file</label>
            </div>
            {selectedFile &&
                <div>
                    <div style={{fontSize: "0.9rem"}}>name: {selectedFile.name}</div>
                    <div style={{fontSize: "0.9rem"}}>type: {selectedFile.type}</div>
                </div>
            }
            <button className="btn-sm btn-primary" onClick={handleSubmition}>submit</button>
        </>
    )
}

export default WidgetCuckoo