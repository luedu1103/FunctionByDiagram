const graphviz = require('graphviz');
const cors = require('cors');
const express = require('express');
const app = express();

app.use('/dist', express.static('dist'));
app.use('/images', express.static('images'));
app.use(express.static('files'));
app.use('/script', express.static('script'));
app.use('/src', express.static('src'));
app.use(cors());
app.use(express.json()); // Enable JSON parsing middleware

const port = 3000;

let conectores = ['↔', '→', '¬', '∨', '∧'];
let parentesis = ['(', ')'];

function lexer(inputText){
    let newText = inputText;
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

// Paths para cada operador
const operatorImages = {
    '∨': '/images/OR.png',
    '∧': '/images/AND.png',
    '→': '/images/then.png',
    '↔': '/images/biconditional.png',
    '¬': '/images/not.png',
};

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
    console.log(ast);
    
    return ast;
}


app.post('/generate-circuit', async(req, res) => {
    try {
        const inputText = await req.body.expression; // Get the input text from the request body
        const tokens = lexer(inputText); // Parse the input text (assuming lexer is a function you've defined)
        const svgContent = await parseLogicalExpression(tokens); // Generate the SVG content
        res.setHeader('Content-Type', 'image/svg+xml');
        res.send(svgContent);
    } catch (error) {
        console.error('Error generating circuit diagram:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.get('/generate-circuit', (req, res) => {
//     const tokens = lexer(); // Assume you have a lexer function defined
//     const svgContent = parseLogicalExpression(tokens); // Assume you have a parseLogicalExpression function defined
//     res.setHeader('Content-Type', 'image/svg+xml');
//     res.send(svgContent);
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});