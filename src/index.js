function eval() {
    // Do not use eval!!!
    return;
}



module.exports = {
    expressionCalculator
}

function expressionCalculator(expr){

    let finalResult = 0;

    let fullStr = expr;

    

    fullStr = fullStr.replace(/\s/g, '');

    //55*(48+(5.9*45.4+8.44-45.4*5.5))*5454)*86*92*23+(45-54)*15441-45

    //   2 * 3 * ( 1 + 2 * 4 * (1 + 2) )
    if (fullStr.match(/\([\d+\-\*\/.]+\)/)) {
        while (fullStr.match(/\([\d+\-\*\/.]+\)/)) {
            let smallStr = fullStr.match(/\([\d+\-\*\/.]+\)/);
            

            fullStr = fullStr.replace(/\([\d+\-\*\/.]+\)/, calcSmall(smallStr[0].slice(1, smallStr[0].length - 1))).replace('--', '+');
                     
            
        }

        if (fullStr.match(/\(/) || fullStr.match(/\)/)) {
            throw new Error("ExpressionError: Brackets must be paired");
        }

        finalResult = +calcSmall(fullStr);
    } else {
        if (fullStr.match(/\(/) || fullStr.match(/\)/)) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
        finalResult = calcSmall(fullStr);
    }

    return Number(finalResult);
}


//// 2 * 3 + 844 - 77 * 10      ===== >>>>  вернёт ответ
//  2 * 3 * ( 1 + 2 * 4 * (1 + 2) )
function calcSmall(str) {
    let result = 0;
    
    while (str.match(/[0-9\.]*[\*\/][0-9\.]*/)) {
        
        str = multiOrDel(str);
        str = str.replace('--', '+');
    }

    if (str.match(/[+\-]?([0-9]?[\+\-]+)/)) {
        let arrayOfSumMin = str.match(/[+\-]?([0-9\.\s]+)/g) || [];
        while(arrayOfSumMin.length) {
            result += parseFloat(arrayOfSumMin.shift());
        }
        return result;
    }
    
    return str;    
}

function multiOrDel(str) {
    let arr;
    
    while (str.match(/[-0-9\.]*[\*\/][-0-9\.]*/)) {
        str = str.replace(/[\d.]*[\*\/]+[\-]?[\d\.]*/, (str) => {
            if (str.includes('*')) {
                arr = str.split(/\*/);
                
                return +arr[0] * +arr[1];
            } 
            else {
                arr = str.split(/\//);
                // return Math.round((+arr[0] / +arr[1])*10000)/10000;
                if (arr[1] == '0') {
                    throw new TypeError('TypeError: Division by zero.');
                }
                return +arr[0] / +arr[1];
            }
        });
    }

    return str;
}

// calcSmall("2*3+844-77*10");


