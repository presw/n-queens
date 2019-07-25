/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n, piecesCount = 0, board, nextValidCoords = [0, 0]) {

  var solution = undefined;

  if (arguments.length === 1) {
    board = new Board({n: n});
  }

  var rowIndex = nextValidCoords[0];
  var columnIndex = nextValidCoords[1];

  while (rowIndex < n) {
    for (var i = columnIndex; i < n; i++) {

      var newBoard = cloneBoard(n, board);
      newBoard.togglePiece(rowIndex, i);
      if (!newBoard.hasAnyRowConflicts() && !newBoard.hasAnyColConflicts()) {
        var newValidCoords = [];
        if (i + 1 >= n) {
          newValidCoords[0] = rowIndex + 1;
          newValidCoords[1] = 0;
        } else {
          newValidCoords[0] = rowIndex;
          newValidCoords[1] = i + 1;
        }

        if (piecesCount+1 < n) {
          solution = findNRooksSolution(n, piecesCount+1, newBoard, newValidCoords);
          if (Array.isArray(solution)) {
            console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
            return solution;
          }
        } else {
          return createSolution(n, newBoard);
        }
      }
    }
    rowIndex++;
    columnIndex = 0;
  }
  // if arguments.length === 1 {
  // board = new Board(n);
  // }

  // rowIndex = nextValidCoords[0];
  // columnIndex = nextValidCoords[1];
  /*
  // while row (dependant on nextValidCoords) < n
  // for loop to add pieces (use nextValidCoords for starting for loop)
    // place a piece starting at nextValidCoords;
    // check for validity - column and row
      // increment count
      // set nextValidCoords (current row and index + 1) // 0, 2 = 0, 3
        // if index >= n
          // nextRow = row + 1
          // nextColumn = 0
          // this pair is passed in as nextValidCoords
      // if piecesCount < n
        // set solution to recurse
        // if (Array.isArray(solution){
          // return solution
      // else
        // return board
  // end
  // row++
  // columnIndex = 0;
  */
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, piecesCount = 0, board, nextValidCoords = [0, 0]) {
  
  // var solution = [];
  // console.log("TOP of the HOUR");
  // console.log(board);
  var solution = 0;
  if (typeof board === 'undefined') {
    board = new Board({n: n});
  }

  var rowIndex = nextValidCoords[0];
  var columnIndex = nextValidCoords[1];

  while (rowIndex < n) {
    for (var i = columnIndex; i < n; i++) {

      var newBoard = cloneBoard(n, board);
      newBoard.togglePiece(rowIndex, i);
      
      // console.log(`OldBoard: ${piecesCount+1}`);
      // console.log(n + ': count : original');
      // console.log(board);
      // console.log('new');
      // console.log(newBoard);
      
      if (!newBoard.hasAnyRowConflicts() && !newBoard.hasAnyColConflicts()) {
        var newValidCoords = [];
        if (i + 1 >= n) {
          newValidCoords[0] = rowIndex + 1;
          newValidCoords[1] = 0;
        } else {
          newValidCoords[0] = rowIndex;
          newValidCoords[1] = i + 1;
        }

        if (piecesCount+1 < n) {
          solution += countNRooksSolutions(n, piecesCount+1, newBoard, newValidCoords);
        } else {
          return 1;
        }
      }
    }
    rowIndex++;
    columnIndex = 0;
  }
  // if arguments.length === 1 {
  // board = new Board(n);
  // }

  // rowIndex = nextValidCoords[0];
  // columnIndex = nextValidCoords[1];
  /*
  // while row (dependant on nextValidCoords) < n
  // for loop to add pieces (use nextValidCoords for starting for loop)
    // place a piece starting at nextValidCoords;
    // check for validity - column and row
      // increment count
      // set nextValidCoords (current row and index + 1) // 0, 2 = 0, 3
        // if index >= n
          // nextRow = row + 1
          // nextColumn = 0
          // this pair is passed in as nextValidCoords
      // if piecesCount < n
        // set solution to recurse
        // if (Array.isArray(solution){
          // return solution
      // else
        // return board
  // end
  // row++
  // columnIndex = 0;
  */
  console.log('Number of solutions for ' + n + ' rooks:', solution);
  console.log("SOLUTION HERE");
  console.log(solution);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// Helper Functions:
window.createSolution = function(n, board) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i].slice());
  }
  return solution;
};

window.cloneBoard = function(n, oldBoard) {
  var newBoard = new Board({n: n});
  for (var i = 0; i < n; i++) {
    newBoard.attributes[i] = oldBoard.attributes[i].slice();
  }
  return newBoard;
  // create new board
  // iterate through old board
  // set matching new board index to slice of oldBoard index
  // return newBoard
};
