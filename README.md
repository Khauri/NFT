# Notation Filetype (.nft)
.nft (Pronounced "Nifty") is a user interface markup language for musical notation.  
The idea is to create a format that translates simple music notation in the form of plain text (i.e. the kind of stuff you see on GuitarTabs.com) into computer-readable and translatable music notation.
This format allows a user to quickly write sheet music using any text editor without having formal knowledge of music symbols.  
Because of the loose method in which .nft is defined, you could also theoretically copy-paste a file from a music website and hopefully get a nice editable template for music.

## Documentation
The .nft format is html-like with only one special tag: meta (case insensitive).  
The meta tag specifies settings, variables, and other information for the entire score
Any other tag is assumed to be a group of however many subtags there are. *Note tags may only be nested with a depth of 1*  

### Metadata
All files start with a metadata section.  

### Single Notes
Write a single note by simply writing C, D, E, F, G, A, or B  
A 'b' following a note will lower it by one semitone. Ex: Db  
A '#' following a note will raise it by one semitone. Ex: D#  

### Chords  
The first way to define a chord is to write a note and follow it with a chord name  
ex: Dmaj = D major  
Possible chord names are:  
maj - Major  
maj7 - Major 7th  
min - Minor  
min7 - Minor 7th  

The 2nd way is to enclose a group of notes in square or curly braces separated by commas  
ex: {E,G,B}  
ex: [E,G,B]  

### Rests
A rest is specified by R

### Other symbols
There are various other symbols available.  
A full list of them will be available soon.

### Octave
Specify the octave of a note by appending it to the end.  
This typically isn't necessary for rests (and probably won't even work)  
This may cause formatting problems in some cases.

### length
Change the length of a note by adding the denominator of a fraction in front of it.  
If none is specified it is assumed to be a whole note.  
ex: 2C = half note C.  
This also works for rests...  
ex: 2{rest} = half note rest

### Duplication/Repeating Notes
It's laborious to type out the same note multiple times. i.e. in the case of multiple rests before an instrument comes in.  
in that case use the duplication syntax to duplicate any type of notation or group.  
Ex: R\*5

### Measures
If you want to end a measure simply use || and any notes followig will start on a different measure.  
Additionally if you want to repeat a measure use :|| and any notes preceeding will be repeated

### Staff/Staves
Use a single \# to specify a staff.

### Options/Parameters Syntax
Options/Parameters are inherited from the parent with a few exceptions.

### Lyrics
Sometimes you want to add lyrics to your score.

## Format
Spaces are only used to separate notes, chords, etc.  
Newline characters, tabs, do not matter.  
If you wanted to, you could put an entire song on one line. It would look ugly, but we're not here to tell you hot to run your life...don't do it though.

## Examples
This example shows 
```markdown
# Meta { title = 'Hello - Adele', key = 'C', hiderests = true, transpose = 0 }
# Voice { sig='4/4' }

# Piano { sig='4/4' }
## { clef='treble' }
## {clef='bass'}
[Intro]
Emin  Gmaj  Dmaj  Cmaj
Emin  Gmaj  Dmaj  Cmaj
Emin  Gmaj  Dmaj  Cmaj
```
The parse tree, in JSON format, looks like this:
```js
{
  'meta' : {
    'title' : 'Hello - Adele',
    'key' : 'C',
    'hide_rests' : true
    'transpose' : 0,
    // default variables that are required, but were not defined
    'staff_size' : 5,
    'time_signature' : '4/4',
    'pitch' : 0,
  },
  'staves' : [
    {
      'meta' : {},
      'comp' : [
        {
          'chord_name' : 'Emin'
          'notes' : ['E', 'G', 'C'],
        }
      ]
    }
  
  ]
}
```
Every option/variable specified in meta section trinkles down to all groups but can also be overwritten by them.
Single hashtag specifies a group. Naming them is optional. Any options specified trinkle down to children if not overwritten.
Double hashtag represents

# The Many Ways To Use NFT
## CLI
After writing your score in plain text compile it with the command line.
```bash
nft input.nft -o output.xxx
```
The nft cli will eventually have support for JSON, XML, pdf, and png/jpg/webp (as a series of seperate image files).

## Web/Desktop Application
There's also a dead simple web application consiting of a text editor window and an output window.
Text goes into the text editor window and an image representing the score comes out the output window.

## Browser Library
The library itself simply parses input text and returns a JSON object representing the structure of the score. A Separate program (an example of which is included with the command line client) converts said JSON to a visual form and/or manipulates the JSON.
