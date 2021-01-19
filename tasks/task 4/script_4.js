"use strict";

var minimumDeathsRank6Country = document.getElementById(
    "minimumDeathsRank6Country"
);
var belarusLeastInfectedDate = document.getElementById(
    "belarusLeastInfectedDate"
);
var belarusMostInfectedDate = document.getElementById(
    "belarusMostInfectedDate"
);

var urlSummaryCovidCases = "https://api.covid19api.com/summary";

var urlBelarusCovidDailyCases = "https://corona-api.com/countries/BY";

var jsonResponse;
var minimumDeathsRank6CountryResult;

fetch(urlSummaryCovidCases)
    .then(function (response) {
        if (response.status !== 200) {
            console.log(
                "Looks like there was a problem. Status Code: " +
                    response.status
            );
            return;
        }

        // Examine the text in the response
        response.json().then(function (data) {
            minimumDeathsRank6CountryResult = getMinimumDeathsRank6Country(
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

        // Examine the text in the response
        response.json().then(function (json) {
            let belarusCovidDailyCasesInPeriod = getCasesInPeriod(
                json.data.timeline
            );

            var sortedByCountOfCasesArray = getSortedByCountOfCases(
                belarusCovidDailyCasesInPeriod
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
    let sortedArray = [];

    for (var i in jsObj) {
        let el = { Country: "", TotalDeaths: "" };
        // Push each JSON Object entry in array
        el.Country = jsObj[i].Country;
        el.TotalDeaths = jsObj[i].TotalDeaths;

        sortedArray.push(el);
    }

    sortedArray.sort(function (a, b) {
        return a.TotalDeaths - b.TotalDeaths;
    });
    console.log(sortedArray);

    return sortedArray[5];
}

function getCasesInPeriod(jsObj) {
    let arrayInPeriod = [];
    let today = new Date().setHours(0, 0, 0, 0);

    for (var i in jsObj) {
        if (
            new Date(jsObj[i].date) >= new Date("2020-10-01") &&
            new Date(jsObj[i].date).setHours(0, 0, 0, 0) !== today // в API какой-то статистический выброс за последний день
        ) {
            let el = { Date: "", NewConfirmed: "" };
            el.Date = jsObj[i].date;
            el.NewConfirmed = jsObj[i].new_confirmed;
            arrayInPeriod.push(el);
        }
    }

    return arrayInPeriod;
}

function getSortedByCountOfCases(arr) {
    return arr
        .sort((a, b) => b.NewConfirmed - a.NewConfirmed)
        .filter(function (obj) {
            return obj.NewConfirmed !== 0;
        });
}
