import Player from '../player';
import Board from '../board';
import Square from '../square';


export default class Piece {
    public player: Player;
    public hasMoved: boolean;

    public constructor(player: Player) {
        this.player = player;
        this.hasMoved = false;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.hasMoved = true;
    }

    public addAvailableMoveByNumberOfSpaces(board: Board, availableSpacesArray: Square[], nRows: number, nCols: number) {
        const currentSquare = board.findPiece(this);
        if (board.checkSquareOnBoard(Square.at(currentSquare.row + nRows, currentSquare.col + nCols))){
            availableSpacesArray.push(Square.at(currentSquare.row + nRows, currentSquare.col + nCols))
        }
    }

    public addAvailableMoveIfSquareEmpty(board: Board, availableSpacesArray: Square[], square: Square){
        if (board.checkIfSquareEmpty(Square.at(square.row, square.col))){
            availableSpacesArray.push(Square.at(square.row, square.col))
        }
    }

    public addMovesIteratively(board: Board, availableSpacesArray: Square[], max_spaces: number, rowIterator: number, columnIterator: number){
        let currentSquare = board.findPiece(this);

        for (let i: number = 1; i <= max_spaces; i++) {
            let squareToMoveTo = Square.at(currentSquare.row + i * rowIterator, currentSquare.col + i * columnIterator);

            if (board.checkIfSquareEmpty(squareToMoveTo)) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i * rowIterator, i * columnIterator);
            } else if (board.checkIfOpposingPieceOnSquare(squareToMoveTo, this.player)) {
                //can't take the king
                if (!board.checkIfKingOnSquare(squareToMoveTo)) {
                    this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i * rowIterator, i * columnIterator);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }
    }


    //try and tidy this up somehow so not 4 of exactly the same thing
    public addLateralMoves(board: Board, availableSpacesArray: Square[], max_spaces: number) {
        let columnIteratorArray = [1, -1, 0, 0]
        let rowIteratorArray = [0, 0, 1, -1]
        for (let j = 0; j < 4; j++) {
            this.addMovesIteratively(board, availableSpacesArray, max_spaces, rowIteratorArray[j], columnIteratorArray[j])
        }
    }

    public addDiagonalMoves(board: Board, availableSpacesArray: Square[], max_spaces: number){
        let columnIteratorArray = [1, -1, 1, -1]
        let rowIteratorArray = [1, 1, -1, -1]
        for (let j = 0; j < 4; j++) {
            this.addMovesIteratively(board, availableSpacesArray, max_spaces, rowIteratorArray[j], columnIteratorArray[j])
        }
    }

}
