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
  Col,
  Button,
} from "reactstrap";
import { useEffect, useState } from "react";
import SortDropdown from "./SortDropDown";
import PaginationComponent from "./PaginationComponent";
import SearchDropdown from "./SearchDropDown";
import format from "date-fns/format";
import "react-datetime/css/react-datetime.css";

import { BASE_URL_API } from "constants";

const DataSensor = () => {
  const [sensors, setSensors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState("");
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSearchType, setSelectedSearchType] = useState(null);
  const [pageLimit, setPageLimit] = useState(12);

  const [isClickSearch, setClickSearch] = useState(false);
  const [error, setError] = useState(null);

  // Các tùy chọn tìm kiếm
  const searchOptions = [
    { label: "Temperature", value: "temperature" },
    { label: "Humidity", value: "humidity" },
    { label: "Light", value: "light" },
    { label: "Time", value: "updatedAt" },
  ];
  const fetchData = async (
    sortKey = "",
    order = "",
    page = 1,
    pageLimit = 12,
    searchQuery = "",
    selectedSearchType = ""
  ) => {
    try {
      let apiUrl = `${BASE_URL_API}/api/sensor/data?page=${page}&limit=${pageLimit}`;

      if (sortKey && order) {
        apiUrl += `&sortKey=${sortKey}&order=${order}`;
        setSortKey(sortKey);
        setOrder(order);
      }

      if (selectedSearchType) {
        console.log("Type: ", selectedSearchType.value);
        apiUrl += `&selectedSearchType=${selectedSearchType.value}`;
        if (selectedSearchType.value === "updatedAt" && searchQuery) {
          apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
        } else if (searchQuery) {
          apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
        }
      }
      console.log(apiUrl);

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSensors(data.data);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Vui lòng nhập đúng định dạng dữ liệu tìm kiếm");
    }
  };

  useEffect(() => {
    console.log("API call");
    fetchData(
      sortKey,
      order,
      currentPage,
      pageLimit,
      searchQuery,
      selectedSearchType
    );
  }, [sortKey, order, currentPage, pageLimit, selectedSearchType, searchQuery]);

  const handleChangeSearchType = (selectedOption) => {
    setSelectedSearchType(selectedOption);
    setSearchQuery("");
  };

  return (
    <>
      <Container className="mt-0" fluid>
        <AdminNavbar brandText="Data Sensor" />
        <Row>
          <div className="col">
            <Card className="shadow pt-5">
              <CardHeader className="border-0 pt-5 pb-4">
                <Form className="navbar-search navbar-search-white form-inline d-none d-md-flex ml-lg-4">
                  {/* Dropdown chọn loại tìm kiếm */}
                  {isClickSearch && (
                    <SearchDropdown
                      searchOptions={searchOptions}
                      selectedOption={selectedSearchType}
                      setSelectedOption={handleChangeSearchType}
                    />
                  )}

                  <FormGroup className="mb-0 ml-2">
                    {selectedSearchType &&
                    selectedSearchType.value === "updatedAt" ? (
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="HH:mm:ss dd/MM/YYYY"
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onClick={() => setClickSearch(true)}
                        />
                      </InputGroup>
                    ) : (
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder={
                            selectedSearchType
                              ? `Search by ${selectedSearchType.value}`
                              : "Search"
                          }
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onClick={() => setClickSearch(true)}
                        />
                      </InputGroup>
                    )}
                  </FormGroup>
                </Form>

                {/* Hiển thị lỗi nếu có */}
                {error && (
                  <div className="error-message text-danger mt-2">{error}</div>
                )}
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
                  {sensors.length > 0 ? (
                    sensors.map((sensor) => (
                      <tr key={sensor.id}>
                        <th scope="row" style={{ textAlign: "center" }}>
                          {sensor.id}
                        </th>
                        <td>{sensor.temperature}</td>
                        <td style={{ textAlign: "center" }}>
                          {sensor.humidity}
                        </td>
                        <td style={{ textAlign: "center" }}>{sensor.light}</td>
                        <td style={{ textAlign: "center" }}>
                          {format(
                            new Date(sensor.updatedAt),
                            "HH:mm:ss dd/MM/yyyy"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center"}}>
                        <h4>Không tìm thấy kết quả</h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <CardFooter className="py-2">
                <Row className="align-items-center">
                  <Col xs="1" className="ml-5">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend"></InputGroupAddon>
                      <Input
                        type="number"
                        min="1"
                        max="100"
                        value={pageLimit}
                        style={{ textAlign: "center" }} 
                        onChange={(e) =>
                          setPageLimit(
                            Math.min(Math.max(e.target.value, 1), 100)
                          )
                        } 
                        className="custom-number-input"
                      />
                    </InputGroup>
                  </Col>
                  <Col xs="4" className="d-flex justify-content-center"></Col>
                  <Col xs="6" className="d-flex justify-content-end">
                    <PaginationComponent
                      className="pagination justify-content-end mb-0"
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </Col>
                </Row>
                <style jsx>{`
                  .custom-number-input::-webkit-inner-spin-button,
                  .custom-number-input::-webkit-outer-spin-button {
                    opacity: 1; // Làm cho nút mũi tên luôn hiển thị
                    cursor: pointer; // Đổi con trỏ khi hover
                  }
                  .custom-number-input {
                    width: 100px; // Kích thước ô nhập, có thể điều chỉnh theo ý
                  }
                `}</style>
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DataSensor;
