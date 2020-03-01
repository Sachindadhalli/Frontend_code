import React, {Component} from 'react';
import './style.scss';
import EmployerLeftMenu from '../../components/EmployerLeftMenu';
import EmployerSideNav from '../../components/EmployerSideNav';
import EmployerTopMenu from '../../components/EmployerTopMenu';
import VideoResume from '../../components/VideoResume/VideoResume';
import play from '../../../assets/media/icons/play.svg';
import noRecord from '../../../assets/media/icons/noRecord.svg';
import playBorder from '../../../assets/media/icons/play-border.svg';
import playRound from '../../../assets/media/icons/play-icon.svg';
import startRecord from '../../../assets/media/icons/start-record.svg';
import recordingIcon from '../../../assets/media/icons/recording.svg';
import recordIcon from '../../../assets/media/icons/record.svg';
import pausedIcon from '../../../assets/media/icons/pauseIcon.svg';
import volumeOff from '../../../assets/media/icons/volume.svg';
import volumeRed from '../../../assets/media/icons/reduced-volume.svg';
import volumeOn from '../../../assets/media/icons/volume.svg';
import back from '../../../assets/media/icons/back.svg';
import fullScreen from '../../../assets/media/icons/full-screen.svg';
import normalScreen from '../../../assets/media/icons/normal-screen.svg';
import noVideo from '../../../assets/media/icons/no-video.svg';
import stopRecord from '../../../assets/media/icons/stop-record.svg';
import pause from '../../../assets/media/icons/pause.svg';
import FLASH_FILE from '../../../assets/media/betajs-flash.swf';
import axios from "axios";
import {SERVER_API_URL,SERVER_URL, SERVER_API_PATH, UPLOAD_VIDEO_RESUME} from '../../../config/constants'
import {BetaJSVideoRecorder} from 'react-betajs-media-component'

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoFile: props.videoFile || null,
      videoDuration: 0,
      maxDuration: props.maxDuration || 10,
      videoPlaying: false,
      playerMuted: false,
      isFullScreen: false,
      previewed: false,
      showVolume: false,
      volume: 1.0,
      showOptions: props.showOptions || true
    }
    this.playerTimer = null;
    this.goFullScreen = this.goFullScreen.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.handleVideoStop = this.handleVideoStop.bind(this);
    this.handleVideoSeekChange = this.handleVideoSeekChange.bind(this);
    this.handleVolumeClick = this.handleVolumeClick.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
    this.discardVideo = this.discardVideo.bind(this);
    this.redirectToRegistrationPage = this.redirectToRegistrationPage.bind(this);
    this.closeVolume = this.closeVolume.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.videoFile) {
      this.setState({
        videoFile: nextProps.videoFile,
        showOptions: nextProps.showOptions,
      })
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown)
  }

  handleKeyDown(event) {
    const {videoPlaying} = this.state;
    switch (event.keyCode) {
      case 32:
        videoPlaying ? this.stopVideo() : this.playVideo();
        break;
      case 38:
        this.setState({
          volume: this.state.volume < 1.0 ? this.state.volume + 0.1 : 1.0
        }, ()=> {
          this.handleVolumeChange(this.state.volume);
        });
        break;
      case 40:
        this.setState({
          volume: this.state.volume > 0.0 ? this.state.volume - 0.1 : 0.0
        }, ()=> {
          this.handleVolumeChange(this.state.volume);
        });
        break;
    }
  }

  handlePreview(e) {
    this.setState({
      previewed: true
    }, ()=> {
      this.playVideo();
    })
  }

  discardVideo(e) {
    this.setState({
      videoFile: null
    }, ()=> {
      this.props.discardVideo();
    })
  }

  handleVolumeClick(e) {
    var video = this.refs.player.getElementsByClassName('player')[0];
    this.setState({
      showVolume: true
    })
  };

  playVideo() {
    var video = this.refs.player.getElementsByClassName('player')[0];
    video.play();
    this.setState({
      videoPlaying: true
    });
    this.playerTimer = setInterval(()=> {
      this.setState({
        videoDuration: this.state.videoDuration + 1,
      })
    }, 1000)
  }

  stopVideo() {
    var video = this.refs.player.getElementsByClassName('player')[0];
    video.pause();
    this.setState({
      videoPlaying: false
    })
    clearTimeout(this.playerTimer);
  }

  handleVideoStop(e) {
    clearTimeout(this.playerTimer);
    this.setState({
      videoDuration: 0,
      videoPlaying: false
    })
  }

  handleVolumeChange(e) {
    if (e >= 0.0 && e <= 1.0) {
      var video = this.refs.player.getElementsByClassName('player')[0];
      video.volume = e;
    }
  }

  handleVideoSeekChange(e) {
    var video = this.refs.player.getElementsByClassName('player')[0];
    if (e.target) {
      this.setState({
        videoDuration: parseInt(e.target.value)
      }, ()=> {
        video.currentTime = this.state.videoDuration
      })
    }
  }

  goFullScreen() {
    var video = this.refs.player.getElementsByClassName('video-player-wrapper')[0];
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      var element = this.refs.player.getElementsByClassName('video-player-wrapper')[0];
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    this.setState({
      isFullScreen: !this.state.isFullScreen
    })
  }

  redirectToRegistrationPage() {
    this.props.setIsJobSeekerSelectedTab()
    this.props.history.push({
      pathname: this.props.location.state.previousPath,
      state: {videoUrl: this.state.videoFile, experienceType: this.props.location.state.experienceType}
    })
  }

  closeVolume() {
    this.setState({
      showVolume: false
    })
  }

  render() {
    const {videoFile, videoPlaying, videoDuration, isFullScreen, maxDuration, previewed, playerMuted, showOptions, showVolume, volume} = this.state;
    return (
      <div ref="player">
        {showOptions ? <div className="post-record" style={{marginTop:'24px'}}>
          <p className='successful-message'>You’ve successfully recorded your resume video which you can preview
            below. <span className="goto-next-line">Would you like to save it?</span>
          </p>
          <div className="post-upload-button">
            <button className='discardButton' onClick={this.discardVideo}>Discard</button>
            <button className='saveButton' onClick={this.redirectToRegistrationPage}>Save</button>
          </div>
        </div> : null}
        <div className="video-player-wrapper">
          {!previewed ? <img src={playRound} className="no-video-icon" onClick={this.handlePreview}/> : null}
          <video className="player" autoPlay={false} preload controls={false} onEnded={this.handleVideoStop}>
            <source src={videoFile}/>
          </video>
          {previewed ? <div className="video-player-controls">
            {videoPlaying ? <div ref="stopRecord" className="stop-play"
                                 style={{backgroundImage: `url(${pausedIcon})`}}
                                 onClick={this.stopVideo}>
              </div> :
              <div className="start-play"
                   style={{backgroundImage: `url(${play})`}}
                   onClick={this.playVideo}/>}
            <input type="range" id="seekbar" onChange={this.handleVideoSeekChange} min={0} max={maxDuration}
                   step={maxDuration / 1000}
                   value={videoDuration}/>
            <p className="timer">{`0.${videoDuration} / 0.${maxDuration}`}</p>
            <div className="volume-wrapper">
              <div className="volume-off"
                   style={{backgroundImage: `url(${volume == 0.0 ? volumeOff : ( volume >= 0.1 && volume <= 0.5 ? volumeRed : volumeOn)})`}}
                   onClick={this.handleVolumeClick}/>
              {showVolume ?
                <VolumeControls onClose={this.closeVolume} onChange={this.handleVolumeChange} volume={volume}/> : null}
            </div>
            <div className="full-screen"
                 style={{backgroundImage: `url(${!isFullScreen ? fullScreen : normalScreen})`}}
                 onClick={this.goFullScreen}/>
          </div> : null }
        </div>
      </div>
    )
  }
}

