// var
listProduct =[];

// -------------------------- Load---------------------
function LoadEV(){
  $('.MenuSection').load('./Menu.html')
  $(".SideBarSection").load("./SideBar.html", function () {
    const element = document.getElementById("LoadProduct");
    console.log("element", element);
    element.addEventListener("click", HandelShowProduct);
  });

  }
  LoadEV();


  function HandelShowCategory(params){
    $('.ProductAdminSection').load("../Admin/paging/ContentCategory.html")
  }
  function HandelManufacturer(params){
    $('.ProductAdminSection').load("../Admin/paging/ContentCategory.html")
  }
  function HandelShowAccount(params){
    $('.ProductAdminSection').load("../Admin/paging/ContentCategory.html")
  }
 
  // -------------- Event Modal
  
  function HandelCallModal(params){
    $('.CallModal').load("./Modal.html")
    }

  //Them San Pham--------------------------------------------------

  function HandelShowProduct(params){
    $('.ProductAdminSection').load("./Content.html",function () {
      fetchlistProductAdmin() })
    };
  
  
  function fetchlistProductAdmin(params){
    $("#Contenttable").empty();
    for (let index = 0; index < 2; index++) {
      $("#Contenttable").append(
        `
        <tr>
                  <td>1</td>
                  <td>Samsung Galaxy S22 Ultra 5G</td>
                  <td>30.990.000₫</td>
                  <td>6.9 inches, Chip MediaTek Helio G85 (12nm) mạnh mẽ, Ram 4G, Pin 7000 mAh</td>
                  <td>ProductDetail1</td>
                  <td>5</td>
                  <td>image1.jpg</td>
                  <td>SAMSUNG</td>
                  <td>Điện thoại</td>
                  <td>
                    <button type="button" class="btn btn-warning">Edit</button>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
        `
      )
    }
  }
  
// =========== Add New ===========

  //Lay du lieu Input
  function HandleCreateProduct(params){
  var m_id =$("#Id").val();
  var m_Name =$("#Name").val();
  var m_Price =$("#Price").val();
  var m_Info =$("#Info").val();
  var m_Detail =$("#Detail").val();
  var m_Star =$("#Star").val();
  var m_Image =getImageName($("#Image").val());
  var m_Manufacturer=$("#Manufacturer").val();
  var m_Category =$("#Category").val();
 
  //Khai Bao Mang 
 
 
  //Tao Product luu tru
  var ProductNew = {
    id: m_id,
    name: m_Name,
    price: m_Price,
    info: m_Info,
    detail: m_Detail,
    ratingstar: m_Star,
    imageName:m_Image,
    manufacturer_Id: m_Manufacturer,
    category_Id: m_Category,
  };
  ////////Lưu dữ liệu Local Store
  listProduct=JSON.parse(localStorage.getItem("listProduct"))
  console.log({ProductNew});
  console.log(listProduct);

 // Them phan tu vao cuoi mang
  listProduct.push(ProductNew);
  console.log(listProduct);
  
  localStorage.setItem("listProduct",JSON.stringify(listProduct))

  // Reset
  HandleResetForm();
  fetchlistProductAdmin();
  }

  function fetchlistProductAdmin(params){
    
    /////// Local Store
    let listProductLocal = JSON.parse(localStorage.getItem("listProduct"))
    console.log(JSON.parse(localStorage.getItem("listProduct")))
    //reset list product
    // listProductLocal=[]
     $("#Contenttable").empty();
  // khoi Tao product----------------
    for(let index = 0 ; index < listProductLocal.length; index++){
    console.log('index', index ,listProductLocal[index])
    $('#Contenttable').append(
      `       
      <tr>
        <td>${listProductLocal [index].id}</td>
        <td>${listProductLocal [index].name}</td>
        <td>${listProductLocal [index].price}</td>
        <td>${listProductLocal [index].info}</td>
        <td>${listProductLocal [index].detail}</td>
        <td>${listProductLocal [index].ratingstar}</td>
        <td>${listProductLocal [index].imageName}</td>
        <td>${listProductLocal [index].manufacturer_Id}</td>
        <td>${listProductLocal [index].category_Id}</td>
      
      <td>
       <button type="button" class="btn btn-warning" onclick="handleEdit(${listProductLocal[index].id})">Edit</button>
      </td>
      <td>
       <button type="button" class="btn btn-danger" onclick="handleDelete(${listProductLocal[index].id})">Delete</button>
       </td>
       </tr>
      `
      
    )
  }
  }

  function HandleResetForm(){
    $("#Id").val("");
    $("#Name").val("");
    $("#Price").val("");
    $("#Info").val("");
    $("#Detail").val("");
    $("#Star").val("");
  // $("#Image").val(""));
    $("#Manufacturer").val("");
    $("#Category").val("");
  }
  
  // Get Img
  function getImageName(pathImg){
    console.log("pathImg",pathImg)
    var itemArray = pathImg.split("\\");
    console.log('itemArray',itemArray)
    var imageName = itemArray[itemArray.length - 1];
    console.log('imageName',imageName)
    return imageName;

  }


  //Delete=========================
 

  function handleDelete(idDelete){
    //Confirm

    var ConfirmDelete = confirm("Bạn có muốn xóa sản phẩm ?");
    if(ConfirmDelete){
      var indexDelete = listProduct.findIndex((product)=> product.id == idDelete);

      if(indexDelete !== -1){
        listProduct.splice(indexDelete,1);
        //luu local
        localStorage.setItem("listProduct",JSON.stringify(listProduct));
        fetchlistProductAdmin();
      }else(
        alert("Ko the xoa san pham")
      )
    }
  }

  //Update --------------------------
var idUpdate="";
function handleEdit(idEdit){
    idUpdate = idEdit;  
     var index =  listProduct.findIndex((product)=> product.id == idUpdate);

    $("#IdUpdate").val( listProduct[index].id);
    $("#NameUpdate").val( listProduct[index].name);
    $("#PriceUpdate").val( listProduct[index].price);
    $("#InfoUpdate").val( listProduct[index].info);
    $("#DetailUpdate").val( listProduct[index].detail);
    $("#StarUpdate").val( listProduct[index].ratingstar);
  // $("#Image").val(""));
    $("#ManufacturerUpdate").val( listProduct[index].manufacturer_Id);
    $("#CategoryUpdate").val( listProduct[index].category_Id);

    $("#ModalUpdateProduct").modal("show")
}

function handleResetUpdate(){
  $("#IdUpdate").val("");
  $("#NameUpdate").val("");
  $("#PriceUpdate").val("");
  $("#InfoUpdate").val("");
  $("#DetailUpdate").val("");
  $("#StaUpdater").val("");
// $("#Image").val(""));
  $("#ManufacturerUpdate").val(0);
  $("#CategoryUpdate").val(0);
}

function handleUpdate(){
    var index =  listProduct.findIndex((product)=> product.id == idUpdate);

    // lay du lieu 
    var m_Name =$("#NameUpdate").val();
    var m_Price =$("#PriceUpdate").val();
    var m_Info =$("#InfoUpdate").val();
    var m_Detail =$("#DetailUpdate").val();
    var m_Star =$("#StarUpdate").val();
    var m_Image =getImageName($("#ImageUpdate").val());
    var m_Manufacturer=$("#ManufacturerUpdate").val();
    var m_Category =$("#CategoryUpdate").val();

    //Thuc hien Update
    listProduct[index].name = m_Name
    listProduct[index].price = m_Price
    listProduct[index].info = m_Info
    listProduct[index].detail = m_Detail
    listProduct[index].ratingstar = m_Star

    if(m_Image !== null && m_Image !== ""){
      listProduct[index].imageName=m_Image;
    }

    listProduct[index].manufacturer_Id=m_Manufacturer
    listProduct[index].category_Id=m_Category;

    //luu vao local

    localStorage.setItem("listProduct",JSON.stringify(listProduct))

    handleResetUpdate();

    $("#ModalUpdateProduct").modal("hide");
    fetchlistProductAdmin();
}