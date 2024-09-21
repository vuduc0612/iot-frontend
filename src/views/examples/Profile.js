import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const Profile = () => {
  return (
    <>
      <UserHeader />
      <Container className="mt-4" fluid>
        <Row>
          <Col className="order-xl-2 mb-0 mt-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pt-lg-4 pt-xl-4">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className=""
                          src={require("../../assets/img/theme/me2.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody className="pt-0 mt-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                  </div>
                </Row>
                <div className="text-center">
                  <div className="h5 mt-5">
                    <h3>Vu Huu Duc</h3>
                  </div>
                  <div>
                    <i className="ni education_hat mr-2" />
                    Posts and Telecommunications Institute of Technology, Ha Noi
                  </div>
                  <hr className="my-4" />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My Information</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      Settings
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Full Name
                          </label>
                          <p>Vu Huu Duc</p>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Email address
                          </label>
                          <p>vuhuuduc1206@gmail.com</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">
                            Student ID
                          </label>
                          <p>B21DCCN259</p>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label className="form-control-label">Class</label>
                          <p>D21CNPM4</p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <label className="form-control-label mr-3">
                          API docs:
                        </label>

                        <a
                          href="http://localhost:3333/api"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          http://localhost:3333/api
                        </a>
                        <br />
                        <label className="form-control-label mr-3">
                          Báo cáo:
                        </label>
                        <a
                          href="http://localhost:3333/api"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          http://surl.li/cbkpcd
                        </a>
                      </Col>

                      <Col lg="6">
                        <label className="form-control-label mr-3">
                          Github FrontEnd:
                        </label>

                        <a
                          href="https://github.com/vuduc0612/IoT"
                          target="_blank"
                          rel="noopener noreferrer"
                         
                        >
                          https://github.com/vuduc0612/iot-frontend
                        </a>
                        <br />
                        <label className="form-control-label mr-3">
                          Github BackEnd:
                        </label>
                        <a
                          href="https://github.com/vuduc0612/iot-backend"
                          target="_blank"
                          rel="noopener noreferrer"
                          
                        >
                          https://github.com/vuduc0612/iot-backend
                        </a>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Description */}
                  <h6 className="heading-small text-muted mb-4">About me</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>About Me</label>
                      <p>A beautiful Dashboard</p>
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
