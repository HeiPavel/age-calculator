import React, {useState} from "react";
import { Form } from "../Form/Form";
import { Result } from "../Result/Result";

export const Calculator = () => {
    const [age, setAge] = useState({resDay: '- -', resMonth: '- -', resYear: '- -'});
    return (
        <div className="calculator">
            <Form setAge={setAge}/>
            <Result age={age} />
        </div>
    );
}