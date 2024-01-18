import React, {useState} from "react"
import styles from "./header.module.css"





function Header(){
    const [userInut, setUserInput] = useState("");
    const handleChange = (e) =>{
        setUserInput(e.target.value);
    }
    return (
        <section className={styles.header}>
            <div className={styles.logoContainer}>
                <img className={styles.logo} src="redditIcon.png" alt="Site logo"/>
                <span className={styles.siteName}>Reddcopy</span>
            </div>
            <form className={styles.form}>
                <input className={styles.input} type="text" name="find" value={userInut} onChange={handleChange} placeholder="Type to search..."></input>
                <button type="sumbit" className={styles.submitButton} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.find}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </form>
        </section>
    )
}

export default Header;