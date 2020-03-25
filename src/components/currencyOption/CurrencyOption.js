import React, {useContext} from 'react'
import './currencyOption.scss'
import { GoodsContext } from '../../context/goodsContext';


export const CurrencyOption = () =>{

    const {currencyHandler} = useContext(GoodsContext)
    const rateArr = ['RUB', 'USD', 'EUR']
    return(
        <select onChange = {(event)=> currencyHandler(event)}>
            {rateArr.map((rate, i)=>{
                return(
                    <option key = {rate}>{rate}</option>
                )
            })}
        </select>
    )
}