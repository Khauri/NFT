# Notation Filetype (.nft)

.nft (Pronounced "Nifty") is a markup language for musical notation.

> Note: I created this project long before NFTs became an awful internet sensation

This is just a fun project that's not meant to be taken seriously. I initially created it in order to save and modify stuff from chord catalog websites

The project translates simple music notation in the form of plain text (i.e. the kind of stuff you see on GuitarTabs.com) into computer-readable and translatable music notation. This can then be turned into a MIDI file or 

This format allows a user to quickly write sheet music using any text editor without having formal knowledge of music symbols.

Included in this repository is a special "notepad" application that I plan to enhance with visualizations

## Documentation

The .nft format is a plain-text markup format.

### Metadata

Metadata is used to define tracks (e.g. instruments) along with staves (treble and bass clef) as well as.
Metadata is arbitrary but 

### Single Notes

A note is simply any letter, A - F

A 'b' following a note will lower it by one semitone. Ex: Db  
A '#' following a note will raise it by one semitone. Ex: D#  

### Chords  

The first way to define a chord is to write a note and optionally follow it with a chord name 

ex: D = Dmaj = D major  

Some possible chord names are:  

maj - Major  
maj7 - Major 7th  
min - Minor  
min7 - Minor 7th
dim - diminished

The second way to generate chords is to enclose a group of notes in square or curly braces separated by commas  
ex: {E,G,B}  
ex: [E,G,B]  

By default if you write a letter and do not follow it with 

### Length

Any note or chord can have its length changed by by appending or prepending `.` to it.

Each dot prepending to a note or chord will halve the original length of the note

Each dot appended will extend the value of the note by two

..Db = D flat half note
C#.. = C sharp 

### Rests

A rest is specified by a using three dots

A single dot represents a whole rest. Each additional dot reduces the rest by half.

If you need multiple whole rests, use two dot groups separated by a space

```
Emin  Gmaj  ...  Cmaj
```

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

Newlines are used to separate directives
## Examples

Do note that the spacing between lyrics is to ensure 

```markdown
# Hello - Adele

# Voice { sig = 4/4 }

# Piano { sig = 4/4 }
## { clef = treble }
## { clef = bass }

Hello - Adele

[Intro]
Emin  Gmaj  Dmaj  Cmaj x 4

[Verse]
   Em  G/D       D C
Hello,   it's me
       Em         G/D              D                 C          Em  G/D   D    C
I was wondering if after all these years you'd like to meet, to go over everything
               Em             G/D                     D         C
They say that time's supposed to heal you, but I ain't done much healing.
  Em G/D       D    C
Hello, can you hear me?
       Em        G/D             D         C                  Em    G/D  D   C
I'm in California dreaming about who we used to be when we were younger and free.
         Em        G/D                D            C
I've forgotten how it felt before the world fell at our feet.
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
