import countryRegionData from "country-region-data";

export default class AddressService {

    getCountries() {
        return countryRegionData.map((item) => item.countryName)
    }

    getStates(country) {
        return countryRegionData.filter((item) => item.countryName === country)[0]["regions"].map((item) => item.name);
    }
}