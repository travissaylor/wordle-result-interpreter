import { NormalizedMatrix } from "./resultParser"

export type Interpretation = string[][]

export interface ResultInterpreter {
    interpret (matrix: NormalizedMatrix): Interpretation
}

export function interpretResults(
    results: NormalizedMatrix,
    interpreter: ResultInterpreter
) {
    return interpreter.interpret(results)
}
