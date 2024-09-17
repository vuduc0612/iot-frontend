import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const pageLimit = 5; // Số lượng trang muốn hiển thị (bao gồm trang hiện tại)

  // Hàm xử lý khi trang thay đổi
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Hàm để tạo các nút trang
  const renderPagination = () => {
    const pages = [];
    let startPage, endPage;

    if (totalPages <= pageLimit) {
      // Nếu tổng số trang ít hơn hoặc bằng pageLimit, hiển thị tất cả
      startPage = 1;
      endPage = totalPages;
    } else {
      // Tính toán startPage và endPage
      const leftOffset = Math.floor(pageLimit / 2);
      const rightOffset = pageLimit - leftOffset - 1;

      if (currentPage <= leftOffset) {
        startPage = 1;
        endPage = pageLimit;
      } else if (currentPage + rightOffset >= totalPages) {
        startPage = totalPages - pageLimit + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - leftOffset;
        endPage = currentPage + rightOffset;
      }
    }

    // Thêm nút "Trang đầu" nếu cần
    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1} onClick={() => handlePageChange(1)}>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(<PaginationItem className='align-items-center' key="dots1" disabled><PaginationLink href="#">...</PaginationLink></PaginationItem>);
      }
    }

    // Hiển thị các trang
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink href= "#" onClick={() => handlePageChange(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Thêm nút "Trang cuối" nếu cần
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PaginationItem key="dost2" disabled><PaginationLink href="#">...</PaginationLink></PaginationItem>);
      }
      pages.push(
        <PaginationItem key={totalPages} onClick={() => handlePageChange(totalPages)}>
          <PaginationLink href="#">{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination className="pagination justify-content-end mt-3 mb-0 pb-0">
      <PaginationItem disabled={currentPage === 1}>
        <PaginationLink previous href="#" onClick={() => handlePageChange(currentPage - 1)} />
      </PaginationItem>
      {renderPagination()}
      <PaginationItem disabled={currentPage === totalPages}>
        <PaginationLink next href="#" onClick={() => handlePageChange(currentPage + 1)} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationComponent;