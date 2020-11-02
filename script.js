// ======= default data =======
const menu = document.querySelector("#menu");
const cart = document.querySelector("#cart");
const totalAmount = document.querySelector("#total-amount");
const submitBtn = document.querySelector("#submit-button");

// 菜單資料
let productData = [
  {
    id: "product-1",
    imgUrl:
      "https://images.unsplash.com/photo-1558024920-b41e1887dc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "馬卡龍",
    price: 90
  },
  {
    id: "product-2",
    imgUrl:
      "https://images.unsplash.com/photo-1560691023-ca1f295a5173?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "草莓",
    price: 60
  },
  {
    id: "product-3",
    imgUrl:
      "https://images.unsplash.com/photo-1568271675068-f76a83a1e2d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "奶茶",
    price: 100
  },
  {
    id: "product-4",
    imgUrl:
      "https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    name: "冰咖啡",
    price: 180
  }
];
// ======= 請從這裡開始 =======
// 1.依照 productData 內的資料顯示所有的品項名稱、價格和照片
const createMenu = (data) => {
  const menuCol = document.createElement("div");
  menuCol.classList.add("col-3"); //extra selection is not necessary
  menuCol.innerHTML = 
    `<div class="card">
        <img src=${data.imgUrl} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${data.name}</h5>
          <p class="card-text">${data.price}</p>
          <a id=${data.id} href="#" class="btn btn-primary cartBtn">加入購物車</a>  
        </div>
     </div>`;
     // id在按鈕能知道哪個品項被觸發 之後能作為條件避免同品項出現兩次(?)
  menu.append(menuCol);
}

productData.map(createMenu);

// 2.按下「加入購物車」按鈕後，購物車清單會新增一列資料, 再點可以更改數量(或設置數量計數器)
const addToCartAfterClick = () => {

  let cartBtn = event.target;
  let cartTitle = cartBtn.parentElement.querySelector(".card-title").textContent;
  let cartText = cartBtn.parentElement.querySelector(".card-text").textContent;
  let cartID = cartBtn.getAttribute("id");
  let number = 1;
  let cartPrice = cartText * number;
  if (cartBtn && cartBtn.classList.contains("cartBtn")) {
  
    let cartItem = document.createElement("li");
    cartItem.classList.add("list-group-item", `${cartID}`);
    cartItem.innerHTML = 
      `<span>${cartTitle} X </span>
      <input type="text" value=${number} />  
      <span>小計：</span>
      <span class="cart-price">${cartPrice}</span>
      <button type="button">移除</button>`;

    cart.append(cartItem);
  }
}
menu.addEventListener("click", addToCartAfterClick);


// 3.購物車會自動計算總金額

calculateSumAfterClick = () => {
  let priceArray = [];
  cart.querySelectorAll(".cart-price").forEach(price => { //Nodelist can use forEach method
      let itemPrice = Number(price.innerText);
      return priceArray.push(itemPrice)   
    })
  let sum = priceArray.reduce((acc, price) => {
    return acc + price;
    }, 0)
  let totalAmount = document.querySelector("#total-amount");
  totalAmount.innerHTML = `${sum}`
}

menu.addEventListener("click", calculateSumAfterClick);


// 4.送出訂單會跳出收據
// 5.收據被確認後，購物車會被清空


const checkPurchase = () => {
  if (confirm("請確認您的訂單")) {
    while (cart.children.length > 0) {
      cart.children[0].remove();
    }

    let totalAmount = document.querySelector("#total-amount");
    totalAmount.innerHTML = `--`

    //dumb solution:
    // let multiPurchase = document.querySelectorAll("ul#cart > li");
    // while (multiPurchase.length > 0) {
    //   purchase = document.querySelector("ul#cart > li");
    //   cart.removeChild(purchase);
    //   multiPurchase = document.querySelectorAll("ul#cart > li"); //have to update it after removeChild (if before, there will be an extra round)
    // }    
  }  
}

submitBtn.addEventListener("click", checkPurchase);









