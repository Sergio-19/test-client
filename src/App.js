import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.scss';
import { Header } from './components/header/Header';
import { GoodsState } from './context/GoodsState';
import { Home } from './components/pages/home/Home';
import { Cart } from './components/pages/cart/Cart'


import apple from './img/apple.png'
import cherry from './img/cherry.png'
import grape from './img/grape.png'
import watermelon from './img/watermelon.png'



 let cart = {}
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      goods: {
              'apple': { name: 'Яблоки',
                         cost: 70,
                         image: apple,
                         id: 1  
                      },
               'grape': {
                          name: 'Виноград',
                          cost: 90,
                          image: grape,
                          id: 2
               },
               'cherry': {
                          name: 'Вишни',
                          cost: 85,
                          image: cherry,
                          id: 3
               } ,
               'watermelon': {
                          name: 'Арбуз',
                          cost: 75,
                          image: watermelon,
                          id: 4
               }      
      },
      
      baseCurrency: 'RUB',     //базовая валюта в данный момент
      baseRate: 1,
      cart: {}, //товары в кoрзине
      quantity: 0, //количество товаров в корзине
      result: 0,
      resultUSD: 0,
      resultEUR: 0,
      rate: {}
    }
  }

 

//функция подсчета суммы покупок
 resultCost = () =>{
   let result = 0;
   let resultUSD = 0;
   let resultEUR = 0;
   for(let i = 0; i < Object.keys(cart).length; i++){
      result += (this.state.goods[Object.keys(cart)[i]].cost * cart[Object.keys(cart)[i]]);
      resultEUR += (this.state.goods[Object.keys(cart)[i]].cost * cart[Object.keys(cart)[i]]) * this.state.rate['EUR'];
      resultUSD += (this.state.goods[Object.keys(cart)[i]].cost * cart[Object.keys(cart)[i]]) * this.state.rate['USD']
   }
   this.setState({result, resultEUR, resultUSD})
 }

  //функция добавления товаров в корзину
  addCartHandler= (goodId) =>{
   
   cart[goodId] = cart[goodId] > 0 ? cart[goodId] = cart[goodId] + 1 : cart[goodId] = 1;
   let sum = 0;
   for(let i = 0; i < Object.keys(cart).length; i++){
      sum += cart[ Object.keys(cart)[i]]
   }
  this.setState({cart,
                  quantity: sum
  }) 
  this.resultCost()
  }

  //функция удаления товара

  delCartHandler = (goodId) =>{
    
    delete cart[goodId];
    let sum = 0
   for(let i = 0; i < Object.keys(cart).length; i++){
      sum += cart[ Object.keys(cart)[i]]
   }

    this.setState({cart, quantity: sum})
    this.resultCost()
  }

  //Функция изменения базовой валюты
  currencyHandler = (event) =>{

    let baseCurrency = event.target.value
    let initialGoods = {
      'apple': { name: 'Яблоки',
                 cost: 70,
                 image: apple,
                 id: 1  
              },
       'grape': {
                  name: 'Виноград',
                  cost: 90,
                  image: grape,
                  id: 2
       },
       'cherry': {
                  name: 'Вишни',
                  cost: 85,
                  image: cherry,
                  id: 3
       } ,
       'watermelon': {
                  name: 'Арбуз',
                  cost: 75,
                  image: watermelon,
                  id: 4
       }      
}
    let goods = this.state.goods;
  for(let good in goods){
   if(baseCurrency === 'RUB' ){goods = initialGoods}; 
    goods = initialGoods 
    if(baseCurrency !== 'RUB' ){
      goods[good].cost = (goods[good].cost * this.state.rate[baseCurrency]).toFixed(3)
    }
    
  }

 
    this.setState({baseCurrency, 
                  baseRate: this.state.rate[baseCurrency],
                  goods,
                  
                })
               
   
  }

async componentDidMount(){
  

  fetch('https://api.exchangeratesapi.io/latest?base=RUB')
  .then(data=>{
    return data.json();
  }).then(data=>{
    let baseRate = ['USD', 'EUR', 'RUB']
    let rate = {}
      for(let i = 0; i < baseRate.length; i++){
        rate[baseRate[i]] = data.rates[baseRate[i]].toFixed(3)
       
      }
    this.setState({rate})
  
  })
  
}

//запрос на сервер

  request = async () =>{
    console.log('work')
    try{
        const response = await fetch('/api/auth/rate', {method: 'POST', headers: {result: 'RESULT'}})
        const data = await response.json()
        console.log(data)

        if(!response.ok){
        throw new Error( data.message || 'Что-то пошло не так')
      }
    }catch (e){
      
    }
  }


  render(){

    return (
    
      <BrowserRouter>
      <GoodsState 
      state = {this.state}
      addCartHandler = {this.addCartHandler}
      delCartHandler = {this.delCartHandler}
      currencyHandler = {this.currencyHandler}
      request = {this.request}
      > 
      <div className="appWrapper">
        <Header/>
    
  
      <Switch>
        <Route path = "/" exact>
            <Home 
              goods = {this.state.goods}
            />
        </Route>

        <Route path = "/cart">
            <Cart/>
        </Route>
  
      </Switch>
    
      </div>
      </GoodsState>
      </BrowserRouter>
        
    );
  }
}

export default App;
