function manualMultiply(matfirst, matsec)
{
    let result = new Float32Array(16).fill(0);
    result[0] = matfirst[0]*matsec[0]+ matfirst[1]*matsec[4] +matfirst[2]*matsec[8]+ matfirst[3]*matsec[12]; //Row 1, Column 1
    result[1] =  matfirst[0]*matsec[1]+ matfirst[1]*matsec[5] +matfirst[2]*matsec[9]+ matfirst[3]*matsec[13]; //Row 1, Column 2
    result[2] =  matfirst[0]*matsec[2]+ matfirst[1]*matsec[6] +matfirst[2]*matsec[10]+ matfirst[3]*matsec[14]; //Row 1, Column 3
    result[3] =  matfirst[0]*matsec[3]+ matfirst[1]*matsec[7] +matfirst[2]*matsec[11]+ matfirst[3]*matsec[15]; //Row 1, Column 4
    result[4] = matfirst[4]*matsec[0]+ matfirst[5]*matsec[4] +matfirst[6]*matsec[8]+ matfirst[7]*matsec[12]; //Row 2, Column 1
    result[5] =  matfirst[4]*matsec[1]+ matfirst[5]*matsec[5] +matfirst[6]*matsec[9]+ matfirst[7]*matsec[13]; //Row 2, Column 2
    result[6] =  matfirst[4]*matsec[2]+ matfirst[5]*matsec[6] +matfirst[6]*matsec[10]+ matfirst[7]*matsec[14]; //Row 2, Column 3
    result[7] =  matfirst[4]*matsec[3]+ matfirst[5]*matsec[7] +matfirst[6]*matsec[11]+ matfirst[7]*matsec[15]; //Row 2, Column 4
    result[8] = matfirst[8]*matsec[0]+ matfirst[9]*matsec[4] +matfirst[10]*matsec[8]+ matfirst[11]*matsec[12]; //Row 3, Column 1
    result[9] =  matfirst[8]*matsec[1]+ matfirst[9]*matsec[5] +matfirst[10]*matsec[9]+ matfirst[11]*matsec[13]; //Row 3, Column 2
    result[10] =  matfirst[8]*matsec[2]+ matfirst[9]*matsec[6] +matfirst[10]*matsec[10]+ matfirst[11]*matsec[14]; //Row 3, Column 3
    result[11] =  matfirst[8]*matsec[3]+ matfirst[9]*matsec[7] +matfirst[10]*matsec[11]+ matfirst[11]*matsec[15]; //Row 3, Column 4
    result[12] = matfirst[12]*matsec[0]+ matfirst[13]*matsec[4] +matfirst[14]*matsec[8]+ matfirst[15]*matsec[12]; //Row 4, Column 1
    result[13] =  matfirst[12]*matsec[1]+ matfirst[13]*matsec[5] +matfirst[14]*matsec[9]+ matfirst[15]*matsec[13]; //Row 4, Column 2
    result[14] =  matfirst[12]*matsec[2]+ matfirst[13]*matsec[6] +matfirst[14]*matsec[10]+ matfirst[15]*matsec[14]; //Row 4, Column 3
    result[15] =  matfirst[12]*matsec[3]+ matfirst[13]*matsec[7] +matfirst[14]*matsec[11]+ matfirst[15]*matsec[15]; //Row 4, Column 4
    console.log(result);
}
let matfirst = [
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
];

let matsec = [       
    0, 1, 2, 3,
    4, 5, 6, 7,
    8, 9, 10, 11,
    12, 13, 14, 15
];
console.log('Main.js Manual Multiplication file');
manualMultiply(matfirst, matsec);

console.log('Main.js Manual Multiplication file End ******');