class RecorderControls extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.wrapperRef = null;
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleOutSideClick = this.handleOutSideClick.bind(this);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleOutSideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutSideClick);
  }

  handleOutSideClick(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose()
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  render() {
    return (
      <div className="stop-buttons" ref={this.setWrapperRef}>
        <button className="pause-button" onClick={this.props.pause}>{this.props.btnName}</button>
        {this.props.stopped == false ? <button className="stop-button" onClick={this.props.stop}>Stop</button> : null}
      </div>
    )
  }
}

class VolumeControls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volume: props.volume || 0.1
    }
    this.wrapperRef = null;
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleOutSideClick = this.handleOutSideClick.bind(this);
    this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.volume) {
      this.setState({
        volume: nextProps.volume
      })
    }
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleOutSideClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleOutSideClick);
  }

  handleOutSideClick(e) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose()
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  handleVolumeChange(e) {
    this.setState({
      volume: e.target.value
    }, ()=> {
      this.props.onChange(this.state.volume);
    })
  }

  render() {
    const {
      volume
    } = this.state;
    return (
      <div className="volume-buttons" ref={this.setWrapperRef}>
        <input type="range" id="volume-bar" className="volume-slider" onChange={this.handleVolumeChange} min={0.0} max={1.0}
               step={0.1}/>
      </div>
    )
  }
}

