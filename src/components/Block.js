import React from 'react'

const Block = ({hold, value, id, held}) => {
    const styles = {
        backgroundColor: held ? "#59E391" : "white"
    }
    let dice 
        switch (value){

            case 1:
            dice= (<div className="first-face">
                    <span className="pip"></span>
            </div>)
            break;
            case 2:
                dice= (<div className="second-face">
                    <span className="pip"></span>
                    <span className="pip"></span>
                </div>)
                break;
            case 3:
                dice=  (<div className="third-face">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                </div>)
                break;
            case 4:
                dice= (<div className="fourth-face">
                        <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        </div>
                        <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        </div>
                    </div>)
                break;
            case 5:
                dice=   (<div className="fifth-face">
                        <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        </div>
                        <div className="column">
                        <span className="pip"></span>
                        </div>
                        <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        </div>
                    </div>)
                break;
            case 6:
                dice=  (<div className="sixth-face">
                        <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                        </div>
                        <div className="column">
                        <span className="pip"></span>
                        <span className="pip"></span>
                        <span className="pip"></span>
                        </div>
                    </div>)
                break;
            default:
                return
    }

    return (
        <div  onClick={e=>hold(e,value, id )} style={styles}>
            {dice}
        </div>
    )
    
}

export default Block