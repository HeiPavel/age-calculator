import React, {useState, useEffect} from "react";
import arrowIcon from "../../images/icon-arrow.svg";
import { inputValidityCheck, checkIfDateIsValid, isDateInPast, findAge } from "../../util/helperFunctions";

export const Form = ({setAge}) => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [dayError, setDayError] = useState('');
    const [monthError, setMonthError] = useState('');
    const [yearError, setYearError] = useState('');
    const [checkValidity, setCheckValidity] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        const {value} = event.target;
        let input = value;
        input = input.replace(/[^0-9]/g, '');
        if (input.length > 1 && !Number(input)) input = '0';
        if (id !== 'year' && input >= 10) {
            input = input.replace(/^0+(?=[1-9])/g, '');
            if (input.length > 2) input = input.slice(0,2);
        } else {
            if (id !== 'year' && input < 10) input = input.replace(/(?<=^0)0+(?=[0-9])/g, '');
            if (id === 'year') input = input.replace(/^0/g, '');
        }
        if (id === 'day') setDay(input);
        if (id === 'month') setMonth(input);
        if (id === 'year') setYear(input);
        setCheckValidity(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!day || !month || !year) {
            setCheckValidity(true);
        } else {
            isValid ? setAge(findAge(day, month, year)) : setAge({resDay: '- -', resMonth: '- -', resYear: '- -'});
        }
    }

    useEffect(() => {
        const inputContainer = document.getElementsByClassName('input-container');
        const dayInput = document.getElementById('day');
        const monthInput = document.getElementById('month');
        const yearInput = document.getElementById('year');
        const currentDate = new Date();
        if (checkValidity) {
            inputValidityCheck(day, 31, dayInput, setDayError);
            inputValidityCheck(month, 12, monthInput, setMonthError);
            inputValidityCheck(year, currentDate.getFullYear(), yearInput, setYearError);

            if (day && month && year) {
                checkIfDateIsValid(Number(day), Number(month), Number(year), inputContainer, setDayError, setMonthError, setYearError);
                isDateInPast(Number(day), Number(month), Number(year), currentDate, dayInput, monthInput, setDayError, setMonthError);
            }
                
            for (const container of inputContainer) {
                !container.querySelector('input').validity.valid ? container.classList.add('invalid') : container.classList.remove('invalid');
            }
            [...inputContainer].every(container => container.querySelector('input').validity.valid) ? setIsValid(true) : setIsValid(false);
        }
    }, [day, month, year, checkValidity]);

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="inputs-container">
                <div className="input-container">
                    <label htmlFor="day">DAY</label>
                    <input type="text" name="day" id="day" placeholder="DD" required autoComplete="off" value={day} onChange={handleChange} />
                    <span className="error">{dayError}</span>
                </div>
                <div className="input-container">
                    <label htmlFor="month">MONTH</label>
                    <input type="text" name="month" id="month" placeholder="MM" required autoComplete="off" value={month} onChange={handleChange} />
                    <span className="error">{monthError}</span>
                </div>
                <div className="input-container">
                    <label htmlFor="year">YEAR</label>
                    <input type="text" name="year" id="year" placeholder="YYYY" required autoComplete="off" value={year} onChange={handleChange} />
                    <span className="error">{yearError}</span>
                </div>
            </div>
            <button type="submit">
                <img src={arrowIcon} alt="arrow" />
            </button>
    </form>
    );
}