import React from 'react';
import Header from '../../components/Header/Header';
import './style.scss';

class UnderProgress extends React.Component{
  render(){
    return(
      <div className="success-page">
        <Header />
        <div className="success-text">
           <div className="success-text-first">Development in Progress! </div> 
           <div className="success-text-second">Go to notifications and enter your email ID. We will get back to you once it is finished. Thank You!</div>
        </div>
      </div>
    );
  }
}

export default UnderProgress;
