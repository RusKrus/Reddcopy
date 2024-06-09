import React from "react"
import styles from "./header.module.css"
import {  useDispatch, useSelector } from 'react-redux';
import { setFilterValue, clearFilterValue, setInputValue, clearInputValue }  from "./headerSlice"
import { Link } from "react-router-dom";







function Header(){

    const dispatch=useDispatch();
    const inputValue = useSelector(state=>state.header.inputValue);
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(setFilterValue(inputValue));
        window.scrollTo({top:0});
    }

    const handleClick = () =>{
        dispatch(clearFilterValue());
        dispatch(clearInputValue())
    }

    const handleChange = (e) =>{
        dispatch(setInputValue(e.target.value));
        

    }


    return (
        <section className={styles.header} role="banner">
            <Link to="/" className={styles.logoContainer}>
                <img className={styles.logo} src="/redditIcon.png" alt="Site logo"/>
                <span className={styles.siteName}>Reddcopy</span>
            </Link>

            <form className={styles.form} onSubmit={handleSubmit} data-testid="form">
                <input autoComplete="off" className={styles.input} type="text" name="find"  placeholder="Type to search..." value={inputValue} onChange={handleChange}/>
                {inputValue&&<button type="button" onClick={handleClick} className={styles.clearButton} data-testid="clear-button">x</button>}
                <button type="submit" className={styles.submitButton} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.findIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                
            </form>
        </section>
    )
}

export default Header;