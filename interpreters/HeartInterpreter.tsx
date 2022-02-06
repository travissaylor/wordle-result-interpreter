import { Interpretation, ResultInterpreter } from "../lib/resultInterpreter"
import { NormalizedMatrix } from "../lib/resultParser"

export class HeartInterpreter implements ResultInterpreter {
    interpret(matrix: NormalizedMatrix): Interpretation {
        return matrix.map((row, index) => {
            return row.map((col) => {
                if (col == "🟩") {
                    return "💚"
                }
                if (col == "🟨") {
                    return "💛"
                }

                if (col == "⬛") {
                    return "🖤"
                }
    
                return col
            })
        })
    }
}
