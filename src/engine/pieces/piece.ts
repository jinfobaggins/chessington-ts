import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from '../pieces/king';


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


    //try and tidy this up somehow so not 4 of exactly the same thing
    public addLateralMoves(board: Board, availableSpacesArray: Square[], max_spaces: number) {
        let currentSquare = board.findPiece(this);
        let columnIterator = [1, -1, 0, 0] //left, right, up, down
        let rowIterator = [0, 0, 1, -1] //left, right, up, down

        for (let j = 0; j < 4; j++) {

            //horizontal
            for (let i: number = 1; i <= max_spaces; i++) {
                let squareToMoveTo = Square.at(currentSquare.row + i * rowIterator[j], currentSquare.col + i * columnIterator[j])

                if (board.checkIfSquareEmpty(squareToMoveTo)) {
                    this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i * rowIterator[j], i * columnIterator[j]);
                } else if (board.checkIfOpposingPieceOnSquare(squareToMoveTo, this.player)) {
                    //can't take the king
                    if (!board.checkIfKingOnSquare(squareToMoveTo)) {
                        this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i * rowIterator[j], i * columnIterator[j])
                        break
                    } else {
                        break
                    }
                } else {
                    break
                }
            }
        }
    }

    public addDiagonalMoves(board: Board, availableSpacesArray: Square[], max_spaces: number){
        let currentSquare = board.findPiece(this);
        for(let i = 1; i <=max_spaces; i++) {
            if (board.checkIfSquareEmpty(Square.at(currentSquare.row + i, currentSquare.col + i))) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i, i)
            } else {
                break
            }
        }

        for(let i = 1; i <=max_spaces; i++) {
            if (board.checkIfSquareEmpty(Square.at(currentSquare.row + i, currentSquare.col - i))) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i, -i)
            } else {
                break
            }
        }

        for(let i = 1; i <=max_spaces; i++) {
            if (board.checkIfSquareEmpty(Square.at(currentSquare.row - i, currentSquare.col + i))) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -i, i)
            } else {
                break
            }
        }

        for(let i = 1; i <=max_spaces; i++) {
            if (board.checkIfSquareEmpty(Square.at(currentSquare.row - i, currentSquare.col - i))) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -i, -i)
            } else {
                break
            }
        }

    }


}
