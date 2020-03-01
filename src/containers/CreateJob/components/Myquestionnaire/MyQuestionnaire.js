//library dependencies
import React, {Component} from 'react';
import {Switch, Route, BrowserRouter, withRouter} from 'react-router-dom';
import {connect} from "react-redux";

//style
import './style.scss';

//custom component
import AddQuestionnaire from './components/AddQuestionnaire/AddQuestionnaire';
import QuestionnaireView from './components/QuestionnaireView/QuestionnaireView';
import QuestionnairePerview from "./components/QuestionnaireView/component/QuestionnairePerview/QuestionnairePerview";

//utilities
import {apiCall, handleLocalStorage} from "../../../../Utilities";
import {POST_JOB} from "../../../../../config/constants";

class MyQuestionnaire extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedCard: props.createAJob.my_questionnaire.selectedQuestionnaire}
  };

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnMount() {
    this.props.onRef(null);
  }

  componentWillReceiveProps(nextProps, nextContext) {

    // receiving selected option and updating state
    this.setState({selectedCard: this.props.createAJob.my_questionnaire.selectedQuestionnaire})
  }
  /**
   * on click of save as draft button
   * @return: redirect to employer saved job after save the data successfully
   * */
  saveAsDraft = async () => {
    try {
      const token = await handleLocalStorage('get', 'employerLogin');
      const AUTH_HEADER = {authorization: token, 'Content-Type': 'application/json',};
      const sendingData = {
        questioner_details: {"key": this.state.selectedCard, "value": ""},
        id: this.props.match.params.jobId
      };
      const questionnaireNext_response = await apiCall('post', sendingData, POST_JOB, AUTH_HEADER,);
      if (questionnaireNext_response.status) {
        this.props.history.push(this.props.match.url.replace(`create-a-job/${this.props.match.params.jobId}/my-questionnaire`, 'employer-saved-jobs'));
      }
    } catch (e) {
    }
  };

  render() {
    const {url} = this.props.match;
    return (
      <div>
        <Switch>
          <Route exact path={url + '/'} render={(props) => (<QuestionnaireView {...this.props}/>)}/>
          <Route path={url + '/new'} component={AddQuestionnaire}/>
          <Route path={url + '/edit/:editId?'} component={AddQuestionnaire}/>
          <Route path={url + '/preview/:previewId?'} component={QuestionnairePerview}/>

        </Switch>
      </div>
    );

  }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, null)(withRouter(MyQuestionnaire));
