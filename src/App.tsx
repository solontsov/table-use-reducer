import { useReducer, useState } from 'react'
import './App.css'

interface Product { 
  orderNumber:number,
  item:string,
  price: number,
  quantity: number,
  total: number
}
const defaultData: Product[] = []

const addProduct = (item:string,
  price: number,
  quantity: number) => {
    defaultData.push( {
      orderNumber: defaultData.length + 1,
      item: item,
      price:price,
      quantity: quantity,
      total: price * quantity
    })
  }

addProduct('Green apple', 10, 2)
addProduct('Banana', 0.5, 3)
addProduct('Orange', 0.75, 4)
addProduct('Pear', 0.25, 6)


function App() {
  const [data, setData] = useState(defaultData)

  const reducer = (state, action) => {
    switch (action.type) {
      case 'up':
        return { currentLine: Math.max(state.currentLine - 1 , 0)}
      case 'down':    
        return { currentLine: Math.min(state.currentLine + 1 , data.length - 1)}
      case 'set':
        return { currentLine: action.line }  
      }
  }
  
  const [state, dispatch] = useReducer(reducer, {currentLine: 0})
  const total = () => {
    const sum = data.reduce((accumulator, product) => accumulator + product.total, 0)
    return sum.toFixed(2)
  }

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        // Handle the up arrow key
        console.log('Up arrow key pressed');
        dispatch({type: 'up'})
        break;
      case 'ArrowDown':
        // Handle the down arrow key
        console.log('Down arrow key pressed');
        dispatch({type: 'down'})
        break;
      default:
        // Handle other keys
        break;
    }
  }

  return (
    <>
      <table onKeyDown={handleKeyDown} tabIndex={0}>
        <thead>
          <tr>
            <th>№ {state?.currentLine}</th>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product,index) => (
            <tr 
              key={product.orderNumber} 
              onClick={() => dispatch({ type: 'set', line: index})}
              className={(index === state?.currentLine)?'current':''}  
            >
              <td>{product.orderNumber}</td>
              <td>{product.item}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.quantity}</td>
              <td>${product.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>Total</td>
            <td>${total()}</td>
          </tr>
          </tfoot>
      </table>
    </>
  )
}

export default App

