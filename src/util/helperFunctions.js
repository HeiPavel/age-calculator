export const inputValidityCheck = (value, max, input, setterFunction) => {
    const id = input.getAttribute('id');
    const message = id !== 'year' ? `Must be a valid ${id}` : 'Must be in the past';
    if (value) {
        if (value > max) {
            setterFunction(message);
            input.setCustomValidity("error");
        } else {
            input.setCustomValidity("");
        }
    } else {
        setterFunction('This field is required');
    }
}

export const checkIfDateIsValid = (day, month, year, inputContainer, setDayError, setMonthError, setYearError) => {
    const date = new Date(year, month - 1, day);
    if ([...inputContainer].every(container => container.querySelector('input').validity.valid) && 
        (day !== date.getDate() || month !== date.getMonth() + 1 || year !== date.getFullYear())) {
        [...inputContainer].forEach(container => container.querySelector('input').setCustomValidity("error"));
        setDayError('Must be a valid date');
        setMonthError('');
        setYearError('');
    }
}

export const isDateInPast = (day, month, year, currentDate, dayInput, monthInput, setDayError, setMonthError) => {
    if (year === currentDate.getFullYear()) {
        if (currentDate.getMonth() + 1 < month) {
            monthInput.setCustomValidity("error");
            setMonthError('Must be in the past');
        }
        if (currentDate.getMonth() + 1 === month && currentDate.getDate() < day) {
            dayInput.setCustomValidity("error");
            setDayError('Must be in the past');
        }
    }
}

export const findAge = (day, month, year) => {
    const currentDate = new Date();
    let resDay = currentDate.getDate();
    let resMonth = currentDate.getMonth() + 1;
    let resYear = currentDate.getFullYear();

    if ((resDay -= day) < 0) {
        resDay += new Date(year, month, 0).getDate();
        resMonth--;
    }

    if ((resMonth -= month) < 0) {
        resMonth += 12;
        resYear--;
    }

    resYear -= year;
    return {resDay, resMonth, resYear};
}