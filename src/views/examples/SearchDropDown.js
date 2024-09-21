import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const SearchDropdown = ({ searchOptions, selectedOption, setSelectedOption }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <Dropdown className="ml-2 mr-0" isOpen={dropdownOpen} toggle={toggleDropdown}>
      <DropdownToggle caret color="primary">
      {selectedOption ? selectedOption.label : "Select Search Type"}
      </DropdownToggle>
      <DropdownMenu>
        {searchOptions.map((option, index) => (
          <DropdownItem
            key={index}
            onClick={() => {
              console.log(option);
              setSelectedOption(option);
            }}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default SearchDropdown;
