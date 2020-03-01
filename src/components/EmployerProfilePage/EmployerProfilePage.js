//library dependencies
import React from 'react';

//style
import './style.scss';

//custom componnet
import Header from '../../components/Header/Header';

class EmployerProfilePage extends React.Component{
  componentDidMount(){
    let targetWindow = window.opener;
    targetWindow.postMessage('closeWindowStatus', '*');
  }

  render() {
    return (<div className="success-page">
      <Header/>
      <div className="success-text">
        <h1>Welcome to the shenzyn</h1>
        <a onClick={logout}>Logout</a>
      </div>
    </div>);
  }
}

/**
 * On logout clearing the storage
 */
function logout() {
  localStorage.clear();
  window.location.href = '/employee-signin'
}

export default EmployerProfilePage;
