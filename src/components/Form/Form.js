import React, {useState, useEffect} from "react";
import arrowIcon from "../../images/icon-arrow.svg";

export const Form = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [dayError, setDayError] = useState('');
    const [monthError, setMonthError] = useState('');
    const [yearError, setYearError] = useState('');
    const [checkValidity, setCheckValidity] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        const id = event.target.getAttribute('id');
        const {value} = event.target;
        let input = value;
        input = input.replace(/[^0-9]/g, '');
        if (id !== 'year' && input > 0 && input < 10 && !input.startsWith('0')) input = '0' + input;
        if (id !== 'year' && input >= 10) {
            input = input.replace(/^0+(?=[1-9])/g, '');
        } else {
            if (id === 'year') input = input.replace(/^0+(?=[1-9])/g, '');
            if (id !== 'year' && input < 10) input = input.replace(/(?<=^0)0+(?=[1-9])/g, '');
        }
        if (id === 'day') setDay(Number(input) ? input : '');
        if (id === 'month') setMonth(Number(input) ? input : '');
        if (id === 'year') setYear(Number(input) ? input : '');
        setCheckValidity(true);
    }

    useEffect(() => {
        const inputContainer = document.getElementsByClassName('input-container');
        const dayInput = document.getElementById('day');
        const monthInput = document.getElementById('month');
        const yearInput = document.getElementById('year');
        const currentDate = new Date();
        if (checkValidity) {
            if (day) {
                if (day > 31) {
                    setDayError('Must be a valid day');
                    dayInput.setCustomValidity("error");
                } else {
                    dayInput.setCustomValidity("");
                }
            } else {
                setDayError('This field is required');
            }
    
            if (month) {
                if (month > 12) {
                    setMonthError('Must be a valid month');
                    monthInput.setCustomValidity("error");
                } else {
                    monthInput.setCustomValidity("");
                }
            } else {
                setMonthError('This field is required');
            }
    
            if (year) {
                if (year > currentDate.getFullYear()) {
                    setYearError('Must be in the past');
                    yearInput.setCustomValidity("error");
                } else {
                    yearInput.setCustomValidity("");
                }
            } else {
                setYearError('This field is required');
            }
    
            for (const container of inputContainer) {
                if (!container.querySelector('input').validity.valid) {
                    container.classList.add('invalid');
                } else {
                    container.classList.remove('invalid');
                }
            }
        }
    }, [day, month, year, checkValidity]);

    return (
        <form noValidate>
            <div className="inputs-container">
                <div className="input-container">
                    <label htmlFor="day">DAY</label>
                    <input type="text" name="day" id="day" placeholder="DD" required value={day} onChange={handleChange} />
                    <span className="error">{dayError}</span>
                </div>
                <div className="input-container">
                    <label htmlFor="month">MONTH</label>
                    <input type="text" name="month" id="month" placeholder="MM" required value={month} onChange={handleChange} />
                    <span className="error">{monthError}</span>
                </div>
                <div className="input-container">
                    <label htmlFor="year">YEAR</label>
                    <input type="text" name="year" id="year" placeholder="YYYY" required value={year} onChange={handleChange} />
                    <span className="error">{yearError}</span>
                </div>
            </div>
            <button type="submit">
                <img src={arrowIcon} alt="arrow" />
            </button>
    </form>
    );
}