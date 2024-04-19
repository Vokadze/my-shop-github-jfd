import React from "react";
import PropTypes from "prop-types";
import AdminForm from "./adminForm";
import history from "../../../utils/history";

const AdminProductEdit = ({
    onSubmit,
    prodId,
    nanoId,
    product,
    categoriesList
}) => {
    const handleSubmit = (data) => {
        onSubmit(data);
        history.push("/admin");
    };

    return (
        <>
            <AdminForm
                onSubmit={handleSubmit}
                key={prodId || nanoId}
                data={product}
                categoriesList={categoriesList}
            />
        </>
    );
};

AdminProductEdit.propTypes = {
    onSubmit: PropTypes.func,
    prodId: PropTypes.string,
    nanoId: PropTypes.string,
    product: PropTypes.object,
    categoriesList: PropTypes.array
};

export default AdminProductEdit;
