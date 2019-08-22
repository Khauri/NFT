@builtin "number.ne"
@builtin "whitespace.ne"

# Metadata and then expressions
main        -> kv_pairs body:* {% ([head, body])=> ({ head, body })  %}

# key-value pairs
# Gets reduced to a single js-object
kv_pairs    -> kv_pair:* {% ([kvs]) => kvs.reduce((acc,next)=>(acc[next[0]] = next[1], acc), {}) %}

# A key-value pair returned as [key, value]
# The optional spaces seem to make the grammar ambiguous?
kv_pair     -> _ identifier _ ":" _ value _ eol {% ([,id,,,,val]) => [id, val] %}

body        -> expressions _ eol lyric:? {% ([expr,,,lyric])=> ({expr, lyric})%} # expression line

_label    -> [^\]]
label     -> "[" _label "]"

# If it looks like a lyric....then it probably is
lyric_id  -> "#" {% () => '' %}
           | [^A-GR0-9]  {% id %}

lyric     -> lyric_id str eol {% ([nl,line]) => nl + line %}

expressions -> sum (__ sum):* {% ([s1,s2])=> [s1, ...s2] %}
sum         -> sum _ addOp _ product {% parseOp %}
             | product {% id %}
product     -> product _ mulOp _ exp {% parseOp %}
             | exp {% id %}
exp         -> terminal _ expOp _ exp {% parseOp %}
             | terminal {% id %}

terminal   -> int {% id %}
            | chord {% id %}

mulOp     -> "*" | "/" {% id %}
addOp     -> "+" | "-" {% id %}
expOp     -> "**" | "^" {% id %}

chord      -> note mod:? {% ([root, mod]) => ({root, mod})%}
            | rest_id
            | "{" note _ subchord:* "}" {% d => [d[1], ...d[3]] %}
subchord   -> separator _ note {% d => d[2] %}

note       -> note_id accidental:? int:?

mod_name   -> "add" {% id %}
            | "fi" {% id %}
            | "no" {% id %}
            | "si" {% id %}
            | "th" {% id %}
            | "sus"i "stained"i:? {% id %}
            | "aug"i "mented"i:? {% id %}
            | "dim"i "inished"i:? {% id %}
            | "dom"i "inant"i:? {% id %}
            | "min"i "or":? | "m" {% id %}
            | "maj"i "or":? | "M" {% id %}
mod        -> mod_name int:?

rest_id    -> "R" {% id %}

note_id    -> [A-G] {% id %}

accidental -> "#" {% id %}
            | "b" {% id %}

separator  -> "," | __ {% ()=> null %}

eol        -> "\r" "\n" {% () => null %}
            | "\r" | "\n" {% () => null %}

identifier -> [A-Za-z0-9_@$] [^ :]:* {% d => d[0]+d[1].join("") %}

value      -> [^ ] [^\n\r]:* {% d => d[0]+d[1].join("") %}

ws         -> [ \s\t\v]:* {% () => null %}

str        -> [^\n\r]:+ {% d => d[0].join("") %}

@{%
  const parseOp = ([a,,op,,b]) => ({op:op[0], a, b})
%}