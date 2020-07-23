//https://www.youtube.com/watch?v=YeFzkC2awTM
//如何加入購物車之後也加JSON資料儲存在localstorage
//如何按刪除購物車商品也將localstorage存放的指定資料給刪除
//如何關閉之後重啟瀏覽器購物車的商品還在
//if 陣列 key存在
//push()
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //removeCartItemButtons刪除按鈕的變數
    var removeCartItemButtons = document.getElementsByClassName('fa-close')
    console.log(removeCartItemButtons)
    //用迴圈把滑鼠按下的事件加到每個class="fa-close"
    for (i = 0; i < removeCartItemButtons.length; i++) {
        var btn = removeCartItemButtons[i]
        btn.addEventListener('mousedown', removeCartItem)
    }
    //addToCartButtons加入購物車的變數
    var addToCartButtons = document.getElementsByClassName('add-to-cart-btn')
    //用迴圈把click事件跟函數加到每個class="add-to-cart-btn"
    for (i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addCartClicked)
    }

    document.getElementsByClassName('checkout-btn')[0].addEventListener('click', checkoutClicked)


}

function checkoutClicked() {
    var cartItems = document.getElementsByClassName('cart-list')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var btnClicked = event.target
    var shopItem = btnClicked.parentElement.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('cart-item-title')[0].innerText
    var data = JSON.parse(localStorage.productarray)
    var index = data.findIndex(item => item.title === title)
    data.splice(index, 1)
    localStorage.productarray = JSON.stringify(data)
    btnClicked.parentElement.parentElement.parentElement.parentElement.remove()
    var products = getAllProducts()

    updateCartTotal()
}

function addCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('product-price')[0].innerText
    var imgSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var id = shopItem.getElementsByClassName('shop-item-id')[0].innerHTML
    addItemToCart(title, price, imgSrc, id)


        
    var products = getAllProducts()
    products.push({
        "title": title,
        "price": price,
        "imgSrc": imgSrc,
        "id": id
    })
    localStorage.setItem('productarray', JSON.stringify(products))

    updateCartTotal()
}

function addItemToCart(title, price, imgSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('single-cart-item')
    var cartItems = document.getElementsByClassName('cart-list')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            var products = getAllProducts()
            products.pop()
            localStorage.setItem('productarray', JSON.stringify(products))
            alert('這商品已經加到購物車了')
            return
        }
    }
    var cartRowContent = `
    <a href="#" class="product-image">
        <img src="${imgSrc}" class="cart-thumb" alt="">
        <!-- Cart Item Desc -->
        <div class="cart-item-desc">
          <span class="product-remove"><i class="fa fa-close" aria-hidden="true"></i></span>
            <h6 class="cart-item-title">${title}</h6>
            <p class="price">${price}</p>
        </div>
    </a>
    `
    cartRow.innerHTML = cartRowContent
    cartItems.appendChild(cartRow)
    cartRow.getElementsByClassName('fa-close')[0].addEventListener('mousedown', removeCartItem)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-list')[0]
    var cartRows = cartItemContainer.getElementsByClassName('single-cart-item')
    var count = document.getElementsByClassName('cart-item-count')[0]
    var count2 = document.getElementsByClassName('cart-item-count')[1]
    count.innerText = cartRows.length
    count2.innerText = cartRows.length
    var total = 0
    //console.log(cartRows)
    for (i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))

        total = total + price
        console.log(total)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total


}

function setAllProducts() {
    var products = getAllProducts()
    products.forEach(element => {
        var cartRow = document.createElement('div')
        cartRow.classList.add('single-cart-item')
        var cartItems = document.getElementsByClassName('cart-list')[0]
        var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
        var cartRowContent = `
        <a href="#" class="product-image">
            <img src="${element.imgSrc}" class="cart-thumb" alt="">
            <!-- Cart Item Desc -->
            <div class="cart-item-desc">
            <span class="product-remove"><i class="fa fa-close" aria-hidden="true"></i></span>
                <h6 class="cart-item-title">${element.title}</h6>
                <p class="price">${element.price}</p>
            </div>
        </a>
        `
        cartRow.innerHTML = cartRowContent
        cartItems.appendChild(cartRow)
        cartRow.getElementsByClassName('fa-close')[0].addEventListener('mousedown', removeCartItem)
    });
    updateCartTotal()
}

function getAllProducts() {
    try {
        var products = JSON.parse(localStorage.productarray);
        return products;
    } catch (e) {
        return [];
    }
}


