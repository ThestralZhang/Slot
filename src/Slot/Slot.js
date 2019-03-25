/**
 * Created by ZTR on 29/09/2017.
 */
import React, {Component} from 'react';
import './Slot.css';
import TimelineLite from 'gsap/TimelineLite';
import TweenLite from 'gsap';

import blueberry from '../imgs/blueberry.png';
import cherry from '../imgs/cherry.png';
import coconut from '../imgs/coconut.png';
import grapes from '../imgs/grapes.png';
import lemon from '../imgs/lemon.png';

function Fruit(name, value, num, avatar) {
    let obj = {};
    obj.name = name;
    obj.value = value;
    obj.num = num;
    obj.avatar = avatar;
    return obj;
}

const fruitCategory = {
    a: Fruit('Cherry', 2, 5, cherry),
    b: Fruit('Blueberry', 5, 4, blueberry),
    c: Fruit('Grapes', 8, 3, grapes),
    d: Fruit('Lemon', 10, 2, lemon),
    e: Fruit('Coconut', 12, 1, coconut)
};

const scrolls = [
    ['a', 'b', 'd', 'a', 'c', 'e', 'c', 'c', 'd', 'b', 'a', 'a', 'b', 'b', 'a'],
    ['a', 'd', 'c', 'b', 'a', 'c', 'd', 'b', 'a', 'a', 'e', 'c', 'b', 'b', 'a'],
    ['a', 'b', 'e', 'b', 'a', 'd', 'a', 'c', 'c', 'd', 'b', 'a', 'c', 'a', 'b']
];


class Scroll extends Component {
    constructor(props){
        super(props);
        this.state = {
            chosenFruitIndex: 0
        };
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

    getTimeline() {
        const tiles = [this.refs.tile0, this.refs.tile1, this.refs.tile2, this.refs.tile3, this.refs.tile4];
        const updateTiles = () => {
            const index = this.state.chosenFruitIndex;
            this.setState({
                chosenFruitIndex: this.getFruitIndex(index, -1)
            });
        };
        const getVars = (i) => {
            return {
                y: "+=120px",
                ease: "Power0.easeNone",
                repeat: this.props.repeatTimes[i],
                clearProps: "all",
                onRepeat: updateTiles,
                onComplete: updateTiles
            };
        };

        const tl = new TimelineLite();
        tl.to(tiles, 0.01, getVars(0))
            .to(tiles, 0.02, getVars(1))
            .to(tiles, 0.04, getVars(2))
            .to(tiles, 0.05, getVars(3))
            .to(tiles, 0.1, getVars(4))
            .to(tiles, 0.2, getVars(5))
            .to(tiles, 2, {
                y: "+=120px",
                ease: "Bounce.easeOut",
                clearProps: "all",
                onComplete: () => {
                    updateTiles();
                    this.props.onComplete(this.state.chosenFruitIndex);
                }
            });
        return tl;
    }

    render() {
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
                <div className="box"></div>
            </div>
        );
    }
}


class Frame extends Component {
    constructor(props){
        super(props);

        this.chosenFruitsIndexes = [];
        this.tl = {};

        this.handleScrollComplete = this.handleScrollComplete.bind(this);
    }

    handleScrollComplete(chosenFruitIndex){
        this.chosenFruitsIndexes.push(chosenFruitIndex);
    }

    shouldComponentUpdate(nextProps){
        return nextProps.shouldStart;
    }

    componentWillUpdate(){
        this.chosenFruitsIndexes = [];
    }

    componentDidUpdate(){
        this.tl = new TimelineLite({
            tweens: [
                this.refs.scroll0.getTimeline(),
                this.refs.scroll1.getTimeline(),
                this.refs.scroll2.getTimeline()
            ],
            onComplete: this.props.onComplete,
            onCompleteParams: [this.chosenFruitsIndexes]
        });
    }

    render() {
        return (
            <div className="frame">
                {
                    [0, 1, 2].map((i) => {
                        return(
                            <Scroll
                                key={i}
                                ref={"scroll"+i}
                                fruits={scrolls[i]}
                                chosenFruitIndex={this.props.chosenFruitIndexes[i]}
                                repeatTimes={this.props.repeatTimes[i]}
                                onComplete={this.handleScrollComplete}
                            />
                        );
                    })
                }
                <div className="mask"></div>
            </div>
        );
    }
}


class Credit extends Component {
    render() {
        return (
            <h3 className="credit">
                {this.props.content}
            </h3>
        );
    }
}


class ControlPanel extends Component {
    constructor(props){
        super(props);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleStart = this.handleStart.bind(this);
        
        this.wager = "";
    }

    handleChange(e) {
        this.wager = e.target.value;
    }
    
    handleStart(e) {
        e.preventDefault();
        this.props.onStart(this.wager);
    }

    render() {
        return (
            <div className="control-panel">
                <p className="score">{this.props.score}</p>
                <form className="wager">
                    <input type="text" name="wager" onChange={this.handleChange} />
                    <button type="submit" onClick={this.handleStart}>Start</button>
                </form>
            </div>
        );
    }
}


