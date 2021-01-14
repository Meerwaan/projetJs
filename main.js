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
            if (tab[i].release_date < tab[i + 1].release_date) {
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
}

// ------------------- //
//       STORY 5       //
// ------------------- //



// ------------------- //
//       STORY 6       //
// ------------------- //

if (args[3] === "search_key_word" && args[4] === "./movies.json" && args[5] && args[6]) {
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

            if(typeof(genresTable) != 'undefined') {
            
            let stringOverviewArray = dataParse[i]['overview']

            let stringOverviewArray = str.split(' ');

            if (genresTable.includes(args[6]) && stringOverviewArray.includes(args[5])) {
                array.push(dataParse[i]);
            }
        }

        }

        sort(array);

        if(tab.length === 0) {
            console.log(chalk.red(`[ERROR] Aucun film n'a été trouvé avec les mots clefs indiqués.`));
        } else {
            console.log(chalk.green("---------------------------------------------------------------------------"))
            console.log(chalk.green(`Le film le plus récent avec le mot clef ${args[5]} dans le genre ${args[6]} est : `));
            console.log(chalk.green("---------------------------------------------------------------------------"))
            console.log(array[1]);
        }
    })
} else if (!args[5] || !args[6] && (args[3] === "search_key_word" && args[4] === "./movies.json")) {
    console.log(chalk.red(`[ERROR] Il manque un ou des argument(s)`));
}