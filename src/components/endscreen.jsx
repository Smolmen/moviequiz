import React from 'react';

const EndScreen = (props) => {

    let correctanswers = 0;

    const list = props.answers.map((v,i) => {
        
        if(v.correct) {
            correctanswers++;
            
            return (
                <div className="stat-item correct">
                    {v.answer}
                </div>
            );
        }
        else {
            return (
                <div className="stat-item incorrect">
                    {v.answer}
                    <div className="small">Correct answer was {v.correctAnswer}</div>
                </div>
            );
        }

    });

    return (
        <div className="endscreen">
            <div className="score">
                You've got {correctanswers} out of {props.max} right!
            </div>
            <div className="stat">
                {list}
            </div>
            <div className="tryagain" onClick={props.startNew}>
                Try Again
            </div>
        </div>
    )
}

export default EndScreen;