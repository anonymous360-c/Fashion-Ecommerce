import { useSelector, useDispatch } from 'react-redux'
import { selectCartItems, selectCartTotal, increaseQuantity, decreaseQuantity, removeItem, clearCart } from '../../store'
import './CartDrawer.css'

export default function CartDrawer({ onClose }) {
  const dispatch = useDispatch()
  const items    = useSelector(selectCartItems)
  const total    = useSelector(selectCartTotal)

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      <div className="cart-drawer">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})</h2>
          <button className="cart-drawer__close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty">
            <p>Your bag is empty.</p>
            <button className="cart-drawer__continue" onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-drawer__items">
              {items.map(item => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="cart-item">
                  <div className="cart-item__img">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item__details">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__meta">{item.color} · Size {item.size}</p>
                    <p className="cart-item__price">${item.price}</p>
                    <div className="cart-item__qty-row">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => dispatch(decreaseQuantity({ id: item.id, size: item.size, color: item.color }))}
                      >
                        −
                      </button>
                      <span className="cart-item__qty">{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => dispatch(increaseQuantity({ id: item.id, size: item.size, color: item.color }))}
                      >
                        +
                      </button>
                      <button
                        className="cart-item__remove"
                        onClick={() => dispatch(removeItem({ id: item.id, size: item.size, color: item.color }))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer__footer">
              <div className="cart-drawer__total-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <p className="cart-drawer__shipping-note">Shipping &amp; taxes calculated at checkout.</p>
              <button className="cart-drawer__checkout">Checkout</button>
              <button className="cart-drawer__clear" onClick={() => dispatch(clearCart())}>
                Clear Bag
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
