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
const parseLiteral = (literal) => (input) => {
  const {tokens, position, original, consume, peek} = input
  return {

  }
}
/**
 * Matches a regex pattern
 * @param {RegExp} pattern 
 */
const parsePattern = (pattern) => (input) => {
  const [tokens, position] = input 
}

const parseEither = (parser1, parser2) => (input) => parser1(input) || parser2(input)

export function parse2(input){
  const tokens = tokenize(input)
  console.log(tokens)
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