// class VideoRecorder extends Component {
//   constructor(props, context) {
//     super(props, context);
//     this.state = {
//       videoFile: null,
//       granted: false,
//       rejectedReason: '',
//       recording: false,
//       paused: false,
//       recordDuration: 0,
//       stopDuration: 0,
//       maxDuration: 40,
//       showOptions: true,
//       actualBlob: null
//     }
//     this.recordTimer = null;
//     this.setStreamToVideo = this.setStreamToVideo.bind(this);
//     this.handleError = this.handleError.bind(this);
//     this.handleRequest = this.handleRequest.bind(this);
//     this.handleGranted = this.handleGranted.bind(this);
//     this.handleDenied = this.handleDenied.bind(this);
//     this.handleKeyDown = this.handleKeyDown.bind(this);
//     this.handleStop = this.handleStop.bind(this);
//     this.handlePause = this.handlePause.bind(this);
//     this.handleResume = this.handleResume.bind(this);
//     this.handleStreamClose = this.handleStreamClose.bind(this);
//     this.handleStart = this.handleStart.bind(this);
//     this.resetRecorder = this.resetRecorder.bind(this);
//     this.blobToFile = this.blobToFile.bind(this);
//     this.onControlsClose = this.onControlsClose.bind(this);
//     this.goFullScreen = this.goFullScreen.bind(this);
//     this.handleVideoSeekChange = this.handleVideoSeekChange.bind(this);
//     this.handleVolumeClick = this.handleVolumeClick.bind(this);
//     this.handleVolumeChange = this.handleVolumeChange.bind(this);
//     this.closeVolume = this.closeVolume.bind(this);
//   }

//   closeVolume() {
//     this.setState({
//       showVolume: false
//     })
//   }

//   handleVolumeChange(e) {
//     if (e >= 0.0 && e <= 1.0) {
//       var video = this.refs.app.getElementsByClassName('player')[0];
//       video.volume = e;
//     }
//   }

//   handleVideoSeekChange(e) {
//     var video = this.refs.app.getElementsByClassName('player')[0];
//     if (e.target) {
//       this.setState({
//         videoDuration: parseInt(e.target.value)
//       }, ()=> {
//         video.currentTime = this.state.videoDuration
//       })
//     }
//   }

//   goFullScreen() {
//     var video = this.refs.app.getElementsByClassName('video-wrapper')[0];
//     if (
//       document.fullscreenElement ||
//       document.webkitFullscreenElement ||
//       document.mozFullScreenElement ||
//       document.msFullscreenElement
//     ) {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//       }
//     } else {
//       var element = this.refs.app.getElementsByClassName('video-wrapper')[0];
//       if (element.requestFullscreen) {
//         element.requestFullscreen();
//       } else if (element.mozRequestFullScreen) {
//         element.mozRequestFullScreen();
//       } else if (element.webkitRequestFullscreen) {
//         element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
//       } else if (element.msRequestFullscreen) {
//         element.msRequestFullscreen();
//       }
//     }
//     this.setState({
//       isFullScreen: !this.state.isFullScreen
//     })
//   }

//   componentDidMount() {
//     navigator.getUserMedia = (navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia ||
//     navigator.msGetUserMedia);
//     window.addEventListener("keydown", this.handleKeyDown)
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handleKeyDown)
//   }

//   handleKeyDown(event) {
//     const {paused, recording} = this.state;
//     switch (event.keyCode) {
//       case 32:
//         paused ? this.handleResume() : this.handlePause();
//         break;
//     }
//   }

//   resetRecorder() {
//     this.setState({
//       videoFile: null,
//       actualBlob: null,
//       recordDuration: 0
//     })
//   }

//   handleRequest() {
//   };

//   handleGranted() {
//     this.setState({granted: true});
//   };

//   handleDenied(err) {
//     this.setState({rejectedReason: err.name});
//   };

//   onControlsClose() {
//     this.setState({showRecordMenu: false});
//   };

