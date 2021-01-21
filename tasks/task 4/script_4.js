"use strict";

const minimumDeathsRank6Country = document.getElementById(
    "minimumDeathsRank6Country"
);
const belarusLeastInfectedDate = document.getElementById(
    "belarusLeastInfectedDate"
);
const belarusMostInfectedDate = document.getElementById(
    "belarusMostInfectedDate"
);

const urlSummaryCovidCases = "https://api.covid19api.com/summary";
const urlBelarusCovidDailyCases = "https://corona-api.com/countries/BY";

fetch(urlSummaryCovidCases)
    .then(function (response) {
        if (response.status !== 200) {
            console.log(
                "Looks like there was a problem. Status Code: " +
                    response.status
            );
            return;
        }

        response.json().then(function (data) {
            let minimumDeathsRank6CountryResult = getMinimumDeathsRank6Country(
                data.Countries
            );

            minimumDeathsRank6Country.innerHTML =
                minimumDeathsRank6CountryResult.Country +
                " / count of cases: " +
                minimumDeathsRank6CountryResult.TotalDeaths;
        });
    })
    .catch(function (err) {
        console.log("Fetch Error :-S", err);
    });

fetch(urlBelarusCovidDailyCases)
    .then(function (response) {
        if (response.status !== 200) {
            console.log(
                "Looks like there was a problem. Status Code: " +
                    response.status
            );
            return;
        }

        response.json().then(function (json) {
            let sortedByCountOfCasesArray = getSortedByCountOfCases(
                getCasesInPeriod(json.data.timeline)
            );

            belarusMostInfectedDate.innerHTML =
                sortedByCountOfCasesArray[0].Date +
                " / count of cases: " +
                sortedByCountOfCasesArray[0].NewConfirmed;

            belarusLeastInfectedDate.innerHTML =
                sortedByCountOfCasesArray.slice(-1)[0].Date +
                " / count of cases: " +
                sortedByCountOfCasesArray.slice(-1)[0].NewConfirmed;
        });
    })
    .catch(function (err) {
        console.log("Fetch Error :-S", err);
    });

function getMinimumDeathsRank6Country(jsObj) {
    return jsObj
        .map((element) => ({
            Country: element.Country,
            TotalDeaths: element.TotalDeaths,
        }))
        .sort(function (a, b) {
            return a.TotalDeaths - b.TotalDeaths;
        })[5];
}

function getCasesInPeriod(jsObj) {
    const start = new Date("2020-10-01").setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    return jsObj
        .map((obj) => ({
            Date: obj.date,
            NewConfirmed: obj.new_confirmed,
        }))
        .filter((item) => {
            let date = new Date(item.Date).setHours(0, 0, 0, 0);
            return date >= start && date !== today;
        });
}

function getSortedByCountOfCases(arr) {
    return arr
        .sort((a, b) => b.NewConfirmed - a.NewConfirmed)
        .filter(function (obj) {
            return obj.NewConfirmed !== 0;
        });
}
