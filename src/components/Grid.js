import React from 'react'

const Grid = ({gridInfo, toggleCell}) => {
    return (
        <div className="grid-container">
            { gridInfo.map((rows,index)=>
                <ul key={index} className="row-style">
                { rows.map((cols)=>
                    <li className={`cell-style ${cols.state? 'cell-filled': 'cell-empty'}`}
                        key={cols.id}
                        onClick={()=>toggleCell(cols.id)}>
                        
                    </li>
                )}
                </ul> 
            )}
        </div>
    )
}

export default Grid



