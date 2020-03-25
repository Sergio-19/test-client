import React, {useContext} from 'react'
import './cart.scss'
import { GoodsContext } from '../../../context/goodsContext';
import { BuyCard } from '../../buyCard/BuyCard';


export const Cart = () =>{

    const {state, delCartHandler} = useContext(GoodsContext)
    
    
    
    if(!state.quantity){
        return(
          <h1>Корзина пуста</h1>  
        )
        
    }else{
       return(
        <div className = "cartWrapper">
            <div className = 'cartContent'>
        {Object.keys(state.cart).map((good, i)=>{
            return(
                <BuyCard
                    img = {state.goods[good].image}
                    name = {state.goods[good].name}
                    quant = {state.cart[good]}
                    cost = {state.cart[good] * state.goods[good].cost}
                    currency = {state.baseCurrency}
                    arg = {good}
                    click = {delCartHandler}
                    key = {state.goods[good].name}
                />
            )
        })}
        </div>
        </div>
    ) 
    }
    
}