import React, { Component } from "react";
import ReactDOM from "react-dom";

class MathQuestionGame extends Component {

    state = {
        result: 0,
        type: "",
        num1: 0,
        num2: 0,
        button: [],
        timer: this.props.time,
        disabled: false,
        res: ''
    }

    componentDidMount() {

        this.buttons();
    }

    componentWillMount() {

        this.calc();

        this.intervalId = setInterval(() => {
            this.setState({ timer: this.state.timer - 1 });
        }, 1000);
    }

    click = (e) => {

        e.preventDefault();

        clearInterval(this.intervalId)

        if (e.target.value == this.state.result) {
            this.setState({ res: true })
        } else { this.setState({ res: false }) }

        this.setState({ disabled: true })
    }

    shuffle = (array) => {

        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    buttons = () => {

        let buttonArr = [];
        let randomNum;

        for (let i = 0; i < 3; i++) {
            randomNum = Math.floor(Math.random() * (40 - (-10)) + (-10));
            buttonArr.push(randomNum);
        }

        buttonArr = this.shuffle([...buttonArr, this.state.result]);
        this.setState({ button: buttonArr });
    }

    calc = () => {

        const taskArray = []
        const items = ["add", "subst", "multiply"];
        let taskToSolve = items[Math.floor(Math.random() * items.length)];

        for (let i = 0; i < 2; i++) {
            const randomNum = Math.floor(Math.random() * (100 - 1) + 1);
            taskArray.push(randomNum);
        }

        this.setState({ num1: taskArray[0], num2: taskArray[1] });

        let resAdd = taskArray[0] + taskArray[1];
        let resMultiply = taskArray[0] * taskArray[1];
        let substr = taskArray[0] - taskArray[1];

        if (taskToSolve === "add") {
            this.setState({ result: resAdd, type: "+" })
        } else if (taskToSolve === "subst") {
            this.setState({ result: substr, type: "-" })
        } else {
            this.setState({ result: resMultiply, type: "*" })
        }
    }

    render() {

        const {type, num1, num2, button, timer, disabled, res} = this.state;

        const headerStyle = {
            color: res ? "green" : "black"
        }

        const timerStyle = {
            color: timer ? "black" : "red"
        }

        if(timer === 0){
            clearInterval(this.intervalId);
        }

        if (res === false) {
            return (
                <div className="main_div">
                    <h1 style={{ color: "red" }}>Fail! Try again</h1>
                    {button.map((e, i) => <button onClick={this.click} disabled={timer? disabled : true} key={i} value={e}>{e}</button>)}
                    <h2 style={timerStyle}>{timer ? "Time: " + timer : "Time is Up"}</h2>
                </div>)
        } else {
            return (
                <div className="main_div">
                    <h1 style={headerStyle}>{res ? "Congratulations" : num1 + " " + type + " " + num2 + " = "}</h1>
                    {button.map((e, i) => <button onClick={this.click} disabled={timer? disabled : true} key={i} value={e}>{e}</button>)}
                    <h2 style={timerStyle}>{timer ? "Time: " + timer : "Time is Up"}</h2>
                </div>
            )
        }
    }
}

function App() {

    return (<MathQuestionGame time={10} />)
}

ReactDOM.render(<App />, document.getElementById("app"));