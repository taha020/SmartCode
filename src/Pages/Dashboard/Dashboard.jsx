import React, { useState,useEffect } from "react";
import { Col, Row } from "antd";
import { Input, Select, message, Popconfirm, Avatar, Button } from "antd";
import { PlusOutlined, LogoutOutlined , CodepenOutlined, EditOutlined ,DeleteOutlined} from "@ant-design/icons";
import { getDatabase, ref, onValue, remove, set} from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

//Modals
import ShowCode from "../../Components/Modal/ShowCode";
import NewCode from "../../Components/Modal/NewCode";
import UpdateCode from "../../Components/Modal/UpdateCode";

import "./Dashboard.scss";


function Dashboard() {
  
  let navigate = useNavigate();

  let [Cetagories,setCetagories] = useState([])
  const database = getDatabase();
  const { Search } = Input;
  let [ snippets, setsnippets ] = useState([])
  let [ SnippetsCopy, setSnippetsCopy ] = useState([])
  let [ SnippetToUpdate, SetSnippetToUpdate ] = useState([])
  let [ ModalContent, setModalContent ] = useState({})

  useEffect(() => {

    const GetSnippets = ref(database,'Snippets');
    onValue(GetSnippets, (snapshot) => {
      const data = snapshot.val();
      if(data!=null)
      {         
        let Cats = []
        Object.values(data).forEach(element =>{
          if(!Cats.find(e=>e.value==element.cetagory))
          Cats.push({value:element.cetagory,label:element.cetagory})
        })
        setCetagories( Cetagories = Cats )
        setsnippets( snippets = Object.values(data) )   
        setSnippetsCopy ( SnippetsCopy = Object.values(data) )
      }
      else
      setsnippets([])
    });
   
  },[]);

  let ShowFullCode = (Index) =>{
    setModalContent(snippets[Index])
    document.getElementById("SHowcodeButton").click()
  }

    let DeleteCodeSnippet = (index) =>{

    set(ref(database, 'Snippets/' + snippets[index].id),null)
    .then((data)=>{
      alert("Deleted !")
      console.log("Delete Successfully",data)
    }).catch((err)=>{
      console.log("Error While Deleting Data:",err)
      alert("Error Accured!")
    })
    
    
  }

  let LogoutUser = () =>{

    const auth = getAuth();
    signOut(auth).then(() => {
    alert("Logged Out!")  
    navigate("/login"); 
    }).catch((error) => {
    alert("Error while Loggin Out!")
    console.log("Loged out error:",error)
    });

  }

  // FIlters

  let NameFilter = () =>{

    let value = document.getElementById("SearchBar").value
    if(value!="")
    {
      let arr = snippets.filter(elemet=>elemet.heading.toLowerCase().startsWith(value.toLowerCase()))
      setsnippets(snippets = arr ) 
    }
    else
    { 
      setsnippets( snippets = SnippetsCopy ) 
    }

  }

  let CetagoryFilter = (v) =>{
    let arr = SnippetsCopy.filter(e=>e.cetagory==v)
    setsnippets( snippets = arr )
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
        <Avatar onClick={LogoutUser}
          style={{ cursor: "pointer", backgroundColor: "var(--secondary)" }}
          icon={<LogoutOutlined />}
        />
      </nav>

      <div className="DashboardBody">

        <div className="Filters">
          
              <Search
                placeholder="input search text"
                onChange={NameFilter}
                id="SearchBar"
                style={{ width: "20%", marginRight: "5%" }}
              />
    
            
              <Select
                showSearch
                placeholder="Select Category"
                optionFilterProp="children"
                onChange={CetagoryFilter}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={Cetagories}
              />
          
        </div>
                
        <div className="Codelist">

         {snippets.map((e,key)=>
           <div key={key} className="CodeCard">
          

                        <Row>
                          <Col xs={20} sm={20} md={19} lg={18} xl={18} >    <h4>{(e.heading.length>25)?e.heading.slice(0,25)+"...":e.heading}</h4>  </Col>
                          <Col xs={4} sm={4} md={5} lg={6} xl={6} >   
                              <Button onClick={()=>ShowFullCode(key)} shape="circle" icon={<CodepenOutlined />} />
                              <Button id="ActionButtons" onClick={()=>{SetSnippetToUpdate(snippets[key]) ;  document.getElementById("Updatecode").click() }}  shape="circle" icon={<EditOutlined />} />
                              <Popconfirm
                               title="Are you sure to delete this Snippet?"
                               onConfirm={()=>DeleteCodeSnippet(key)}
                               okText="Delete"
                               cancelText="Cancel"
                              >
                              <Button id="ActionButtons"  shape="circle" icon={<DeleteOutlined />} />
                              </Popconfirm>
                          </Col>
                        </Row>
                        <hr/>
                        <p>{(e.description.length>48)?e.description.slice(0,48)+"...":e.description}</p>
                        <Row>
                          <Col xs={18} sm={18} md={20} lg={16} xl={17} ><span><b> {e.date}  </b> </span></Col>
                          <Col xs={6} sm={6} md={4}  lg={8} xl={7} ><span>Cetagory: {e.cetagory} </span></Col>
                        </Row>
                       
            </div> 
             )}


        </div>

      </div>

      <UpdateCode CetagoriesToShow={Cetagories} SnippetToUpdate={SnippetToUpdate} />
      <ShowCode content={ModalContent} />
      <NewCode CetagoriesToShow={Cetagories} />

    </div>
  );
}

export default Dashboard;
