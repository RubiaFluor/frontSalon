import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Card, Row, Col, Typography, Modal} from "antd";

const { Text } = Typography;


function modalErrorListClient(){
  Modal.error(
    {
      content:"Customer list error"
    }
  )
}

function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const [Clients, setClients] = useState([]);
  let variable = { userfrom: localStorage.getItem("token") };

  console.log("variable",variable)

  useEffect(() => {
    fetchClient();
  }, []);

  const fetchClient = () => {
    axios
      .get("http://localhost:9000/api/client/listClient/",variable)
      .then((response) => {
      console.log("respo", response);
          if (response.data.success) {
            setClients(response.data.clients);
          } else {
           modalErrorListClient();
          }    
      });
  };

  return (
    <div className="list-clients">
      <h3>List all Clients </h3>
      {Clients.map((clients) => {
        return (
          <div key={clients._id} className="site-card-wrapper" >
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Card Sales" bordered={false}>
                  <Text strong>Name Client</Text>
                  <br></br>
                  <span className="description">{clients.nameClient}</span>
                  <br></br>
                  <br></br>
                  <Text strong>Name Coiffeur</Text>
                  <br></br>
                  <span className="description">{clients.nameCoiffeur}</span>
                  <br></br>
                  <br></br>
                  <Text strong>Number Ticket</Text>
                  <br></br>
                  <span className="description">{clients.numberTicket}</span>
                  <br></br>
                  <br></br>
                  <Text strong>Number Voucher</Text>
                  <br></br>
                  <span className="description">{clients.numberVoucher}</span>
                </Card>
              </Col>
            </Row>
          </div>
        );
      })}
    </div>
  );
}

export default HomePage;
