import menuArray from "/data"

function renderContainer(menuItems){   
    return menuItems.map(item =>{
        
        const { 
            name,
            ingredients,
            id,
            price,
            emoji
          } = item
               
        return `
           <div class="product"> 
                <div class="menu-item">
                    <div class="emoji">${emoji}</div>
                        <div class="product-desc">
                            <h1 class="name">${name}</h1>
                            <h3 class="ingredients">${ingredients}</h3>
                            <h2 class="price">$${price}</h2>
                        </div>             
                    </div>
                <div>
                        <button class="button" data-button="${id}">+</button>
                </div>
            </div>                 
        ` 
      
    }).join("") 
    
}

const newOrderArr = []
function newOrder(){
                
                document.addEventListener("click", function(e){
                    
                    const menuItemId = e.target.dataset.button
                            
                    const order = menuArray.filter(item => item.id == menuItemId)
                    
                    newOrderArr.push(...order)                 
                        
                    renderOrderElement(newOrderArr)
                    countTotalOrder(newOrderArr)
                    
                  
            })     
        }
  
 newOrder()
//------------
function renderOrderElement(item){
        const orderEl = item.map((menuItem, index) =>{
        return  `
                    <div class="order-el">
                    <div>${menuItem.name}</div>
                    <span class="remove" data-remove="${index}">Remove</span>
                    <div>$${menuItem.price}</div>
                    </div>`  
                 }).join("")
    
        document.getElementById("order-container").innerHTML = orderEl 
                                     
}
//REMOVE ITEM FROM THE ORDER
function getNewOrderIndex(){ 
        document.addEventListener("click", function(e){
        removeObjectByIndex(newOrderArr, Number(e.target.dataset.remove))
        })   
}

getNewOrderIndex()
function removeObjectByIndex(array, index) {
        if (index >= 0 && index < array.length) {
        array.splice(index, 1)
    }
}
//-------------------------------------------------------------------
function countTotalOrder(item){
    
    const orderTotal = item.reduce((total, curr) => total + curr.price, 0)       
    document.getElementById("order-total").innerHTML =  `
                    <div class="total">
                    <h2>Total</h2>  
                    <h2>$${orderTotal}</h2>
                    </div>
                    <button id="complete-order">Complete order</button>
                    `
    }
    
    function completeOrder(){
         const orderBtn = document.getElementById("order-total")
         const completeOrder = document.getElementById("complete-order")
         
         orderBtn.addEventListener("click", function(){
         
             completeOrder.innerHTML = `
                    <div id="form">
                    <h1>Enter card details</h1>
                        <form>
                            <input
                            placeholder="Enter Your Name"
                            />
                            <input
                            placeholder="Enter Card Number"
                            />
                            <input
                            placeholder="Enter CVV"
                            />
                        </form>
                        <button> Place an Order </button>
                    </div>
             `
            document.getElementById("form").style.display = "flex";

             }) 
    }
  completeOrder() 

function renderMenuItems(){
    document.getElementById("container").innerHTML = renderContainer(menuArray)   
}
    renderMenuItems()
    
    