import React from "react";
import styles from "./header.module.css";
import { useAppSelector, useAppDispatch } from '../../helperData/customHooks';
import { setFilterValue, clearFilterValue, setInputValue, clearInputValue }  from "./headerSlice";
import { Link } from "react-router-dom";
import DropdownMenu from "../dropdownMenu/DropdownMenu";


function Header(){

    const dispatch = useAppDispatch();
    const inputValue = useAppSelector(state=>state.header.inputValue);
    const headeVisibility = useAppSelector(state=>state.header.showHeader)
    
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>):void =>{
        e.preventDefault();
        dispatch(setFilterValue(inputValue));
        window.scrollTo({top:0});
    }
    const handleClick = ():void =>{
        dispatch(clearFilterValue());
        dispatch(clearInputValue())
    }
    const handleChange = (e: React.FormEvent<HTMLInputElement>) =>{
        dispatch(setInputValue(e.currentTarget.value));
    }

   

    return (
        <section className={styles.header} role="banner">
            <Link to="/" className={styles.logoContainer}>
                <img className={styles.logo} src="/redditIcon.png" alt="Site logo"/>
                <span className={styles.siteName}>Reddcopy</span>
            </Link>

            <form className={styles.form} onSubmit={handleSubmit} data-testid="form">
                <input  disabled={headeVisibility?false:true} autoComplete="off" className={styles.input} type="text" name="find"  placeholder="Type to search..." value={inputValue} onChange={handleChange}/>
                {inputValue&&<button type="button" onClick={handleClick} className={styles.clearButton} data-testid="clear-button">x</button>}
                <button type="submit" className={styles.submitButton} >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.findIcon}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button> 
            </form>
            <DropdownMenu/>
           
        </section>
    )
}

export default Header;