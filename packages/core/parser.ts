// @ts-ignore
import {parse as yieldParse, has, hasMore} from 'yieldparser';
import { findChord, findNotes } from './chord_finder';

const shapes = {
  'M|maj': 'maj',
  'm|min': 'min',
  '7': '7',
  'm7': 'min7',
  'M7|maj7': 'maj7',
  'm7b5': 'm7b5',
  'dim': 'dim',
  'aug': 'aug'
};

export type NoteDeclaration = {
  note: string,
  name: string,
  octave: string,
  accidental: string,
}

export type ChordDeclaration = {
  name: string,
  shape: string,
  notes: NoteDeclaration[],
}

export type Line = (ChordDeclaration | string)[];

export type ParseResult = {
  success: boolean,
  remaining: string,
  result: any,
};

const maybeWhitespace = /^\s*/;
const maybeComma = /^\s*,?\s*/;

function* Note(): Generator<any, NoteDeclaration, any> {
  const [, 
    note, 
    octave = '4', 
    accidental = ''
  ]: string[] = yield /^([A-G])(\d+)?(#|b)?/;
  return {
    note,
    octave,
    accidental, 
    name: `${note}${accidental}`,
  };
}

// A group of notes. e.g. [C E G] or (C E G) or {C E G} or (C,E,G)
function* ExplicitChord(): Generator<any, ChordDeclaration, any> {
  yield /^[\[\(\{]/;
  const notes: NoteDeclaration[] = [];
  yield maybeWhitespace;
  notes.push(yield Note);
  // The end should match the start, but kinda lazy so let's just let it be loose
  while((yield has(/^[\]\)\}]/)) === false) {
    yield maybeComma;
    notes.push(yield Note);
  }
  const {name, shape} = findChord(notes);
  return {
    name,
    shape,
    notes
  };
}

// Must be sorted by length so that the longest match is found first
const shapesRE = new RegExp(`^(${Object.keys(shapes).join('|').split('|').sort((a, b) => b.length - a.length).join('|')})?`);

// <note>[shape][extension] e.g. Cmaj7, C#m7, C7, Cm 
function* ShortChord(): Generator<any, ChordDeclaration, any>{
  const note = yield Note;
  const [, shape = 'major']: string[] = yield shapesRE; // TODO: normalize note.shape
  const notes = findNotes(note, shape as any);
  return {
    name: `${note.name}${shape}`, 
    shape: shape,
    notes,
  }
}

function* Chord(): Generator<any, ChordDeclaration, any> {
  return yield [ShortChord, ExplicitChord];
}

// One or more lines of chords followed by a line of lyrics
function* LyricedChord() {

}

// Arbitrary text that doesn't match a Chords line
// Must be preceeded by a Chords line or otherwise will error
function* Lyrics(): Generator<any, string, any> {
  return yield /^[^\n]+/;
}

function* Sheet(): Generator<any, Line[], any>{
  const lines = [];
  while(yield hasMore) {
    yield maybeWhitespace
    lines.push(yield [Chord, Lyrics])
  }
  return lines;
}

export function parse(input: string): ParseResult {
  return yieldParse(input, Sheet());
}
