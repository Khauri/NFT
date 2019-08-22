import parser from './NFT_Parser'

class Note {
  constructor(){}
  transpose(){}
}

/**
 * A Chord consists of one or more notes played simultaneously
 */
class Chord {
  constructor(){
    this.measure = null 
    this.staff = null
    this.notes = []
    this.duration = 1
  }
  static fromNotes(notes){

  }
}

class Measure {
  constructor({
    comp = null,
    next = null, 
    prev = null
  }){
    this.comp = comp
    this.next = next
    this.prev = prev
    this.beatsLeft = this.comp.bpm
  }
  /**
   * 
   * @param {Chord} chord 
   */
  canAddChord(chord, position){
    return chord.duration <= this.beatsLeft
  }
  /**
   * Adds a chord at a given position. If a chord is added at a 
   * position already occupied by a chord and the two chords have, 
   * the same duration, then the original chord will be replaced.
   * If they do not have the same duration, then any subsequent chords
   * in the measure may be removed if they cause the measure to overflow.
   * @param {*} chord 
   * @param {*} position - defaults to the end of the measure
   */
  addChord(chord, position){
    // If you try to add a chord that exceeds the total beats, 
    // then it will throw an error if there is a next measure
    // otherwise a new measure will be added
  }
}

class Composition {
  constructor({
    bpm = 4/4
  } = {}){

  }

  addMeasure(data){
    const measure = new Measure({
      comp: this, 
      ...data
    })
    return measure
  }

  toJSON(){}
  // smaller filesize but more client-side work
  toSimplifiedJSON(){}
}

export default new class {
  /** 
   * Parse String -> JSON -> Composition
   * @param {String} text
   */
  parseText(text){
    // const lines = text.split('\n')
    // let stream
    // while(lines.length){
    //   stream = parser.feed(lines.shift())
    //   console.log(stream)
    // }
    // return stream
    text = text.trim() + '\n' // ensure file ends with newline
    let result = parser.feed(text).finish()
    if(result.length > 1){
      console.log(result.length)
    }
    return this.parseJSON(result)
  }
  /**
   * parse JSON string/obj -> Composition
   */
  parseJSON(json){
    const composition = new Composition()
    // TODO
    return json
  }
  
  parseSimplifiedJSON(){}
}
