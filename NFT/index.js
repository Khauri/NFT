let parse = require('./compiler/');

class NFT {
    constructor(str){
        this.string = str;
        this.tree = parse(str);
    }

    get JSON(){

    }

    get png(){

    }

    get pdf(){

    }
    /**
     * Checks for syntax errors in string
     * Returns
     * @param {String} str 
     */
    static checkSyntax(str){

    }
}

module.exports = NFT;