
import React from 'react'
import {GoodsContext} from './goodsContext'



export const GoodsState = (props) =>{

    


    
    return(
        <GoodsContext.Provider value = {{state: props.state, 
                                         addCartHandler: props.addCartHandler,
                                        delCartHandler: props.delCartHandler,
                                        currencyHandler: props.currencyHandler,
                                        request: props.request
                                         }}>
            {props.children}
        </GoodsContext.Provider>
    )
}