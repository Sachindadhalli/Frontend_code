//library dependencies
import React, {Component} from 'react';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

//style
import './style.scss'

class CustomBreadcrumb extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {breadcrumb_text, breadcrumbs} = this.props;
    return (
      <div className="breadcrumb-container">
        <div className="create-a-job-text">{breadcrumb_text}</div>
        <div className="create-job-nav">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>} arial-label="Breadcrumb">
            {
              breadcrumbs.map((breadcrumb_item, key) => {
                return (<Link color="inherit" href="#"
                              className={key === breadcrumbs.length - 1 ? "nav-create-a-job-text" : "nav-bar-breadcrum"}>
                  {breadcrumb_item.text}
                </Link>)
              })
            }
          </Breadcrumbs>
        </div>
      </div>
    );
  }
}

export default CustomBreadcrumb;

