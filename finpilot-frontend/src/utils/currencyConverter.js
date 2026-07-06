export function convertToINR(amount, currency) {

    switch (currency) {

        case "USD":
            return amount * 86.0;

        case "EUR":
            return amount * 99.0;

        case "GBP":
            return amount * 116.0;

        case "JPY":
            return amount * 0.59;

        default:
            return amount;

    }

}