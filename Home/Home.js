
// Event Banner Img ----------------------------------

var ImgFeature=document.querySelector('.img-feature')
var listImg = document.querySelectorAll('.list-img img')
var prevBtn = document.querySelector('.prev')
var nextBtn = document.querySelector('.next')
var currentIndex = 0;
console.log(listImg)


function UpdateImgByIndex(index){
  // remove active class
  document.querySelectorAll('.list-img div').forEach(item=>{
      item.classList.remove('active')
  })

  currentIndex = index
  ImgFeature.src = listImg[index].getAttribute('src')
  listImg[index].parentElement.classList.add('active')
}

listImg.forEach((imgElement, index) =>{

    imgElement.addEventListener('click' ,e =>{
      ImgFeature.style.opacity='0'
      setTimeout(()=>{
        UpdateImgByIndex(index)
        ImgFeature.style.opacity='1'
      },400)
  })
})


// Event Btn 
prevBtn.addEventListener('click', e=>{

// Event
  if(currentIndex == 0){
    currentIndex = listImg.length-1
  }else{
    currentIndex--
  }

   //animation
   ImgFeature.style.animation=''
   setTimeout(()=>{
     UpdateImgByIndex(currentIndex)
     ImgFeature.style.animation = 'slideleft 1s ease-in-out forwards'
   },300)
})

nextBtn.addEventListener('click' , e=>{
  if(currentIndex == listImg.length-1){
    currentIndex = 0
  }else{
    currentIndex ++
  }

     //animation
     ImgFeature.style.animation=''
     setTimeout(()=>{
      UpdateImgByIndex(currentIndex)
       ImgFeature.style.animation = 'slideright 1s ease-in-out forwards'
     },400)
})
UpdateImgByIndex(0)


// Load các thành phần của trang Home Page
function loadComponent(params) {
  $(".MenuSection").load("../Home/PagingHtml/Menu.html");
  // $(".BannerSection").load("../Home/PagingHtml/Banner.html");
  $(".ProductsSection").load("../Home/PagingHtml/Products.html");
  $(".FooterSection").load("../Home/PagingHtml/Footer.html");
}
loadComponent()
$(function () {
  loadComponent();

  //   Thực hiện Delay quá trình load dữ liệu DS sản phẩm để đợi các thành phần trang web load hoàn chỉnh
  setTimeout(() => {
    featchListProduct();
  }, 200);
})
var listProduct =[]
function featchListProduct(params) {
  console.log(JSON.parse(localStorage.getItem('listProduct')))
  listProduct = JSON.parse(localStorage.getItem('listProduct'))
  console.log(listProduct)

  for (let index = 0; index < 8; index++) {
    $(".ProductList").append(`
  
    <div class="col-xs-3 col-sm-3 col-md-3 col-lg-2 " style="text-align: center  ">
    <!-- Ảnh -->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" >
        <img src="../Asset/Project/${listProduct[index].imageName}" alt="" style="width: 200px; height: 300px; margin-left:10px" />
      </div>
    </div>
    <!-- Tên sản phẩm -->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <h3 style="font-weight:lighter">${listProduct[index].name}</h3>
      </div>
    </div>
    <!-- Hãng sản xuất -->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <h4>${listProduct[index].manufacturer_Id} i </h4>
      </div>
    </div>
    
    <!-- Đánh giá -->
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <ul class="rating" style="list-style: none; display: flex; font-size: 20px; padding-inline-start: 0px">
            ${showStarRating(listProduct[index].ratingstar)}
        </ul>
      </div>
    </div>

    <!-- Thêm vào giỏ hàng -->
    <div class="row cart">
      <div class="col-sm-4 col-md-3 col-lg-6">
        <h4>${listProduct[index].price}đ</h4>
      </div>

      <div class="col-xs-6 col-sm-6 col-md-6 col-lg-5">
        <button type="button" class="btn btn-default" style="border: 0px">
          <i class="fa fa-shopping-cart" style="color: red; font-size: 25px"></i>
        </button>
      </div>
    </div>
    <br />
    <br />
    <br />
  </div>
  <!-- Finish SP 1 -->
    `);
  }}

  // Show Rating
  function showStarRating(ratingstar){
    // Khai bao mang
    let starRating = "";
    // Appearanccce 
    for(let index = 0 ;index < ratingstar ; index ++){
      starRating += `
        <li>
        <i class="fa fa-star selected" style="color: orange"></i>
        </li>
      `  
    }
    for(let index =0;index < 5-ratingstar;index++){
      starRating +=`
      <li>
      <i class="fa fa-star"></i>
      </li>
      `
    }
    return starRating;
  }
  