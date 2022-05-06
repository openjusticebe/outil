import React  from "react"

const Version = "1.3.0"

const Bar = () =>
    <div className="construction" >
        <div>
            <div className="content text-muted px-1">
                <span><i className="icon-beaker" /> version { Version } - early beta</span>
            </div>
        </div>
    </div>

export default Bar
