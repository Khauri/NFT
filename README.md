# .nft - (notation format type)
.nft (Pronounced "Nifty") is a user interface markup language for musical notation.  
It combines aspects of XML, HTML, MXML, LaTeX, YAML, and JSON to represent, in plain text, the structure and composition of sheet music.  
This allows you to quickly write sheet music using any text editor without having formal knowledge of music symbols.  
Because of the loose method in which .nft is defined, you could also theoretically copy-paste  

## Documentation
The .nft format is html-like with only one special tag: meta.  
The meta tag is a self-contained tag (i.e. no closing tag) that specifies settings and information for the entire score.  
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
A rest is specified by \rest or {rest}

### Other symbols

### Octave
Specify the octave of a note by appending it to the end.  
This may cause problems   

### length
Change the length of a note by adding the denominator of a fraction in front of it.  
If none is specified it is assumed to be a whole note.  
ex: 2C = half note C.  
This also works for rests...  
ex: 2{rest} = half note rest  

### Comments
Comments are JavaScript style.
```javascript
// inline comments start with two forward slashes 
/* block comments are wrapped like this. 
   They can also contain multiple lines */
```

## Examples
This is a hello world example with all fields explicitly stated and all tags
```html
<metadata 
  title = 'Hello World'
  showrest = false
  transpose = 1
/>
<Voice>
</Voice>
<Piano>
  <staff clef=bass>
  Amaj
  </staff>
</Piano>
```
However, this is the same as:
