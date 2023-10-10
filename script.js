let text = document.getElementById('input_text');
let button_ok = document.getElementById('button');
let button_and = document.getElementById('button_and');
let button_or = document.getElementById('button_or');
let button_not = document.getElementById('button_not');
let button_then = document.getElementById('button_then');
let button_if = document.getElementById('button_if');

const symbols = {
    'if': "",
    'then': "",
    'not': "",
    'or': "",
    'and': ""    
}

function putSymbol(symbol) {
    var inputField = document.getElementById("input_text");
    
    inputField.value += symbol;
}

button_if.addEventListener('click', function() {
    putSymbol(String.fromCodePoint(0x2194));
});

button_then.addEventListener('click', function() {
    putSymbol(String.fromCodePoint(0x2192));
});

button_not.addEventListener('click', function() {
    putSymbol(String.fromCodePoint(0x00AC));
});

button_or.addEventListener('click', function() {
    putSymbol(String.fromCodePoint(0x2228));
});

button_and.addEventListener('click', function() {
    putSymbol(String.fromCodePoint(0x2227));
})

button_ok.addEventListener('click', function() {
    console.log(lexer());
    console.log(parseLogicalExpression(lexer()));
});

let conectores = ['↔', '→', '¬', '∨', '∧'];
let parentesis = ['(', ')'];

function lexer(){
    let newText = text.value;
    let tokens = [];
    for(let i = 0; i < newText.length; i++){
        if(conectores.includes(newText[i])){
            tokens.push(newText[i]);
        }
        else if(parentesis.includes(newText[i])){
            tokens.push(newText[i]);
        }
        else{
            tokens.push(newText[i]);
        }
    }
    return tokens;
}

class LogicalNode {
    constructor(operator, left = null, right = null) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }
}

class OperandNode {
    constructor(value) {
        this.value = value;
    }
}

function parseLogicalExpression(tokens) {
    let index = 0;

    function parseExpression() {
        let node = parseTerm();

        while (tokens[index] === '∨' || tokens[index] === '∧' || tokens[index] === '→' || tokens[index] === '↔'){
            const operator = tokens[index++];
            const right = parseTerm();
            node = new LogicalNode(operator, node, right);
            console.log(node.operator);
        }

        return node;
    }

    function parseTerm() {
        if (tokens[index] === '¬') {
            index++;
            return new LogicalNode('¬', parseTerm());
        }

        if (tokens[index] === '(') {
            index++;
            const node = parseExpression();
            if (tokens[index] !== ')') {
                throw new Error('Expected closing parenthesis');
            }
            index++;
            console.log(node.operator);
            return node;
        }

        return new OperandNode(tokens[index++] === 'p');
    }

    return parseExpression();
}
