import { useRef, useState } from "react"
import ResultModal from "./ResultModal";
let timer;
const TimeChallenge = ({title,targetTime}) => {
    const timerRef = useRef();
    const dialogRef = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000)
    const isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;
    if (timeRemaining <= 0) {
        clearInterval(timerRef.current)
        dialogRef.current.open()
    }
    const handleReset = () => {
        setTimeRemaining(targetTime * 1000)
    }
    const handleStart =() =>{
        timerRef.current = setInterval(()=>{
            setTimeRemaining(prevState => prevState - 10)
        }, 10)
    }
    const handleStop = () => {
        clearInterval(timerRef.current)
        dialogRef.current.open()
    }
    return (
        <>
         <ResultModal handleReset={handleReset} ref={dialogRef} targetTime={targetTime} remainingTime={timeRemaining}/>
        <section className="challenge">
            <h2>{title}</h2>
            {!isTimerActive && <p>You lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' :''}
            </p>
            <p>
                <button onClick={isTimerActive ? handleStop : handleStart}>
                    {isTimerActive?'Stop':'Start'} Challenge
                </button>
            </p>
            <p className={isTimerActive?'active':''}>
                {isTimerActive ? 'Time is running...': 'Timer inactive'}
            </p>
        </section>
        </>
    )
}
export default TimeChallenge