import Player from '../player';
import Board from '../board';
import Square from '../square';
import GameSettings from '../gameSettings';


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
        if (currentSquare.row + nRows >= 0 && currentSquare.row + nRows <= GameSettings.BOARD_SIZE - 1 &&  currentSquare.col + nCols >= 0 && currentSquare.col + nCols <= GameSettings.BOARD_SIZE - 1){
            availableSpacesArray.push(Square.at(currentSquare.row + nRows, currentSquare.col + nCols))
        }
    }

    public addAvailableMoveIfSquareEmpty(board: Board, availableSpacesArray: Square[], square: Square){
        if (board.checkIfSquareEmpty(Square.at(square.row, square.col))){
            availableSpacesArray.push(Square.at(square.row, square.col))
        }
    }


    public addLateralMoves(board: Board, availableSpacesArray: Square[], max_spaces: number) {
        let currentSquare = board.findPiece(this);

        //horizontal
        for (let i: number = 1; i <= max_spaces; i++) {
            if (board.checkIfSquareEmpty(Square.at(currentSquare.row, currentSquare.col + i))) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 0, i);
            } else {
                break
            }
        }
        for (let i: number = 1; i <= max_spaces; i++) {
            if (board.checkIfSquareEmpty(Square.at(currentSquare.row, currentSquare.col - i))) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, 0, -i);
            } else {
                break
            }
        }

        //vertical
        for (let i:number = 1; i <= max_spaces; i++) {
            if (board.checkIfSquareEmpty(Square.at(currentSquare.row + i, currentSquare.col))) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, i, 0);
            } else {
                break
            }
        }
        for (let i:number = 1; i <= max_spaces; i++) {
            if (board.checkIfSquareEmpty(Square.at(currentSquare.row + i, currentSquare.col))) {
                this.addAvailableMoveByNumberOfSpaces(board, availableSpacesArray, -i, 0);
            } else {
                break
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
