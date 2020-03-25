import React, {useContext} from 'react'
import './card.scss'
import {GoodsContext} from '../../context/goodsContext'

export const Card = (props) =>{

    const {state} = useContext(GoodsContext)
    
    return(
        <div className = "cardWrapper">
            <div className = "cardImg">
                <img src = {props.good.image} alt = {props.good.name}/>
            </div>
            <div className = "cardTxt">
                <h3>{props.good.name}</h3>
                <h4>{props.good.cost}</h4>
                <h4>{state.baseCurrency}</h4>
            </div>
            <div className = "cardBtn">
                <button onClick = {()=> props.click(props.arg)}>В корзину</button>
            </div>
        </div>
    )
}