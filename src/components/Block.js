import React from 'react'

const Block = ({hold, value, id, held}) => {

    
    const styles = {
        backgroundColor: held ? "#59E391" : "white"
    }
    return (
        <div className="die-face" onClick={e=>hold(e,value, id )} style={styles}>
            <h2 className="die-num">{value}</h2>
        </div>
    )
    }

export default Block