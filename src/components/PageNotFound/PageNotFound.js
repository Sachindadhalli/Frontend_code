//library dependencies
import React, {Component} from 'react';

//style
import './styles.scss';

//custom components
import Header from '../Header/Header';

class PageNotFound extends Component {
  render() {
    return (
      <div className="not-found-page" style={{"height": "100vh"}}>
        <Header/>
        <div className="not-found-text">
          <div>
            <h1 className="page-not-found-oops-text">Oops!</h1>
            <h3 className="page-not-found-404">404 Page Not Found</h3>
            <p className="page-not-found-description">
              The page you are trying to access doen not exist on this server
            </p>
            <div className="page-not-found-possible-reasons-title">Possible Reasons:</div>
            <div className="page-not-found-possible-reasons">
              <ul>
                <li>The page may have been moved or deleted</li>
                <li>You may have used an outdated or broken link</li>
                <li>You may have typed the address (URL) incorrectly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
