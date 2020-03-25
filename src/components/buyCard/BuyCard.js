
import React from 'react'
import './buyCard.scss'



export const BuyCard = (props) =>{

    return(
        
         <div className = "buyCardWrap">
            <div className = "buyImg">
                <img src = {props.img} alt = {props.name}/>
            </div>
            <div className = "buyTxt">
            <p>{props.name}</p>
            <p>{props.quant} шт.</p>
            
            </div>
            <div>
             <p>Сумма: {props.cost}&nbsp;{props.currency}</p>  
             
             <button onClick = {()=> props.click(props.arg)}>Удалить товар</button>
             
            </div>
           
            
            
        </div>
          
       
        
    )
}