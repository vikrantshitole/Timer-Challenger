import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from 'react-dom'

const ResultModal = forwardRef(({targetTime,remainingTime,handleReset },ref) => {
    const dialogRef = useRef();
    const userLost = remainingTime <= 0;
    const formattedTimer = (remainingTime/1000).toFixed(2)
    const score = Math.round((1 - remainingTime / (targetTime *1000)) *100)
    useImperativeHandle(ref,() => {
        return {
            open(){
                dialogRef.current.showModal()
            }
        }
    })
    return createPortal (
        <dialog ref={dialogRef} className="result-modal" >
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>You Score: {score}</h2>}
            <p>The target time was <strong>{targetTime}</strong> seconds.</p>
            <p>You stopped the timer with <strong>{formattedTimer} seconds left.</strong></p>
            <form method="dialog" onSubmit={handleReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById('modal')
    )
})
export default ResultModal