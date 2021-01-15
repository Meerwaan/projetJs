const chalk = require('chalk');
const fs = require('fs');
const { prependOnceListener } = require('process');

// ------------------- //
//       STORY 1       //
// ------------------- //

// Je transforme en tableau tous les arguments
var args = process.argv;

// Si l'argument 2 ne correspont pas à "-action", je retourne une erreur
if (args[2] !== "-action") {
    return console.log(chalk.red("[ERROR] - Le premier argument doit toujours être \"action\"."));
}

// ------------------- //
//       STORY 2       //
// ------------------- //

// Condition des arguments de la Story 2
if (args[3] === "transform" && args[4] === "./movies.json" && args[5] === "movies.out.json") {

    //Je prends le temps de départ
    let start = new Date().getTime();

    // Je lie le fichier ./movies.json
    fs.readFile(args[4], { encoding: 'utf8' }, function(err, data) {

        // Je retourne une erreur s'il y en a une
        if (err) return console.error(err);

        // Je parse le fichier json pour que je puisse modifier certaines informations
        let dataParse = JSON.parse(data);

        // Je parcours toutes les données
        for (i = 0; i < dataParse.length; i++) {

            // J'assigne dataParse[i]['release_date'] à une variable
            var timeStamp = dataParse[i]['release_date']

            // Je le transforme en millisecondes
            date = new Date(timeStamp * 1000);

            // Pour ensuite le transformer en année
            year = date.getFullYear();

            // J'assigne donc à dataParse[i]['title'], sa nouvelle valeur
            dataParse[i]['title'] = dataParse[i]['title'] + ` (${year})`;
        }

        // Je stringify toutes mes données et je les transfère dans mon deuxième fichier
        fs.writeFile('./movies.out.json', JSON.stringify(dataParse, null, 2), (err) => { // Je transfère les données
            console.log(chalk.green("---------------------------------"))
            console.log(chalk.green("Données transférées avec succès !"))
            console.log(chalk.green("---------------------------------"))
            if (err) throw err;
        });

        // Je récupère le temps de fin
        let stop = new Date().getTime();

        // Je soustrais le temps de fin au temps de départ pour avoir le temps qu'à pris la fonction
        console.log(chalk.blue("---------------------------"))
        console.log(chalk.blue("Temps d'exécution : " + (stop - start) + "ms"));
        console.log(chalk.blue("---------------------------"))


    })
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

/**
 * Cette fonction permet de trier toutes les dates dans l'ordre croissant
 * 
 * @param {*} tab : Le tableau à trier (dataparse)
 */
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

    fs.readFile('./movies.json', { encoding: 'utf8' }, function(err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        for (i = 0; i < dataParse.length; i++) {

            var timeStamp = dataParse[i]['release_date']

            date = new Date(timeStamp * 1000);

            year = date.getFullYear();

            dataParse[i]['title'] = dataParse[i]['title'] + ` (${year})`;

        }

        // Je trie dataParse pour afficher tous les films trier par date dans l'ordre croissant
        sort(dataParse)

        fs.writeFile('./movies.sort.date.json', JSON.stringify(dataParse, null, 2), (err) => {
            console.log(chalk.green("-------------------------------------------"))
            console.log(chalk.green("Données transférées et triées avec succès !"))
            console.log(chalk.green("-------------------------------------------"))
            if (err) throw err;
        });

        let stop = new Date().getTime();

        console.log(chalk.blue("---------------------------"))
        console.log(chalk.blue("Temps d'exécution : " + (stop - start) + "ms"));
        console.log(chalk.blue("---------------------------"))

    })
}

// ------------------- //
//       STORY 5       //
// ------------------- //

/**
 * Cette fonction permetterait de trouver tous les films de la date demandée avec une recherche dichotomique.
 * 
 * @param {*} searchItem : La date à chercher
 * @param {*} tab : Le tableau (dataParse)
 * @param {*} start : La valeur du début
 * @param {*} end : La valeur de fin
 */
