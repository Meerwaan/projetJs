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
    fs.readFile(args[4], { encoding: 'utf8' }, function (err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        for (i = 0; i < dataParse.length; i++) {

            var timeStamp = dataParse[i]['release_date'] // le TimeStamp à convertir

            date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

            annee = date.getFullYear();

            dataParse[i]['title'] = dataParse[i]['title'] + ` (${annee})`;

        }
        fs.writeFile('./movies.out.json', JSON.stringify(dataParse, null, 2), (err) => {
            console.log(chalk.green("---------------------------------"))
            console.log(chalk.green("Données transférées avec succès !"))
            console.log(chalk.green("---------------------------------"))
            if (err) throw err;
        });

    })
}

// ------------------- //
//       STORY 3       //
// ------------------- //

console.log(chalk.blue("---------------------------"))

console.time(chalk.blue("Temps d'exécution"))

console.timeEnd(chalk.blue("Temps d'exécution"))

console.log(chalk.blue("---------------------------"))

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
    fs.readFile('./movies.json', { encoding: 'utf8' }, function (err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        for (i = 0; i < dataParse.length; i++) {

            var timeStamp = dataParse[i]['release_date'] // le TimeStamp à convertir

            date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

            annee = date.getFullYear();

            dataParse[i]['title'] = dataParse[i]['title'] + ` (${annee})`;

        }

        sort(dataParse)

        fs.writeFile('./movies.sort.date.json', JSON.stringify(dataParse, null, 2), (err) => {
            console.log(chalk.green("-------------------------------------------"))
            console.log(chalk.green("Données transférées et triées avec succès !"))
            console.log(chalk.green("-------------------------------------------"))
            if (err) throw err;
        });

    })
}

// ------------------- //
//       STORY 5       //
// ------------------- //

// ------------------- //
//       STORY 6       //
// ------------------- //