//   handleStart(stream) {
//     let video = this.refs.app.querySelector('video');
//     this.setState(
//       {
//         recording: true
//       }, () => {
//         this.recordTimer = setInterval(()=> {
//           this.setState({
//             recordDuration: this.state.recordDuration + 1
//           }, ()=> {
//             if (this.state.recordDuration == this.state.maxDuration) {
//               clearInterval(this.recordTimer);
//               if (this.refs.recorder) {
//                 this.refs.recorder.stop();
//               }
//             }
//           })
//         }, 1000);
//       });

//     this.setStreamToVideo(stream);
//   };

//   handleStop(blob) {
//     let video = this.refs.app.querySelector('video');
//     video.srcObject = null;

//     let videoFile = window.URL.createObjectURL(blob);
//     this.setState(
//       {
//         recording: false,
//         showRecordMenu: false,
//         stopDuration: this.state.recordDuration,
//         videoFile: videoFile,
//         actualBlob: blob
//       },
//       () => {
//         clearInterval(this.recordTimer);
//       }
//     );

//   };

//   handlePause() {
//     let video = this.refs.app.querySelector('video');

//     // if (window.URL) {
//     // 	video.src = window.URL.createObjectURL(stream);
//     // } else {
//     video.pause();
//     this.setState({
//       paused: true,
//       showRecordMenu: false
//     }, ()=> {
//       clearInterval(this.recordTimer);
//     })
//   }

//   handleResume(stream) {
//     let video = this.refs.app.querySelector('video');
//     if (this.state.recordDuration !== this.state.maxDuration) {
//       this.recordTimer = setInterval(()=> {
//         this.setState({
//           recordDuration: this.state.recordDuration + 1
//         }, ()=> {
//           if (this.state.recordDuration == this.state.maxDuration) {
//             clearInterval(this.recordTimer);
//             this.refs.recorder.stop();
//           }
//         })
//       }, 1000);

//       video.play();
//       this.setState({
//         paused: false
//       })
//     } else {
//       // this.setState({
//       //
//       // })
//       this.refs.recorder.stop();
//     }
//   }

//   handleError(err) {
//   };

//   handleVolumeClick(e) {
//     this.setState({
//       playerMuted: !this.state.playerMuted
//     })
//   };

//   handleStreamClose() {
//     this.setState({
//       granted: false
//     });
//   };

//   setStreamToVideo(stream) {
//     let video = this.refs.app.querySelector('video');
//     video.srcObject = stream;
//   };

//   blobToFile(theBlob, fileName) {
//     //A Blob() is almost a File() - it's just missing the two properties below which we will add
//     theBlob.lastModifiedDate = new Date();
//     theBlob.name = fileName;
//     return theBlob;
//   }

//   uploadFileToServer(videoFile) {
//     let file = this.blobToFile(videoFile, `video-resume-${new Date().getTime()}`);
//     var formData = new FormData();
//     formData.append("document", file);
//     axios.post(`${SERVER_API_URL}${SERVER_API_PATH}${UPLOAD_VIDEO_RESUME}`,
//       formData,
//       {headers: {'Content-Type': 'multipart/form-data'}})
//       .then((res)=> {
//         this.setState({
//           showOptions: false
//         })
//       }).catch(err=> {
//     })
//   }

//   render() {
//     const {
//       granted,
//       rejectedReason,
//       recording,
//       paused,
//       videoFile,
//       showRecordMenu,
//       maxDuration,
//       recordDuration,
//       showOptions,
//       actualBlob,
//       stopDuration,
//       showVolume,
//       volume,
//       isFullScreen
//     } = this.state;
//     return (
//       <div ref="app" className="video-resume">
//         {videoFile == null ?
//           <MediaCapturer
//             constraints={{audio: true, video: true}}
//             timeSlice={10}
//             onGranted={this.handleGranted}
//             onRequestPermission={this.handleRequest}
//             onDenied={this.handleDenied}
//             onStart={this.handleStart}
//             onStop={this.handleStop}
//             onPause={this.handlePause}
//             onResume={this.handleResume}
//             onError={this.handleError}
//             ref="recorder"
//             onStreamClosed={this.handleStreamClose}
//             render={({request, start, stop, pause, resume}) => (
//               <div id="video-wrapper" className="video-wrapper">
//                 {!recording ? <img src={noVideo} className="no-video-icon"/> : null}
//                 <video className="recording" autoPlay controls={false} onClick={paused ? resume : pause}/>
//                 <div className="video-recorder-controls">
//                   <div className="start-play"
//                        style={{backgroundImage: `url(${!recording || paused ? play : pausedIcon})`}}
//                        onClick={!recording && !paused ? start : (paused ? resume : pause)}/>
//                   <div className="stop-play"
//                        style={{backgroundImage: `url(${recordingIcon})`}}
//                        onClick={paused ? stop : pause}/>
//                   <input type="range" id="seek-bar" min={0} max={maxDuration}
//                          step={maxDuration / 1000}
//                          value={recordDuration}/>
//                   <p className="timer">{`0.${recordDuration} / 0.${maxDuration}`}</p>
//                   <div className="volume-wrapper">
//                     <div className="volume-off"
//                          style={{backgroundImage: `url(${volume == 0.0 ? volumeOff : ( volume >= 0.1 && volume <= 0.5 ? volumeRed : volumeOn)})`}}
//                          onClick={this.handleVolumeClick}/>
//                     {showVolume ?
//                       <VolumeControls onClose={this.closeVolume} onChange={this.handleVolumeChange}
//                                       volume={volume}/> : null}
//                   </div>
//                   <div className="full-screen"
//                        style={{backgroundImage: `url(${!isFullScreen ? fullScreen : normalScreen})`}}
//                        onClick={this.goFullScreen}/>
//                 </div>
//               </div>
//             )}
//           /> : <VideoPlayer videoFile={videoFile} maxDuration={stopDuration} showOptions={showOptions}
//                             discardVideo={this.resetRecorder}
//                             uploadFileToServer={(e)=>this.uploadFileToServer(actualBlob)}/>}
//       </div>
//     )
//   }
// }

