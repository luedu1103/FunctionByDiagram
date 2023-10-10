let text = document.getElementById('input_text');
let button_ok = document.getElementById('button');
let button_and = document.getElementById('button_and');
let button_or = document.getElementById('button_or');
let button_not = document.getElementById('button_not');
let button_then = document.getElementById('button_then');
let button_if = document.getElementById('button_if');

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
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = '';
    
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
        else if(newText[i] === ' '){
            continue;
        }
        else{
            tokens.push(newText[i]);
        }
    }
    return tokens;
}

// Array of values lol
let arrayOfValues = [];

// Arbol sintactico
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
            // console.log(node.operator);
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
            // console.log(node.operator);
            return node;
        }

        arrayOfValues.push(tokens[index]);
        return new OperandNode(tokens[index++]);
    }

    const ast = parseExpression();

    function printNodesInOrder(node) {
        if (node instanceof LogicalNode) {
            printNodesInOrder(node.left);
            console.log(node.operator);
            printThings(node.operator);
            printNodesInOrder(node.right);
        } else if (node instanceof OperandNode) {
            console.log(node.value);
        }
    }

    // Imprime los nodos en orden
    printNodesInOrder(ast);

    return ast;
}

function printThings(operator) {
    let index = 0;
    console.log(arrayOfValues);

    if(operator === '¬'){
        const newDiv = document.createElement("div");
        newDiv.id = "images";
        newDiv.textContent = arrayOfValues[index];
        index++;
        document.getElementById("imageContainer").appendChild(newDiv);

        var image = document.createElement("img");
        image.src = "/images/nishika.png"; 
        document.getElementById("images").appendChild(image);
    }
    else if(operator === '∨'){
        const newDiv = document.createElement("div");
        newDiv.id = "images";
        newDiv.textContent = arrayOfValues[index] + ' ' + operator + ' ' + arrayOfValues[index+1];
        arrayOfValues[index] = arrayOfValues[index] + ' ' + operator + ' ' + arrayOfValues[index+1];
        arrayOfValues.splice(index+1, 1)
        index = index + 1;
        document.getElementById("imageContainer").appendChild(newDiv);

        var image = document.createElement("img");
        image.src = "/images/Kyriu.png"; 
        document.getElementById("imageContainer").appendChild(image);
    }
    else if(operator === '∧'){
        return '∧';
    }
    else if(operator === '→'){
        return '→';
    }
    else if(operator === '↔'){
        return '↔';
    }
    else{
        return operator;
    }
}