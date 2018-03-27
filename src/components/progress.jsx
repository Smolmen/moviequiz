import React from 'react';

const ProgressBar = (props) => {
    let classes = "progress-bar " + props.addClass;
    return (
        <div className={classes}>
            <span>{`${props.value + 1}/${props.max}`}</span>
            <div className={`progress`} style={{width: ((props.value + 1) / props.max * 100)  + '%'}}></div>
        </div>
    )
}

export default ProgressBar;