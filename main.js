const utiles = require('./utiles');

// let mat1 = [
//     [1, 3, 5, 6],
//     [4, 4, 3, 8],
//     [6, 1, 1, 2],
//     [6, 1, 1, 2],
// ];

// let mat2 = [
//     [4, 4, 3, 8],
//     [1, 3, 5, 6],
//     [6, 1, 1, 2],
//     [4, 4, 3, 8],
// ];

//Second 8x8 matrices
// let mat1 = [
//     [1, 3, 5, 6, 6, 6, 0, 3],
//     [4, 4, 3, 8, 8, 6, 0, 1],
//     [6, 1, 1, 2, 5, 0 ,1, 2],
//     [6, 1, 1, 2, 4, 5, 0, 7],
//     [4, 4, 3, 8, 8, 6, 0, 1],
//     [1, 3, 5, 6, 6, 6, 0, 3],
//     [1, 3, 5, 6, 4, 4, 3, 8],
//     [4, 4, 3, 8, 6, 1, 1, 2],
// ];

// let mat2 = [
//     [4, 4, 3, 8, 6, 1, 1, 2],
//     [1, 3, 5, 6, 4, 4, 3, 8],
//     [6, 1, 1, 2, 0, 7, 2, 4],
//     [4, 4, 3, 8, 9, 0, 6, 8],
//     [4, 4, 3, 8, 6, 1, 1, 2],
//     [1, 3, 5, 6, 4, 4, 3, 8],
//     [6, 1, 1, 2, 0, 7, 2, 4],
//     [4, 4, 3, 8, 9, 0, 6, 8],
// ];

//Third 3x3 matrices
let mat1 = [
    [1, 3, 5],
    [4, 4, 3],
    [6, 1, 1],
];

let mat2 = [
    [4, 4, 3],
    [1, 3, 5],
    [6, 1, 1],
];


console.log("Naive Method");
console.log(utiles.matrixProduct(mat1, mat2));
console.log("DevideAndConqure");
console.log(utiles.devideAndConquer(mat1, mat2));
console.log("Strassen");
console.log(utiles.strassen(mat1, mat2));