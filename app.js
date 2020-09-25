// const data = require('./data');
const data = require('./data.json');
var fs = require('fs');

// kraje, seznam okresu
const kraje = data.reduce((accumulator, current) => {
    let added = false;

    accumulator.forEach(x => {
        if (current.Kraj === x.kraj) {
            x.okresy.push(current.Okres);
            added = true;
        }

    });
    // if accumator is empty
    if (accumulator.length === 0 || !added) {
        accumulator.push({
            kraj: current.Kraj,
            okresy: [ current.Okres ]
        });
    }

    return accumulator;
}, []);

fs.writeFile('kraje.txt', JSON.stringify(kraje), function (err) {
    if (err) throw err;
    console.log('Kraje saved!');
});

fs.writeFile('krajeReadable.txt', JSON.stringify(kraje, null, 2), function (err) {
    if (err) throw err;
    console.log('Kraje readbale saved!');
});

// okresy, seznam obci, psc
const okresy = data.reduce((accumulator, current) => {
    let added = false;

    accumulator.forEach(x => {
        if (current.Okres === x.okres) {
            x.obce.push({
                nazev: current.Obec,
                psc: current.PSČ,
                sirka: current.Latitude,
                delka: current.Longitude
            });
            added = true;
        }
    });
    // if accumator is empty
    if (accumulator.length === 0 || !added) {
        accumulator.push({
            okres: current.Okres,
            obce: [ {
                nazev: current.Obec,
                psc: current.PSČ,
                sirka: current.Latitude,
                delka: current.Longitude
            } ]
        });
    }

    return accumulator;
}, []);

fs.writeFile('okresy.txt', JSON.stringify(okresy), function (err) {
    if (err) throw err;
    console.log('Okresy saved!');
});

fs.writeFile('okresyReadable.txt', JSON.stringify(okresy, null, 2), function (err) {
    if (err) throw err;
    console.log('Okresy readable saved!');
});