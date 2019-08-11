/**
 * Insanely simply compiler
 * 
 * Parses string into JSON object
 */
let base = {
    meta : {
        author : 'UNKNOWN',
        date : Date.now(),
        rests : false, // hide rests
        title : 'untitled',
    },
    staves : []
}

module.exports = function parse(str){
    // tokenize
    let tokens = str.match(/'.*?'|".*?"|[^\w\s]|\w+/g);
    // setup some metadata and flags for the parser
    let pMeta = {
        startTokens : '[{(',
        endTokens : ']})',
        delimStack : [],
        frame : base
    };
    // iterate through tokens
    tokens.map((token, index, arr)=>{
        // track start delims
        if(pMeta.startTokens.indexOf(token) > -1){
            // check if a quoted string
            if(pMeta.delimStack[pMeta.delimStack.length-1] !== '\'' || pMeta.delimStack[pMeta.delimStack.length-1] !== '"'){
                pMeta.delimStack.push(token);
            }
        } // handle end tokens
        else if(pMeta.endTokens.indexOf(token) > -1){
            let delim = pMeta.delimStack.pop();
            if( (token == ']' && delim != '[') || (token == '}' && delim != '{') || (token == ')' && delim != '('))
                throw "Extra delimiter";
        }
        else if(token == '#'){

        }
        else{
            // if we're reading arguments
            if(pMeta.delimStack[pMeta.delimStack.length-1] == '{'){
                // arguments separated by commas or spaces
                console.log(token);
            }
        }
    });
    //console.log(tokens);
    return base;
}