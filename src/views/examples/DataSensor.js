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
import SearchDropdown from "./SearchDropDown";
import format from "date-fns/format";
import { BASE_URL_API } from "constants";

const DataSensor = () => {
  const [sensors, setSensors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState("updatedAt");
  const [order, setOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchType, setSelectedSearchType] = useState("");
  const [isClickSearch, setClickSearch] = useState(false); // Giả sử bạn có biến check trong state

  const searchOptions = [
    { label: "Temperature", value: "Temperature" },
    { label: "Humidity", value: "Humidity" },
    { label: "Light", value: "Light" },
    { label: "Update At", value: "UpdatedAt" },
  ];

  const fetchData = (
    sortKey = "",
    order = "",
    page = 1,
    limit = 11,
    searchQuery = "",
    selectedSearchType = ""
  ) => {
    let apiUrl = `${BASE_URL_API}/api/sensor/data?page=${page}&limit=${limit}`;
    if (sortKey && order) {
      setSortKey(sortKey);
      setOrder(order);
      apiUrl += `&sortKey=${sortKey}&order=${order}`;
    }
    if (searchQuery && selectedSearchType) {
      apiUrl += `&searchQuery=${searchQuery}&selectedSearchType=${selectedSearchType}`;
      setSearchQuery(searchQuery);
      setSelectedSearchType(selectedSearchType);
    }
    //console.log(apiUrl);
    fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setSensors(data.data);
        setTotalPages(data.totalPages); // Cập nhật số trang tổng
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
   // console.log("API call");
    fetchData(sortKey, order, currentPage, 12, searchQuery, selectedSearchType);
  }, [sortKey, order, currentPage, searchQuery]);

  //console.log("hello");
  //console.log(sensors);
  return (
    <>
      <Container className="mt-0" fluid>
        <AdminNavbar brandText="Data Sensor" />
        <Row>
          <div className="col">
            <Card className="shadow pt-4">
              <CardHeader className="border-0 pt-5 pb-4">
                <Form className="navbar-search navbar-search-white form-inline  d-none d-md-flex ml-lg-4">
                  {isClickSearch && (
                    <SearchDropdown
                      searchOptions={searchOptions}
                      selectedOption={selectedSearchType}
                      setSelectedOption={setSelectedSearchType}
                    />
                  )}

                  <FormGroup className="mb-0 ml-2">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fas fa-search" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          //console.log(e.target.value);
                        }}
                        onClick={() => setClickSearch(true)}
                      />
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
                      {/* <SortDropdown sortKey="id" fetchData={fetchData} /> */}
                    </th>
                    <th
                      scope="col"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      Temperature
                      <SortDropdown
                        sortKey="temperature"
                        fetchData={fetchData}
                      />
                    </th>
                    <th
                      scope="col"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      Humidity
                      <SortDropdown sortKey="humidity" fetchData={fetchData} />
                    </th>
                    <th
                      scope="col"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      Light
                      <SortDropdown sortKey="light" fetchData={fetchData} />
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
                  {sensors.map((sensor, idx) => (
                    <tr key={sensor.id}>
                      <th scope="row" style={{ textAlign: "center" }}>
                        {sensor.id}
                      </th>
                      <td>{sensor.temperature}</td>
                      <td style={{ textAlign: "center" }}>{sensor.humidity}</td>
                      <td style={{ textAlign: "center" }}>{sensor.light}</td>
                      <td style={{ textAlign: "center" }}>
                        {format(new Date(sensor.updatedAt), "HH:mm:ss dd/MM/yyyy")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CardFooter className="py-2">
                <PaginationComponent
                  className="pagination justify-content-end mb-0"
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

export default DataSensor;
