import React from "react";

export const Result = () => {
    return (
        <div className="result">
            <div className="text-result">
                <p className="data" id="year-data">- -</p>
                <p className="text">years</p>
            </div>
            <div className="text-result">
                <p className="data" id="month-data">- -</p>
                <p className="text">months</p>
            </div>
            <div className="text-result">
                <p className="data" id="day-data">- -</p>
                <p className="text">days</p>
            </div>
        </div>
    );
}