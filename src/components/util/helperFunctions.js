export const inputValidityCheck = (value, max, input, setterFunction) => {
    if (value) {
        if (value > max) {
            setterFunction('Must be a valid day');
            input.setCustomValidity("error");
        } else {
            input.setCustomValidity("");
        }
    } else {
        setterFunction('This field is required');
    }
}