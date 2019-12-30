import React, { Component } from "react";
import ReactDOM from "react-dom";


class SpeedClickGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.time,
            points: 0,
            clicks: 0,
            button: false
        }
    }

    clicker = (e) => {

        e.preventDefault();
        this.setState({ clicks: this.state.clicks + 1 })
        this.setState({ points: this.state.points + 1 });
        this.setState({ time: this.props.time - (this.state.clicks * 50) })

    }

    componentDidMount() {
        this.intervalId = setInterval(() => {
            this.setState({
                time: this.state.time - 50
            }); if (this.state.time === 0) {
                clearInterval(this.intervalId);
                this.setState({ button: true })
            }
        }, 50);
    }


    render() {
        let styleButton = {
            width: "300px",
            height: "300px",
            backgroundColor: "#FF4500",
            color: "white",
            fontSize: "26px",
            border:"1px solid black",
            borderRadius:"6px",
            boxShadow:"inset 0 0 5px #000000"
        }
        let styleDiv = {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50vw",
            height: "80vh",
            border: "3px solid grey",
            backgroundColor: "#FFFAFA",
            boxShadow: "5px 5px 5px rgba(68,68,68,0.6)"
        }

        const { points, time, button } = this.state
        return (
            <div style={styleDiv}>
                <h1>Time: {time}ms</h1>
                <button style={styleButton} onClick={this.clicker} disabled={button}>CLICK!</button>
                <h2>Points: {points} </h2>
                
            </div>
        )

    }
}



ReactDOM.render(<SpeedClickGame time={2000} />, document.getElementById("app"));