class VideoRecBeta extends Component {
  static recorderInstance = null;
  constructor(props) {
    super(props);
    this.betaRef = React.createRef();
    this.state = {
      recording: false,
      recordingStarted: false,
      filename: null,
      recordDuration: 0.0,
      maxDuration: 45,
      recordingFinished: false,
      recordedFileUrl: null,
      startCountDown:false
    };
    this.recorderTimer = null;
    this.handleRecord = this.handleRecord.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.goFullScreen = this.goFullScreen.bind(this);
    this.stopRecord = this.stopRecord.bind(this);
    this.startRecording = this.startRecording.bind(this);
    this.onRecordingVerify = this.onRecordingVerify.bind(this);
    this.resetRecorder = this.resetRecorder.bind(this);

  }

  componentDidUpdate() {
    let BetaJS = window.BetaJS;
    if (BetaJS) {
      let filename = "video-" + BetaJS.Time.now();
      let recorder = this.betaRef ? this.betaRef.recorderInstance() : null;
      let nanoMediaServer = `${SERVER_URL}/shenzyn-media-server/files/`;
      if (recorder) {
        recorder._prepareRecording = function () {
          recorder.set("uploadoptions", {
            image: {url: nanoMediaServer + filename + ".jpg"},
            video: {
              url: nanoMediaServer + filename + ".mp4",
              type: "mp4",
              serverUrl: nanoMediaServer + filename + ".mp4",
              streamName: filename + ".mp4"
            },
            audio: {url: nanoMediaServer + filename + ".wav"}
          });
          recorder.set("playbacksource", nanoMediaServer + filename + ".mp4");
          if (recorder.recorder)
            recorder.set("playbackposter", nanoMediaServer + "/files/" + filename + ".jpg");
          return BetaJS.Promise.value(true);
        };
      }
    }
  }

  handleRecord() {
    this.setState({
      recording: !this.state.recording
    }, ()=> {
      if(this.state.recording){
        this.betaRef.recorder.record()
        this.startRecording()
      }
      else{
        this.betaRef.recorder.pause()
        clearInterval(this.recorderTimer)
      }

    })
  }

  stopRecord() {
    this.setState({
      recordingStarted: false,
      recording: false,

    }, ()=> {
      clearTimeout(this.recorderTimer);
    });
  }

  startRecording() {
    this.recorderTimer = setInterval(()=> {
      this.setState({
        recordDuration: this.state.recordDuration + 1,
      })
    }, 1000)
  }

  handleStart() {
    this.setState({
      recordingStarted: true,
      recording: true,
      startCountDown:true,
    }, ()=> {
      this.betaRef.recorder.record();
    })
  }

  handleStop() {
    this.setState({
      recordingStarted: false,
      recording: false
    }, ()=> {
      this.betaRef.recorder.stop();
    })
  }

  onRecordingVerify(e) {
    this.setState({
      recordingFinished: true,
      recordedFileUrl: e.playbacksource
    });
  }

  resetRecorder(e) {
    this.setState({
      recordingFinished: false,
      recording: false,
      recordDuration: 0.0,
    });
  }

