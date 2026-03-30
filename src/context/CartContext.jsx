import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.payload.id)
      if (existing) {
        return state.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: i.quantity + (action.payload.quantity || 1) }
            : i
        )
      }
      return [...state, { ...action.payload, quantity: action.payload.quantity || 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.payload)
    case 'UPDATE_QTY':
      return state.map(i =>
        i.id === action.payload.id ? { ...i, quantity: action.payload.qty } : i
      )
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
    initial => {
      try {
        const stored = localStorage.getItem('aroma_cart')
        return stored ? JSON.parse(stored) : initial
      } catch {
        return initial
      }
    }
  )

  useEffect(() => {
    localStorage.setItem('aroma_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart    = (item)       => dispatch({ type: 'ADD',        payload: item })
  const removeFromCart = (id)       => dispatch({ type: 'REMOVE',     payload: id })
  const updateQty    = (id, qty)    => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  const clearCart    = ()           => dispatch({ type: 'CLEAR' })

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
