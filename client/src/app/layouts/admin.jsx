import React from "react";
import { useParams } from "react-router-dom";

import AdminPageList from "../components/page/adminPageList/adminPageList";
import AdminProduct from "../components/ui/adminPageUi/adminProduct";

const Admin = () => {
    const params = useParams();
    const { prodId, edit } = params;

    return (
        <>
            {prodId ? (
                edit ? (
                    <AdminPageList prodId={prodId} />
                ) : (
                    <AdminProduct prodId={prodId} />
                )
            ) : (
                <AdminPageList />
            )}
        </>
    );
};

export default Admin;
