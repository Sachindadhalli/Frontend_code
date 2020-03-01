//library dependencies
import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, withRouter } from 'react-router-dom';

//custom component
import ManageResponses from '../ManageResponses';
import CandidateProfile from '../CandidateProfile';
import JobDetails from '../JobDetails'
import MyOrganisation from '../MyOrganisation';
import PublishJob from '../PublishJob';
import PostJobPreview from '../../components/PostJobPreview';
import NotFound from 'routes/NotFound';
import MyQuestionnaire from '../Myquestionnaire/MyQuestionnaire';
import DocumentAndVideo from "../DocumentAndVideo/DocumentAndVideo";

class CreateJobRouter extends Component {
  constructor(props){ super(props); }

  saveAsDraft = () => this.child1.saveAsDraft();

  componentDidMount() { this.props.onRef(this) }

  componentWillUnMount(){ this.props.onRef(null) }

  render() {
      const {url} = this.props.match;
      return (
        <div>
          <Switch>
              <Route path={url+'/:jobId/document-video-upload'}
                   render={(props) => (<DocumentAndVideo onRef={ref => this.child1 = ref} {...props}/>)} />
              <Route path={url+'/:jobId/candidate-profile'}
                  render={(props) => (<CandidateProfile onRef={ref => this.child1 = ref} {...props}/>)} />
              <Route path={url+'/:jobId/manage-responses'}
                  render={(props) => (<div><ManageResponses onRef={ref => this.child1 = ref} {...props}/></div>)} />
              <Route path={url+'/:jobId/my-organisation'}
              render={(props) => (<div><MyOrganisation onRef={ref => this.child1 = ref} {...props}/></div>)} />
              <Route path={url+'/:jobId/my-questionnaire'}
              render={(props) => (<div><MyQuestionnaire onRef={ref => this.child1 = ref} {...props}/></div>)} />
              <Route path={url+'/:jobId/publish-job'}
                  render={(props) => (<PublishJob onRef={ref => this.child1 = ref} {...props}/>)} />
              <Route path={url+'/:jobId/post-job-preview'} component={PostJobPreview} />
              <Route path={url+'/:jobId?'} exact
                  render={(props) => (<JobDetails onRef={ref => this.child1 = ref} {...props}/>)} />
              <Route component={NotFound} />
          </Switch>
        </div>
      );
  }
  }

  export default withRouter(CreateJobRouter);
