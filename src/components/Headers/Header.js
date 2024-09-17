
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { useSensor } from "views/examples/SensorContext";
const getCardClass = (value, type) => {
  if (type === 'temperature') {
    if(value < 8) return 'card-cold';
    if (value >= 8 && value < 14) return 'card-med-cold';
    if (value >= 14 && value <= 28) return 'card-warm';
    return 'card-hot';
  } else if (type === 'light') {
    if (value < 200) return 'card-low-light';
    if (value <= 700) return 'card-medium-light';
    return 'card-high-light';
  } else if (type === 'humidity') {
    if (value < 30) return 'card-dry';
    if (value >= 30 && value <= 60) return 'card-normal-humidity';
    return 'card-humid';
  }
};
const Header = () => {
 
  const { temperature, light, humidity } = useSensor();
  return (
    <>
      <div className="header pb-9 pt-6 ml-2 mr-2" style={{height: '180px'}}>
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <Card className={`card-stats mb-4 mb-xl-0 ${getCardClass(light, 'light')}`}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Light
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {light} Lux
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="icon icon-shape bg-danger text-white rounded-circle shadow"
                          style={{ height: "65px", width: "65px" }}
                        >
                          <i
                            className="fa-regular fa-lightbulb"
                            style={{ fontSize: "35px" }}
                          ></i>
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-2 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        
                      </span>{" "}
                      
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className={`card-stats mb-4 mb-xl-0 ${getCardClass(temperature, 'temperature')}`}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Tempurature
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{temperature} °C</span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="icon icon-shape bg-warning text-white rounded-circle shadow"
                          style={{ height: "65px", width: "65px" }}
                        >
                          <i
                            className="fa-solid fa-temperature-half"
                            style={{ fontSize: "35px" }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-2 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        
                      </span>{" "}
                      
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="4">
                <Card className={`card-stats mb-4 mb-xl-0 ${getCardClass(humidity, 'humidity')}`}>
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Humidity
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{humidity}%</span>
                      </div>
                      <Col className="col-auto">
                        <div
                          className="icon icon-shape bg-yellow text-white rounded-circle shadow"
                          style={{ height: "65px", width: "65px" }}
                        >
                          <i
                            className="fa-solid fa-droplet"
                            style={{ fontSize: "35px" }}
                          />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-2 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        
                      </span>{" "}
                      
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
