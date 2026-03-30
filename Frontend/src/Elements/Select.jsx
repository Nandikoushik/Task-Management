import "./elementStyles.css";
import config from "config/config";
import { Col } from "react-bootstrap";
import { BiSolidError } from "react-icons/bi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useMemo, useState, memo, useCallback, useEffect, useRef } from "react";

const DropdownListItem = memo(
  ({ name, index, totalLength, onSelect, value, selectVal }) => {
    const handleMouseEnter = ({ target }) =>
      (target.style.backgroundColor = "#f0f0f0");
    const handleMouseLeave = ({ target }) =>
      (target.style.backgroundColor = "#fff");

    return (
      <li
        title={name}
        className="dropdown-list-item"
        onClick={() => onSelect(value)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          borderBottom: index < totalLength - 1 ? "1px solid #eee" : "none",
        }}
      >
        {name}
        {value === selectVal && (
          <span
            className="textgreen"
            style={{ position: "absolute", right: "1px" }}
          >
            ☑
          </span>
        )}
      </li>
    );
  }
);

const Select = ({
  id,
  name,
  label,
  value,
  required,
  options = [],
  placeholder,
  colSize = 12,
  type = "text",
  isError = false,
  errMessage = "",
  isBlankOpt = false,
  dataId = undefined,
  isSearchable = false,
  handleChange = () => { },
  inputClass = "input-box",
  labelClass = "input-label",
  maxLength = config.maxWordLimit,
}) => {
  const dropdownRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const toggleOptions = useCallback(() => setShowOptions((prev) => !prev), []);
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
      setIsFocused(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (isBlankOpt) setFilteredOptions([{ _id: "", name: "" }, ...options]);
    else setFilteredOptions(options);
  }, [isBlankOpt, options]);

  const handleInputChange = useCallback(
    ({ target: { value } }) => {
      if (isSearchable) {
        setSearchValue(value);
        setFilteredOptions(
          options.filter((opt) =>
            opt?.name?.toLowerCase().includes(value?.toLowerCase())
          )
        );
      }
    },
    [isSearchable, options]
  );

  const handleSelect = useCallback(selectValue => {
    setIsFocused(false);
    setShowOptions(false);
    handleChange({ target: { name, value: selectValue, dataId } });
  },
    [handleChange, name, dataId]
  );

  const handleFocus = () => {
    setSearchValue("");
    setIsFocused(true);
    setShowOptions(true);
    setFilteredOptions(options);
  };

  const selectValue = useMemo(() => options.find(opt => opt._id === value)?.name || "", [options, value]);
  const labelActive = useMemo(() => isFocused || value ? isFocused ? "label-focused label-active" : "label-focused" : "", [isFocused, value]);

  return (
    <Col xs={colSize} className="m-0 p-0">
      <div className="cust-input-wrapper" ref={dropdownRef}>
        <input
          name={name}
          type={type}
          onFocus={handleFocus}
          maxLength={maxLength}
          placeholder={placeholder}
          id={id + "_select_" + name}
          onChange={handleInputChange}
          className={`${inputClass}${isError ? " error" : ""}`}
          title={isSearchable && isFocused ? searchValue : selectValue}
          value={isSearchable && isFocused ? searchValue : selectValue}
        />

        <label className={`${labelClass} text-truncate d-block ${labelActive}`}>
          {label}{required && <span className={isFocused ? "label-focused" : ""}>*</span>}
        </label>

        <span className="box-side-icon" onClick={toggleOptions}>
          {showOptions ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
        </span>

        {showOptions && (
          <ul className="dropdown-list">
            {filteredOptions?.length > 0 ? (
              filteredOptions.map(({ _id, name }, index) => (
                <DropdownListItem
                  key={_id}
                  name={name}
                  value={_id}
                  index={index}
                  selectVal={value}
                  onSelect={handleSelect}
                  totalLength={filteredOptions.length}
                />
              ))
            ) : (
              <li className="text-center no-data-found">
                no data found
              </li>
            )}
          </ul>
        )}
        {isError && (
          <BiSolidError
            title={errMessage}
            className="errorIcon"
            style={{ right: "28px" }}
          />
        )}
      </div>
    </Col>
  );
};

export default memo(Select);