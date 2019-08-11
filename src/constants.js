export const CLEFS = {
  TREBLE : "TREB",
  BASS   : "BASS"
}

export const CHORD_TYPES = expand({
  "Major|Maj|M" : "MAJ",
  "Minor|Min|m" : "MIN",
  // DIMINISHED : "DIM",
  // MAJOR_SEVENTH : "MAJ7",
  // MINOR_SEVENTH : "MIN7",
  // DOMINANT_SEVENTH : "DOM7",
  // SUSPENDED : "SUS",
  // AUGMENTED : "AUG",
  // EXTENDED : "EXT"
})

function expand(dict){
  return Object.keys(dict).reduce((acc, curr)=>{
    curr.split("|").forEach(
      key=>{
        if(key.length > 1){
          acc[key.toUpperCase()] = dict[curr]
        }else{
          acc[key]=dict[curr]
        }
      })
    return acc
  },{})
}