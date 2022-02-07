import { useEffect, useRef, useState } from "react"
import { NormalizedMatrix, parseResults } from "../lib/resultParser"
import { Interpretation, interpretResults } from "../lib/resultInterpreter"
import { EmotionalInterpreter } from "../interpreters/EmotionalInterpreter"
import TransformationCard from "../components/TransformationCard"
import { HeartInterpreter } from "../interpreters/HeartInterpreter"
import { ColorBlindInterpreter } from "../interpreters/ColorBlindInterpreter"
import { AngerInterpreter } from "../interpreters/AngerInterpreter"
import Header from "../components/Header"
import Head from "next/head"

export default function Home() {
    const [input, setInput] = useState("")
    const [parsedResults, setParsedResults] = useState<NormalizedMatrix>()
    const [isCopyLoading, setIsCopyLoading] = useState<boolean>(false)
    const [interpretedResults, setInterpretedResults] =
        useState<Interpretation>()

    const transformationsRef = useRef<HTMLDivElement>()
    const interpretedResultsRef = useRef<HTMLDivElement>()

    useEffect(() => {
        setInterpretedResults(null)
        if (parsedResults && parsedResults.length > 0) {
            scrollToTransformations()
        }
    }, [parsedResults])

    useEffect(() => {
        if (interpretedResults && interpretedResults.length > 0) {
            scrollToResults()
        }
    }, [interpretedResults])

    const submitResults = () => {
        const res = parseResults(input)
        if (res.length === 0) {
            setParsedResults(null)
            return
        }
        setParsedResults(res)
    }

    const copyToClipboard = () => {
        setIsCopyLoading(true)
        let resultString = ""
        interpretedResults.forEach((row) => {
            const stringRow = row.join("") + "\n"
            resultString += stringRow
        })
        navigator.clipboard.writeText(resultString)
        setTimeout(() => {
            setIsCopyLoading(false)
        }, 1000)
    }

    const scrollToResults = () => {
        if (interpretedResultsRef && interpretedResultsRef.current) {
            interpretedResultsRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const scrollToTransformations = () => {
        if (transformationsRef && transformationsRef.current) {
            transformationsRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    const emotionalize = () => {
        setInterpretedResults(
            interpretResults(parsedResults, new EmotionalInterpreter())
        )
    }

    const hearts = () => {
        setInterpretedResults(
            interpretResults(parsedResults, new HeartInterpreter())
        )
    }

    const colorBlind = () => {
        setInterpretedResults(
            interpretResults(parsedResults, new ColorBlindInterpreter())
        )
    }

    const anger = () => {
        setInterpretedResults(
            interpretResults(parsedResults, new AngerInterpreter())
        )
    }

    return (
        <section className="text-gray-600 body-font relative">
            <Head>
                <title>WORDLExport</title>
                <meta
                    name="description"
                    content="Wordle Results That Stand Out"
                />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta property="og:title" content="WORDLExport" />
                <meta
                    property="og:description"
                    content="Wordle Results That Stand Out"
                />
            </Head>
            <Header />
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                        Wordle Results That Stand Out
                    </h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Paste your wordle results and select the transformation
                        you&apos;d like to apply to your results
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
                        {parsedResults && (
                            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                <div>
                                    <h2
                                        ref={transformationsRef}
                                        className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900"
                                    >
                                        Transformation Options
                                    </h2>
                                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
                                        Choose the type of transformation
                                        you&apos;d like to apply. Scroll to see
                                        all your options
                                    </p>
                                    <div className="flex overflow-x-auto">
                                        <TransformationCard
                                            name="Emotionalize"
                                            description="Adds some unique drama to each line"
                                            emoji={"🤔"}
                                            onTransform={emotionalize}
                                        />
                                        <TransformationCard
                                            name="Hearts"
                                            description="Love is in the air"
                                            emoji={"💚"}
                                            onTransform={hearts}
                                        />
                                        <TransformationCard
                                            name="Color Blind"
                                            description="Add strong contrast"
                                            emoji={"🎨"}
                                            onTransform={colorBlind}
                                        />
                                        <TransformationCard
                                            name="Anger"
                                            description="Did you have a rough time with this one?"
                                            emoji={"🤬"}
                                            onTransform={anger}
                                        />
                                    </div>
                                    {interpretedResults && (
                                        <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                                            <h2 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
                                                Transformed Results
                                            </h2>
                                            <div
                                                ref={interpretedResultsRef}
                                                className="text-3xl mb-4"
                                            >
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
                                                    className={
                                                        "flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                                                    }
                                                    onClick={copyToClipboard}
                                                >
                                                    {isCopyLoading
                                                        ? "Copied ✅"
                                                        : "Copy Transformation"}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
