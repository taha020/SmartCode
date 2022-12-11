import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set } from "firebase/database";
import { PlusOutlined  } from '@ant-design/icons';
import { Button, Drawer, Input, Select, Space,Modal } from 'antd';


const NewCode = (props) => {

  let Cetaqgory = ""

  const db = getDatabase(); 
  const [open, setOpen] = useState(false);

  const { TextArea } = Input;
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  

  const onChange = (value) => {
    Cetaqgory = value
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async() => {

   let heading = document.getElementById("heading").value 
   let description = document.getElementById("description").value 
   let code = document.getElementById("code").value.toString()

   if( heading!="" && description!="" && code!="" && Cetaqgory!=""   )
   {

    const postListRef = ref(db, 'Snippets');
    const newPostRef = push(postListRef);
    const id = newPostRef.toJSON().toString().slice(-20)
    set(newPostRef, {
      id:id,
      heading:heading,
      description:description,
      code:code,
      cetagory:Cetaqgory,
      date: new Date().toLocaleString().replace(',','').toString()
    }).then(()=>{
      document.getElementById("heading").value = ""
      document.getElementById("description").value = ""
      document.getElementById("code").value = ""
      alert("Data posted!")
      setOpen(false);
    }).catch((err)=>{alert("Error!");console.log("Firebase posted Data Error:",err)});

   }
   else
   {
    alert("please enter values")
   }
 
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
            <Button onClick={handleOk} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <br /><br /> 
        <label>Title</label><br /> <br /> 
        <Input id="heading"  placeholder="Basic usage" />   <br /><br /> <br /> 
        <label>Description</label><br /> <br /> 
        <TextArea id="description"  rows={4} placeholder="maxLength is 200" maxLength={200} /> <br /><br /> <br /> 
        <label>Code</label><br /> <br /> 
        <TextArea id="code"  rows={4} placeholder="Paste code" /> <br /><br /> <br /> 
        <label>Cetagory</label><br /> <br /> 
        <Select  className='Cetchangery'
        style={{ width: '60%',display:"inline-block" }}
    showSearch
    fieldNames={props.CetagoriesToShow}
    placeholder="Select a person"
    optionFilterProp="children"
    onChange={onChange}
    onSearch={onSearch}
    filterOption={(input, Option) =>
      (Option?.label ?? '').toLowerCase().includes(input.toLowerCase())
    }
    options={props.CetagoriesToShow}
  />    
      <Button onClick={showModal} style={{ marginLeft:"3%" }}  type="primary" shape="circle" icon={<PlusOutlined />} />
      </Drawer>
  
        {/* New Cetagory Model */}
    <>
      <Modal title="New Cetagory" open={isModalOpen} onOk={()=>{let val=document.getElementById("Newcet").value; if(val!=""){ props.CetagoriesToShow.push({ value : val, label : val }) ; document.getElementById("Newcet").value="" ; handleCancel() }else alert("Please enter Value")}} onCancel={handleCancel}>
       <br /> <Input id='Newcet' placeholder="Enter Cetagory" /> <br /><br />
      </Modal>
    </>

      
    </> 
    
  
    
    
  );



};
export default NewCode;