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
                <img className={styles.logo }src="redditIcon.png"/>
                <span className={styles.siteName}>Reddcopy</span>
            </div>
            
            <form className={styles.form}>
                <input className={styles.input} type="text" name="find" value={userInut} onChange={handleChange} placeholder="Type to search..."></input>
                <button type="sumbit" className={styles.submitButton} ><img className={styles.img} src="find.png" alt="Find icon"/></button>
            </form>
        </section>
    )
}

export default Header;