import "./elementStyles.css";
import config from "config/config";
import { BiSolidError } from "react-icons/bi";
import { getOverlayview, cleanInput } from "utils/utils";
import { memo, useState, useMemo, useCallback } from "react";
import { Col, OverlayTrigger, Popover } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

const sanitizers = {
  default: cleanInput,
  number: (val) => val.replace(/[^0-9]/g, ""),
  decimal: (val) => val.replace(/[^0-9.]/g, ""),
  alphanumeric: (val) => val.replace(/[^a-zA-Z0-9]/g, ""),
};

const Input = ({
  id,
  name,
  label,
  value,
  required,
  style = {},
  colSize = 12,
  type = "text",
  prefix = null,
  dataId = null,
  infoMsg = null,
  masked = false,
  isError = false,
  errMessage = "",
  placeholder = "",
  readOnly = false,
  isRequired = null,
  handleChange = () => { },
  inputClass = "input-box",
  labelClass = "input-label",
  maxLength = config.maxWordLimit,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inpType, setInpType] = useState(masked ? "password" : type);

  const sanitizeInput = useCallback(
    (e) => {
      if (readOnly) return;
      const { value } = e.target;
      const sanitizedValue = (sanitizers[type] || sanitizers.default)(value);
      handleChange({
        ...e,
        target: { ...e.target, name, dataId, value: sanitizedValue },
      });
    },
    [readOnly, type, name, dataId, handleChange]
  );

  const toggleMasked = useCallback(() => {
    setInpType((prevType) => (prevType === "password" ? type : "password"));
  }, [type]);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const inputMode = useMemo(
    () => (type === "number" ? "numeric" : type),
    [type]
  );
  const labelActive = useMemo(
    () =>
      isFocused || value?.toString()
        ? isFocused
          ? "label-focused label-active"
          : "label-focused"
        : "",
    [isFocused, value]
  );

  return (
    <Col sm={12} xs={colSize} md={colSize} className="m-0 p-0">
      <div className="cust-input-wrapper">
        <input
          value={value}
          type={inpType}
          autoCorrect="off"
          autoComplete="off"
          spellCheck="false"
          data-lpignore="true"
          data-form-type="other"
          onBlur={handleBlur}
          maxLength={maxLength}
          inputMode={inputMode}
          onFocus={handleFocus}
          name={`input_${name}`}
          onChange={sanitizeInput}
          id={id + "_input_" + name}
          title={value?.toString() || ""}
          className={`${inputClass} ${isError ? " error" : ""}`}
          placeholder={(!label || labelActive) ? placeholder : ""}
          style={{ ...(!!prefix && { paddingLeft: "31px" }), ...style , ...(!!readOnly && { cursor: "not-allowed" })}}
        />
        {!!prefix && (
          <span
            title={prefix}
            className="prefixIcon"
            style={{ display: labelActive ? "block" : "none" }}
          >
            {prefix}
          </span>
        )}
        {!!label && <label
          className={`${labelClass} ${labelActive}`}
          htmlFor={id}
          title={label}
        >
          {label}
          {(required || isRequired) && "*"}
        </label>}

        {!!masked && (
          <span className="box-side-icon" onClick={toggleMasked}>
            {inpType === "password" ? (
              <BsFillEyeSlashFill />
            ) : (
              <BsFillEyeFill />
            )}
          </span>
        )}

        {!masked && infoMsg && (
          <span className="box-side-icon">
            <OverlayTrigger
              trigger={getOverlayview("trigger")}
              placement={getOverlayview("placement")}
              overlay={
                <Popover>
                  <Popover.Content as="div">{infoMsg}</Popover.Content>
                </Popover>
              }
            >
              <span className="winky-icon" />
            </OverlayTrigger>
          </span>
        )}

        {!!isError && (
          <BiSolidError
            title={errMessage}
            className="errorIcon"
            style={masked ? { right: "28px" } : { right: "5px" }}
          />
        )}
      </div>
    </Col>
  );
};

export default memo(Input);