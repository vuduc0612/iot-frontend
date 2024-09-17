import AdminNavbar from "components/Navbars/AdminNavbar";

import {
  Card,
  CardHeader,
  Container,
  Row,
  Form,
  Table,
  CardFooter,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import { useEffect, useState } from "react";
import SortDropdown from "./SortDropDown";
import PaginationComponent from "./PaginationComponent";
import { BASE_URL_API } from "constants";

const Device = () => {
  const [leds, setLeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState("updatedAt");
  const [order, setOrder] = useState("desc");

  const fetchData = (sortKey = "", order = "", page = 1, limit = 12) => {
    let apiUrl = `${BASE_URL_API}/api/led/log?page=${page}&limit=${limit}`;
    if (sortKey && order) {
      setSortKey(sortKey);
      setOrder(order);
      apiUrl += `&sortKey=${sortKey}&order=${order}`;
    }

    fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setLeds(data.data);
        setTotalPages(data.totalPages); // Cập nhật số trang tổng
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(sortKey, order, currentPage); // Gọi lại API khi trang thay đổi
  }, [sortKey, order, currentPage]);

  console.log("hello");
  console.log(leds);
  return (
    <>
      <Container className="mt-0" fluid>
        <AdminNavbar brandText="Data Led" />
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow pt-4">
              <CardHeader className="border-0 pt-6 pb-4">
                <Form className="navbar-search navbar-search-white form-inline  d-none d-md-flex ml-lg-4">
                  <FormGroup className="mb-0">
                    <InputGroup className="input-group-alternative ">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Search" type="text" />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th
                      scope="col"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      ID
                      <SortDropdown sortKey="id" fetchData={fetchData} />
                    </th>
                    <th
                      scope="col"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      Name
                      <SortDropdown sortKey="name" fetchData={fetchData} />
                    </th>
                    <th
                      scope="col"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      Status
                      <SortDropdown sortKey="status" fetchData={fetchData} />
                    </th>
                    <th
                      scope="col"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      Update At
                      <SortDropdown sortKey="updatedAt" fetchData={fetchData} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leds.map((led) => (
                    <tr key={led.id}>
                      <th scope="row" style={{ textAlign: "center" }}>
                        {led.id}
                      </th>

                      <td style={{ textAlign: "center" }}>{led.name}</td>
                      <td style={{ textAlign: "center" }}>
                        {led.status ? "ON" : "OFF"}
                      </td>
                      <td style={{ textAlign: "center" }}>{led.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-2">
                <PaginationComponent
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Device;
