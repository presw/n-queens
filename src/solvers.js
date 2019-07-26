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

  var solution = 0;

  if (arguments.length === 1) {
    board = new Board({n: n});
  }

  var rowIndex = nextValidCoords[0];
  var columnIndex = nextValidCoords[1];

  while (rowIndex < n) {
    for (var i = columnIndex; i < n; i++) {

      var newBoard = board;
      newBoard.togglePiece(rowIndex, i);
      if (newBoard.hasAnyRowConflicts()) {
        newBoard.togglePiece(rowIndex, i);
        break;
      }

      if (!newBoard.hasRowConflictAt(rowIndex) && !newBoard.hasColConflictAt(i)) {
        var newValidCoords = newCoords(n, rowIndex, i);
        if (piecesCount+1 < n) {
          solution = findNRooksSolution(n, piecesCount+1, newBoard, newValidCoords);
          if (Array.isArray(solution)) {
            return solution;
          }
        } else {
          solution = createSolution(n, newBoard);
          console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
          return solution;
        }
      }
      newBoard.togglePiece(rowIndex, i);
    }
    rowIndex++;
    columnIndex = 0;
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, piecesCount = 0, board, nextValidCoords = [0, 0]) {
  // var solution = 0;

  // if (arguments.length === 1) {
  //   board = new Board({n: n});
  // }

  // if (piecesCount >= n) {
  //   return 1;
  // }

  // var rowIndex = nextValidCoords[0];
  // var columnIndex = nextValidCoords[1];

  // while (rowIndex < n) {
  //   for (var i = columnIndex; i < n; i++) {
  //     var newBoard = board;
  //     newBoard.togglePiece(rowIndex, i);
  //     if (newBoard.hasAnyRowConflicts()) {
  //       newBoard.togglePiece(rowIndex, i);
  //       break;
  //     }
  //     if (!newBoard.hasRowConflictAt(rowIndex) && !newBoard.hasColConflictAt(i)) {
  //       var newValidCoords = newCoords(n, rowIndex, i);
  //       solution += countNRooksSolutions(n, piecesCount+1, newBoard, newValidCoords);
  //     }
  //     newBoard.togglePiece(rowIndex, i);
  //   }
  //   rowIndex++;
  //   columnIndex = 0;
  // }

  // if (nextValidCoords && nextValidCoords[0] === 0 && nextValidCoords[1] === 0) {
  //   console.log('Number of solutions for ' + n + ' rooks:', solution);
  // }
  // return solution;
  // return n;

  var factorial = function fac(n) { return n < 2 ? 1 : n * fac(n - 1); };
  return factorial(n);
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n, piecesCount = 0, board, nextValidCoords = [0, 0]) {

  var solution = [];

  if (arguments.length === 1) {
    board = new Board({n: n});
  }

  if (n === 2 || n === 3) {
    var tempBoard = new Board({n: n});
    solution = createSolution(n, tempBoard);
    return solution;
  }

  var rowIndex = nextValidCoords[0];
  var columnIndex = nextValidCoords[1];

  while (rowIndex < n) {
    for (var i = columnIndex; i < n; i++) {

      var newBoard = board;
      newBoard.togglePiece(rowIndex, i);
      if (newBoard.hasAnyRowConflicts()) {
        newBoard.togglePiece(rowIndex, i);
        break;
      }

      if (!newBoard.hasRowConflictAt(rowIndex) && !newBoard.hasColConflictAt(i)
          && !newBoard.hasMajorDiagonalConflictAt(i - rowIndex)
          && !newBoard.hasMinorDiagonalConflictAt(i + rowIndex)) {

        var newValidCoords = newCoords(n, rowIndex, i);

        if (piecesCount+1 < n) {
          solution = findNQueensSolution(n, piecesCount+1, newBoard, newValidCoords);
          if (solution.length) {
            return solution;
          }
        } else {
          solution = createSolution(n, newBoard);
          console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
          return solution;
        }
      }
      newBoard.togglePiece(rowIndex, i);
    }
    rowIndex++;
    columnIndex = 0;
  }

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n, piecesCount = 0, board, nextValidCoords = [0, 0]) {

  var solution = 0;
  if (arguments.length === 1) {
    board = new Board({n: n});
  }

  if (n === 2 || n === 3) {

    return 0;
  }

  if (piecesCount >= n && n !== 0) {
    return 1;
  }

  var rowIndex = nextValidCoords[0];
  var columnIndex = nextValidCoords[1];
  while (rowIndex < n) {
    for (var i = columnIndex; i < n; i++) {

      var newBoard = board;
      newBoard.togglePiece(rowIndex, i);
      if (newBoard.hasAnyRowConflicts()) {
        newBoard.togglePiece(rowIndex, i);
        break;
      }

      if (!newBoard.hasRowConflictAt(rowIndex) && !newBoard.hasColConflictAt(i)
          && !newBoard.hasMajorDiagonalConflictAt(i - rowIndex)
          && !newBoard.hasMinorDiagonalConflictAt(i + rowIndex)) {
        var newValidCoords = newCoords(n, rowIndex, i);
        solution += countNQueensSolutions(n, piecesCount+1, newBoard, newValidCoords);
      }
      newBoard.togglePiece(rowIndex, i);
    }
    rowIndex++;
    columnIndex = 0;
  }
  if (nextValidCoords && nextValidCoords[0] === 0 && nextValidCoords[1] === 0) {
    console.log('Number of solutions for ' + n + ' queens:', solution);
  }
  return solution;
};

// Helper Functions:
window.createSolution = function(n, board) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    solution.push(board.attributes[i].slice());
  }
  return solution;
};

var newCoords = (n, r, c) => {
  var coordsArray = [];
  if (c + 1 >= n) {
    coordsArray[0] = r + 1;
    coordsArray[1] = 0;
  } else {
    coordsArray[0] = r;
    coordsArray[1] = c + 1;
  }
  return coordsArray;
}
