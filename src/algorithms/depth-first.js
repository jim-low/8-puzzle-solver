let squares = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
const compareWith = [1,2,3,4,5,6,7,8, " "];
let data = [1,2,3,4,5,6,7,8," "];
let selectedCombinations = [];
var combinations = 0;
let amountSteps = 0;
var treeLevel = 0;

$(document).keydown(function(e) {
    switch (e.which) {
      case 37:
        left(data);
        break;
      case 38:
        up(data);
        break;
      case 39:
        right(data);
        break;
      case 40:
        down(data);
        break;
      default:
        return;
    }
    e.preventDefault();
  });

const up = () => {
    let spacePosition = data.indexOf(" ");
    switch(spacePosition){
        case 0:
        case 1:
        case 2:
        break;
        default:
        data[spacePosition] = data[spacePosition - 3];
        data[spacePosition - 3] = " ";
        break;
    }
    Square();
}

const left = () => {
    let spacePosition = data.indexOf(" ");
    switch(spacePosition){
        case 0:
        case 3:
        case 6:
        break;
        default:
        data[spacePosition] = data[spacePosition - 1];
        data[spacePosition - 1] = " ";       
        break;
    }
    Square();
}

const right = () => {
    let spacePosition = data.indexOf(" ");
    switch(spacePosition){
        case 2:
        case 5:
        case 8:
        break;
        default:
        data[spacePosition] = data[spacePosition + 1];
        data[spacePosition + 1] = " ";      
        break;
    }
    Square();
}

const down = () => {
    let spacePosition = data.indexOf(" ");
    switch(spacePosition){
        case 6:
        case 7:
        case 8:
        break;
        default:
        data[spacePosition] = data[spacePosition + 3];
        data[spacePosition + 3] = " ";       
        break;    
    }
    Square();
}

const task = () => {
    data = [1," ",6,4,7,5,8,2,3];
    Square(data);
  }

const reset = () => {
    data = [1,2,3,4,5,6,7,8," "];
    selectedCombinations = [];
    combinations = 0;
    amountSteps = 0; 
    treeLevel = 0;
    Square(data);
}
  
