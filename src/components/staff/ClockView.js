//inspired by Kuhan on stackoverflow

import React from 'react';

class ClockView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        time: new Date().toLocaleString()
        };
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
            time: new Date().toLocaleString()
        });
    }
    render() {
        return (
            <p className="App-clock">
                {this.state.time}.
            </p>
        );
    }

}

export default ClockView;