import { CHORD_TYPES } from './constants'
import tokenize from './tokenizer'

function retrieveChordType(type){
  let typeValue
  if(!(typeValue = CHORD_TYPES[type] || CHORD_TYPES[type.toUpperCase()])){
    throw `Could not recognize chord type: ${type}`
  }
  return typeValue
}

/**
 * Match a literal string
 * @param {String} literal 
 */
const literal = (literal, type) => (input) => {
  const {tokens, position, original, consume, peek} = input
  return {

  }
}
/**
 * Matches a regex pattern
 * @param {RegExp} pattern 
 */
const pattern = (pattern) => (input) => {
  const [tokens, position] = input 
}

const either = (parser1, parser2) => (...input) => parser1(...input) || parser2(...input)

const any = (...parsers) => (input) => {
  for(let parser in parsers){
    let result
    if(result = parsers[parser](input)){
      return result
    }
  }
  return null
}

const expect = (parser, err='Parsing Error') => input => {
  const result 
  if(!result){
    throw Error(err)
  }
  return result 
}
/**
 * If the given parser errors
 * return null instead of throwing
 * @param {*} parser 
 */
const maybe = (parser) => () => {
  try {
    return parser1(...input)
  }catch(e){
    return null
  }
}

/**
 * Runs the given parsers in sequence
 * @param  {...any} parsers
 */
const sequence = (type, ...parsers) => input => {
  const consumed = 0
}


const parsers = {
  expression : sequence(
    'Expression',
    expect(parsers.operand),
    maybe(
      sequence(
        expect(parsers.operator),
        expect(parsers.expression)
      )
    )
  ),

  operand : either(
    parsers.number, 
    parsers.chord
  ),
  
  operator : any(
    literal('+', 'OperatorPlus'), // TODO: Make enums
    literal('-', 'OperatorMinus'),
    literal('/', 'OperatorDivide'),
    literal('*', 'OperatorMultiply')
  ),

  // terminals
  chord : function(){},
  
  number : pattern(/\d+/, ''),
  name : function(tokens){
    return [1,{}]
  },
  operator : function(tokens){
    return [1,{}]
  },
  bracket : function(){return [1]},
  symbol  : function(){return [1]},
  separator : function(){return [1]},
  word : function(){return [1]},
  lyric : function(){return [1]}
}

const parseProgram = (tokens) => {
  const ast = {
    type : 'Composition',
    body : []
  }

  while(tokens.pos < tokens.length()){
    const token = tokens.peek()
    if(!token || !parsers[token.type]){
      throw TypeError(`Unrecognized Token Type: ${token.type}`)
    }
    const data = parsers[token.type](token)
    const [consumed, node] = (data || [])
    if(!consumed){
      throw Error(`Token was not consumed by any parser for type ${token.type}`)
    }
    tokens.inc(consumed)
    ast.body.push(node)
  }
}

/**
 * alpha              = "a" | "b" | ....;
 * num                = "0" | "1" | ....;
 * numeric            = { num };
 * alphanum           = alpha | num;
 * identifier         = alpha, { alphanum };
 * note identifier    = "A" | "B" | "C" | "D" | "E" | "F" | "G";
 * rest identifier    = "R";
 * note name          = note identifier | rest identifier;
 * accidental         = "#" | "s" | "b" | "♭";
 * operator           = "+" | "-" | "*" | "/";
 * separator          = ",";
 * terminator         = ";" | "\n";
 * note               = note name, [ accidental ], [ number ], [ mod ] ["/", note identifier]
 *                    | rest identifier
 * chord              = note, "/", number
 *                    | "{" note, separator, { note } "}"
 * operand            = number | chord
 * expression         = operand, [ operator, expression ]
 * pair               = identifier, ":", 
 * program            = { expression }
 * 
 * 
 * Defined operations: 
 * mult:       number * chord = repeat chord number amount of times
 *             chord * chord  = Set of notes in both Chord A and Chord B (Intersection)
 * divide:     chord / number = divide length of chord by number (initially set to 1)
 *             chord / chord  = Set of notes not in both A and B (Complement of Intersection)
 * add:        chord + chord  = Set of notes in chord A and chord B (Union)
 *             chord + number = transpose chord up by number
 * difference: chord - chord  = Set of notes in chord A that are not in chord B (Difference)
 *             chord - number = transpose chord down by number
 * @param {String} input 
 */
export function parse2(input){
  const tokens = tokenize(input)
  console.log(tokens)
  parseProgram(tokens)
}
/**
 * grammar:
 * DIGIT  = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
 * NUMBER = DIGIT+
 * NOTE   = (A  | B | C | D | E | F | G) [ACC] [NUMBER] | R
 * ACC    = # | s | b 
 * TYPE   = MAJ | M | MIN | m | ...
 * CHORD  = NOTE [TYPE] [/ NUMBER] | {NOTE [, NOTE]}
 * SONG   = CHORDS+
 * 
 * Example: Cadd9/2 
 * @param {*} text 
 */
export function parse(text){
  // replace one or more spaces with one space
  const tokens = text.replace(/\s+/," ").split("")
  let pos = 0
  const peek = () => tokens[pos] || ''
  const consume = () => tokens[pos++]

  function parseWhiteSpace () {
    while(/\s/.test(peek())){
      consume()
    }
  }

  const parseNumber = () => {
    let digitStr = ''
    while(/\d/.test(peek())){
      digitStr += consume()
    }
    return parseFloat(digitStr)
  }

  const parseAccidental = () => {
    const result = {
      isAccidental : false,
      accidental : ""
    }
    if(/[#bs]/i.test(peek())){
      result.isAccidental = true 
      result.accidental = consume()
    }
    return result
  }

  const parseOctave = () => {
    const result = {
      octave : 4
    }
    const octave = parseNumber()
    if(!isNaN(octave)){
      result.octave = octave
    }
    return result
  }

  const parseNote = () => {
    if( !(/[a-gr]/i.test(peek())) ){
      throw `unrecognized root note name: ${peek()}`
    }
    let name = consume().toUpperCase()
    const accidental = parseAccidental()
    if(accidental.isAccidental){
      name += accidental.accidental
    }
    return { 
      name,
      ...accidental,
      ...parseOctave(),
    }
  }

  function parseChord(){
    const parseType = () => {
      let typeStr = ''
      while(/[\w]/i.test(peek())){
        typeStr += consume()
      }
      return {
        type : typeStr ? retrieveChordType(typeStr) : CHORD_TYPES.MAJOR
      }
    }
  
    const parseDuration = () => {
      const result = {
        duration : 1
      }
      if(peek() === '/'){
        consume()
        result.duration = 1 / parseNumber()
      }
      return result
    }
  
    return {
      root : parseNote(),
      ...parseType(),
      ...parseDuration()
    }
  }

  function parseNoteGroup(){
    const notes = []
    if(/{/.test(peek())){
      while(!/}/.test(peek())){
        // consume any non alpha-numerics (separators, whitespace, etc.)
        while(/[\W_]/.test(peek())) consume()
        notes.push(parseNote())
      }
      parseWhiteSpace()
      consume() // consume final }
    }
    return notes.length ? notes : null
  }
  // 1. TODO: lexical analysis to distinguish chords from lyrics
  const chords = []
  while(peek()){
    parseWhiteSpace()
    let chord = null
    if(chord = parseNoteGroup()){
      chords.push(chord)
    }else if(chord = parseChord()){
      chords.push(chord)
    }
  }
  console.log(chords)
}

