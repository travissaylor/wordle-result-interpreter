import { useEffect, useState } from "react"
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

    const copyToClipboard = () => {
        let resultString = ""
        interpretedResults.forEach((row) => {
            const stringRow = row.join("") + "\n"
            resultString += stringRow;
        })
        navigator.clipboard.writeText(resultString)
        console.log("Copied to clipboard")
    }

    const emotionalize = () => {
        setInterpretedResults(
            interpretResults(parsedResults, new EmotionalInterpreter())
        )
    }

    return (
        <section className="text-gray-600 body-font relative">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Make Your Wordle Results Stand Out
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Paste your wordle results and select the transformation
                        you'd like to apply to your results
                    </p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <textarea
                                    id="message"
                                    name="message"
                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                    placeholder="Paste Wordle Results Here"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <button
                                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                onClick={submitResults}
                            >
                                Parse Results
                            </button>
                        </div>
                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                            <h2 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
                                Parsed Results
                            </h2>
                            {parsedResults && (
                                <div>
                                    <div className="text-3xl mb-4">
                                        {parsedResults.map((row, index) => (
                                            <div key={index}>
                                                {row.map((col) => col)}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="p-2 w-full">
                                        <button
                                            className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                            onClick={emotionalize}
                                        >
                                            Emotionalize
                                        </button>
                                    </div>
                                    {interpretedResults && (
                                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                            <h2 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
                                                Transformed Results
                                            </h2>
                                            <div className="text-3xl mb-4">
                                                {interpretedResults.map(
                                                    (row, index) => (
                                                        <div key={index}>
                                                            {row.map(
                                                                (col) => col
                                                            )}
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <div className="p-2 w-full">
                                                <button
                                                    className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                    onClick={copyToClipboard}
                                                >
                                                    Copy Results
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
