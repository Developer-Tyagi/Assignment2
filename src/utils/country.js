import countryRegionData from "country-region-data";


export const countries = countryRegionData.map((item) => ({
    name: item.countryName,
    code: item.countryShortCode,
}));

export const getStates = (code) =>
    countryRegionData.filter((item) => item.countryShortCode === code)[0][
    "regions"
    ];