const Tree = () => {
    let arr = [];
    arr.push(
        squares[4], squares[0], 
        squares[12], squares[8], 
        squares[6], squares[5], 
        squares[7], squares[2], 
        squares[1], squares[3], 
        squares[13], squares[15], 
        squares[14], squares[9], 
        squares[11], squares[10]
        );

    for (let i = 1; i <= 16; i++) {
        for (let j = 0; j < 9; j++) {
            document.getElementById(`i${i}${j}`).innerHTML = `&nbsp`;
        }
    document.getElementById(`square${i}`).style.backgroundColor = "#f9f9f9";   
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > 0) {
            for (let j = 0; j < 9; j++) {
              if(arr[i][j] == " ") {
                document.getElementById(`i${i+1}${j}`).innerHTML = `&nbsp`;
              } else {
                document.getElementById(`i${i+1}${j}`).innerHTML = arr[i][j];
              }
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        if((JSON.stringify(arr[i])==JSON.stringify(data))){
            document.getElementById(`square${i+1}`).style.backgroundColor = "#c9d99e";
        }
    }
}


const Square = () => {
    for (let i = 0; i < data.length; i++) {
      if (data[i] == " ") {
        document.getElementById(`bigItem${i}`).style.backgroundColor = "#f9f9f9";
        document.getElementById(`bigItem${i}`).innerHTML = data[i];
      } else {
        if (data[i] == i + 1) {
          document.getElementById(`bigItem${i}`).style.backgroundColor =
            "#6fabaf";
          document.getElementById(`bigItem${i}`).innerHTML = data[i];
        } else {
          document.getElementById(`bigItem${i}`).style.backgroundColor =
            "#e095a6";
          document.getElementById(`bigItem${i}`).innerHTML = data[i];
        }
      }
    }
  };

const DFS = (q = 99) => {
    while((
        data[0] != compareWith[0] || 
        data[1] != compareWith[1] || 
        data[2] != compareWith[2] || 
        data[3] != compareWith[3] || 
        data[4] != compareWith[4] || 
        data[5] != compareWith[5] || 
        ((data[6] != compareWith[6]) && (data[6] != compareWith[7])) || 
        ((data[7] != compareWith[7]) && (data[7] != compareWith[6]))) && q < 100
        ) {

    let spacePosition = data.indexOf(" ");

    for (let i = 0; i < squares.length; i++) {
        squares[i] = [];
    }
    amountSteps++;
    q++;
    for (let i = 0; i < data.length; i++) {
      if(data[i] == " ") {
        document.getElementById(`i0${i}`).innerHTML = `&nbsp`;
      } else {
        document.getElementById(`i0${i}`).innerHTML = data[i];
      }
    }
    switch(spacePosition){
        case 0:
            switch(bestWay([
                movingR(data), 
                movingRR(data)+1, 
                movingRD(data)+1, 
                movingD(data), 
                movingDR(data)+1, 
                movingDD(data)+1
            ])){
              case 0: toRight(); treeLevel++; break;
              case 1: toRight(); toRight(); treeLevel += 2; break;
              case 2: toRight(); toDown(); treeLevel += 2; break;
              case 3: toDown(); treeLevel++; break;
              case 4: toDown(); toRight(); treeLevel += 2; break;
              case 5: toDown(); toDown(); treeLevel += 2; break;
            }
            break;
        case 1:
            switch(bestWay([
                movingL(data), 
                movingLD(data)+1, 
                movingR(data), 
                movingRD(data)+1,
                movingD(data),  
                movingDL(data)+1, 
                movingDR(data)+1, 
                movingDD(data)+1
            ])){
              case 0: toLeft(); treeLevel++; break;
              case 1: toLeft(); toDown(); treeLevel += 2; break;
              case 2: toRight(); treeLevel++; break;
              case 3: toRight(); toDown(); treeLevel += 2; break;
              case 4: toDown(); treeLevel++; break;
              case 5: toDown(); toLeft(); treeLevel += 2; break;
              case 6: toDown(); toRight(); treeLevel += 2; break;
              case 7: toDown(); toDown(); treeLevel += 2; break;
            }
            break;
        case 2:
            switch(bestWay([
                movingL(data), 
                movingLL(data), 
                movingLD(data), 
                movingD(data), 
                movingDL(data), 
                movingDD(data)
            ])){
              case 0: toLeft(); treeLevel++; break;
              case 1: toLeft(); toLeft(); treeLevel += 2; break;
              case 2: toLeft(); toDown(); treeLevel += 2; break;
              case 3: toDown(); treeLevel++; break;
              case 4: toDown(); toLeft(); treeLevel += 2; break;
              case 5: toDown(); toDown(); treeLevel += 2; break;
            }
            break;
        case 3:
            switch(bestWay([
                movingU(data), 
                movingUR(data), 
                movingR(data), 
                movingRU(data), 
                movingRR(data), 
                movingRD(data), 
                movingD(data), 
                movingDR(data)
            ])){
              case 0: toUp(); treeLevel++; break;
              case 1: toUp(); toRight(); treeLevel += 2; break;
              case 2: toRight(); treeLevel++; break;
              case 3: toRight(); toUp(); treeLevel += 2; break;
              case 4: toRight(); toRight(); treeLevel += 2; break;
              case 5: toRight(); toDown(); treeLevel += 2; break;
              case 6: toDown(); treeLevel++; break;
              case 7: toDown(); toRight(); treeLevel += 2; break;
            }  
            break; 
        case 4:
            switch(bestWay([
                movingU(data), 
                movingUL(data), 
                movingUR(data), 
                movingL(data), 
                movingLU(data), 
                movingLD(data), 
                movingR(data), 
                movingRU(data), 
                movingRD(data), 
                movingD(data), 
                movingDL(data), 
                movingDR(data)
            ])){
                case 0: toUp(); treeLevel++; break;
                case 1: toUp(); toLeft(); treeLevel += 2; break;
                case 2: toUp(); toRight(); treeLevel += 2; break;
                case 3: toLeft(); treeLevel++; break;
                case 4: toLeft(); toUp(); treeLevel += 2; break;
                case 5: toLeft(); toDown(); treeLevel += 2; break;
                case 6: toRight(); treeLevel++; break;
                case 7: toRight(); toUp(); treeLevel += 2; break;
                case 8: toRight(); toDown(); treeLevel += 2; break;
                case 9: toDown(); treeLevel++; break;
                case 10: toDown(); toLeft(); treeLevel += 2; break;
                case 11: toDown(); toRight(); treeLevel += 2; break; 
            } 
            break;
        case 5:
            switch(bestWay([
                movingU(data), 
                movingUL(data), 
                movingL(data), 
                movingLU(data), 
                movingLL(data), 
                movingLD(data), 
                movingD(data), 
                movingDL(data)
            ])){
              case 0: toUp(); treeLevel++; break;
              case 1: toUp(); toLeft(); treeLevel += 2; break;
              case 2: toLeft(); treeLevel++; break;
              case 3: toLeft(); toUp(); treeLevel += 2; break;
              case 4: toLeft(); toLeft(); treeLevel += 2; break;
              case 5: toLeft(); toDown(); treeLevel += 2; break;
              case 6: toDown(); treeLevel++; break;
              case 7: toDown(); toLeft(); treeLevel += 2; break;
            } 
            break;
        case 6:
            switch(bestWay([
                movingU(data), 
                movingUU(data), 
                movingUR(data), 
                movingR(data), 
                movingRU(data), 
                movingRR(data)
            ])){
                case 0: toUp(); treeLevel++; break;
                case 1: toUp(); toUp(); treeLevel += 2; break;
                case 2: toUp(); toRight(); treeLevel += 2; break;
                case 3: toRight(); treeLevel++; break;
                case 4: toRight(); toUp(); treeLevel += 2; break;
                case 5: toRight(); toRight(); treeLevel += 2; break;
            }
            break;
        case 7:
            switch(bestWay([
                movingU(data), 
                movingUU(data), 
                movingUL(data), 
                movingUR(data), 
                movingL(data), 
                movingLU(data), 
                movingR(data), 
                movingRU(data)
            ])){
              case 0: toUp(); treeLevel++; break;
              case 1: toUp(); toUp(); treeLevel += 2; break;
              case 2: toUp(); toLeft(); treeLevel += 2; break;
              case 3: toUp(); toRight(); treeLevel += 2; break;
              case 4: toLeft(); treeLevel++; break;
              case 5: toLeft(); toUp(); treeLevel += 2; break;
              case 6: toRight(); treeLevel++; break;
              case 7: toRight(); toUp(); treeLevel += 2; break;
            }
            break;
        case 8:
            switch(bestWay([
                movingU(data), 
                movingUU(data), 
                movingUL(data), 
                movingL(data), 
                movingLU(data), 
                movingLL(data)
            ])){
              case 0: toUp(); treeLevel++; break;
              case 1: toUp(); toUp(); treeLevel += 2; break;
              case 2: toUp(); toLeft(); treeLevel += 2; break;
              case 3: toLeft(); treeLevel++; break;
              case 4: toLeft(); toUp(); treeLevel += 2; break;
              case 5: toLeft(); toLeft();treeLevel += 2;  break;
            }
            break;
    }

    let array = [];
    for (let i = 0; i < data.length; i++) {
        array.push(data[i]);
    }
    console.log("Кількість комбінацій " + amountSteps);
    console.log("кількість ходів до вирішення " + combinations);
    console.log("Глибина дерева " + treeLevel);
    selectedCombinations.push(array);
    Tree();
    Square();
    }
    if(JSON.stringify(compareWith)==JSON.stringify(data)){
        combinations = 0;
        amountSteps = 0;
        selectedCombinations = [];
    }
}

const shuffle = () => {
    for(let i = 0; i < 777; i++){
        let x = Math.floor(Math.random() * 4);
        switch(x){
            case 0:
            toUp();
            break;
            case 1:
            toDown();
            break;
            case 2:
            toLeft();
            break;
            case 3:
            toRight();
            break;
        }
    }
    combinations = 0;
    treeLevel = 0;
    amountSteps = 0;
    selectedCombinations = [];
    Square();
}


const bestWay = (moves) => {
    let p = moves[0];
    for(let i = 1; i < moves.length; i++){
        if(moves[i] < p){
            p = moves[i];
        }
    }
    return moves.indexOf(p);
}

const amountFalsePositions = (data) => {
    combinations++;
    for(let i = 0; i < selectedCombinations.length; i++){
        if(JSON.stringify(selectedCombinations[i])==JSON.stringify(data)){
            return 99;
        }
    }
    
    let a = 8;
    for(let i = 0; i < data.length; i++){
        if(data[i] == i + 1){
            a--;
        }
    }
    distanceToPosition(data);
    return a;
}

const distanceToPosition = (data) => {
    let f = 0
    for (let i = 0; i < data.length; i++) {
        f += forDistanceToPosition(i, data[i]);
    }
    return f;
}

const forDistanceToPosition = (spacePosition, item) => {
    switch(spacePosition){
        case 0:
            switch(item){
                case 1: return 0;
                case 2: return 1;
                case 3: return 2;
                case 4: return 1;
                case 5: return 2;
                case 6: return 3;
                case 7: return 2;
                case 8: return 3;
                default: return 0;
            }
        case 1:
            switch(item){
                case 1: return 1;
                case 2: return 0;
                case 3: return 1;
                case 4: return 2;
                case 5: return 1;
                case 6: return 2;
                case 7: return 3;
                case 8: return 3;
                default: return 0;
            }
        case 2:
            switch(item){
                case 1: return 2;
                case 2: return 1;
                case 3: return 0;
                case 4: return 3;
                case 5: return 2;
                case 6: return 1;
                case 7: return 4;
                case 8: return 3;
                default: return 0;
            }
        case 3:
            switch(item){
                case 1: return 1;
                case 2: return 2;
                case 3: return 3;
                case 4: return 0;
                case 5: return 1;
                case 6: return 2;
                case 7: return 1;
                case 8: return 2;
                default: return 0;
            }
        case 4:
            switch(item){
                case 1: return 2;
                case 2: return 1;
                case 3: return 2;
                case 4: return 1;
                case 5: return 0;
                case 6: return 1;
                case 7: return 2;
                case 8: return 1;
                default: return 0;
            }
        case 5:
            switch(item){
                case 1: return 3;
                case 2: return 2;
                case 3: return 1;
                case 4: return 2;
                case 5: return 1;
                case 6: return 0;
                case 7: return 3;
                case 8: return 2;
                default: return 0;
            }
        case 6:
            switch(item){
                case 1: return 2;
                case 2: return 3;
                case 3: return 4;
                case 4: return 1;
                case 5: return 2;
                case 6: return 3;
                case 7: return 0;
                case 8: return 1;
                default: return 0;
            }
        case 7:
            switch(item){
                case 1: return 3;
                case 2: return 2;
                case 3: return 3;
                case 4: return 2;
                case 5: return 1;
                case 6: return 2;
                case 7: return 1;
                case 8: return 0;
                default: return 0;
            }
        case 8:
            switch(item){
                case 1: return 4;
                case 2: return 3;
                case 3: return 2;
                case 4: return 3;
                case 5: return 2;
                case 6: return 1;
                case 7: return 2;
                case 8: return 1;
                default: return 0;
            }
    }
}

const toUp = () => {
    let spacePosition = data.indexOf(" ");
    switch(spacePosition){
        case 0:
        case 1:
        case 2:
        break;
        default:
        data[spacePosition] = data[spacePosition - 3];
        data[spacePosition - 3] = " ";
        break;
    }
}

const toDown = () => {
    let spacePosition = data.indexOf(" ");
    switch(spacePosition){
        case 6:
        case 7:
        case 8:
        break;
        default:
        data[spacePosition] = data[spacePosition + 3];
        data[spacePosition + 3] = " ";       
        break;
    }
}

const toLeft = () => {
    let spacePosition = data.indexOf(" ");
    switch(spacePosition){
        case 0:
        case 3:
        case 6:
        break;
        default:
        data[spacePosition] = data[spacePosition - 1];
        data[spacePosition - 1] = " ";       
        break;
    }
}

const toRight = () => {
    let spacePosition = data.indexOf(" ");
    switch(spacePosition){
        case 2:
        case 5:
        case 8:
        break;
        default:
        data[spacePosition] = data[spacePosition + 1];
        data[spacePosition + 1] = " ";      
        break;
    }
}

const movingL = () => {
    toLeft();
    squares[0] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toRight();
    return z ;
}

const movingU = () => {
    toUp();
    squares[4] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toDown();
    return z ;
}

const movingD = () => {
    toDown();
    squares[8] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toUp();
    return z ;
}


const movingR = () => {
    toRight();
    squares[12] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toLeft();
    return z ;
}


const movingLL = () => {
    toLeft();
    toLeft();
    squares[1] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toRight();
    toRight();
    return z ;
}
const movingLU = () => {
    toLeft();
    toUp();
    squares[2] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toDown();
    toRight();
    return z ;
}
const movingLD = () => {
    toLeft();
    toDown();
    squares[3] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toUp();
    toRight();
    return z ;
}

const movingUL = () => {
    toUp();
    toLeft();
    squares[5] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toRight();
    toDown();
    return z ;
}

const movingUU = () => {
    toUp();
    toUp();
    squares[6] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toDown();
    toDown();
    return z ;
}

const movingUR = () => {
    toUp();
    toRight();
    squares[7] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toLeft();
    toDown();
    return z ;
}

const movingDL = () => {
    toDown();
    toLeft();
    squares[9] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toRight();
    toUp();
    return z ;
}

const movingDD = () => {
    toDown();
    toDown();
    squares[10] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toUp();
    toUp();
    return z ;
}

const movingDR = () => {
    toDown();
    toRight();
    squares[11] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toLeft();
    toUp();
    return z ;
}

const movingRU = () => {
    toRight();
    toUp();
    squares[13] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toDown();
    toLeft();
    return z ;
}
const movingRD = () => {
    toRight();
    toDown();
    squares[14] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toUp();
    toLeft();
    return z ;
}
const movingRR = () => {
    toRight();
    toRight();
    squares[15] = [...data];
    let z = amountFalsePositions(data) + distanceToPosition(data);
    toLeft();
    toLeft();
    return z ;
}
