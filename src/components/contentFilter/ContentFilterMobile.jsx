import React, { useEffect, useRef } from "react";
import styles from "./contentFilter.module.css";
import { useNavigate, useLocation } from "react-router-dom";



function ContentFilterMobile() {

    const navigate = useNavigate();
    const location = useLocation()
    const formSelectRef = useRef(null)

    useEffect(() => {
        if (formSelectRef.current) {
            const filterParam = location.pathname.substring(1);
            formSelectRef.current.value = filterParam || "top";
        }
    }, [location.pathname]);

    const handleChange = e => {
        navigate(`/${e.target.value}`)
    };

    return (
        <div className={styles.contentFilterMobile}>
            <form className={styles.filterForm} onChange={handleChange}>
                <select ref={formSelectRef} className={styles.filterSelector}>
                    <option className={styles.optionParam} value="top">Top</option>
                    <option className={styles.optionParam} value="hot">Hot</option>
                    <option className={styles.optionParam} value="new">New</option>
                    <option className={styles.optionParam} value="rising">Rising</option>
                </select>
            </form>
        </div>
    )

}


export default ContentFilterMobile;