function searchBinaire(searchItem, tab, start, end) {
    let m = start + Math.ceil((end - start) / 2);

    var timeStamp = tab[m]['release_date'] // le TimeStamp à convertir

    date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

    let year = date.getFullYear();

    tab[m].release_date = year;

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
    fs.readFile('./movies.json', { encoding: 'utf8' }, function(err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        //Je crée un tableau vide
        let arrayData = []

        if (args[6] === "true") {

            // Si la valeur est true, j'effectue un tri avec la recherche dichotomique

            console.log(searchBinary(args[5], dataParse, 0, dataParse.length - 1))

        } else if (args[6] === "false") {

            // Si la valeur est false, je n'utilise pas de fonction de tri

            let start = new Date().getTime();

            for (i = 0; i < dataParse.length; i++) {

                var timeStamp = dataParse[i]['release_date'] // le TimeStamp à convertir

                date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

                year = date.getFullYear();

                dataParse[i]['release_date'] = year;

                dataParse[i]['title'] = dataParse[i]['title'] + ` (${year})`;

                // Si l'année est égale à l'argument 5, alors je push le film dans mon tableau arrayData
                if (dataParse[i]['release_date'] == args[5]) {

                    dataParse[i]['release_date'] = timeStamp;

                    arrayData.push(dataParse[i])

                }
            }

            // J'affiche mon tableau
            console.log(arrayData)

            let stop = new Date().getTime();

            console.log(chalk.blue("---------------------------"))
            console.log(chalk.blue("Temps d'exécution : " + (stop - start) + "ms"));
            console.log(chalk.blue("---------------------------"))
        }

    })
}

// ------------------- //
//       STORY 6       //
// ------------------- //

/**
 * Cette fonction permet de trier tous les films du tableau dans l'odre décroissant
 * 
 * @param {*} tab : Le tableau avec tous les films ayant pour mot clef dans la description l'argument 5
 * et pour genre l'argument 6
 */
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

    fs.readFile('./movies.json', { encoding: 'utf8' }, function(err, data) {
        if (err) return console.error(err);

        let dataParse = JSON.parse(data);

        let array = [];

        for (i = 0; i < dataParse.length; i++) {

            var timeStamp = dataParse[i]['release_date'] // le TimeStamp à convertir

            date = new Date(timeStamp * 1000); // pour obtenir le timeStamp en millisecondes

            year = date.getFullYear();

            dataParse[i]['title'] = dataParse[i]['title'] + ` (${year})`;

            // Je récupère tous les genres des films
            let genresTable = dataParse[i]['genres'];

            // Si genresTable n'existe pas, donc qu'il a pour type "undefined", je ne fais rien (certains films ne possèdent aucun genre)
            if (typeof(genresTable) != 'undefined') {

                let stringOverviewArray = dataParse[i]['overview']

                // Je divise tous les mots de la description du film pour les mettre dans un tableau
                let stringOverviewArraySplit = stringOverviewArray.split(' ');

                //Si l'argument 6 est dans le tableau des genres et que l'argument 5 est dans le tableau des mots de la description, je le push dans mon tableau array
                if (genresTable.includes(args[6]) && stringOverviewArraySplit.includes(args[5])) {
                    array.push(dataParse[i]);
                }
            }

        }

        // Je trie array avec la fonction ci-dessus
        sortFilm(array);

        // Si aucun résultat n'est trouvé, je retourne une erreur
        if (array.length === 0) {
            console.log(chalk.red(`[ERROR] Aucun film n'a été trouvé avec les mots clefs indiqués.`));

            // Si au moins un résultat est trouvé, j'affiche le film le plus récent parmi tout le tableau
        } else {
            console.log(chalk.green("---------------------------------------------------------------------------"))
            console.log(chalk.green(`Le film le plus récent avec le mot clef ${args[5]} dans le genre ${args[6]} est : `));
            console.log(chalk.green("---------------------------------------------------------------------------"))
            console.log(array[1]);
        }

        let stop = new Date().getTime();

        console.log(chalk.blue("---------------------------"))
        console.log(chalk.blue("Temps d'exécution : " + (stop - start) + "ms"));
        console.log(chalk.blue("---------------------------"))
    })

    // S'il manque des arguments, j'affiche une erreur
} else if (!args[5] || !args[6] && (args[3] === "search_key_word" && args[4] === "./movies.json")) {
    console.log(chalk.red(`[ERROR] Il manque un ou des argument(s)`));
}