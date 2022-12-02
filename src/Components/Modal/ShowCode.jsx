import React, { useState } from 'react';
import { Button, Modal, Popover  } from 'antd';
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
        
      </Button>
      <Modal title="SmartCode | Code snippet" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="ModalContent">
         <h4 style={{margin:"0px",color:"var(--primary)"}} >{props.content.Title}</h4>
         <p>{props.content.Description}</p>
         <div style={{cursor:"pointer"}} onClick={()=>CopyToClipBoard(props.content.Code)} className='CodeDiv' >{props.content.Code}</div>
        </div>
      </Modal>
    </>
  );
};
export default ShowCode;