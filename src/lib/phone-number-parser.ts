const countryPrefixes = require('../../country-prefixes.json');

const DEFAULT_COUNTRY_CODE = '+49';

const demoData = [
    '07443 172295',
    '0049 174400002',
    '+49 0201 123456',
    '+44 0201123456',
    '0033 0201/123456',
    '0049201123456',
    '(0)201 1234 56',
    '+49 (941) 790-4780',
    '015115011900',
    '+91 09870987 899',
    '[+49] (0)89-800/849-50',
    '+49 (8024) [990-477]'
]


function extractCountryCode(input: string) {
    let countryCode = DEFAULT_COUNTRY_CODE;
    let startsWithCC = false;
    for (let country of countryPrefixes) {
        if (input.startsWith('00')) {
            input = input.replace('00', '+');
        }
        if (input.startsWith(country)) {
            countryCode = country;
            startsWithCC = true;
            break;
        }
    }

    const leadingZeroMatches = input.match(/^(\(0\)|0)/);
    let remaining;

    if (leadingZeroMatches) {
        leadingZeroMatches
    }

    return {
        countryCode,
        remainingNumber: startsWithCC
            ? input.slice(countryCode.length, input.length).trim()
            : input.trim().replace('0', '')
    };
}


function extractAreaPrefix(phoneNumber: string) {
    if (phoneNumber.startsWith('0')) {
        throw new Error('Invalid leading 0 for area prefix');
    }
    if (phoneNumber.startsWith('1')) {
        // Mobile phone number
        return {
            isMobile: true,
            prefix: phoneNumber.slice(0, 3),
            number: phoneNumber.slice(3, phoneNumber.length)
        }
    } else {
        // No mobile phone number

        const areaPrefixMatches = phoneNumber.match(/^([1-9][0-9]{1,4})[ |\/|-|\(]/);
        if (!areaPrefixMatches) {
            throw new Error('Could not determine area prefix, needs separator');
        }

        const prefix = areaPrefixMatches[0].trim();
        const number = phoneNumber.slice(areaPrefixMatches[0].length, phoneNumber.length).trim();

        return {
            isMobile: false,
            prefix,
            number
        }
    }
}


function extractExtension(number: string) {

}



// ###### MAIN ######
export function parseNumber(input: string) {
    const { countryCode, remainingNumber } = extractCountryCode(input);

    const { isMobile, prefix, number } = extractAreaPrefix(remainingNumber);

    return {
        countryCode,
        isMobile,
        prefix,
        number
    }
}
