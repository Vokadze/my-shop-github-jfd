export function validator(data, config) {
    const errors = {};
    function validate(validateMethod, data, config) {
        let statusVatidate;
        switch (validateMethod) {
            case "isRequired": {
                if (typeof data === "boolean") {
                    statusVatidate = !data;
                } else {
                    statusVatidate = data.trim() === "";
                }
                break;
            }

            case "isEmail": {
                const emailRegExp = /^\S+@\S+\.\S+$/g;
                statusVatidate = !emailRegExp.test(data);
                break;
            }

            case "isCapitalSymbol": {
                const capitalRegExp = /[A-Z]+/g;
                statusVatidate = !capitalRegExp.test(data);
                break;
            }

            case "isContainDigit": {
                const digitRegExp = /\d+/g;
                statusVatidate = !digitRegExp.test(data);
                break;
            }

            case "min": {
                statusVatidate = data.length < config.value;
                break;
            }

            default:
                break;
        }
        if (statusVatidate) return config.message;
    }
    for (const fieldName in data) {
        for (const validateMethod in config[fieldName]) {
            const error = validate(
                validateMethod,
                data[fieldName],
                config[fieldName][validateMethod]
            );
            if (error && !errors[fieldName]) {
                errors[fieldName] = error;
            }
        }
    }
    return errors;
}
