import { Interpretation, ResultInterpreter } from "../lib/resultInterpreter"
import { NormalizedMatrix } from "../lib/resultParser"

export class EmotionalInterpreter implements ResultInterpreter {
    interpret(matrix: NormalizedMatrix): Interpretation {
        return matrix.map((row, index) => {
            return this["row" + (index + 1)](row)
        })
    }

    row1(row: string[]): string[] {
        return row.map((col) => {
            if (col == "🟩") {
                return "🍀"
            }
            if (col == "🟨") {
                return "💛"
            }

            return col
        })
    }

    row2(row: string[]): string[] {
        return row.map((col) => {
            if (col == "⬛") {
                return "🤔"
            }

            if (col == "🟩") {
                return "💚"
            }
            if (col == "🟨") {
                return "💛"
            }

            return col
        })
    }

    row3(row: string[]): string[] {
        return row.map((col) => {
            if (col == "⬛") {
                return "😐"
            }

            if (col == "🟩") {
                return "💚"
            }

            if (col == "🟨") {
                return "💛"
            }

            return col
        })
    }

    row4(row: string[]): string[] {
        return row.map((col) => {
            if (col == "⬛") {
                return "😬"
            }

            if (col == "🟩") {
                return "💚"
            }
            if (col == "🟨") {
                return "💛"
            }

            return col
        })
    }

    row5(row: string[]): string[] {
        return row.map((col) => {
            if (col == "⬛") {
                return "😰"
            }

            if (col == "🟩") {
                return "💚"
            }
            if (col == "🟨") {
                return "💛"
            }

            return col
        })
    }

    row6(row: string[]): string[] {
        return row.map((col) => {
            if (col == "⬛") {
                return "😵"
            }

            if (col == "🟩") {
                return "❎"
            }
            if (col == "🟨") {
                return "⚠️"
            }

            return col
        })
    }
}
