/**
 * Splits input into multiple lines and attemps to parse each line 
 * individually. Any line not parsable is assumed to be a lyric line.
 */
export default input => {
  const lines = input.split(/\n/)
  const tokens = lines.reduce((acc, line, lineNo)=>{
    let tokens
    try {
      tokens = tokenizeLine(line, lineNo)
    }catch(e){
      tokens = [{type:'lyric', value : line, line : lineNo, pos : 0}]
    }
    return acc.concat(tokens)
  }, [])
  return {
    tokens,
    raw : input,
    pos : 0,
    peek : function(){ return this.tokens[this.pos] },
    inc : function(amount){ this.pos += amount },
    length : function(){ return this.tokens.length }
  }
}

function tokenizeLine(input, lineNo = 0){
  let pos = 0
  const line = lineNo
  const inc = (amount) => pos += amount // returns new position

  /**
   * Tokenize a single character
   * @param {String} char 
   * @param {String} type 
   */
  const tokenizeChar = (char, type) => () => {
    return input[pos] === char ? [1, {type, value : char, line, pos}] : null
  }

  /**
   * Tokenize multiple characters
   * @param {String} str 
   * @param {String} type 
   */
  const tokenizeString = (str, type) => () => {
    return input.startsWith(str, pos) ? [str.length, {type, value : str, line, pos} ] : null
  }

  /**
   * Tokenizes a Regular Expression pattern
   * @param {RegExp} pattern 
   * @param {String} type 
   */
  const tokenizePattern = (pattern, type) => {
    return () => {
      pattern.lastIndex = 0
      const match = pattern.exec(input.substring(pos))
      return match && match.index === 0 ? [match[0].length, {type, value:match[0], line, pos}] : null
    }
  }

  /**
   * Skip any pattern
   * @param {RegExp} pattern 
   */
  const skipPattern = (pattern) => {
    const tokenizer = tokenizePattern(pattern, null)
    return () => {
      const result = tokenizer()
      return result ? [result[0], null] : null
    }
  }

  const skipWhiteSpace = skipPattern(/\s+/)
  const tokenizeOpenBracket = tokenizeChar('{', 'bracket')
  const tokenizeCloseBracket = tokenizeChar('}', 'bracket')
  const tokenizeNumber = tokenizePattern(/\d+/, 'number')
  const tokenizeSeparator = tokenizePattern(/[,|]/, "separator")
  const tokenizeTerminator = tokenizeChar(';', 'terminator')
  const tokenizeOperator = tokenizePattern(/[*+-\/]/, 'operator')
  const tokenizeNoteName = tokenizePattern(/[A-GR](?=[a-z]*)/, 'notename')
  const tokenizeMod = tokenizePattern(/(ad|au|di|do|fi|m|no|si|su|th)[a-z]*/i, 'mod')
  const tokenizeSymbol = tokenizePattern(/[#]/, 'symbol')

  const tokenizers = [
    // TODO: skipComments
    skipWhiteSpace,
    tokenizeOpenBracket,
    tokenizeCloseBracket,
    tokenizeTerminator,
    tokenizeSeparator,
    tokenizeOperator,
    tokenizeNumber,
    tokenizeSymbol,
    tokenizeNoteName,
    tokenizeMod,
  ]

  const tokens = []

  while(pos < input.length){
    const wasTokenized = tokenizers.some((tokenizer)=>{
      const result = tokenizer()
      if(!result){
        return false
      }
      inc(result[0])
      result[1] && tokens.push(result[1])
      return true
    })
    if(!wasTokenized){
      throw Error(`Unrecognized Token "${input[pos]}" at pos ${pos}`)
    }
  }

  return tokens
}