//  Instead of using the fs package we will take the easy way out to load the Volcano JSON file
let volcanoes =require('./volcanoes.json');

console.table(`There are ${volcanoes.length} volcanoes in our list`);

//  this will tidy up our data. The Deaths attribute is inside of quotes
//  so JS sees it as a string. This little tweak will convert Deaths to a number
volcanoes.forEach(v => v.Deaths = +v.Deaths);

//  Volcanoes since 1980
let volcanoesSince1980 = volcanoes.filter(v => v.Year >= 1980);
console.table(volcanoesSince1980);
//  Volcanoes with more than 100 deaths
let deathsGT100 = volcanoesSince1980.filter(v => v.Deaths > 100);
console.table(deathsGT100);
//  Volcanoes since 1970 and with more than 100 deaths
deathsGT100 = volcanoes.filter(v => v.Year >= 1970 && v.Deaths > 100);
console.table(deathsGT100);

//  get a list of all Volcano names in Indonesia since 2014
let names = volcanoes.filter(v => v.Country = "Indonesia" && v.Year > 2014).map(v => v.Name);
console.table(names);

//  count total deaths from volcanoes
let deaths = volcanoes.reduce((total, v) => total + v.Deaths, 0);
console.table(`number of deaths ${deaths}`);

let aveDeaths = deaths / volcanoes.length;
console.table(`average # of deaths ${aveDeaths.toFixed(0)}`);

//  what if we stacked ALL volcanoes on top of each other. How high would they reach?
let elevationTot = volcanoes.reduce((total, v) => total + v.Elevation, 0);
let aveElevation = elevationTot / volcanoes.length;
console.table(`Total Elevation of all volcanoes ${aveElevation.toFixed(0)}`);
