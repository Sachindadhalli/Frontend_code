// library dependencies
import React,{ Component} from 'react';

//custom component
import AddQuestionnaire from "../AddQuestionnaire/AddQuestionnaire";

class NoQuestionnaire extends Component{
  constructor(props){
    super(props);
    this.state={ editProps:false, }}

    render(){
        return(
          <div>
            {!this.props.editView ?
              <div className="my-no-questionnaire">
                <div className="content">
                  <div className="heading">
                    Please add your organization details in order to proceed
                  </div>
                  <div className="button-add-questionary">
                    <button className="shenzyn-btn filled-primary-button add-organisation"
                            onClick={this.props.addQuestionnaire}>
                      Add Questionnaire</button>
                  </div>

                  <div className="button-skip-questionary">
                    <button className="shenzyn-btn outline-primary-button  px-68"
                            onClick={this.props.skipQuestionnaire}>
                      skip</button>
                  </div>
                </div>
              </div>
            :
              <div>
                <AddQuestionnaire
                  editProps={this.state.editProps}
                  name={this.props.QuestionnaireData.name}
                  questionData={this.props.QuestionnaireData.data}
                  cancelCreateQuestionnaire={this.props.cancelCreateQuestionnaire}
                  saveQuestionnaire={(edit)=>{this.props.saveQuestionnaire(edit)}}
                  deleteQuestionCard={(id)=>this.props.deleteQuestionCard(id)}
                  addNewQuestion={this.props.addNewQuestion}
                />
              </div>
            }
          </div>
        );
  }
}
export default NoQuestionnaire;
