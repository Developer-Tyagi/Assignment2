import countryRegionData from "country-region-data";


// export const countries = countryRegionData.map((item) => ({
//     name: item.countryName,
//     code: item.countryShortCode,
// }));

// export const getStates = (code) =>
//     countryRegionData.filter((item) => item.countryShortCode === code)[0][
//     "regions"
//     ];

export default class AddressService {

    getCountries() {
        return countryRegionData.map((item) => item.countryName)
    }

    getStates(country) {
        return countryRegionData.filter((item) => item.countryName === country)[0]["regions"].map((item) => item.name);
    }
}