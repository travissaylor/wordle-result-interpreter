export type NormalizedResultCol = "🟩" | "🟨" | "⬛"
export type NormalizedMatrix = NormalizedResultCol[][]

const MAX_ROWS = 6
const MAX_COLS = 5

export function parseResults(results: string): NormalizedMatrix {
    const normalizeResults = (results: string): string => {
        return results
            .replaceAll("🟧", "🟩")
            .replaceAll("🟦", "🟨")
            .replaceAll("Orange square", "🟩")
            .replaceAll("Blue square", "🟨")
            .replaceAll("Green square", "🟩")
            .replaceAll("Yellow square", "🟨")
            .trim()
    }

    const resultsToMatrix = (results: string): string[][] => {
        let rawRows = results.split("\n")

        let rows = []
        for (let i = 0; i < rawRows.length; i++) {
            let cols = [...rawRows[i].trim()]
            if (cols.length == MAX_COLS) {
                rows.push(cols)
            }
            if (rows.length == MAX_ROWS) {
                break
            }
        }

        return rows
    }

    const normalizeMatrix = (rawMatrix: string[][]): NormalizedMatrix => {
        let matrix = []

        rawMatrix.forEach((rawCols) => {
            const cols = []
            rawCols.forEach((rawCol) => {
                if (rawCol == "🟩" || rawCol == "🟨") {
                    cols.push(rawCol)
                } else {
                    cols.push("⬛")
                }
            })

            matrix.push(cols)
        })

        return matrix
    }

    const normalizedResults = normalizeResults(results)
    const resultsMatrix = resultsToMatrix(normalizedResults)

    return normalizeMatrix(resultsMatrix)
}
