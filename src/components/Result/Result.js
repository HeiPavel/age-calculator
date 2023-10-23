import React from "react";

export const Result = ({age}) => {
    const {resDay, resMonth, resYear} = age;
    return (
        <div className="result">
            <div className="text-result">
                <p className="data" id="year-data">{resYear}</p>
                <p className="text">years</p>
            </div>
            <div className="text-result">
                <p className="data" id="month-data">{resMonth}</p>
                <p className="text">months</p>
            </div>
            <div className="text-result">
                <p className="data" id="day-data">{resDay}</p>
                <p className="text">days</p>
            </div>
        </div>
    );
}