import React from 'react';
import Modal from 'react-modal';
import WebCamStreamVideoCapture from './WebCamStreamVideoCapture';

const customStyles = {
    content: {
      top: '50%',
      height: "650px",
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  

export default props => {
  const {
    title, isOpen, askToClose,
    onAfterOpen, onRequestClose, onChangeInput
  } = props;

  return (
    <Modal
      id="test"
      contentLabel="modalA"
      closeTimeoutMS={150}
      isOpen={isOpen}
      style={customStyles}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}>
      <div className="buttonNewTheme text-right">
                        <button  className="btn btn-outline-primary" style = {{fontWeight : "bold", height:"65px" , width: "65px"}}  onClick={askToClose}>
                        <i className="fa fa-times" ></i>
                        </button>
      </div>
      <div className = "text-center">
      <h1>Record Video</h1>
      <div>Press <i className ="fas fa-record-vinyl fa-lg" style={{color : "#a98799"}} ></i><span style = {{color : "#a98799", fontWeight: 'bold'}}> Rec </span> To Start Recording</div>
      <div>Press <i className="fa fa-stop" style={{color : "#a98799"}} ></i> To Stop Recording</div>
      <div>Press <i className="fa fa-download" style={{color : "#a98799"}} ></i> To Download/Send Recording</div>
      <WebCamStreamVideoCapture />
      
      </div>
      
      
    </Modal>
  );
}
