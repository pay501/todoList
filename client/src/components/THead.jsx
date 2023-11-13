import React from 'react'

function THead() {
    return (
        <div>
            <thead className="">
                <tr>
                    <th className="border-2 border-black rounded-md">No</th>
                    <th className="border-2 border-black rounded-md">Activity</th>
                    <th className="border-2 border-black rounded-md">CreatedAt</th>
                    <th className="border-2 border-black rounded-md">Progress</th>
                    <th className="border-2 border-black rounded-md">Operation</th>
                </tr>
            </thead>
        </div>
    )
}

export default THead