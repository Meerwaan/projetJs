const chalk = require('chalk');
const fs = require('fs')

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
        fs.writeFile('movies.out.json', data, function(erreur) {
            if (erreur) {
                console.log(erreur)}
        })
    });
}