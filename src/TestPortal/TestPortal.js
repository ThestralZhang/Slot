// import React, {Componnet} from 'react';
// import './TestPortal.css';
//
// const appRoot = document.getElementById('app-root');
// const modalRoot = document.getElementById('modal-root');
//
// class Modal extends Componnet {
//     constructor(props){
//         super(props);
//         this.el = document.createElement('div');
//     }
//
//     componentDidMount(){
//         modalRoot.appendChild(this.el);
//     }
//
//     componentWillUnmount(){
//         modalRoot.removeChild(this.el);
//     }
//
//     render(){
//         return ReactDOM.createPortal(
//             this.props.children,
//             this.el
//         );
//     }
// }
//
// class TestPortal extends Componnet{
//
// }
//
// export default TestPortal;