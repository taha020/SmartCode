import React, { useState } from 'react';
import { PlusOutlined ,EnterOutlined } from '@ant-design/icons';
import { Button, Drawer, Input, Select, Space,Modal } from 'antd';
const { Option } = Select;
const NewCode = () => {

   let [Cetagories,setCetagories] = useState([{
    value: 'jack',
    label: 'Jack',
  }])

  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
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

  return (
    <>
      <Button style={{display:"None"}} id='newcode' type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        
      </Button>
      <Drawer
        title="Create a new Code Snippet"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <br /><br /> 
        <label>Title</label><br /> <br /> 
        <Input placeholder="Basic usage" />   <br /><br /> <br /> 
        <label>Description</label><br /> <br /> 
        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} /> <br /><br /> <br /> 
        <label>Code</label><br /> <br /> 
        <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} /> <br /><br /> <br /> 
        <label>Cetagory</label><br /> <br /> 
        <Select
        style={{ width: '60%',display:"inline-block" }}
    showSearch
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, option) =>
      (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={Cetagories}
  />    
      <Button onClick={showModal} style={{ marginLeft:"3%" }}  type="primary" shape="circle" icon={<PlusOutlined />} />
      </Drawer>
  
        {/* New Cetagory Model */}
    <>
      <Modal title="New Cetagory" open={isModalOpen} onOk={()=>{let val=document.getElementById("Newcet").value; if(val!=""){setCetagories.push({value:val,label:val});handleCancel()}else alert("Please enter Value")}} onCancel={handleCancel}>
       <br /> <Input id='Newcet' placeholder="Enter Cetagory" /> <br /><br />
      </Modal>
    </>

      
    </> 
    
  
    
    
  );



};
export default NewCode;