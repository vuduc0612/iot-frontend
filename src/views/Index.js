import { useState, useEffect } from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import axios from "axios";

import Header from "components/Headers/Header.js";
import ToggleButton from "./examples/ToggleButton";
import { BASE_URL_API } from "../constants";
import RealTimeChart from "variables/charts";
import AdminNavbar from "components/Navbars/AdminNavbar";
import { useSensor } from "./examples/SensorContext";
const Index = (props) => {
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);

  // Fetch the current LED status from the API
  useEffect(() => {
    const fetchLEDStatus = async () => {
      try {
        const response = await axios.get(`${BASE_URL_API}/api/led/status`);
        if (response.data) {
          const sortedData = response.data.sort((a, b) => a.id - b.id);
          //console.log(sortedData);
          if (sortedData.length >= 3) {
            setIsActive1(sortedData[0].status);
            setIsActive2(sortedData[1].status);
            setIsActive3(sortedData[2].status);
            await axios.post(`${BASE_URL_API}/api/led/update`, {
              stled1: sortedData[0].status,
              stled2: sortedData[1].status,
              stled3: sortedData[2].status
            });
            
          } else {
            console.error("Not enough data to set LED statuses");
          }
        }
      } catch (error) {
        console.error("Error fetching LED status: ", error);
      } finally {
        //setLoading(false); // Hide loading indicator
      }
    };
    console.log("useEffect1");
    fetchLEDStatus();
  }, []); // Empty dependency array ensures this runs only on mount
  //console.log('Data from database: ', isActive1, isActive2, isActive3);

  const {stled1, stled2, stled3} = useSensor();
  //console.log('Data from useSensor: ', stled1, stled2, stled3);

  useEffect(() => {
    // Cập nhật trạng thái LED từ dữ liệu WebSocket
    
    if (stled1 !== null) setIsActive1(stled1);
    if (stled2 !== null) setIsActive2(stled2);
    if (stled3 !== null) setIsActive3(stled3);
  
    console.log('Data sensor: ', isActive1, isActive2, isActive3);
  }, [stled1, stled2, stled3]);

  console.log('Data final: ', isActive1, isActive2, isActive3);

  const toggleDevice = async (idDevice, isOn) => {
    const apiUrl = isOn
      ? `${BASE_URL_API}/api/led/on?id=${idDevice}`
      : `${BASE_URL_API}/api/led/off?id=${idDevice}`;

    //setLoading(true); // Show loading indicator

    try {
      const response = await axios.post(
        apiUrl,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        return true; // Success
      }
    } catch (error) {
      console.error("Error turning on/off device: ", error);
    } finally {
      // setLoading(false); // Hide loading indicator
    }

    return false; // Failure
  };

  const handleToggleDevice = async (lightId, newState) => {
    const success = await toggleDevice(lightId, newState);
    if (success) {
      if (lightId === 1) {
        setIsActive1(newState);
      } else if (lightId === 2) {
        setIsActive2(newState);
      } else if (lightId === 3) {
        setIsActive3(newState);
      }
      // await axios.post(`${BASE_URL_API}/api/led/update`, {
      //   [`stled${lightId}`]: newState
      // });
    } else {
      console.error("Failed to toggle device");
    }
  };

  return (
    <>
      <AdminNavbar brandText="DashBoard" />
      <Header />

      <Container
        className="mt-0"
        fluid
        style={{ paddingLeft: "2rem", paddingRight: "1rem" }}
      >
        <Row>
          <Col className="mb-5 mb-xl-0 pl-0" xl="10">
            <Card className="bg-gradient-default shadow mb-0">
              <CardHeader
                className="bg-transparent mb-0"
                style={{ paddingBottom: "0px" }}
              >
                <Row className="align-items-center">
                  <div className="col-8">
                    <h3 className="text-white mb-0">
                      Temperature & Humidity & Light
                    </h3>
                  </div>
                </Row>
              </CardHeader>
              <CardBody style={{ paddingTop: "10px" }}>
                <div className="">
                  <RealTimeChart />
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col xl="2" className="pl-0">
            <Card
              className="shadow"
              style={{
                height: "30%",
                border: "2px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3
                className="text-black mt-3 mb-0 pt-2"
                style={{ textAlign: "center" }}
              >
                Điều khiển đèn
              </h3>
              <Row className="align-items-center h-100">
                <div className="col ml-4">
                  <ToggleButton
                    isActive={isActive1}
                    setActive={(newState) => handleToggleDevice(1, newState)}
                  />
                </div>
                <div className="icon text-white rounded-circle shadow mr-4">
                  <i
                    className="fa-solid fa-lightbulb"
                    style={{
                      fontSize: "40px",
                      color: isActive1 ? "#fff200" : "#333333",
                    }}
                  ></i>
                </div>
              </Row>
            </Card>
            <Card
              className="shadow my-4"
              style={{
                height: "30%",
                border: "2px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3
                className="text-black mt-3 mb-0 pt-2"
                style={{ textAlign: "center" }}
              >
                Điều khiển quạt
              </h3>

              <Row className="align-items-center h-100">
                <div className="col ml-4">
                  <ToggleButton
                    isActive={isActive2}
                    setActive={(newState) => handleToggleDevice(2, newState)}
                  />
                </div>
                <div className="icon icon-shape text-white shadow mr-4">
                  <i
                    className="fa-solid fa-fan"
                    style={{
                      fontSize: "40px",
                      color: isActive2 ? "#fa983a" : "#333333",
                      animation: isActive2 ? "spin 2s infinite linear" : "none", // Thêm hiệu ứng quay
                    }}
                  />
                </div>
              </Row>
            </Card>

            <Card
              className="shadow"
              style={{
                height: "30%",
                border: "2px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3
                className="text-black mt-3 mb-0 pt-2"
                style={{ textAlign: "center" }}
              >
                Điều khiển điều hòa
              </h3>
              <Row className="align-items-center h-100">
                <div className="col ml-4">
                  <ToggleButton
                    isActive={isActive3}
                    setActive={(newState) => handleToggleDevice(3, newState)}
                  />
                </div>
                <div className="icon text-white rounded-circle shadow mr-4">
                  <i
                    className="fa-regular fa-snowflake"
                    style={{
                      fontSize: "40px",
                      color: isActive3 ? "#45aaf2" : "#333333",
                    }}
                  />
                </div>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
