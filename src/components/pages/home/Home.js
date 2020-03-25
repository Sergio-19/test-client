import React, {useContext}  from 'react'
import './home.scss'

import { Card } from '../../card/Card';
import { GoodsContext } from '../../../context/goodsContext';


export const Home = (props) =>{

    const {addCartHandler} = useContext(GoodsContext)
   
    return(
        <div className = "home">
        <div className = "homeGoodsWrap">
            {Object.keys(props.goods).map((good, i)=>{
                
            
                return(
                    
                    <Card good = {props.goods[good]}
                          click = {addCartHandler}
                          arg = {good}
                          key = {props.goods[good].name}
                    />
                )
            })}
            </div>
        </div>
    )
}