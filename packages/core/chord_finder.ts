import { NoteDeclaration } from "./parser";

const ChordMap = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  maj7: [0, 4, 7, 11],
  min7: [0, 3, 7, 10],
  m7b5: [0, 3, 6, 10],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
}

const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export function findNotes(root: NoteDeclaration, shape: keyof typeof ChordMap | number[]) {
  const chord = typeof shape === 'string' ? ChordMap[shape] : shape;
  if (!chord) {
    throw new Error(`Unknown chord shape: ${shape}`);
  }
  return chord.map((interval) => {
    const rootIndex = scale.indexOf(root.note);
    const noteIndex = (rootIndex + interval) % scale.length;
    const octave = Math.floor((rootIndex + interval) / scale.length) + parseInt(root.octave);
    const [note, accidental = ''] = scale[noteIndex];
    return {
      note,
      octave: `${octave}`,
      accidental,
      name: `${note}${octave}${accidental}`,
    };
  });
}

// Given some notes, gets the name of the chord
export function findChord(notes: NoteDeclaration[]) {
  const [root, ...rest] = notes;
  const intervals = [0, ...rest.map((note) => {
    const rootIndex = scale.indexOf(root.note);
    const noteIndex = scale.indexOf(note.note);
    const interval = (noteIndex - rootIndex + scale.length) % scale.length;
    return interval;
  })];
  console.log(intervals);
  const [shape = ''] = Object.entries(ChordMap).find(([shape, shapeIntervals]) => {
    return shapeIntervals.every((interval) => intervals.includes(interval));
  }) ?? [];
  const name = `${root.name}${shape}`;
  return {
    name,
    shape,
  }
}