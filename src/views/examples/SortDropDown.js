import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort } from '@fortawesome/free-solid-svg-icons';

const SortDropdown = ({ sortKey, fetchData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Gửi yêu cầu sắp xếp đến backend
  const handleSort = (order) => {
    fetchData(sortKey, order);
  };

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="d-inline">
      <DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={dropdownOpen}>
        <FontAwesomeIcon className="ml-1" icon={faSort} />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => handleSort('asc')}>Tăng dần</DropdownItem>
        <DropdownItem onClick={() => handleSort('desc')}>Giảm dần</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortDropdown;