import React from "react";
import useMockData from "../utils/mockData";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../store/users";

const Main = () => {
    const currentUser = useSelector(getCurrentUserData());
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };
    return (
        <div className="container mt-5">
            {currentUser ? (
                <>
                    <h1>Main Page</h1>
                    <h3>Инициализация данных в FireBase</h3>
                    <ul>
                        <li>Status: {status}</li>
                        <li>Progress: {progress}%</li>
                        {error && <li>Error: {error}</li>}
                    </ul>
                    <button className="btn btn-primary" onClick={handleClick}>
                        Инициализировать
                    </button>
                </>
            ) : (
                <h1 className="text-center">
                    Дипломная работа Интернет-магазин
                </h1>
            )}
        </div>
    );
};

export default Main;
