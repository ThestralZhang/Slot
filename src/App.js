import React, { Component } from 'react';
import './App.css';

import Slot from './Slot/Slot';
// import TestAnim from './TestAnim';
// import TestLifeCycle from './TestLifeCycle/TestLifeCycle';
// import TestPortal from './TestPortal/TestPortal';


// class CustomTextInput extends Component {
//     constructor(props) {
//         super(props);
//         this.focus = this.focus.bind(this);
//     }
//
//     focus() {
//         console.log("focus");
//         this.textInput.focus();
//     }
//
//     render() {
//         return (
//             <div>
//                 <input
//                     type="text"
//                     ref={(input) => {
//                         this.textInput = input;
//                         console.log("Perfect Illusion");
//                         console.log(input);
//                     }}
//                 />
//                 <button onClick={this.focus}>Focus</button>
//             </div>
//         );
//     }
// }
//
// class AutoFocusTextInput extends Component {
//     componentDidMount() {
//         this.textInput.focus();
//     }
//
//     render() {
//         return (
//             <CustomTextInput
//                 ref={(input) =>{
//                     this.textInput = input;
//                     console.log("Roulette");
//                     console.log(input);
//                 }}
//             />
//         );
//     }
// }
//
// class ListOfWords extends React.Component {
//     render() {
//         return <div>{this.props.words.join(',')}</div>;
//     }
// }
//
// class WordAdder extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             words: ['marklar']
//         };
//         this.handleClick = this.handleClick.bind(this);
//     }
//
//     handleClick() {
//         // This section is bad style and causes a bug
//         const words = this.state.words;
//         words.push('marklar');
//         this.setState({words: words});
//     }
//
//     render() {
//         return (
//             <div>
//                 <button onClick={this.handleClick} />
//                 <ListOfWords words={this.state.words} />
//             </div>
//         );
//     }
// }
//
// class Display extends Component {
//     componentWillMount(){
//         console.log("display will mount");
//     }
//
//     componentWillUnmount(){
//         console.log("display will unmount");
//     }
//
//     render(){
//         if(this.props.be == 1)
//             return(
//                 <div>
//                     tag: DIV, be: 1
//                 </div>
//             );
//         else if(this.props.be == 2)
//             return(
//                 <div>
//                     tag: DIV, be: 2
//                 </div>
//             );
//         else if(this.props.be == 3)
//             return(
//                 <p>
//                     tag: P, be: 2
//                 </p>
//             );
//     }
// }
//
// class TestMount extends Component {
//     constructor(props){
//         super(props);
//         this.state = {be: 1};
//
//         this.handleContentChange = this.handleContentChange.bind(this);
//         this.handleRootChange = this.handleRootChange.bind(this);
//         this.handleReset = this.handleReset.bind(this);
//     }
//
//     handleContentChange() {
//         this.setState({be: 2});
//     }
//
//     handleRootChange() {
//         this.setState({be: 3});
//     }
//
//     handleReset() {
//         this.setState({be: 1});
//     }
//
//     render(){
//         return(
//             <div>
//                 <button onClick={this.handleContentChange}>Change Content</button>
//                 <button onClick={this.handleRootChange}>Change Root</button>
//                 <button onClick={this.handleReset}>Reset</button>
//                 <Display be={this.state.be}/>
//                 {
//
//                 }
//             </div>
//         );
//     }
// }


class App extends Component {
    render() {
        return (
          <Slot />
        );
    }
}

export default App;


