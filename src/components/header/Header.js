import React, {useContext} from 'react'
import './header.scss'
import {NavLink} from 'react-router-dom'
import { GoodsContext } from '../../context/goodsContext';
import { CurrencyOption } from '../currencyOption/CurrencyOption';


export const Header = () =>{

     const {state, request} = useContext(GoodsContext)
    return(
        <div className = "headerWrap">
            <div>
                <ul>
                    <li><NavLink to = "/">Главная</NavLink></li>
                    <li><NavLink to = "/cart">Корзина</NavLink></li>
                </ul>
               
            </div>
            <div className = "cartCount"><p> В корзине товаров:&nbsp;<span>{state.quantity}</span>&nbsp;</p>
                                         <p> На сумму:&nbsp;&nbsp;<span>{state.result}&nbsp;RUB</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span>{state.resultUSD === 0 ? state.resultUSD : (state.resultUSD).toFixed(3)}&nbsp;USD</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span>{state.resultEUR === 0 ? state.resultEUR : (state.resultEUR).toFixed(3)}&nbsp;EUR</span>
                                         </p>
            </div>
            <div className = "selection">
                <CurrencyOption/>
            </div>
        </div>
    )
}