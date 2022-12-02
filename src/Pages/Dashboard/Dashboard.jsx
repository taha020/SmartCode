import React, { useState } from "react";
import { Col, Row } from "antd";
import { Divider, Input, Select } from "antd";
import { PlusOutlined, LogoutOutlined , CodepenOutlined, EditOutlined ,DeleteOutlined} from "@ant-design/icons";
import { Avatar } from "antd";
import { Button, List, Skeleton } from 'antd';

//Modals
import ShowCode from "../../Components/Modal/ShowCode";
import NewCode from "../../Components/Modal/NewCode";

import "./Dashboard.scss";

function Dashboard() {
  const { Search } = Input;

  // Snippets

  let [ snippets, setsnippets ] = useState([
    {
      id:"1",
      Title:"Heading Of the Button",
      Description:"Thats a icon button that will hover black and be borderless",
      Cetagory:"Nodejs",
      Date:"10/5/2022",
      Code:`<Button shape=" circle" icon={<CodepenOutlined />}/>`
    },
    {
      id:"2",
      Title:"Heading Of the Button",
      Description:"Thats a icon button that will hover black and be borderless",
      Cetagory:"Nodejs",
      Date:"10/5/2022",
      Code:`<Button shape=" circle" icon={<CodepenOutlined />}/>`
    }
  ])
  let [ModalContent, setModalContent] = useState({})

  let onSearch = () => {};
  let onChange = () => {};
  let ShowFullCode = (Index) =>{
    setModalContent(snippets[Index])
    document.getElementById("SHowcodeButton").click()
  }

  return (
    <div>

      <nav>
        <a style={{cursor:"pointer"}} onClick={()=>{document.getElementById("newcode").click()}} className="Addbutton">
          {" "}
          <span style={{ fontSize: "12px" }}>
            {" "}
            <PlusOutlined />{" "}
          </span>{" "}
          Add New{" "}
        </a>
        <span>SmartCode</span>
        <Avatar
          style={{ cursor: "pointer", backgroundColor: "var(--secondary)" }}
          icon={<LogoutOutlined />}
        />
      </nav>

      <div className="DashboardBody">

        <div className="Filters">
          
              <Search
                placeholder="input search text"
                onSearch={onSearch}
                style={{ width: "20%", marginRight: "5%" }}
              />
    
            
              <Select
                showSearch
                placeholder="Select Category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "tom",
                    label: "Tom",
                  },
                ]}
              />
          
        </div>

        <div className="Codelist">

         {snippets.map((e,key)=>
           <div className="CodeCard">
          

                        <Row>
                          <Col span={20} >    <h4>{e.Title}</h4>  </Col>
                          <Col span={4} >   
                                            <Button onClick={()=>ShowFullCode(key)} shape="circle" icon={<CodepenOutlined />} />
                                            <Button style={{ marginLeft:"5%" }} shape="circle" icon={<EditOutlined />} />
                                            <Button style={{ marginLeft:"5%" }} shape="circle" icon={<DeleteOutlined />} />
                          </Col>
                        </Row>
                        <hr/>
                        <p>{e.Description}</p>
                        <Row>
                          <Col span={20} ><span> {e.Date} <b> By Taha Rasheed </b> </span></Col>
                          <Col span={4} ><span>Cetagory: {e.Cetagory} </span></Col>
                        </Row>
                       
            </div> 
             )}


        </div>

      </div>

<ShowCode content={ModalContent} />
<NewCode/>

    </div>
  );
}

export default Dashboard;
