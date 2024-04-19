import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ type, name, placeholder, onChange, value }) => {
    return (
        <div className="d-flex flex-column mb-2 px-0">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                className="text-center border border-warning"
                onChange={onChange}
                value={value}
                style={{ background: "#dee2e6" }}
            />
        </div>
    );
};

SearchInput.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default SearchInput;
