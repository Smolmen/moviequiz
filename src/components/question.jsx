import React from 'react';
import ImageLoader from 'react-load-image';

const Preloader = (props) => {
    return (
        <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    );
  }


class Question extends React.Component {

    constructor() {
        super();

        this.state = {
            selected: null
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect() {
        if(this.props.addClass === "" && this.state.selected !== null) {
            this.props.onSelect(this.props.answers[this.state.selected]);
            this.setState({selected: null});
        }
    }

    render() {
        return (
            <div className="question">
                <div className="gif">
                    <ImageLoader src={this.props.gif}>
                        <img alt="gif" />
                        <div>Error!</div>
                        <Preloader />
                    </ImageLoader>
                </div>
                <div className="answers">
                    {this.props.answers.map(
                        (val, i) => {
                            let classes = "answer";
                            if(this.state.selected === i ) classes += " selected";
                            return <div key={i} className={classes} onClick={e => this.setState({selected: i})}>{val}</div>
                        }
                    )}
                </div>
                <div className={"button next " + this.props.addClass}
                    onClick={this.handleSelect}>
                    <div>Select</div>
                </div>
            </div>
        )
    }
}

export default Question;