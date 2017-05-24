/**
 * Checks syntax, parses into parse tree 
 * returns 
 */

let tokenize = require('./tokenize');
let syntax = require('./syntax');
let parse = require('./parse');

module.exports = function(str){
    let synt = syntax(str);
        //parseTree = parse(syntax );
    return 
}