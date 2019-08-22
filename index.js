import NFT from './src'


const program = `
title : Adele - Hello
autor : OKAY LOL WOW

Em          C         G    D
Hello, How are you
Em          C         G    D
Hello, How are you
`

console.log(JSON.stringify(NFT.parseText(program), null, 2))
// NFT.parseText('C5 C6') // Invalid: Parsers another expression when there isn't an operand 

// NFT.parseText(
// `
// Em G         D C
// Hello,  it's me
//        Em          G                D
// I was wondering if after all these years
// `)