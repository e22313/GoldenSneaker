var productRoot = $(".App_cardBody_1tfYc").find(".listProduct");
var cartRoot = $(".App_cardBody_1tfYc").find(".cartProduct");
// Gọi AJAX để lấy danh sách sản phẩm
var productList = $.ajax({
  url: "https://sneaker-zrdo.onrender.com/api/product/",
  method: "GET",
  dataType: "json",
});

// Gọi AJAX để lấy danh sách giỏ hàng
var cartItemList = $.ajax({
  url: "https://sneaker-zrdo.onrender.com/api/cart/",
  method: "GET",
  dataType: "json",
});

var cart, products;

cartItemList.done(function (cartItems) {
  if (cartItems.length > 0) {
    $(".App_cartEmpty_xgWCN").remove();
  }
});
// Chờ cả hai cuộc gọi AJAX hoàn thành
$.when(productList, cartItemList)
  .done(function (productsResponse, cartResponse) {
    products = productsResponse[0];
    cart = cartResponse[0];

    $.each(products, function (index, product) {
      let price = product.price.toFixed(2);
      let name = product.name;
      let image = product.image;
      let color = product.color;
      let id = product.id;
      var productHTML =
        '<div class="App_shopItem_3FgVU" data-id="' +
        product.id +
        '">' +
        '<div class="App_shopItemImage_341iU" style="background-color: ' +
        product.color +
        '">' +
        '<img src="' +
        image +
        '" />' +
        "</div>" +
        '<div class="App_shopItemName_1_FJR">' +
        name +
        "</div>" +
        '<div class="App_shopItemDescription_1EIVK">' +
        product.description +
        "</div>" +
        '<div class="App_shopItemBottom_3401_">' +
        '<div class="App_shopItemPrice_2SLiG">$' +
        price +
        "</div>";

      let cartItem = isInCart(product.id, cart);
      let quantity = cartItem ? cartItem.quantity : 0;
      if (cartItem) {
        productHTML +=
          '<div class="App_inactive_19f0W App_shopItemButton_23FO1">' +
          '<div class="App_shopItemButtonCover_1bH2R">' +
          '<div class="App_shopItemButtonCoverCheckIcon_18IzJ"></div>' +
          "</div>" +
          "</div>";
        ///////////////////////////////////////////////////////////

        var cartItemHTML =
          '<div class="App_cartItem_lfA9I" data-id="' +
          id +
          '">' +
          '<div class="App_cartItemLeft_1HqDk cartItemLeft">' +
          '<div class="App_cartItemImage_1rLvq cartItemImage" style="background-color: ' +
          color +
          ';">' +
          '<div class="App_cartItemImageBlock_wRE4E">' +
          '<img src="' +
          image +
          '">' +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="App_cartItemRight_2LNcC cartItemRight">' +
          '<div class="App_cartItemName_3he6M cartItemName">' +
          name +
          "</div>" +
          '<div class="App_cartItemPrice_R0sr2 cartItemPrice">$' +
          price +
          "</div>" +
          '<div class="App_cartItemActions_13kia cartItemActions">' +
          '<div class="App_cartItemCount_1GCCN cartItemCount">' +
          '<div class="App_cartItemCountButton_Gr8VG decrement">-</div>' +
          '<div class="App_cartItemCountNumber_1Evq9">' +
          quantity +
          "</div>" +
          '<div class="App_cartItemCountButton_Gr8VG increment">+</div>' +
          "</div>" +
          '<div class="App_cartItemRemove_1GiLR cartItemRemove">' +
          '<img src="image/trash.png">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>";
        // Thêm mục giỏ hàng mới vào danh sách giỏ hàng
        $(".cartProduct").append(cartItemHTML);
      } else productHTML += '<div class="App_shopItemButton_23FO1"><p>ADD TO CART</p></div>' + "</div>" + "</div>";

      // Thêm HTML sản phẩm vào danh sách sản phẩm
      $(".listProduct").append(productHTML);
      calculateTotalAmount();
    });
  })
  .fail(function (xhr, status, error) {
    // Xử lý lỗi nếu có
    console.error(status, error);
  });

function isInCart(productId, cartItems) {
  return cartItems.find(function (cartItem) {
    return cartItem.productId === productId;
  });
}

