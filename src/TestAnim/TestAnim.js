/**
 * Created by ZTR on 08/10/2017.
 */

// this is dev

import React, { Component } from 'react';
import TweenLite from 'gsap/TweenLite';
import TimelineLite from 'gsap/TimelineLite';
import './TestAnim.css';

import blueberry from './imgs/blueberry.png';
import cherry from './imgs/cherry.png';
import coconut from './imgs/coconut.png';
import grapes from './imgs/grapes.png';
import lemon from './imgs/lemon.png';

function Fruit(name, value, num, avatar) {
    let obj = {};
    obj.name = name;
    obj.value = value;
    obj.num = num;
    obj.avatar = avatar;
    return obj;
}

const fruitCategory = {
    a: Fruit('Cherry', 1, 5, cherry),
    b: Fruit('Blueberry', 2, 4, blueberry),
    c: Fruit('Grapes', 3, 3, grapes),
    d: Fruit('Lemon', 4, 2, lemon),
    e: Fruit('Coconut', 5, 1, coconut)
};

const scrolls = [
    ['a', 'b', 'd', 'a', 'c', 'e', 'c', 'c', 'd', 'b', 'a', 'a', 'b', 'b', 'a'],
    ['a', 'd', 'c', 'b', 'a', 'c', 'd', 'b', 'a', 'a', 'e', 'c', 'b', 'b', 'a'],
    ['a', 'b', 'e', 'b', 'a', 'd', 'a', 'c', 'c', 'd', 'b', 'a', 'c', 'a', 'b']
];

class Tile extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const fruit = this.props.fruit;

        return (
            <li key={this.props.passKey}>
                <img src={fruit.avatar} alt={fruit.name}/>
            </li>
        );
    }
}

class Scroll extends Component {
    constructor(props){
        super(props);
        this.state = {
            chosenFruitIndex: 3
        }
        this.tl = new TimelineLite();
        this.isPlaying = false;
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        const tiles = [this.refs.tile0, this.refs.tile1, this.refs.tile2, this.refs.tile3, this.refs.tile4];
        const updateTiles = () => {
            const index = this.state.chosenFruitIndex;
            console.log(index);
            this.setState({
                chosenFruitIndex: this.getFruitIndex(index, -1)
            });
        };

        this.tl.to(
            tiles,
            0.02,
            {
                y: "+=120px",
                ease: "Power0.easeNone",
                repeat: 50,
                clearProps: "all",
                onRepeat: updateTiles,
                onComplete: updateTiles
            }
        ).to(
            tiles,
            0.1,
            {
                y: "+=120px",
                ease: "Power0.easeNone",
                repeat: 15,
                clearProps: "all",
                onRepeat: updateTiles,
                onComplete: updateTiles
            }
        ).to(
            tiles,
            0.5,
            {
                y: "+=120px",
                ease: "Power0.easeNone",
                repeat: 2,
                clearProps: "all",
                onRepeat: updateTiles,
                onComplete: updateTiles
            }
        ).to(
            tiles,
            3,
            {
                y: "+=120px",
                ease: "Bounce.easeOut",
            }
        );
    }

    getFruitIndex(origin, offset) {
        const fruits = this.props.fruits;
        let index = origin + offset;

        if(index < 0){
            index = index + fruits.length;
        }else if(index >= fruits.length){
            index = index - fruits.length;
        }

        return index;
    }

    getActiveFruits(chosenIndex){
        let activeFruits = [];
        for(let i = -2; i <= 2; i++){
            const fruit = fruitCategory[this.props.fruits[this.getFruitIndex(chosenIndex, i)]];
            activeFruits.push(fruit);
        }
        return activeFruits;
    }

    handleClick(){
        if(this.isPlaying){
            this.tl.pause();
        }else {
            this.tl.resume();
        }
        this.isPlaying = !this.isPlaying;
    }

    render() {
        const i = this.state.chosenFruitIndex;

        return (
            <div className="scroll">
                <ul>
                    {
                        this.getActiveFruits(this.state.chosenFruitIndex).map(
                            (item, index) => {
                                return (
                                    <li key={index} ref={"tile" + index}>
                                        <img src={item.avatar} alt={item.alt} />
                                    </li>
                                );
                            }
                        )
                    }
                </ul>
            </div>
        );
    }
}

class Frame extends Component {
    render() {
        return (
            <div>
                <Scroll className="scroll" chosenIndex={1} repeatTimes={1} fruits={scrolls[0]} />
                <Scroll className="scroll" chosenIndex={1} repeatTimes={1} fruits={scrolls[1]} />
                <Scroll className="scroll" chosenIndex={1} repeatTimes={1} fruits={scrolls[2]} />
            </div>
        );
    }
}

class TestAnim extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.isPlaying = true;
        this.tl = new TimelineLite();



    }

    handleClick() {
        if(this.isPlaying){
            this.tl.pause();
        }else {
            this.tl.resume();
        }
        this.isPlaying = !this.isPlaying;
    }

    onComplete() {

    }

    componentDidMount(){
        // const t00 = new TweenLite(
        //     "#ball0",
        //     2,
        //     {
        //         y: "+=500"
        //     }
        // );
        // const t01 = new TweenLite(
        //     '#ball0',
        //     2,
        //     {
        //         scale: 2,
        //     }
        // );
        // const t02 = new TweenLite(
        //     '#ball0',
        //     1,
        //     {
        //         backgroundColor: "#a8dbe9",
        //     }
        // );
        // const tl0 = new TimelineLite({
        //     tweens: [t00, t01, t02]
        // });
        //
        // const t10 = new TweenLite(
        //     "#ball1",
        //     3,
        //     {
        //         y: "+=800",
        //     }
        // );
        // const t11 = new TweenLite(
        //     '#ball1',
        //     2,
        //     {
        //         scale: 4,
        //     }
        // );
        // const t12 = new TweenLite(
        //     '#ball1',
        //     1,
        //     {
        //         backgroundColor: "#b4ee9f",
        //     }
        // );
        // const tl1 = new TimelineLite({
        //     tweens: [t10, t11, t12]
        // });
        //
        // const t20 = new TweenLite(
        //     "#ball2",
        //     3,
        //     {
        //         y: "+=200",
        //     }
        // );
        // const t21 = new TweenLite(
        //     '#ball2',
        //     2,
        //     {
        //         scale: 5,
        //     }
        // );
        // const t22 = new TweenLite(
        //     '#ball2',
        //     2,
        //     {
        //         backgroundColor: "#aec9de",
        //     }
        // );
        // const tl2 = new TimelineLite({
        //     tweens: [t20, t21, t22]
        // });
        //
        // const tl = new TimelineLite({
        //     tweens:[tl0, tl1, tl2],
        //     onComplete: () => {
        //         console.log("COMPLETED!!");
        //     }
        // });

        const tl = new TimelineLite();
        tl.to(
            "#ball1",
            2,
            {
                y: "+=300",
                onComplete: () => {
                    console.log("HHH");
                }
            }
        );
    }

    render() {
        // return(
        //     <div>
        //         <button onClick={this.handleClick}>start</button>
        //         <p>{}</p>
        //         <br/>
        //         <Frame onComplete={this.onComplete} />
        //     </div>
        // );
        return(
            <div>
                <div className="ball" id="ball0"></div>
                <div className="ball" id="ball1"></div>
                <div className="ball" id="ball2"></div>
                <div className="ball" id="ball3"></div>

            </div>
        );
    }
}

export default TestAnim;
