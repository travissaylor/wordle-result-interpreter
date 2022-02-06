import Head from "next/head"
import Image from "next/image"
import { useEffect, useState } from "react"
import styles from "../styles/Home.module.css"
import { NormalizedMatrix, parseResults } from "../lib/resultParser"
import { Interpretation, interpretResults } from "../lib/resultInterpreter"
import { EmotionalInterpreter } from "../interpreters/EmotionalInterpreter"

export default function Home() {
    const [input, setInput] = useState("")
    const [parsedResults, setParsedResults] = useState<NormalizedMatrix>()
    const [interpretedResults, setInterpretedResults] =
        useState<Interpretation>()

    useEffect(() => {
        setInterpretedResults(null)
    }, [parsedResults])

    const submitResults = () => {
        const res = parseResults(input)
        console.log({ res })
        setParsedResults(res)
    }

    const emotionalize = () => {
        setInterpretedResults(
            interpretResults(parsedResults, new EmotionalInterpreter())
        )
    }

    return (
        <div>
            <div>
                <h1>Parse Wordle</h1>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button onClick={submitResults}>Submit</button>
            </div>
            {parsedResults && (
                <div>
                    <div>
                        {parsedResults.map((row, index) => (
                            <div key={index}>{row.map((col) => col)}</div>
                        ))}
                    </div>
                    <button onClick={emotionalize}>Emotionalize</button>
                    {interpretedResults && (
                        <div>
                            {interpretedResults.map((row, index) => (
                                <div key={index}>{row.map((col) => col)}</div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