// Xử lý sự kiện click vào nút "ADD TO CART"
$(document).on("click", ".App_shopItemButton_23FO1", function () {
  var productAdd = $(this).closest(".App_shopItem_3FgVU");
  var productId = productAdd.data("id"); // Lấy ID của sản phẩm

  let price = parseFloat(
    productAdd.find(".App_shopItemPrice_2SLiG").text().replace("$", "")
  );
  let name = productAdd.find(".App_shopItemName_1_FJR").text();
  let color = productAdd.find(".App_shopItemImage_341iU").text();
  let image = productAdd.find(".App_shopItemImage_341iU img").attr("src");

  $(".cartProduct .App_cartEmpty_xgWCN").remove();

  // Tạo HTML cho mục giỏ hàng
  var cartItemHTML =
    '<div class="App_cartItem_lfA9I" data-id="' +
    productId +
    '">' +
    '<div class="App_cartItemLeft_1HqDk cartItemLeft">' +
    '<div class="App_cartItemImage_1rLvq cartItemImage" style="background-color: ' +
    color +
    '">' +
    '<div class="App_cartItemImageBlock_wRE4E">' +
    '<img src="' +
    image +
    '">' +
    "</div>" +
    "</div>" +
    "</div>" +
    '<div class="App_cartItemRight_2LNcC cartItemRight">' +
    '<div class="App_cartItemName_3he6M cartItemName">' +
    name +
    "</div>" +
    '<div class="App_cartItemPrice_R0sr2 cartItemPrice">$' +
    price +
    "</div>" +
    '<div class="App_cartItemActions_13kia cartItemActions">' +
    '<div class="App_cartItemCount_1GCCN cartItemCount">' +
    '<div class="App_cartItemCountButton_Gr8VG decrement">-</div>' +
    '<div class="App_cartItemCountNumber_1Evq9">1</div>' +
    '<div class="App_cartItemCountButton_Gr8VG increment">+</div>' +
    "</div>" +
    '<div class="App_cartItemRemove_1GiLR cartItemRemove">' +
    '<img src="image/trash.png">' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  // Thêm mục giỏ hàng mới vào danh sách giỏ hàng
  $(".cartProduct").append(cartItemHTML);
  var newButtonHTML =
    '<div class="App_inactive_19f0W App_shopItemButton_23FO1">' +
    '<div class="App_shopItemButtonCover_1bH2R">' +
    '<div class="App_shopItemButtonCoverCheckIcon_18IzJ"></div>' +
    "</div>" +
    "</div>";
  $(this).replaceWith(newButtonHTML);
  addToCart(productId);
  calculateTotalAmount();
});

// Hàm để thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
  // Gọi API add to cart với ID của sản phẩm
  $.ajax({
    url: "https://sneaker-zrdo.onrender.com/api/cart/add/" + productId,
    method: "POST",
    dataType: "json",
    success: function (response) {},
    error: function (xhr, status, error) {
      // Xử lý lỗi nếu có
      console.error(status, error);
    },
  });
}
////////////////////////////////

$(document).on(
  "click",
  ".App_cartItemCountButton_Gr8VG.increment",
  function () {
    var cartItem = $(this).closest(".App_cartItem_lfA9I");
    var productId = cartItem.data("id");
    var quantityElement = cartItem.find(".App_cartItemCountNumber_1Evq9");
    var currentQuantity = parseInt(quantityElement.text());
    var newQuantity = currentQuantity + 1;
    quantityElement.text(newQuantity);
    calculateTotalAmount();

    // Gọi AJAX để cập nhật giỏ hàng
    var ajaxRequest = $.ajax({
      url: "https://sneaker-zrdo.onrender.com/api/cart/add/" + productId,
      method: "POST",
      dataType: "json",
    });

    ajaxRequest.fail(function (xhr, status, error) {
      // Xử lý lỗi nếu có
      console.error(status, error);
    });
  }
);