  onRecorderAttached(e) {
    var registry = new BetaJS.Flash.FlashClassRegistry();
  }

  recorderError = () => {
  };
  recorderRecording = () => {
  };

  goFullScreen() {
    var video = this.refs.app.getElementsByClassName('video-wrapper')[0];
    if (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      var element = this.refs.app.getElementsByClassName('video-wrapper')[0];
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }
    this.setState({
      isFullScreen: !this.state.isFullScreen
    })
  }

  goToBack=()=>{
    this.props.setIsJobSeekerSelectedTab();
    this.props.history.push({
      pathname: this.props.location.state.previousPath,
      state: {experienceType: this.props.location.state.experienceType}
    })
  }

  render() {
    const {recording, recordingStarted, recordingFinished, recordDuration, maxDuration, recordedFileUrl}  = this.state;
    return (
      <div ref="app" className="video-resume">
        <div className="video-resume-header">
          <img src={back} className="video-resume-back-button" onClick={!recordingFinished?this.goToBack:this.resetRecorder}/>
          <div className="video-resume-title-block">
            <div className="video-resume-title-text">Video Resume</div>
            <span className="video-resume-title-description">Your video won’t be shared with any third party.</span>
          </div>
        </div>
        {!recordingFinished ?
          <div id="video-wrapper" className="video-wrapper video-wrapper-responsive" style={{
            backgroundColor: !recording ? '#d8d8d8' : '#000000',
            display: !recordingFinished ? 'block' : 'none'
          }}>
            {!recording ? <img src={noRecord} className="no-video-icon"/> : null}
            <BetaJSVideoRecorder
              height={300}
              width={300}
              style={{height: '100%'}}
              flashFile={FLASH_FILE + `?serverUrl=${"rmtp://localhost:1935/live/"}&streamname=video-${BetaJS.Time.now()}`}
              allowupload={false}
              onRef={ref=>this.betaRef = ref}
              preventReRenderOnUpdate={true}
              flip-camera={false}
              picksnapshots={false}
              createthumbnails={false}
              playbackposter={""}
              countdown={3}
              playbacksource={`rmtp://localhost:1935/live/video-${BetaJS.Time.now()}`}
              timelimit={maxDuration}
              rtmpstreamtype={"flv"}
              onClick={()=>this.handleRecord()}
              onPlaying={()=> {
              }}
              onPaused={()=> {
              }}
              onEnded={this.stopRecord}
              onAttached={this.onRecorderAttached}
              onLoaded={()=> {
              }}
              onSeek={()=> {
              }}
              onError={(e)=> {
              }}
              onManuallySubmitted={()=> {
              }}
              onUploaded={()=> {
              }}
              onUploadSelected={()=> {
              }}
              onRecording={this.startRecording}
              onUploading={this.stopRecord}
              onRerecord={()=> {
              }}
              onCountdown={()=> {
              }}
              onRecordingProgress={()=> {
                if(this.state.startCountDown){
                  this.setState({startCountDown:false})
                }
              }}
              onUploadProgress={()=> {
              }}
              onAccessForbidden={()=> {
              }}
              onAccessGranted={()=> {
              }}
              onCameraUnresponsive={()=> {
              }}
              onVerified={this.onRecordingVerify}
              onNoCamera={()=> {
              }}
              onNoMicrophone={()=> {
              }}
            />
            <div className="video-recorder-controls">
              {!recordingStarted ? <div className="stop-play"
                                        style={{backgroundImage: `url(${recordIcon})`}}
                                        onClick={this.handleStart}/> :
                <div className="stop-play"
                     style={{backgroundImage: `url(${stopRecord})`}}
                     onClick={!this.state.startCountDown?this.handleStop:null}/>
              }
              <input type="range" id="seekbar" min={0} max={maxDuration}
                     step={maxDuration / 1000}
                     value={recordDuration}/>
              <p className="timer">{`0.${recordDuration} / 0.${maxDuration}`}</p>
            </div>
          </div> :
          <VideoPlayer maxDuration={recordDuration} videoFile={recordedFileUrl} {...this.props}
                       discardVideo={this.resetRecorder}/>}
      </div>
    )
  }
}

class EmployeeHomePage extends Component {
  render() {
    return (
      <div className="employee-home">
        <EmployerSideNav>
          <VideoRecBeta {...this.props}/>
        </EmployerSideNav>
      </div>
    );
  }
}

export default EmployeeHomePage;
