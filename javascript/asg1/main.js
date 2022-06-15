
// validate

function validateNumber(number){
    if(isNaN(number)){
        return false;
    }else{
        return true;
    }
}

function validateArrayEmpty(arr){
    if(arr.length > 0){
        return false;
    }else{
        return true;
    }
}


function validateArrayHasString(arr){
    let isHasString = false;

    arr.forEach(element => {
        if(!validateNumber(element)){
          isHasString = true;
        }
    });

    return isHasString;
}


// Câu 1: Arguments và object

function customCalc(...arguments ){
    let arr = [...arguments];
    let arrLength = arr.length;

    if(validateArrayEmpty(arr)){
        return false;
    }

    if(validateArrayHasString(arr)){
        return false;
    }

    arr.sort((a,b) => a - b);
    let sum = arr.reduce((a, b) => a + b, 0) 
    let avg = sum / arr.length;
    
    let objec = {
        max: arr[arrLength - 1],
        min: arr[0],
        avg: avg,
        sum: sum
    }
    console.log(objec);
}

customCalc(2,5,8,11,33)

// Câu 2: Callback

function customFilter(arr,callback){
    let newArr = Array();

    if(validateArrayEmpty(arr)){
        return [];
    }

    arr.forEach((element,index) => {
        let result;
        if(callback(element,index)){
            result = element;
            newArr.push(result);
        }
    });

    console.log(newArr)
}

customFilter([2,7,33,64,4], function (value) {
    return value > 5;
});


customFilter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9],function(value){
    return value % 2 === 0 ? true :false;
})

customFilter([],function(value){
    return value % 2 === 0 ? true :false;
})