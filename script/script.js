let text = document.getElementById('input_text');
let button_ok = document.getElementById('button');
let button_and = document.getElementById('button_and');
let button_or = document.getElementById('button_or');
let button_not = document.getElementById('button_not');
let button_then = document.getElementById('button_then');
let button_if = document.getElementById('button_if');
let button_p = document.getElementById('button_p');
let button_q = document.getElementById('button_q');
let button_r = document.getElementById('button_r');

function putSymbol(symbol) {
    var inputField = document.getElementById("input_text");
    
    inputField.value += symbol;
}

function delSymbol(){
    var inputField = document.getElementById("input_text");
    inputField.value = inputField.value.slice(0, -1);
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

button_p.addEventListener('click', function() {
    putSymbol('p');
});

button_q.addEventListener('click', function() {
    putSymbol('q');
});

button_r.addEventListener('click', function() {
    putSymbol('r');
});

document.getElementById('button_del').addEventListener('click', function() {
    delSymbol();
});

button_ok.addEventListener('click', function() {
    // Reinicia todo
    const imageContainer = document.getElementById("imageContainer");
    imageContainer.innerHTML = '';

    const inputText = text.value; 

    // Realiza un POST request al servidor
    fetch('/generate-circuit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ expression: inputText }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(svgContent => {
        // Muestra el SVG en el navegador
        console.log(svgContent);
        imageContainer.innerHTML = svgContent;
    })
    .catch(error => {
        console.error('Error fetching circuit diagram:', error);
    });

    // arrayOfValues = [];
    // cont = 0;
    
    // console.log(lexer());
    // console.log(parseLogicalExpression(lexer()));
});

// let cont = 0;

// function imageChange(path, index, k){
//     const newDiv = document.createElement("div");
//     newDiv.id = "images";
//     newDiv.className = "flex justify-center items-center";
//     if(k === 0){
//         newDiv.textContent = arrayOfValues[index];
//     }
//     else{
//         newDiv.textContent = arrayOfValues[index] + '\n' + k + '\n' + arrayOfValues[index+1];
//         arrayOfValues[index+1] = arrayOfValues[index] + '\n' + k + '\n' + arrayOfValues[index+1];
//         arrayOfValues.splice(index, 1)
//     }
//     index++;
//     console.log(index);
    
//     // for(let i = index; i < arrayOfValues.length; i++){
//     //     const newDiv = document.createElement("div");
//     //     newDiv.id = "images";
//     //     newDiv.textContent = arrayOfValues[i];

//     //     document.getElementById("imageContainer").appendChild(newDiv);

//     //     var image2 = document.createElement("img");
//     //     image2.src = "/images/line.png";   
        
//     //     document.getElementById("images").appendChild(image2);
//     // }

//     document.getElementById("imageContainer").appendChild(newDiv);

//     var image = document.createElement("img");
//     image.src = path;
//     image.onload = function() {
//         const newWidth = 80; 
//         const newHeight = 50; 
    
//         image.width = newWidth;
//         image.height = newHeight;
    
//         let x = 10*cont;

//         image.style.top = x + 'px';
//         image.style.left = 100 + 'px';

//         document.getElementById("images").appendChild(image);
//     };
//     return index;
// }

// function printThings(operator) {
//     let index = 0;

//     if(operator === '¬'){
//         index = imageChange("/images/not.png", index, 0);
//     }
//     else if(operator === '∨'){
//         index = imageChange("/images/OR.png", index, operator);
//     }
//     else if(operator === '∧'){
//         index = imageChange("/images/AND.png", index, operator);
//     }
//     else if(operator === '→'){
//         index = imageChange("/images/OR.png", index, operator);
//     }
//     else if(operator === '↔'){
//         index = imageChange("/images/OR.png", index, operator);
//     }
//     else{
//         return operator;
//     }
// }