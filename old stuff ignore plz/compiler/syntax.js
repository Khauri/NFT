/**
 * Validates snytax in .nft formatted string
 * Returns syntax tree
 * Rules:
 *  1. All [, {, (, ', " must have corresponding ", ', ), }, ]
 *  2. ## must be inside a #
 *  3. # meta must only appear once
 *  4. # starts a frame and appends it to previous frame
 */
var tokenize = require('./tokenize.js');
// create a delimiters stack
// split by line "\n"
// tokenize each line
// when # or ## encountered
// push new frame to frameStack

// example format
// No measures. Measures are determined by the program based on length of note 
var x = {
    title : "Hello",
    time : { symbol: "common", beats: 4, beat_type : 4 },
    key : { fifths : 0 },
    parts : [
        {
            name: 'Voice',
            group : [
                {
                    notes : []
                }
            ],
        },
        {
            name : 'Piano',
            group : [
                {
                    clef : "treble",
                    notes : [],
                },
                {
                    clef : "bass",
                    notes : []
                }
            ]
        }
    ]
}

// throws syntax error objects
function error(str, line, char, message){
    var err = "Syntax error on line "+ line + ": " + (message || "") + "\n\t";
        err += str;
    throw {message: err, line : line, pos : char};
}

function newBar(){
    return {

    }
}

module.exports = function(str){
    let base = {
            key : { note: 'C', fifths : 0 },
            parts : [{
                name : "",
                group : []
            }],
            time : { symbol: "common", beats: 4, beat_type : 4 },
            title : "",
        };

    let part = {
        name : "",
        group : []
    };

    let group = {

    };

    let delims = [];
    // flags
    let expArgs = false,
        expComment = false;

    let tokenized = tokenize.sig(str);

    tokenized.tokens.map(function(token){
        console.log(token);
    })
    /*
    let lines = str.split('\n');
    let tokens;
    lines.map((line, i)=>{
        tokens = line.match(/'.*?'|".*?"|##|[^\w\s]|\w+/g);
        if(tokens)
            tokens.map((token, j)=>{
                switch(token){
                    case '#':
                        // push previous part (if there is one)
                        // push previous group (if there is one)
                        break;
                    case '##': 
                        // push previous part
                        // add new group/change group pointer
                        break;
                    case "{":
                    case "[":
                    case "(":
                        // update specific flag
                        break;
                    case "}":
                    case "]":
                    case ")":
                        // update flag
                        break;
                    default: 
                        // determine if note or chord
                        break;
                }
                console.log(token);
            });
    });**/
    return base;
}