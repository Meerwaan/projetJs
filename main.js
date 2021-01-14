const chalk = require('chalk');
const fs = require('fs');
const { prependOnceListener } = require('process');

// ------------------- //
//       STORY 1       //
// ------------------- //

var args = process.argv;

if (args[2] !== "-action") {
    return console.log(chalk.red("[ERROR] - Le premier argument doit toujours être \"action\"."));
}

// ------------------- //
//       STORY 2       //
// ------------------- //

if (args[3] === "transform" && args[4] === "./movies.json" && args[5] === "movies.out.json") {

    let start = new Date().getTime();

    fs.readFile(args[4], { encoding: 'utf8' }, function (err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        for (i = 0; i < dataParse.length; i++) {

            var timeStamp = dataParse[i]['release_date'] // le TimeStamp à convertir

            date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

            year = date.getFullYear();

            dataParse[i]['title'] = dataParse[i]['title'] + ` (${year})`;

        }
        fs.writeFile('./movies.out.json', JSON.stringify(dataParse, null, 2), (err) => {
            console.log(chalk.green("---------------------------------"))
            console.log(chalk.green("Données transférées avec succès !"))
            console.log(chalk.green("---------------------------------"))
            if (err) throw err;
        });

    })

    let stop = new Date().getTime();

    console.log(chalk.blue("---------------------------"))
    console.log("Temps d'exécution : " + (stop - start));
    console.log(chalk.blue("---------------------------"))
}

// ------------------- //
//       STORY 3       //
// ------------------- //

/* let start = new Date().getTime();
let stop = new Date().getTime();
console.log("Temps d'exécution : " + (stop - start)); */

// ------------------- //
//       STORY 4       //
// ------------------- //

function sort(tab) {
    var changed;
    do {
        changed = false;
        for (let i = 0; i < tab.length - 1; i++) {
            if (tab[i].release_date > tab[i + 1].release_date) {
                let tmp = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = tmp;
                changed = true;
            }
        }
    } while (changed);
}

if (args[3] === "sort_date" && args[4] === "./movies.json" && args[5] === "movies.sort.date.json") {

    let start = new Date().getTime();

    fs.readFile('./movies.json', { encoding: 'utf8' }, function (err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        for (i = 0; i < dataParse.length; i++) {

            var timeStamp = dataParse[i]['release_date'] // le TimeStamp à convertir

            date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

            year = date.getFullYear();

            dataParse[i]['title'] = dataParse[i]['title'] + ` (${year})`;

        }

        sort(dataParse)

        fs.writeFile('./movies.sort.date.json', JSON.stringify(dataParse, null, 2), (err) => {
            console.log(chalk.green("-------------------------------------------"))
            console.log(chalk.green("Données transférées et triées avec succès !"))
            console.log(chalk.green("-------------------------------------------"))
            if (err) throw err;
        });

    })

    let stop = new Date().getTime();

    console.log(chalk.blue("---------------------------"))
    console.log("Temps d'exécution : " + (stop - start));
    console.log(chalk.blue("---------------------------"))
}

// ------------------- //
//       STORY 5       //
// ------------------- //

function searchBinaire(searchItem, tab, start, end) {
    let m = start + Math.ceil((end - start) / 2);

    var timeStamp = tab[m]['release_date'] // le TimeStamp à convertir

    date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

    let year = date.getFullYear();

    tab[m].release_date = year;

    console.log(tab[m].release_date)

    console.log("m:" + m)

    if (tab[m].release_date == searchItem) {
        return tab[m];
    }
    if (tab[m].release_date > searchItem) {
        return searchBinaire(searchItem, tab, start, m - 1);
    } else {
        return searchBinaire(searchItem, tab, m + 1, end);
    }
}

if (args[3] === "search_date" && args[4] === "./movies.json" && args[5] && args[6]) {
    fs.readFile('./movies.json', { encoding: 'utf8' }, function (err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        let arrayData = [];

        if (args[6] === "true") {

            // Impossible 

        } else if (args[6] === "false") {

            let start = new Date().getTime();

            for (i = 0; i < dataParse.length; i++) {

                var timeStamp = dataParse[i]['release_date'] // le TimeStamp à convertir

                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

                year = date.getFullYear();

                dataParse[i]['release_date'] = year;

                dataParse[i]['title'] = dataParse[i]['title'] + ` (${year})`;

                if (dataParse[i]['release_date'] == args[5]) {

                    dataParse[i]['release_date'] = timeStamp;

                    arrayData.push(dataParse[i])

                }
            }

            console.log(arrayData)

            let stop = new Date().getTime();

            console.log(chalk.blue("---------------------------"))
            console.log("Temps d'exécution : " + (stop - start));
            console.log(chalk.blue("---------------------------"))
        }

    })
}

// ------------------- //
//       STORY 6       //
// ------------------- //

function sortFilm(tab) {
    var changed;
    do {
        changed = false;
        for (let i = 0; i < tab.length - 1; i++) {
            if (tab[i].release_date < tab[i + 1].release_date) {
                let tmp = tab[i];
                tab[i] = tab[i + 1];
                tab[i + 1] = tmp;
                changed = true;
            }
        }
    } while (changed);
}

if (args[3] === "search_key_word" && args[4] === "./movies.json" && args[5] && args[6]) {

    let start = new Date().getTime();

    fs.readFile('./movies.json', { encoding: 'utf8' }, function (err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        let array = [];

        for (i = 0; i < dataParse.length; i++) {

            var timeStamp = dataParse[i]['release_date'] // le TimeStamp à convertir

            date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

            year = date.getFullYear();

            dataParse[i]['title'] = dataParse[i]['title'] + ` (${year})`;

            let genresTable = dataParse[i]['genres'];

            if (typeof (genresTable) != 'undefined') {

                let stringOverviewArray = dataParse[i]['overview']

                let stringOverviewArraySplit = stringOverviewArray.split(' ');

                if (genresTable.includes(args[6]) && stringOverviewArraySplit.includes(args[5])) {
                    array.push(dataParse[i]);
                }
            }

        }

        sortFilm(array);

        if (tab.length === 0) {
            console.log(chalk.red(`[ERROR] Aucun film n'a été trouvé avec les mots clefs indiqués.`));
        } else {
            console.log(chalk.green("---------------------------------------------------------------------------"))
            console.log(chalk.green(`Le film le plus récent avec le mot clef ${args[5]} dans le genre ${args[6]} est : `));
            console.log(chalk.green("---------------------------------------------------------------------------"))
            console.log(array[1]);
        }
    })

    let stop = new Date().getTime();

    console.log(chalk.blue("---------------------------"))
    console.log("Temps d'exécution : " + (stop - start));
    console.log(chalk.blue("---------------------------"))

} else if (!args[5] || !args[6] && (args[3] === "search_key_word" && args[4] === "./movies.json")) {
    console.log(chalk.red(`[ERROR] Il manque un ou des argument(s)`)); 
}