
function sumOfEachRow(mat) {
    let arr = [];
    for (let i = 0; i < mat.length; i++) {
        arr.push(sumOfArray(mat[i]));
    }
    return arr;
}

function sumOfArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function sum(mat1, mat2) {
    let c = [];
    for (let i = 0; i < mat1.length; i++) {
        c.push([]);
        for (let j = 0; j < mat1[i].length; j++) {
            c[i].push(mat1[i][j] + mat2[i][j]);
        }
    }
    return c;
}

function sub(mat1, mat2) {
    let c = [];
    for (let i = 0; i < mat1.length; i++) {
        c.push([]);
        for (let j = 0; j < mat1[i].length; j++) {
            c[i].push(mat1[i][j] - mat2[i][j]);
        }
    }
    return c;
}

function merge(mat, resltMat, i, j) {
    for (let i1 = 0 ,i2 = i; i1 < mat.length; i1++, i2++) {
        for (let j1 = 0, j2 = j; j1 < mat.length; j1++, j2++) {
            resltMat[i2][j2] = mat[i1][j1];
        }
    }
}

function split(mat, i, j) {
    let n = mat.length;
    let matrix = [];
    for (let x = 0; x < n / 2; x++) {
        matrix[x] = mat[i ? (n / 2) + x : x].slice(j ? n / 2 : 0, j ? n : n / 2 );
    }
    return matrix;
}

function fill(matrix, size, begining = 0) {
    for(var i = 0; i < size; i++) {
        if (i >= begining) matrix[i] = [];
        for(var j = begining > i ? begining :0; j < size; j++) {
            matrix[i][j] = 0;
        }
    }
}

function matrixByCoef(mat, coef) {
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat.length; j++) {
            mat[i][j] *= coef;
        }
    }
    return mat;
}

function isPowOfTwo(n) {
    return Math.log2(n) % 1 === 0;
}

function nearestPowTwo(n) {
    let power = 1;
    while (power < n) {
        power *= 2;
    }
    return power;
}

function reshape(matrix, size) {
    matrix = matrix.slice(0, size );
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = matrix[i].slice(0, size);
    }
    return matrix;
}

function matrixProduct(mat1, mat2) {
    let c = [];
    const n = mat1.length;
    for (let i = 0; i < n; i++) {
        c[i] = [];
        for (let j = 0; j < n; j++){
            let sum = 0;
            for (let k = 0; k < n; k++) {
                sum += mat1[i][k] * mat2[k][j];
            }
            c[i][j] = sum;
        }
    }
    return c;
}

function devideAndConquer(a, b){
    const n = a.length;

    let c = [[]];
    fill(c, n);

    if (n === 1) {
        c[0][0] = a[0][0] * b[0][0];
    } else if (isPowOfTwo(n)){
        let c11 = sum(
            devideAndConquer(split(a, 0, 0), split(b, 0, 0)),
            devideAndConquer(split(a, 0, 1), split(b, 1, 0))
        );
        let c12 = sum(
            devideAndConquer(split(a, 0, 0), split(b, 0, 1)),
            devideAndConquer(split(a, 0, 1), split(b, 1, 1))
        );
        let c21 = sum(
            devideAndConquer(split(a, 1, 0), split(b, 0, 0)),
            devideAndConquer(split(a, 1, 1), split(b, 1, 0))
        );
        let c22 = sum(
            devideAndConquer(split(a, 1, 0), split(b, 0, 1)),
            devideAndConquer(split(a, 1, 1), split(b, 1, 1))
        );

        merge(c11, c, 0, 0);
        merge(c12, c, 0, n / 2);
        merge(c21, c, n / 2, 0);
        merge(c22, c, n / 2, n /2);
    } else {
        let newLen = nearestPowTwo(n);
        fill(c, newLen);
        fill(a, newLen, n);
        fill(b, newLen, n);
      

        c = devideAndConquer(a, b);
        a = reshape(a, n);
        b = reshape(b, n);
        c = reshape(c, n);
  
    }
    return c;
}

function strassen(a, b) {
    let n = a.length;

    let c = [[]];

    if (n === 1) {
        c[0][0] = a[0][0] * b[0][0];
    } else if (isPowOfTwo(n)) {
        fill(c, n);

        let a11 = split(a, 0, 0);
        let a12 = split(a, 0, 1);
        let a21 = split(a, 1, 0);
        let a22 = split(a, 1, 1);

        let b11 = split(b, 0, 0);
        let b12 = split(b, 0, 1);
        let b21 = split(b, 1, 0);
        let b22 = split(b, 1, 1);

        const q1 = strassen(sub(a11, a12), b22);
        const q2 = strassen(sub(a21, a22), b11);
        const q3 = strassen(a22, sum(b11, b21));
        const q4 = strassen(a11, sum(b12, b22));
        const q5 = strassen(sum(a11, a22), sub(b22, b11));
        const q6 = strassen(sum(a11, a21), sum(b11, b12));
        const q7 = strassen(sum(a12, a22), sum(b21, b22));

        const c11 = sub(sub(q1, q3), sub(q5, q7));
        const c12 = sub(q4, q1);
        const c21 = sum(q2, q3);
        const c22 = sum(sub(matrixByCoef(q2, -1), q4), sum(q5, q6));

        merge(c11, c, 0, 0);
        merge(c12, c, 0, n / 2);
        merge(c21, c, n / 2, 0);
        merge(c22, c, n / 2, n /2);
    } else {
        let newLen = nearestPowTwo(n);
        fill(c, newLen);
        fill(a, newLen, n);
        fill(b, newLen, n);

        c = strassen(a, b);
        c = reshape(c, n);
        a = reshape(a, n);
        b = reshape(b, n);
    }
    return c;
}




module.exports = { sumOfEachRow, sum, matrixProduct, devideAndConquer, strassen};