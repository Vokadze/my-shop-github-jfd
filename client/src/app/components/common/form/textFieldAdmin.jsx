import React from "react";
import PropTypes from "prop-types";

const TextFieldAdmin = ({ label, name, value, onChange }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="input-group mb-3">
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type="text"
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="form-control border border-warning"
                    style={{ background: "#dee2e6" }}
                    placeholder={name}
                />
            </div>
        </div>
    );
};

TextFieldAdmin.defaultProps = {
    type: "text"
};

TextFieldAdmin.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextFieldAdmin;