$(document).on(
  "click",
  ".App_cartItemCountButton_Gr8VG.decrement",
  function () {
    var cartItem = $(this).closest(".App_cartItem_lfA9I");
    var productId = cartItem.data("id");
    var quantityElement = cartItem.find(".App_cartItemCountNumber_1Evq9");
    var currentQuantity = parseInt(quantityElement.text());

    // Kiểm tra nếu số lượng hiện tại là 1, không thể giảm thêm
    if (currentQuantity <= 1) {
      var shopItemDiv = $('.App_shopItem_3FgVU[data-id="' + productId + '"]');
      var inactiveDiv = shopItemDiv.find(".App_inactive_19f0W"); // Sử dụng .find() thay vì querySelector
      var addToCartButton =
        '<div class="App_shopItemButton_23FO1"><p>ADD TO CART</p></div>';
      inactiveDiv.replaceWith(addToCartButton);
      cartItem.remove();
      if ($(".cartProduct").children().length === 0) {
        // Nếu không có thẻ con nào, thêm thẻ mới
        $(".cartProduct").append(
          '<div class="App_cartEmpty_xgWCN"><p class="App_cartEmptyText_2mtqJ">Your cart is empty.</p></div>'
        );
      }
      calculateTotalAmount();
      // Gọi AJAX để xóa mục khỏi giỏ hàng
      $.ajax({
        url: "https://sneaker-zrdo.onrender.com/api/cart/remove/" + productId,
        method: "POST",
        dataType: "json",
        success: function (response) {
          // Xóa mục khỏi giao diện
        },
        error: function (xhr, status, error) {
          // Xử lý lỗi nếu có
          console.error(status, error);
        },
      });
      return;
    }

    // Gọi AJAX để giảm số lượng trong giỏ hàng
    var ajaxRequest = $.ajax({
      url: "https://sneaker-zrdo.onrender.com/api/cart/remove/" + productId,
      method: "POST",
      dataType: "json",
    });
    var newQuantity = currentQuantity - 1;
    quantityElement.text(newQuantity);

    ajaxRequest.done(function (response) {
      // Cập nhật số lượng trên giao diện sau khi AJAX thành công
    });

    ajaxRequest.fail(function (xhr, status, error) {
      // Xử lý lỗi nếu có
      console.error(status, error);
    });
  }
);

$(document).on("click", ".App_cartItemRemove_1GiLR", function () {
  var cartItem = $(this).closest(".App_cartItem_lfA9I");
  var productId = cartItem.data("id");
  deleteCartItem(productId);

  cartItem.remove();
  calculateTotalAmount();
  var shopItemDiv = $('.App_shopItem_3FgVU[data-id="' + productId + '"]');
  var inactiveDiv = shopItemDiv.find(".App_inactive_19f0W");
  var addToCartButton =
    '<div class="App_shopItemButton_23FO1"><p>ADD TO CART</p></div>';
  inactiveDiv.replaceWith(addToCartButton);
  if ($(".cartProduct").children().length === 0) {
    // Nếu không có thẻ con nào, thêm thẻ mới
    $(".cartProduct").append(
      '<div class="App_cartEmpty_xgWCN"><p class="App_cartEmptyText_2mtqJ">Your cart is empty.</p></div>'
    );
    var totalPriceElement = $(".App_cardTitleAmount_17QFR");

    // Cập nhật nội dung của phần tử đã chọn với tổng giá trị tính được
    totalPriceElement.text("$0.00");
  }
});

function deleteCartItem(productId) {
  $.ajax({
    url: "https://sneaker-zrdo.onrender.com/api/cart/" + productId,
    method: "DELETE",
    dataType: "json",
    success: function (response) {},
    error: function (xhr, status, error) {
      console.error(status, error);
    },
  });
}

function calculateTotalAmount() {
  var totalAmount = 0;
  var cartItems = document.querySelectorAll(".App_cartItem_lfA9I");
  cartItems.forEach(function (item) {
    var priceString = item
      .querySelector(".App_cartItemPrice_R0sr2.cartItemPrice")
      .textContent.trim();
    var price = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
    var quantityString = item
      .querySelector(".App_cartItemCountNumber_1Evq9")
      .textContent.trim();
    var quantity = parseInt(quantityString);
    if (!isNaN(price) && !isNaN(quantity)) {
      totalAmount += price * quantity;
    }
    var totalPriceElement = $(".App_cardTitleAmount_17QFR");
    var totalPriceElement = $(".App_cardTitleAmount_17QFR");

    totalPriceElement.text("$" + totalAmount.toFixed(2));
  });
  return totalAmount;
}
