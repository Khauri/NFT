module.exports = {
    /**
     * @str {String} - The input string
     */
    sig : function(str){
        // check if str is a string
        // iterate through each line in string
        // return array representing result
        let tokens =  str.split('\n').map(function(line, line_num){
            return {
                original : line,
                line : line_num,
                tokens : line.match(/'.*?'|".*?"|[^\w\s]|\w+/g)
            }
        });

        return {
            original : str,
            tokens : str.match(/'.*?'|".*?"|[^\w\s]|\w+/g),
            lines : tokens
        }
    }
}
