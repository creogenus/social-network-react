import styles from "./Paginator.module.css";
import React, {useState} from "react";


let Paginator = (props) => {
    let pageCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];
    let portionSize = 5;
    for (let i = 1; i < pageCount + 1; i++) {
        pages.push(i)
    }
    let portionCount = Math.ceil(pageCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = props.pageSize * (portionNumber - 1)+1
    let rightPortionNumber = props.pageSize * portionNumber
    return (
        <span>{
            portionNumber>1?<button onClick={() =>{setPortionNumber(portionNumber-1)}}>Prev</button>:''
        }
            {pages.filter(p => leftPortionNumber <= p && rightPortionNumber >= p).map((p => {
                return <span className={props.currentPage === p && styles.selectedPage} onClick={(e) => {
                    props.onPageChanged(p)
                }}>{p} </span>
            }))}
            {
                portionCount>portionNumber?<button onClick={() =>{setPortionNumber(portionNumber+1)
                }}>Next</button>:''
            }</span>
    )
}

export default Paginator;