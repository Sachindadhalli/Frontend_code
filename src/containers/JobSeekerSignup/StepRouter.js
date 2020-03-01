//library dependencies
import React, {Component} from "react";
import {Route, Switch, withRouter} from "react-router-dom";
//styles
import "./style.scss";
//custom components
import JobSeekerSignup from "./JobSeekerSignup";
import JobSeekerEducationDetails from "./JobSeekerEducationDetails";
import JobSeekerEmploymentDetails from "./JobSeekerEmploymentDetails";

/**
 * for jobseeker signup, we have three steps to complete the registration
 * Here nested routing happening step by step
 * @param props
 * @return {XML}
 * @constructor
 */
const StepRouter = (props) => {
  const {url} = props.match;
  return (
    <div className="nested-container">
      {/* Nested routing */}
      <Switch>
        <Route exact path={url + "/"} component={JobSeekerSignup}/>
        <Route path={url + "/education"} component={JobSeekerEducationDetails}/>
        <Route path={url + "/employment"} component={JobSeekerEmploymentDetails}/>
      </Switch>
    </div>
  );
};

export default withRouter(StepRouter);
