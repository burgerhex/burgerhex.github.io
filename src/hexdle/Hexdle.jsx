import {useEffect, useState} from "react";

const TargetSquareSize = 80;
const GuessSquareSize = 40;
const ColorLength = 6;
const GuessLength = ColorLength;

export function Hexdle() {
    useEffect(() => {
        document.title = "Hexdle";
    }, []);

    function randomColor() {
        const characters = "0123456789ABCDEF";
        let color = "";

        for (let i = 0; i < ColorLength; i++) {
            let index = Math.floor(Math.random() * characters.length);
            color += characters[index];
        }

        return color;
    }

    let [color] = useState(randomColor());
    let [input, setInput] = useState("");
    let [guesses, setGuesses] = useState([]);
    let [done, setDone] = useState(false);
    let [error, setError] = useState("");
    let [showAnswer, setShowAnswer] = useState(false);

    function hexToInt(str) {
        return parseInt(str, 16);
    }

    function getComparisonWord(value1, value2) {
        if (value1 === value2) {
            return "Correct";
        } else if (value1 > value2) {
            return "Less";
        } else {
            return "More";
        }
    }

    function moreLessComponents(guess) {
        let guessComponents = [];
        let colorComponents = [];
        for (let i = 0; i < GuessLength; i += 2) {
            guessComponents.push(hexToInt(guess.slice(i, i + 2)));
            colorComponents.push(hexToInt(color.slice(i, i + 2)));
        }
        return [
            getComparisonWord(guessComponents[0], colorComponents[0]) + " red",
            getComparisonWord(guessComponents[1], colorComponents[1]) + " green",
            getComparisonWord(guessComponents[2], colorComponents[2]) + " blue",
        ]
    }

    return (
        <div className="HexdleApp" style={{margin: 5}}>
            <h2>Target Color</h2>
            <div
                className="targetSquare"
                style={{
                    width: TargetSquareSize,
                    height: TargetSquareSize,
                    backgroundColor: "#" + color
                }}>
            </div>
            <div>
                <button onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? "Hide" : "Show"} answer</button>
                <p hidden={!showAnswer}>#{color}</p>
            </div>
            <div>
                <h3>Guess {guesses.length + 1}</h3>
                <input
                    type="text"
                    value={input}
                    readOnly={!done}
                    onKeyDown={(e) => {
                        e.preventDefault();
                        setError("");
                        if (done) {
                            return;
                        }
                        const re = /^[0-9a-fA-F]$/;
                        if (input.length < GuessLength && re.test(e.key)) {
                            setInput(input + e.key.slice(0, 1).toUpperCase());
                        } else if (e.key === "Backspace" || e.key === "Delete") {
                            setInput(input.slice(0, -1));
                        } else if (e.key === "Enter") {
                            if (input.length < GuessLength) {
                                setError("Guess too short!")
                            } else if (input.length === GuessLength) {
                                if (input === color) {
                                    setDone(true);
                                } else {
                                    // adding to front so they render in reverse
                                    setGuesses([input, ...guesses]);
                                    setInput("");
                                }
                            }
                        }
                    }}/>
            </div>
            <p style={{color: "#C00000"}}>{error}</p>
            <p style={{color: "#00C000"}} hidden={!done}>Nice! You got it
                in {guesses.length + 1} {guesses.length === 0 ? "guess. (Cheater.)" : "guesses"}</p>
            <div className="guessRows">
                {guesses.map((guess, index) => (
                    <div style={{
                        border: '1px solid black'
                    }}>
                        <h3>Guess {guesses.length - index}</h3>
                        <input readOnly={true} value={guess}/>
                        <div style={{
                            width: GuessSquareSize,
                            height: GuessSquareSize,
                            backgroundColor: "#" + guess
                        }}></div>
                        {moreLessComponents(guess).map((str) => (
                            <p>{str}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}