class Slot extends Component {
    constructor(props) {
        super(props);
        this.state={
            credit: "Welcome!",
            score: 1000,
            repeatTimes: [],
            wager: ""
        };
        this.chosenFruitIndexes = [0, 0, 0];
        this.shouldStart = false;
        this.isPlaying = false;

        this.handleStart = this.handleStart.bind(this);
        this.handleComplete = this.handleComplete.bind(this);

    }

    getRebateScale(chosenFruits){
        const scaleLV1 = 0.02;
        const scaleLV2 = 0.05;
        let scale = 0;

        if(chosenFruits[0] === chosenFruits[1]){
            if(chosenFruits[0] === chosenFruits[2]){
                scale = chosenFruits[0].value;
            }else{
                scale = chosenFruits[0].value * scaleLV2 * 2 + chosenFruits[2].value * scaleLV1;
            }
        }else if(chosenFruits[2] === chosenFruits[0]){
            scale = chosenFruits[0].value * scaleLV2 * 2 + chosenFruits[1].value * scaleLV1;
        }else if(chosenFruits[2] === chosenFruits[1]){
            scale = chosenFruits[2].value * scaleLV2 * 2 + chosenFruits[0].value * scaleLV1;
        }else{
            scale = (chosenFruits[0].value + chosenFruits[1].value + chosenFruits[2].value)  * scaleLV1;
        }

        return scale;
    }

    getCredit(scale, rebate){
        let credit = "";
        if(scale <= 0.5)
            credit = "At least got some back";
        else if(scale <=0.8)
            credit = "How about another run?";
        else if(scale <= 1)
            credit = "Close to be lucky!";
        else if(scale <= 5)
            credit = "Good for you.";
        else if(scale <= 10)
            credit = "Such a lucky guy!";
        else if(scale == 12)
            credit = "CONGRATS!!! One in million!";

        credit = "You got " + rebate + " back. " + credit;
        return credit;
    }

    handleStart(wager){
        if(this.isPlaying){
            this.setState({credit: "Wait till this turn ends up, please."});
            return;
        }
        if(wager == "0"){
            this.setState({credit: "You need some wager to start."});
            return;
        }
        if(!wager || isNaN(wager)){
            this.setState({credit: "You should enter a number."});
            return;
        }
        if(wager.indexOf(".") != -1 || wager.indexOf("-") != -1){
            this.setState({credit: "Only positive integer allowed."});
            return;
        }
        if(this.state.score <= 0){
            this.setState({credit: "Sorry but game is over!"});
            return;
        }
        if(wager > this.state.score){
            this.setState({credit: "You can't afford it!"});
            return;
        }

        const rt00 = Math.round(Math.random()*15 + 35);
        const rt01 = Math.round(Math.random()*5 + 25);
        const rt02 = Math.round(Math.random()*2 + 10);
        const rt03 = Math.round(Math.random()*2 + 7);
        const rt04 = Math.round(Math.random() + 4);
        const rt05 = Math.round(Math.random() + 2);

        const rt10 = rt00 + Math.round(Math.random()*5 + 10);
        const rt11 = rt01 + Math.round(Math.random() + 4);
        const rt12 = rt02 + Math.round(Math.random() + 2);
        const rt13 = rt03 + Math.round(Math.random() + 1);
        const rt14 = rt04 + 1;
        const rt15 = rt05;

        const rt20 = rt10 + Math.round(Math.random()*5 + 10);
        const rt21 = rt11 + Math.round(Math.random() + 4);
        const rt22 = rt12 + Math.round(Math.random() + 2);
        const rt23 = rt13 + Math.round(Math.random() + 1);
        const rt24 = rt14 + 1;
        const rt25 = rt15;

        const rts = [
            [rt00, rt01, rt02, rt03, rt04, rt05],
            [rt10, rt11, rt12, rt13, rt14, rt15],
            [rt20, rt21, rt22, rt23, rt24, rt25]
        ];

        this.setState({
            repeatTimes: rts,
            score: this.state.score - wager,
            credit: "You've paid " + wager + ". Good Luck!",
            wager: wager
        });
        this.isPlaying = true;
        this.shouldStart = true;
    }

    handleComplete(chosenFruitIndexes){
        this.chosenFruitIndexes = chosenFruitIndexes;
        this.isPlaying = false;

        const chosenFruits = chosenFruitIndexes.map((item, index) => {
            return fruitCategory[scrolls[index][item]];
        });

        const scale = this.getRebateScale(chosenFruits);
        const rebate = Math.ceil(this.state.wager * scale);
        const credit = this.getCredit(scale, rebate);
        
        this.setState({
            score: this.state.score + rebate,
            credit: credit
        });
        this.state.wager = "";
    }

    componentDidUpdate(){
        this.shouldStart = false;
    }

    render() {
        return (
            <div className="slot">
                <Credit content={this.state.credit} />
                <Frame
                    chosenFruitIndexes={this.chosenFruitIndexes}
                    repeatTimes={this.state.repeatTimes}
                    onComplete={this.handleComplete}
                    shouldStart={this.shouldStart}
                />
                <ControlPanel
                    score={this.state.score}
                    onStart={this.handleStart}
                />
            </div>
    );
    }
}


export default Slot;

