import React from 'react'

export default function Alert(props) {
    return (
        <div style={{height:'50px',backgroundColor:'#f0f2f5'}}>
            {props.alert && <div className={`alert alert-${props.alert.types} alert-dismissible fade show`} role="alert">
            <strong>{props.alert.msg}</strong> 
        </div>}
        </div>
        
    )
}
