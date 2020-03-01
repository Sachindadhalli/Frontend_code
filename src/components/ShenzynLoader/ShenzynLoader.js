//library dependencies
import React, {Component} from 'react';
import Modal from '@material-ui/core/Modal';

//style
import './styles.scss';

//icons
import LoaderIcon from '../../../assets/media/gif/Loader1.gif';

class ShenzynLoader extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    const {type} = this.props
    return (
      <div style={{"height": "100%"}}>
        {type === "normal" ?
          <div className="shenzyn-loader1">
            <img
              src={LoaderIcon}
              width={"150px"}
              height={"150px"}
            />
          </div>
          :
          <Modal className="shenzyn-loader" open={true} disableAutoFocus={true} disableFocus={true} outline={"none"}>
            <img
              src={LoaderIcon}
              width={"150px"}
              height={"150px"}
            />
          </Modal>
        }
      </div>

    );
  }
}

export default ShenzynLoader;

