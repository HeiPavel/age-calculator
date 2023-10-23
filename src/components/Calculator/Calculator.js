import React from "react";
import { Form } from "../Form/Form";
import { Result } from "../Result/Result";

export const Calculator = () => {
    return (
        <div className="calculator">
            <Form />
            <Result />
        </div>
    );
}