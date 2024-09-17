
import { Button, Container, Row, Col } from "reactstrap";

const UserHeader = () => {
  return (
    <>
      
      
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
     
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              
              
              <Button
                color="info"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container>
      
    </>
  );
};

export default UserHeader;
