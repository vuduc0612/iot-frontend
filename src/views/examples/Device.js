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
} from "reactstrap";
import { useEffect, useState } from "react";
import SortDropdown from "./SortDropDown";
import PaginationComponent from "./PaginationComponent";
import { BASE_URL_API } from "constants";
import { format } from "date-fns/format";
import SearchDropdown from "./SearchDropDown";

const Device = () => {
  const searchOptions = [
    { label: "Name", value: "name" },
    { label: "Action", value: "status" },
    { label: "Time", value: "updatedAt" },
  ];

  const [leds, setLeds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortKey, setSortKey] = useState("updatedAt");
  const [order, setOrder] = useState("desc");
  const [selectedSearchType, setSelectedSearchType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClickSearch, setClickSearch] = useState(false);
  const [pageLimit, setPageLimit] = useState(12);
  const [error, setError] = useState(null);

  const fetchData = async (
    sortKey = "",
    order = "",
    page = 1,
    pageLimit = 12,
    selectedSearchType,
    searchQuery
  ) => {
    try {
      let apiUrl = `${BASE_URL_API}/api/led/log?page=${page}&limit=${pageLimit}`;
      if (sortKey && order) {
        setSortKey(sortKey);
        setOrder(order);
        apiUrl += `&sortKey=${sortKey}&order=${order}`;
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
      else if(searchQuery){
        apiUrl += `&searchQuery=${encodeURIComponent(searchQuery)}`;
      }
      console.log("API URL: ", apiUrl);
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setLeds(data.data);
      setTotalPages(data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Vui lòng nhập đúng định dạng dữ liệu tìm kiếm");
    }
  };

  useEffect(() => {
    fetchData(
      sortKey,
      order,
      currentPage,
      pageLimit,
      selectedSearchType,
      searchQuery
    ); // Gọi lại API khi trang thay đổi
  }, [sortKey, order, currentPage, pageLimit, selectedSearchType, searchQuery]);

  const handleChangeSearchType = (selectedOption) => {
    setSelectedSearchType(selectedOption);
    setSearchQuery("");
  };

  return (
    <>
      <AdminNavbar brandText="Data Led" />
      <Container className="mt-0" fluid>
        {/* Table */}
        <Row className="mt-0">
          <div className="col">
            <Card className="shadow pt-5">
              <CardHeader className="border-0 pt-5 pb-4">
                <Form className="navbar-search navbar-search-white form-inline  d-none d-md-flex ml-lg-4">
                  {isClickSearch && (
                    <SearchDropdown
                      searchOptions={searchOptions}
                      selectedOption={selectedSearchType}
                      setSelectedOption={handleChangeSearchType}
                    />
                  )}
                  <FormGroup className="mb-0">
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
                      <InputGroup className="input-group-alternative ">
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
                      Action
                      <SortDropdown sortKey="status" fetchData={fetchData} />
                    </th>
                    <th
                      scope="col"
                      style={{ fontSize: "0.8rem", textAlign: "center" }}
                    >
                      Time On/Off
                      <SortDropdown sortKey="updatedAt" fetchData={fetchData} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leds.length > 0 ? (
                    leds.map((led) => (
                      <tr key={led.id}>
                        <th scope="row" style={{ textAlign: "center" }}>
                          {led.id}
                        </th>

                        <td style={{ textAlign: "center" }}>{led.name}</td>
                        <td style={{ textAlign: "center" }}>
                          {led.status ? "ON" : "OFF"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {format(
                            new Date(led.updatedAt),
                            "HH:mm:ss dd/MM/yyyy"
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: "center" }}>
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

export default Device;
