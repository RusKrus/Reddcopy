import React, {useState, useRef} from "react"
import styles from "./dropdownMenu.module.css"


const DropdownMenu = () =>{
    const [ showOptions, setShowOptions ] = useState(false);
    const [ showModal, setShowModal ] = useState(false);
    const optionsBtn = useRef(null);
    const showBugWindowBtn = useRef(null)
    const modalWindowBackground = useRef(null);

    const optionsCloser = (e) =>{
        if((e.target!==optionsBtn.current&&e.target!==showBugWindowBtn.current&&!modalWindowBackground.current.contains(e.target))||e.target.innerHTML==="X"){
            setShowOptions(false);
            setShowModal(false)
        }
    }
    const showOptionsSetter = () =>{
        setShowOptions(!showOptions);
    }
    const showBugModalWindow = () =>{
        setShowModal(true)
    }
    const submitBugReportHandler = (e)=>{
        console.log ("gay")
        e.preventDefault()
    }

    window.onclick = optionsCloser;

    return(
        <div className={styles.dropdown}>
        <button style={showOptions?{'color': 'yellow', 'backgroundColor': 'hsl(230, 50%, 70%)'}:{}} className={styles.dropbtn} onClick={showOptionsSetter}  ref = {optionsBtn}>···</button>
        <div className={styles.dropdownOptions} style={{"display":showOptions?"inline-block":"none"}}>
            <button ref={showBugWindowBtn} className={styles.reportBugButton} onClick={showBugModalWindow}>Report a bug</button>
            <div className={styles.modalWindowBackground} style={{"display":showModal?"inline-block":"none"}} ref={modalWindowBackground}>
                <div className={styles.modalBugsWindowContent}> 
                    <div className={styles.reportBugModalRunningTitle}>
                        <h2 className={styles.reportBugModalWindowHeader}>Report bug</h2>
                        <button className={styles.closeModalWindowButton}>X</button>
                    </div>
                    <div className={styles.modalBugsWindowBody}>
                        <form  onSubmit={submitBugReportHandler} action="" method="POST" encType="multipart/form-data">
                            <label htmlFor="email">Enter your email below:</label>
                            <br/>
                            <input type="email" name="email" required className={styles.emailFieldBugReport}></input>
                            <br/>
                            <label htmlFor="bug report text">Descirbe the issue below:</label>
                            <br/>
                            <textarea required id="bug report text" name="bug report text" ></textarea>
                            <input type="file" accept="image/*" multiple className={styles.attachPhotosBugReport}></input>
                            <br/>
                            <button type="submit" className={styles.submitBugReportButton}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default DropdownMenu;