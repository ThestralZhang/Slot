/**
 * Created by ZTR on 19/10/2017.
 */

import React, { Component } from 'react';
import './TestLifeCycle.css';

class Child00 extends Component {
    constructor(props){
        super(props);
        this.name = "Child_00";
        console.log(this.name + " constructed");
    }

    componentWillMount(){
        console.log(this.name + " will mount");
    }

    componentDidMount(){
        console.log(this.name + " did mount");
    }

    componentWillReceiveProps(nextProps){
        console.log(this.name + " will receive props");
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(this.name + " should update");
        return true;

    }

    componentWillUpdate(nextProps, nextState){
        console.log(this.name + " will update");
    }

    componentDidUpdate(){
        console.log(this.name + " did update");
    }

    componentWillUnmount() {
        console.log(this.name + " will unmount");
    }

    render(){
        console.log(this.name + " is rendering");

        return (
            <div className="child">
                <h3>Child_00</h3>
                <p>P0 To C00: {this.props.p0Tc00}</p>
            </div>
        );
    }
}


class Child10 extends Component {
    constructor(props){
        super(props);
        this.name = "Child_10";
        console.log(this.name + " constructed");
    }

    componentWillMount(){
        console.log(this.name + " will mount");
    }

    componentDidMount(){
        console.log(this.name + " did mount");
    }

    componentWillReceiveProps(nextProps){
        console.log(this.name + " will receive props");
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(this.name + " should update");
        return true;

    }

    componentWillUpdate(nextProps, nextState){
        console.log(this.name + " will update");
    }

    componentDidUpdate(){
        console.log(this.name + " did update");
    }

    componentWillUnmount() {
        console.log(this.name + " will unmount");
    }

    render(){
        console.log(this.name + " is rendering");

        return (
            <div className="child">
                <h3>Child_10</h3>
                <p>P1 To C10: {this.props.p1Tc10}</p>
            </div>
        );
    }
}


class Child11 extends  Component {
    constructor(props){
        super(props);
        this.name = "Child_11";
        console.log(this.name + " constructed");
    }

    componentWillMount(){
        console.log(this.name + " will mount");
    }

    componentDidMount(){
        console.log(this.name + " did mount");
    }

    componentWillReceiveProps(nextProps){
        console.log(this.name + " will receive props");
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(this.name + " should update");
        return true;
    }

    componentWillUpdate(nextProps, nextState){
        console.log(this.name + " will update");
    }

    componentDidUpdate(){
        console.log(this.name + " did update");
    }

    componentWillUnmount() {
        console.log(this.name + " will unmount");
    }

    render(){
        console.log(this.name + " is rendering");

        return (
            <div className="child">
                <h3>Child_11</h3>
                <p>P1 To C11: {this.props.p1Tc11}</p>
                <p>G To C11: {this.props.gTc11}</p>
            </div>
        );
    }
}


class Parent0 extends React.PureComponent {
    constructor(props){
        super(props);
        this.name = "Parent_0";
        this.state = {
            toC00: 1
        };

        this.handleToC00 = this.handleToC00.bind(this);

        console.log(this.name + " constructed");
    }

    handleToC00(e){
        console.log("click to change p0Tc00");
        const temp = this.state.toC00;
        this.setState({toC00: temp + 1});
        e.preventDefault();
    }

    componentWillMount(){
        console.log(this.name + " will mount");
    }

    componentDidMount(){
        console.log(this.name + " did mount");
    }

    componentWillReceiveProps(nextProps){
        console.log(this.name + " will receive props");
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log(this.name + " should update");
    //     return true;
    // }

    componentWillUpdate(nextProps, nextState){
        console.log(this.name + " will update");
    }

    componentDidUpdate(){
        console.log(this.name + " did update");
    }

    componentWillUnmount() {
        console.log(this.name + " will unmount");
    }

    render(){
        console.log(this.name + " is rendering");

        return (
            <div className="parent">
                <h2>Parent_0</h2>
                <p>G To P0: {this.props.gTp0.x}</p>
                <button onClick={this.handleToC00}>p0Tc00</button>
                <Child00 p0Tc00={this.state.toC00}/>
            </div>
        );
    }
}


class Parent1 extends Component {
    constructor(props){
        super(props);
        this.name = "Parent_1";
        this.state = {
            toC10: 1,
            toC11: 2,
            mode: 1
        };

        this.handleToC10 = this.handleToC10.bind(this);
        this.handleToC11 = this.handleToC11.bind(this);
        this.handleChangeMode = this.handleChangeMode.bind(this);

        console.log(this.name + " constructed");
    }

