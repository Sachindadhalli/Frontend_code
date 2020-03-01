//library dependency
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormControl, InputLabel, FormHelperText, Input} from '@material-ui/core';
import {toast} from 'react-toastify';

//custom components
import CustomIcon from '../../../../../../components/CustomIcon';

//styles
import './style.scss'

//utilities
import {apiCall, fileValidation, handleLocalStorage} from '../../../../../../Utilities';

//icons
import close from '../../../../../../../assets/media/images/close.png';
import deleteSvg from '../../../../../../../assets/media/icons/delete.svg';

//customized react toast message
toast.configure({
  position: "top-center", toastClassName: "toast-inner-container", bodyClassName: "toast-body-name",
  closeButton: false, progressClassName: 'toast-progress-bar'
});

class UploadDocuments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panNumber: '', panNumberError: '', panCardFile: null, panCardFilePath: '', gstFile: null,
      gstFilePath: '', doc3: null, doc3Path: '', oldData: {}, doc4: null, doc4Path: '', doc5: null, doc5Path: '',
      loading: false
    }
  }

  //basic life cycle methods
  componentWillMount() {
    // fetching the previously uploaded document from an api
    this.prefetchTheOldData()
  }

  /**
   * click on Upload button in Upload document modal, validating size,updating state
   * @param event
   */
  handleFileUpload = (event) => {
    const {name} = event.target;
    if (!fileValidation(event.target.files[0], 2, ['docx', 'ppt', 'pdf']))
      return this.setState({file_error: `Uploaded Documents shall be in a format of PDF, Word and PPT only`});
    const file_size = (event.target.files[0].size) / (1024 * 1024);
    if (file_size > 2) {
      return this.setState({file_error: "Document shall only be upto 2 MB"})
    }
    this.setState({[name]: event.target.files[0], file_error: ''})
  };

  /**
   * On change in PanCard number input field,updating state
   * @param event
   */
  handleInput = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value})
  };

  /**
   * on click save button,validating,calling an api to save the detail
   * @returns {Promise<void>}
   */
  handleSave = async () => {
    if (this.validatePanNumber()) return;
    if (this.validatePanCardFile()) {
      this.setState({file_error: 'Kindly upload your PAN card file'});
      return;
    }
    try {
      this.setState({loading: true});
      const token = await handleLocalStorage("get", "employerLogin");
      const AUTH_HEADER = {'authorization': token, 'Content-Type': 'application/json'};
      const preparedData = this.prepareTheDataForApi();
      let responseAfterSave = await apiCall('post', preparedData, 'employer-homepage/upload-documents/', AUTH_HEADER);
      this.setState({loading: false});
      if (responseAfterSave && responseAfterSave.status) this.props.closeDialog();
      else toast(`${responseAfterSave.message}`, {});
    } catch (e) {
      this.setState({loading: false})
    }
  };

  /**
   * Initially Fetching the data from an api
   * @returns {Promise<void>}
   */
  prefetchTheOldData = async () => {
    try {
      const token = await handleLocalStorage("get", "employerLogin");
      const AUTH_HEADER = {'authorization': token, 'Content-Type': 'application/json',};
      let olddata = await apiCall('get', null, 'employer-homepage/get-documents/', AUTH_HEADER);
      if (olddata && olddata.status && olddata.data) {
        let data = olddata.data;
        this.setState({
          oldData: data, panNumber: data.pan_id, panCardFilePath: data.pan_doc, gstFilePath: data.gst_file,
          doc3Path: data.doc3, doc4Path: data.doc4, docPath: data.doc5
        })
      }
    } catch (e) {
    }
  };

  /**
   * Prepared the uploaded documnet in form of form(binary)
   * @returns {FormData}
   */
  prepareTheDataForApi = () => {
    const preparedData = {pan_id: this.state.panNumber};
    preparedData['pan_doc'] = this.state.panCardFile || 'not-updated';
    preparedData['gst_file'] = this.state.gstFile || 'not-updated';
    preparedData['doc3'] = this.state.doc3 || 'not-updated';
    preparedData['doc4'] = this.state.doc4 || 'not-updated';
    preparedData['doc5'] = this.state.doc5 || 'not-updated';
    let formData = new FormData();
    for (let key in preparedData) {
      formData.append(key, preparedData[key])
    }
    return formData;
  };

  /**
   * To validate the Pan Number
   * @returns {boolean}
   */
  validatePanNumber = () => {
    const {panNumber} = this.state;
    let panNumberError = '';
    if (!panNumber) panNumberError = "Kindly specify your PAN number";
    else if (!panNumber.match(/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/))
      panNumberError = "PAN number shall be a 10 digit alphanumeric number. E.g, ABCDE1234F";
    else panNumberError = '';
    this.setState({panNumberError});
    return !!panNumberError;
  };

  /**
   * Validating the Pan card file
   * @returns {boolean}
   */
  validatePanCardFile = () => {
    let panCardFileError = '';
    if ((this.state.panCardFile && this.state.panCardFile !== 'removed') || this.state.panCardFilePath) panCardFileError = '';
    else panCardFileError = 'Kindly upload your PAN card file';
    return !!panCardFileError;
  };

  /**
   * on focus, reset the error
   */
  removeErrorFocus = () => {
    this.setState({panNumberError: ''})
  };

  /**
   * on click of delete icon in uploaded documnet
   * @param fieldName
   */
  deleteFile = (fieldName) => {
    this.setState({[fieldName]: 'removed', [fieldName + 'Path']: ''})
  };

  //html code
  render() {
    const {header, headerHint, closeDialog} = this.props;
    const {
      panNumber, panNumberError, panCardFile, panCardFilePath, gstFile, gstFilePath, doc3, doc3Path, doc4,
      doc4Path, doc5, doc5Path, file_error, loading
    } = this.state;
    return (
      <div className="dialog-wrapper">
        <div className="shenzyn-dialog-box">
          <div className="header">
            <div className="close-icon">
              <CustomIcon icon={close} onclick={closeDialog}/>
            </div>
            <div className="title-wrapper mb-24">
              <div className="title font-size-24 font-size-500 mb-16">
                {header}
              </div>
              {headerHint && <div className="hint-title font-size-14 mx-12">
                {headerHint}
              </div>}
              { file_error && <span className="error-text">{file_error}</span> }
            </div>
          </div>
          <div className="body ml-40">
            <div className="item mb-28">
              <FormControl
                error={panNumberError !== ""}
                style={{width: '240px'}}
              >
                <InputLabel htmlFor="name" shrink={true} className="change-label-style">PAN Number</InputLabel>
                <Input
                  name="panNumber"
                  type="text"
                  value={panNumber}
                  onChange={this.handleInput}
                  onBlur={this.validatePanNumber}
                  onFocus={this.removeErrorFocus}
                  autoComplete="off"
                />
                <FormHelperText className="field_error">{panNumberError}</FormHelperText>
              </FormControl>
            </div>
            <div className="item mb-28">
              <div className="title">
                PAN Card
              </div>
              <div className="value">
                {(panCardFile || panCardFilePath) && panCardFile !== 'removed' ? <RenderFileName
                  file={panCardFile}
                  path={panCardFilePath}
                  deleteFile={() => this.deleteFile('panCardFile')}
                /> : <label htmlFor="panCardFile"><a>Upload</a></label>}
                <input
                  name="panCardFile"
                  id="panCardFile"
                  type="file"
                  className="hidden"
                  multiple={false}
                  onChange={e => {
                    this.handleFileUpload(e);
                  }}
                  onClick={event => {
                    event.target.value = null;
                  }}/>
              </div>
            </div>
            <div className="item mb-28">
              <div className="title">
                GST Document
              </div>
              <div className="value">
                {(gstFile || gstFilePath) && gstFile !== 'removed' ? <RenderFileName
                  file={gstFile}
                  path={gstFilePath}
                  deleteFile={() => this.deleteFile('gstFile')}
                /> : <label htmlFor="gstFile"><a>Upload</a></label>}
                <input
                  name="gstFile"
                  id="gstFile"
                  type="file"
                  className="hidden"
                  multiple={false}
                  onChange={e => {
                    this.handleFileUpload(e);
                  }}
                  onClick={event => {
                    event.target.value = null;
                  }}/>
              </div>
            </div>
            <div className="item mb-28">
              <div className="title">
                Document Type 3
              </div>
              <div className="value">
                {(doc3 || doc3Path) && doc3 !== 'removed' ? <RenderFileName
                  file={doc3}
                  path={doc3Path}
                  deleteFile={() => this.deleteFile('doc3')}
                /> : <label htmlFor="doc3"><a>Upload</a></label>}
                <input
                  name="doc3"
                  id="doc3"
                  className="hidden"
                  multiple={false}
                  type="file"
                  onChange={e => {
                    this.handleFileUpload(e);
                  }}
                  onClick={event => {
                    event.target.value = null;
                  }}/>
              </div>
            </div>
            <div className="item mb-28">
              <div className="title">
                Document Type 4
              </div>
              <div className="value">
                {(doc4 || doc4Path) && doc4 !== 'removed' ? <RenderFileName
                  file={doc4}
                  path={doc4Path}
                  deleteFile={() => this.deleteFile('doc4')}
                /> : <label htmlFor="doc4"><a>Upload</a></label>}
                <input
                  name="doc4"
                  id="doc4"
                  type="file"
                  className="hidden"
                  multiple={false}
                  onChange={e => {
                    this.handleFileUpload(e);
                  }}
                  onClick={event => {
                    event.target.value = null;
                  }}/>
              </div>
            </div>
            <div className="item mb-28">
              <div className="title">
                Document Type 5
              </div>
              <div className="value">
                {(doc5 || doc5Path) && doc5 !== 'removed' ? <RenderFileName
                  file={doc5}
                  path={doc5Path}
                  deleteFile={() => this.deleteFile('doc5')}
                /> : <label htmlFor="doc5"><a>Upload</a></label>}
                <input
                  name="doc5"
                  id="doc5"
                  type="file"
                  className="hidden"
                  multiple={false}
                  onChange={e => {
                    this.handleFileUpload(e);
                  }}
                  onClick={event => {
                    event.target.value = null;
                  }}/>
              </div>
            </div>
          </div>
          <div className="footer mb-20 mt-12">
            <div className="action-btn-wrapper">
              <button className="outline-primary-button shenzyn-btn px-20 px-sm-40 mr-24" onClick={closeDialog}
                      disabled={loading}>
                Discard
              </button>
              <button className="filled-primary-button shenzyn-btn px-24 px-sm-48" onClick={this.handleSave}
                      disabled={loading}>
                {loading ? 'Saving' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const RenderFileName = (props) => {
  return (
    <div className="file-chip-wrapper px-20 py-8">
            <span className="file-chip"
                  title={props.file ? props.file.name : props.path ? (props.path.split('/')).pop() : ''}>
                {props.file ? props.file.name : props.path ? (props.path.split('/')).pop() : ''}
            </span>
      <img src={deleteSvg} className="delete-icon" onClick={props.deleteFile}/>
    </div>
  )
};

const mapSateToProps = (state) => {
  return {sectorsRoles: state.empHomePage.jobDetails.sectorsRoles}
};
UploadDocuments = connect(mapSateToProps, null)(UploadDocuments);

//export the component
export default UploadDocuments;
