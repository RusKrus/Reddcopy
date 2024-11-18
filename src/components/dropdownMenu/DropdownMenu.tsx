import React, { useState, useRef, useEffect } from "react"
import styles from "./dropdownMenu.module.css"


const DropdownMenu = () =>{
    const [ showOptions, setShowOptions ] = useState<boolean>(false);
    const [ showModal, setShowModal ] = useState<boolean>(false);
    const optionsBtn = useRef<HTMLButtonElement>(null);
    const showBugWindowBtn = useRef<HTMLButtonElement>(null)
    const modalWindowBackground = useRef<HTMLDivElement>(null);

    const optionsCloser = (e: MouseEvent) =>{
        if(e.target instanceof HTMLButtonElement&&e.target.innerHTML==="X"){
            setShowOptions(false);
            setShowModal(false);
        }
    }
    const showOptionsSetter = (): void =>{
        setShowOptions(!showOptions);
    }
    const showBugModalWindow = (): void =>{
        setShowModal(true)
    }
    const submitBugReportHandler = (e: React.FormEvent): void => {
        e.preventDefault();
        window.location.reload();

    }

    useEffect(()=>{
        window.addEventListener('click', optionsCloser);
        return window.removeEventListener('click', optionsCloser);
    }, [])

    return(
        <div className={styles.dropdown}>
        <button style={showOptions?{'color': 'yellow', 'backgroundColor': 'hsl(230, 50%, 70%)'}:{}} className={styles.dropbtn} onClick={showOptionsSetter}  ref = {optionsBtn}>···</button>
        <div data-testid="dropdown-options" className={styles.dropdownOptions} style={{"display":showOptions?"inline-block":"none"}}>
            <button ref={showBugWindowBtn} className={styles.reportBugButton} onClick={showBugModalWindow}>Report a bug</button>
            <div className={styles.modalWindowBackground} style={{"display":showModal?"inline-block":"none"}} ref={modalWindowBackground} data-testid="modal-window-background">
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