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
    // Reinicia todo
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = '';

    arrayOfValues = [];
    cont = 0;
    
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

let cont = 0;

function imageChange(path, index, k){
    const newDiv = document.createElement("div");
    newDiv.id = "images";
    if(k === 0){
        newDiv.textContent = arrayOfValues[index];
    }
    else{
        newDiv.textContent = arrayOfValues[index] + '\n' + k + '\n' + arrayOfValues[index+1];
        arrayOfValues[index+1] = arrayOfValues[index] + '\n' + k + '\n' + arrayOfValues[index+1];
        arrayOfValues.splice(index, 1)
    }
    index++;
    console.log(index);
    
    // for(let i = index; i < arrayOfValues.length; i++){
    //     const newDiv = document.createElement("div");
    //     newDiv.id = "images";
    //     newDiv.textContent = arrayOfValues[i];

    //     document.getElementById("imageContainer").appendChild(newDiv);

    //     var image2 = document.createElement("img");
    //     image2.src = "/images/line.png";   
        
    //     document.getElementById("images").appendChild(image2);
    // }

    document.getElementById("imageContainer").appendChild(newDiv);

    var image = document.createElement("img");
    image.src = path;
    image.onload = function() {
        const newWidth = 80; 
        const newHeight = 50; 
    
        image.width = newWidth;
        image.height = newHeight;
    
        let x = 10*cont;

        image.style.top = x + 'px';
        image.style.left = 100 + 'px';

        document.getElementById("images").appendChild(image);
        cont++;
    };
    return index;
}

function printThings(operator) {
    let index = 0;

    if(operator === '¬'){
        index = imageChange("/images/not.png", index, 0);
    }
    else if(operator === '∨'){
        index = imageChange("/images/OR.png", index, operator);
    }
    else if(operator === '∧'){
        index = imageChange("/images/AND.png", index, operator);
    }
    else if(operator === '→'){
        index = imageChange("/images/OR.png", index, operator);
    }
    else if(operator === '↔'){
        index = imageChange("/images/OR.png", index, operator);
    }
    else{
        return operator;
    }
}