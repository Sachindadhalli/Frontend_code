// library dependencies
import React, {Component} from 'react';
import {Modal, TableHead, withStyles, TableRow, TableCell, Table, TableBody} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import {toast} from 'react-toastify';
import {connect} from "react-redux";
import Moment from "react-moment";
import {bindActionCreators} from "redux";

//style
import './style.scss';

//icon
import Upload from '../../../../../../../assets/media/icons/upload.svg';
import deleteicon from '../../../../../../../assets/media/icons/deleteIcon.svg';
import CustomIcon from '../../../../../../components/CustomIcon/CustomIcon';
import ConformationDialog from '../../../../../../components/ConformationDialog/ConformationDialog';

//utilities
import {AADHAR_UPDATE, SERVER_API_URL} from '../../../../../../../config/constants'
import * as actions from "../../../../../../actions/createAJob";
import {apiCall} from "../../../../../../Utilities";

// customised of react toast message
toast.configure({
  position: 'top-center',
  toastClassName: 'toast-inner-container',
  bodyClassName: 'toast-body-name',
  closeButton: false,
  progressClassName: 'toast-progress-bar',
});

// customised material ui style
const styles = theme => ({
  colorPrimary: {color: '#b5b5b5', cursor: 'pointer',},
  input: {display: 'none',},
  tableCell: {
    paddingLeft: '0px', paddingRight: '0px !important', fontFamily: 'Roboto', fontSize: '14px', border: '0px',
    "word-break": "break-all"
  },
  tableChildCell: {
    paddingLeft: '0px', paddingRight: '5px !important', fontFamily: 'Roboto', fontSize: '14px',
    border: '0px', wordBreak: "break-all"
  },
  tableCellEnd: {
    paddingRight: '0px !important', paddingLeft: '0px', fontFamily: 'Roboto', fontSize: '14px', border: '0px',
    textAlign: 'right!important', "word-break": "break-all"
  },
  tableChildCellEnd: {
    paddingRight: '0px !important', paddingLeft: '0px', fontFamily: 'Roboto', fontSize: '14px', border: '0px',
    textAlign: 'right!important', "word-break": "break-all"
  }
});

class DocumentAndVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {document: props.document, deleteDocumentModel: false, deleteDocumentId: '', date: '',};
  }

  /**
   * On click of upload icon,validating size and type of document
   * @param: event
   * @return: update the state after validate size and type of file
   * */
  onFileUpload = async event => {
    const {target} = event;
    let {files} = target;
    const filesize = files[0].size / (1024 * 1024);
    const ext = files[0].name.toString().split('.').pop().toLowerCase();
    if (files && files[0]) { //validating type of file
      if (ext !== "xlsx" && ext !== "pdf" && ext !== "ppt" && ext !== "pptx" && ext !== "doc" && ext !== "docx" && ext !== "xls") {
        toast("Uploaded Documents shall be in a format of PDF, Excel, Docx, and PPT only", {});
      } else if (filesize > 2) {
        toast("Document shall only be upto 2 MB", {});
      } else {
        let formData = new FormData();
        formData.append('document', files[0]);
        apiCall('post', formData, AADHAR_UPDATE).then(res => {
          if (true) {
            const {document} = this.state;
            let files1 = {};
            let data_name = res.data;
            let newNameArray = data_name.split('/');
            files1["url"] = data_name;
            files1["name"] = newNameArray[newNameArray.length - 1];
            files1["uploaded_on"] = new Date().getTime();
            files1["lastModified"] = new Date().getTime();
            document.push(files1);
            this.setState({document}, () => this.props.UpdateDocuments(document));
          }
        }).catch((e) => {
        })
      }
    }
  };

  /**
   * On click delete icon in document view
   * @param: value
   * @return: updating state to open delete modal
   * */
  deleteDocument = value => {
    this.setState({deleteDocumentModel: true, deleteDocumentId: value})
  };

  /**
   * On click of close icon in confirmation dialog box
   * @return: updating state to close delete modal
   * */
  closeDeleteDocumentModel = () => {
    this.setState({deleteDocumentModel: false});
  };

  /**
   * on click of delete button of confirmation dialog box
   * @return: updating state to closed delete modal and updated document
   * */
  deleteDocumentFromTable = () => {
    const {deleteDocumentId} = this.state;
    const Documents = this.state.document;
    Documents.splice(deleteDocumentId, 1);
    this.setState({...this.state.document, document: Documents, deleteDocumentModel: false,},
      () => this.props.UpdateDocuments(Documents));
  };

  /**
   * on click of upload icon,validate the maximum limit of uploading document
   * @return: a toast message or event
   * */
  handleClickUpload = e => {
    if (this.state.document.length === 5) {
      toast('You have already uploaded 5 documents, kindly delete one to upload one', {});
      event.preventDefault();
    } else event.target.value = null;
  };

  render() {
    const {classes, document} = this.props;
    return (
      <div className="my-document-upload">
        <div className="document-header-container">
          <div className="document-header">
            <div className="document-name">Documents</div>
            <div className="document-type">(Upload ppt, pdf, excel or docx only)</div>
          </div>
          <div>
            <label htmlFor="uploadDocument"><img style={{height: '24px', cursor: 'pointer'}} src={Upload}/></label>
            <input accept=".doc, .docx,.ppt, .pptx,.pdf,.xlsx,.xls" className={classes.input} id="uploadDocument"
                   multiple={false} type="file" onChange={e => {
              this.onFileUpload(e);
            }} onClick={e => {
              this.handleClickUpload(e);
            }}/>
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell} width={"40%"}>Document Name</TableCell>
              <TableCell className={classes.tableCell} width={"30%"}>Uploaded On</TableCell>
              <TableCell className={classes.tableCellEnd} width={"20%"}>Actions</TableCell>
            </TableRow>
          </TableHead>
          {document.length !== 0 ?
            <TableBody>
              {document.map((value, index) => (
                <TableRow>
                  <TableCell className={classes.tableChildCell}>{value.name}</TableCell>
                  <TableCell className={classes.tableChildCell}>
                    {<Moment format="Do MMM YYYY">{new Date(value.uploaded_on)}</Moment>} </TableCell>
                  <TableCell className={classes.tableChildCellEnd}>
                    <div className="view-delete-container">
                      <div className="view">
                        <a href={value.url.includes("blob:http") ? value.url : SERVER_API_URL + value.url}
                           target={"_blank"}>
                          <Visibility className={classes.colorPrimary}/> </a>
                      </div>
                      <div>
                        <img src={deleteicon} style={{cursor: 'pointer'}} onClick={() => this.deleteDocument(index)}/>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            :
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} style={{border: '0px'}}>
                  <div style={{marginTop: '20px', textAlign: 'center'}}>No Document Uploaded</div>
                </TableCell>
              </TableRow>
            </TableBody>
          }
        </Table>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.deleteDocumentModel}
          onClose={this.closeDeleteDocumentModel}
        >
          <ConformationDialog
            actionType={this.state.actionType}
            conformationStatus={this.deleteDocumentFromTable}
            handleClose={this.closeDeleteDocumentModel}
            Text="Delete"
            headingText="Are you sure you want to delete the document?"
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = dispatch => ({
  UpdateDocuments: bindActionCreators(
    actions.UpdateDocuments,
    dispatch,
  ),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DocumentAndVideo));
