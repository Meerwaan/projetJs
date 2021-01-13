const chalk = require('chalk');

// ------------------- //
//       STORY 1       //
// ------------------- //

var args = process.argv;

if(args[2] !== "-action") {
    return console.log(chalk.red("[ERROR] - Le premier argument doit toujours être \"action\"."));
}

// ------------------- //
//       STORY 2       //
// ------------------- //

