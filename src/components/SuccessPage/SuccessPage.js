//library dependencies
import React from 'react';

//style
import './style.scss';

//custom component
import Header from '../../components/Header/Header';

export default function SuccessPage(props) {
  return <div className="success-page">
      <Header />
    <div className="success-text">
      <h1>Your Shenzyn profile has been created</h1>
      <p>
        Email verification link has been sent to your mail. 
        Please check and verify your email through the given link
      </p>
    </div>
  </div>;
}
