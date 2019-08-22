// Generated automatically by nearley, version 2.18.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

  const parseOp = ([a,,op,,b]) => ({op:op[0], a, b})
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "unsigned_int$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_int$ebnf$1", "symbols": ["unsigned_int$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_int", "symbols": ["unsigned_int$ebnf$1"], "postprocess": 
        function(d) {
            return parseInt(d[0].join(""));
        }
        },
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"-"}]},
    {"name": "int$ebnf$1$subexpression$1", "symbols": [{"literal":"+"}]},
    {"name": "int$ebnf$1", "symbols": ["int$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "int$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "int$ebnf$2", "symbols": ["int$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "int", "symbols": ["int$ebnf$1", "int$ebnf$2"], "postprocess": 
        function(d) {
            if (d[0]) {
                return parseInt(d[0][0]+d[1].join(""));
            } else {
                return parseInt(d[1].join(""));
            }
        }
        },
    {"name": "unsigned_decimal$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$1", "symbols": ["unsigned_decimal$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "unsigned_decimal$ebnf$2$subexpression$1", "symbols": [{"literal":"."}, "unsigned_decimal$ebnf$2$subexpression$1$ebnf$1"]},
    {"name": "unsigned_decimal$ebnf$2", "symbols": ["unsigned_decimal$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "unsigned_decimal$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "unsigned_decimal", "symbols": ["unsigned_decimal$ebnf$1", "unsigned_decimal$ebnf$2"], "postprocess": 
        function(d) {
            return parseFloat(
                d[0].join("") +
                (d[1] ? "."+d[1][1].join("") : "")
            );
        }
        },
    {"name": "decimal$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "decimal$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$2", "symbols": ["decimal$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "decimal$ebnf$3$subexpression$1$ebnf$1", "symbols": ["decimal$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "decimal$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "decimal$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "decimal$ebnf$3", "symbols": ["decimal$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "decimal$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "decimal", "symbols": ["decimal$ebnf$1", "decimal$ebnf$2", "decimal$ebnf$3"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "")
            );
        }
        },
    {"name": "percentage", "symbols": ["decimal", {"literal":"%"}], "postprocess": 
        function(d) {
            return d[0]/100;
        }
        },
    {"name": "jsonfloat$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "jsonfloat$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$2", "symbols": ["jsonfloat$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$3$subexpression$1$ebnf$1", "symbols": ["jsonfloat$ebnf$3$subexpression$1$ebnf$1", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$3$subexpression$1", "symbols": [{"literal":"."}, "jsonfloat$ebnf$3$subexpression$1$ebnf$1"]},
    {"name": "jsonfloat$ebnf$3", "symbols": ["jsonfloat$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [/[+-]/], "postprocess": id},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": [/[0-9]/]},
    {"name": "jsonfloat$ebnf$4$subexpression$1$ebnf$2", "symbols": ["jsonfloat$ebnf$4$subexpression$1$ebnf$2", /[0-9]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "jsonfloat$ebnf$4$subexpression$1", "symbols": [/[eE]/, "jsonfloat$ebnf$4$subexpression$1$ebnf$1", "jsonfloat$ebnf$4$subexpression$1$ebnf$2"]},
    {"name": "jsonfloat$ebnf$4", "symbols": ["jsonfloat$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "jsonfloat$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "jsonfloat", "symbols": ["jsonfloat$ebnf$1", "jsonfloat$ebnf$2", "jsonfloat$ebnf$3", "jsonfloat$ebnf$4"], "postprocess": 
        function(d) {
            return parseFloat(
                (d[0] || "") +
                d[1].join("") +
                (d[2] ? "."+d[2][1].join("") : "") +
                (d[3] ? "e" + (d[3][1] || "+") + d[3][2].join("") : "")
            );
        }
        },
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "body"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "main", "symbols": ["kv_pairs", "main$ebnf$1"], "postprocess": ([head, body])=> ({ head, body })},
    {"name": "kv_pairs$ebnf$1", "symbols": []},
    {"name": "kv_pairs$ebnf$1", "symbols": ["kv_pairs$ebnf$1", "kv_pair"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "kv_pairs", "symbols": ["kv_pairs$ebnf$1"], "postprocess": ([kvs]) => kvs.reduce((acc,next)=>(acc[next[0]] = next[1], acc), {})},
    {"name": "kv_pair", "symbols": ["_", "identifier", "_", {"literal":":"}, "_", "value", "_", "eol"], "postprocess": ([,id,,,,val]) => [id, val]},
    {"name": "body$ebnf$1", "symbols": ["lyric"], "postprocess": id},
    {"name": "body$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "body", "symbols": ["expressions", "_", "eol", "body$ebnf$1"], "postprocess": ([expr,,,lyric])=> ({expr, lyric})},
    {"name": "_label", "symbols": [/[^\]]/]},
    {"name": "label", "symbols": [{"literal":"["}, "_label", {"literal":"]"}]},
    {"name": "nonlyric", "symbols": [{"literal":"#"}], "postprocess": () => ''},
    {"name": "nonlyric", "symbols": [/[^A-GR]/], "postprocess": id},
    {"name": "lyric", "symbols": ["nonlyric", "str", "eol"], "postprocess": ([nl,line]) => nl + line},
    {"name": "expressions$ebnf$1", "symbols": []},
    {"name": "expressions$ebnf$1$subexpression$1", "symbols": ["__", "sum"]},
    {"name": "expressions$ebnf$1", "symbols": ["expressions$ebnf$1", "expressions$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "expressions", "symbols": ["sum", "expressions$ebnf$1"], "postprocess": ([s1,s2])=> [s1, ...s2]},
    {"name": "sum", "symbols": ["sum", "_", "addOp", "_", "product"], "postprocess": parseOp},
    {"name": "sum", "symbols": ["product"], "postprocess": id},
    {"name": "product", "symbols": ["product", "_", "mulOp", "_", "exp"], "postprocess": parseOp},
    {"name": "product", "symbols": ["exp"], "postprocess": id},
    {"name": "exp", "symbols": ["terminal", "_", "expOp", "_", "exp"], "postprocess": parseOp},
    {"name": "exp", "symbols": ["terminal"], "postprocess": id},
    {"name": "terminal", "symbols": ["int"], "postprocess": id},
    {"name": "terminal", "symbols": ["chord"], "postprocess": id},
    {"name": "mulOp", "symbols": [{"literal":"*"}]},
    {"name": "mulOp", "symbols": [{"literal":"/"}], "postprocess": id},
    {"name": "addOp", "symbols": [{"literal":"+"}]},
    {"name": "addOp", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "expOp$string$1", "symbols": [{"literal":"*"}, {"literal":"*"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "expOp", "symbols": ["expOp$string$1"]},
    {"name": "expOp", "symbols": [{"literal":"^"}], "postprocess": id},
    {"name": "chord$ebnf$1", "symbols": ["mod"], "postprocess": id},
    {"name": "chord$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "chord", "symbols": ["note", "chord$ebnf$1"], "postprocess": ([root, mod]) => ({root, mod})},
    {"name": "chord", "symbols": ["rest_id"]},
    {"name": "chord$ebnf$2", "symbols": []},
    {"name": "chord$ebnf$2", "symbols": ["chord$ebnf$2", "subchord"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "chord", "symbols": [{"literal":"{"}, "note", "_", "chord$ebnf$2", {"literal":"}"}], "postprocess": d => [d[1], ...d[3]]},
    {"name": "subchord", "symbols": ["separator", "_", "note"], "postprocess": d => d[2]},
    {"name": "note$ebnf$1", "symbols": ["accidental"], "postprocess": id},
    {"name": "note$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "note$ebnf$2", "symbols": ["int"], "postprocess": id},
    {"name": "note$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "note", "symbols": ["note_id", "note$ebnf$1", "note$ebnf$2"]},
    {"name": "mod_name$string$1", "symbols": [{"literal":"a"}, {"literal":"d"}, {"literal":"d"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mod_name", "symbols": ["mod_name$string$1"], "postprocess": id},
    {"name": "mod_name$string$2", "symbols": [{"literal":"f"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mod_name", "symbols": ["mod_name$string$2"], "postprocess": id},
    {"name": "mod_name$string$3", "symbols": [{"literal":"n"}, {"literal":"o"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mod_name", "symbols": ["mod_name$string$3"], "postprocess": id},
    {"name": "mod_name$string$4", "symbols": [{"literal":"s"}, {"literal":"i"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mod_name", "symbols": ["mod_name$string$4"], "postprocess": id},
    {"name": "mod_name$string$5", "symbols": [{"literal":"t"}, {"literal":"h"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mod_name", "symbols": ["mod_name$string$5"], "postprocess": id},
    {"name": "mod_name$subexpression$1", "symbols": [/[sS]/, /[uU]/, /[sS]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$1$subexpression$1", "symbols": [/[sS]/, /[tT]/, /[aA]/, /[iI]/, /[nN]/, /[eE]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$1", "symbols": ["mod_name$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "mod_name$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mod_name", "symbols": ["mod_name$subexpression$1", "mod_name$ebnf$1"], "postprocess": id},
    {"name": "mod_name$subexpression$2", "symbols": [/[aA]/, /[uU]/, /[gG]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$2$subexpression$1", "symbols": [/[mM]/, /[eE]/, /[nN]/, /[tT]/, /[eE]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$2", "symbols": ["mod_name$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "mod_name$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mod_name", "symbols": ["mod_name$subexpression$2", "mod_name$ebnf$2"], "postprocess": id},
    {"name": "mod_name$subexpression$3", "symbols": [/[dD]/, /[iI]/, /[mM]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$3$subexpression$1", "symbols": [/[iI]/, /[nN]/, /[iI]/, /[sS]/, /[hH]/, /[eE]/, /[dD]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$3", "symbols": ["mod_name$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "mod_name$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mod_name", "symbols": ["mod_name$subexpression$3", "mod_name$ebnf$3"], "postprocess": id},
    {"name": "mod_name$subexpression$4", "symbols": [/[dD]/, /[oO]/, /[mM]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$4$subexpression$1", "symbols": [/[iI]/, /[nN]/, /[aA]/, /[nN]/, /[tT]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$4", "symbols": ["mod_name$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "mod_name$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mod_name", "symbols": ["mod_name$subexpression$4", "mod_name$ebnf$4"], "postprocess": id},
    {"name": "mod_name$subexpression$5", "symbols": [/[mM]/, /[iI]/, /[nN]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$5$string$1", "symbols": [{"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mod_name$ebnf$5", "symbols": ["mod_name$ebnf$5$string$1"], "postprocess": id},
    {"name": "mod_name$ebnf$5", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mod_name", "symbols": ["mod_name$subexpression$5", "mod_name$ebnf$5"]},
    {"name": "mod_name", "symbols": [{"literal":"m"}], "postprocess": id},
    {"name": "mod_name$subexpression$6", "symbols": [/[mM]/, /[aA]/, /[jJ]/], "postprocess": function(d) {return d.join(""); }},
    {"name": "mod_name$ebnf$6$string$1", "symbols": [{"literal":"o"}, {"literal":"r"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "mod_name$ebnf$6", "symbols": ["mod_name$ebnf$6$string$1"], "postprocess": id},
    {"name": "mod_name$ebnf$6", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mod_name", "symbols": ["mod_name$subexpression$6", "mod_name$ebnf$6"]},
    {"name": "mod_name", "symbols": [{"literal":"M"}], "postprocess": id},
    {"name": "mod$ebnf$1", "symbols": ["int"], "postprocess": id},
    {"name": "mod$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "mod", "symbols": ["mod_name", "mod$ebnf$1"]},
    {"name": "rest_id", "symbols": [{"literal":"R"}], "postprocess": id},
    {"name": "note_id", "symbols": [/[A-G]/], "postprocess": id},
    {"name": "accidental", "symbols": [{"literal":"#"}], "postprocess": id},
    {"name": "accidental", "symbols": [{"literal":"b"}], "postprocess": id},
    {"name": "separator", "symbols": [{"literal":","}]},
    {"name": "separator", "symbols": ["__"], "postprocess": ()=> null},
    {"name": "eol", "symbols": [{"literal":"\r"}, {"literal":"\n"}], "postprocess": () => null},
    {"name": "eol", "symbols": [{"literal":"\r"}]},
    {"name": "eol", "symbols": [{"literal":"\n"}], "postprocess": () => null},
    {"name": "identifier$ebnf$1", "symbols": []},
    {"name": "identifier$ebnf$1", "symbols": ["identifier$ebnf$1", /[^ :]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "identifier", "symbols": [/[A-Za-z0-9_@$]/, "identifier$ebnf$1"], "postprocess": d => d[0]+d[1].join("")},
    {"name": "value$ebnf$1", "symbols": []},
    {"name": "value$ebnf$1", "symbols": ["value$ebnf$1", /[^\n\r]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "value", "symbols": [/[^ ]/, "value$ebnf$1"], "postprocess": d => d[0]+d[1].join("")},
    {"name": "ws$ebnf$1", "symbols": []},
    {"name": "ws$ebnf$1", "symbols": ["ws$ebnf$1", /[ \s\t\v]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "ws", "symbols": ["ws$ebnf$1"], "postprocess": () => null},
    {"name": "str$ebnf$1", "symbols": [/[^\n\r]/]},
    {"name": "str$ebnf$1", "symbols": ["str$ebnf$1", /[^\n\r]/], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "str", "symbols": ["str$ebnf$1"], "postprocess": d => d[0].join("")}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
