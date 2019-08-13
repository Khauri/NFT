export default input => {
  let pos = 0
  const inc = (amount) => pos += amount // returns new position

  /**
   * Tokenize a single character
   * @param {*} char 
   * @param {*} type 
   */
  const tokenizeChar = (char, type) => () => {
    return input[pos] === char ? [1, {type, value : char}] : null
  }

  /**
   * Tokenize multiple characters
   * @param {*} str 
   * @param {*} type 
   */
  const tokenizeString = (str, type) => () => {
    return input.startsWith(str, pos) ? [str.length, {type, value : str} ] : null
  }

  /**
   * Tokenizes a Regular Expression pattern
   * Limitation: only parses one letter at a time
   * @param {RegExp} pattern 
   * @param {*} type 
   */
  const tokenizePattern = (pattern, type) => () => {
    let consumed = 0,
        char = null,
        value = ''
    while((char = input[pos + consumed]) && pattern.test(char)){
      value += char
      consumed++
    }
    return consumed ? [consumed, {type, value}] : null
  }

  /**
   * Skip any pattern
   * Limitation: same as tokenizePattern
   * @param {*} pattern 
   */
  const skipPattern = (pattern) => {
    const tokenizer = tokenizePattern(pattern, null)
    return () => {
      const result = tokenizer()
      return result ? [result[0], null] : null
    }
  }

  const skipWhiteSpace = skipPattern(/\s/)
  const tokenizeOpenBracket = tokenizeChar('{', 'bracket')
  const tokenizeCloseBracket = tokenizeChar('}', 'bracket')
  const tokenizeNumber = tokenizePattern(/\d/, 'number')
  const tokenizeSeparator = tokenizePattern(/[,|;]/, "separator")
  const tokenizeDelimiter = tokenizePattern(/[*+\/]/, 'operator')
  const tokenizeValue = tokenizePattern(/[a-z#]/i, 'value')

  const tokenizers = [
    // TODO: skipComments
    skipWhiteSpace,
    tokenizeOpenBracket,
    tokenizeCloseBracket,
    tokenizeSeparator,
    tokenizeDelimiter,
    tokenizeNumber,
    tokenizeValue
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

  // TODO: remove all lines starting with #
  return {
    raw : input,
    tokens,
    pos : 0,
    peek : () => this.tokens[this.pos],
    consume : () => this.tokens[this.pos++]
  }
}