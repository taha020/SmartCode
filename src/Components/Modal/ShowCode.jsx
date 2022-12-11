import React, { useState , useEffect } from 'react';
import { Button, Modal  } from 'antd';
import "./ShowCode.scss"

const ShowCode = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  let CopyToClipBoard=(code)=>{
    navigator.clipboard.writeText(code);
    alert("Copied to clipboard!")
  }

  return (
    <>
      <Button style={{display:"none"}} id='SHowcodeButton'  type="primary" onClick={showModal}>
        <p>,    navigator.clipboard.writeText(code);,    alert("Copied to clipboard!"),</p>
      </Button>
      <Modal title="SmartCode | Code snippet" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="ModalContent">
         <h4 style={{margin:"0px",color:"var(--primary)"}} >{props.content.heading}</h4>
         <p>{props.content.description}</p>
         <div style={{cursor:"pointer"}} onClick={()=>CopyToClipBoard( props.content.code )} className='CodeDiv' > <p> { props.content.code } </p> </div>
        </div>
      </Modal>
    </>
  );
};
export default ShowCode;