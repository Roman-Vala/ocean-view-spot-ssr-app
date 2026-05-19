import React,{useState} from 'react';
import ShoppingBagIcon from '../../Icons/ShoppingBagIcon';
import { formatCurrency } from '../../utils/formatCurrency';

export default function CartDrawer({isOpen, setIsOpen, cart, removeFromCart, clearCart, refreshProducts}) {

  const [isLoading, setIsLoading] = useState(false);
  const [cartMessage, setCartMessage] = useState('');
  
  const total = cart.reduce((sum, item) => sum + item.item_data.variations[0].item_variation_data.price_money.amount , 0);

  const closeDrawer = ()=>{
    setCartMessage('');
    setIsOpen(false);
  }

  // console.log(cart);

  const handleBuyNow = async () => {
    if(!!cart.length){
      setIsLoading(true);
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart),
      });
    
      const data = await res.json();
      // console.log(data);
      if(!res.ok){
        setCartMessage(data.msg || 'Checkout is currently unavailable.');
        setIsLoading(false);
      }
      else if(data.msg){

        const itemIdsToRemove = data.itemsOutOfStock.map(el=>el.itemId);
        refreshProducts();
        setCartMessage(data.msg);
        removeFromCart(itemIdsToRemove);
        setIsLoading(false);

      }
      else {
        window.location.href = data.checkoutUrl;
        setIsLoading(false);
      }
      
      
    }
  };

  return (
    <div className={``}>
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl z-50 flex flex-col transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className='flex  items-center gap-3'>
            <ShoppingBagIcon/>
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            {!!cart.length &&
              <>
              <div className="flex justify-center items-center bg-amber-200 rounded-full h-6 w-6 text-sm">{cart.length}</div>
              <button
                    onClick={clearCart}
                    className="text-stone-500 text-sm hover:scale-125 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                      <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                    </svg>
                  </button>
              </>

            }
          </div>
          <button 
            className='hover:bg-black/10 rounded-full p-1'
            onClick={closeDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                
                <div>
                  <p className="font-medium">{item.item_data.name}</p>                  
                  <p className="text-sm text-gray-500">{Object.values(item.custom_attribute_values).find(el=>el.name==='headline').string_value}</p>
                </div>

                <div className="flex gap-1 items-center">
                  <p className="text-base font-bold text-gray-700">{formatCurrency(item.item_data.variations[0].item_variation_data.price_money.amount)}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-stone-500 text-sm hover:scale-125 transition-transform"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                      <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
                    </svg>



                  </button>
                </div>

              </div>
            ))
          )}

          
        </div>

        {cartMessage && 
          <div className="p-4 flex items-center gap-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-amber-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>

            {cartMessage}
          </div>
        }

        {/* Footer */}
        <div className="p-4 border-t">
          <div className="flex justify-between font-semibold mb-3">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <button 
            className="flex justify-center items-center w-full h-10 bg-black hover:opacity-90 text-white cursor-pointer rounded-md"
            onClick={handleBuyNow}
          >
            {isLoading
              ? <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              : <span>Checkout</span>
            }
            
          </button>
        </div>
      </div>
    </div>
  );
  
}