    handleToC10(e){
        console.log("click to change p1Tc10");
        const temp = this.state.toC10;
        this.setState({toC10: temp + 1});
        e.preventDefault();
    }

    handleToC11(e){
        console.log("click to change p1Tc11");
        const temp = this.state.toC11;
        this.setState({toC11: temp + 1});
        e.preventDefault();
    }

    handleChangeMode(e){
        console.log("click to change mode");
        let temp = this.state.mode;
        temp++;
        if(temp === 3)
            temp = 1;
        this.setState({mode: temp});
        e.preventDefault();
    }

    componentWillMount(){
        console.log(this.name + " will mount");
    }

    componentDidMount(){
        console.log(this.name + " did mount");
    }

    componentWillReceiveProps(nextProps){
        console.log(this.name + " will receive props");
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(this.name + " should update");
        return true;
    }

    componentWillUpdate(nextProps, nextState){
        console.log(this.name + " will update");
    }

    componentDidUpdate(){
        console.log(this.name + " did update");
    }

    componentWillUnmount() {
        console.log(this.name + " will unmount");
    }

    render(){
        console.log(this.name + " is rendering");

        return (
            <div className="parent">
                <h2>Parent_1</h2>
                <p>G To P1: {this.props.gTp1.y}</p>
                <button onClick={this.handleToC10}>p1Tc10</button>
                <button onClick={this.handleToC11}>p1Tc11</button>
                <button onClick={this.handleChangeMode}>Change Mode</button>
                {this.state.mode === 1 && <Child10 p1Tc10={this.state.toC10}/>}
                <Child11 p1Tc11={this.state.toC11} gTc11={this.props.gTc11}/>
            </div>
        );
    }
}


class GrandParent extends Component {
    constructor(props){
        super(props);
        this.name = "GrandParent";
        // this.i = 100;
        // this.j = 100;
        this.f = {
            x: 100,
            y: 100
        };
        this.state = {
            toP0: this.f,
            toP1: this.f,
            toC11: 1,
            mode: 1
        };

        this.handleToP0 = this.handleToP0.bind(this);
        this.handleToP1 = this.handleToP1.bind(this);
        this.handleToC11 = this.handleToC11.bind(this);
        this.handleChangeMode = this.handleChangeMode.bind(this);

        console.log(this.name + " constructed");
    }

    handleToP0(e){
        console.log("click to change gTp0");
        // const temp = this.state.toP0;
        // this.setState({toP0: temp + 1});
        this.f.x++;
        this.setState({toP0: this.f});
        e.preventDefault();
    }

    handleToP1(e){
        console.log("click to change gTp1");
        // const temp = this.state.toP1;
        // this.setState({toP1: temp + 1});
        this.f.y++;
        this.setState({toP1: this.f});
        e.preventDefault();

    }

    handleToC11(e){
        console.log("click to change gTc11");
        const temp = this.state.toC11;
        this.setState({toC11: temp + 1});
        e.preventDefault();
    }

    handleChangeMode(e){
        console.log("click to change mode");
        let temp = this.state.mode;
        temp++;
        if(temp === 3)
            temp = 1;
        this.setState({mode: temp});
        e.preventDefault();
    }

    componentWillMount(){
        console.log(this.name + " will mount");
    }

    componentDidMount(){
        console.log(this.name + " did mount");
    }

    componentWillReceiveProps(nextProps){
        console.log(this.name + " will receive props");
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log(this.name + " should update");
        return true;
    }

    componentWillUpdate(nextProps, nextState){
        console.log(this.name + " will update");
    }

    componentDidUpdate(){
        console.log(this.name + " did update");
    }

    componentWillUnmount() {
        console.log(this.name + " will unmount");
    }

    render(){
        console.log(this.name + " is rendering");

        return (
            <div className="grand-parent">
                <h1>GrandParent</h1>
                <button onClick={this.handleToP0}>gTp0</button>
                <button onClick={this.handleToP1}>gTp1</button>
                <button onClick={this.handleToC11}>gTC11</button>
                <button onClick={this.handleChangeMode}>Change Mode</button>
                {this.state.mode === 1 && <Parent0 gTp0={this.state.toP0}/>}
                <Parent1 gTp1={this.state.toP1} gTc11={this.state.toC11}/>
            </div>
        );
    }

}


class TestLifeCycle extends Component {
    render() {
        return (
            <div>
                <GrandParent />
            </div>
        );
    };
}

export default TestLifeCycle;