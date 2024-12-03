//بمسك العناصر
const name = document.querySelector("#courseName");
const category = document.querySelector("#courseCategory");
const price = document.querySelector("#coursePrice");
const description = document.querySelector("#courseDescription");
const capacity = document.querySelector("#courseCapacity");
const addBtn = document.querySelector("#click");
const invalidName = document.querySelector(".invalid-name");
const invalidCategory = document.querySelector(".invalid-category");
const invalidPrice = document.querySelector(".invalid-price");
const invalidCapacity = document.querySelector(".invalid-capacity");
const DeleteBtn = document.querySelector("#deleteBtn");
const search = document.querySelector("#search");
const updateButtons = document.querySelectorAll(".update-btn");

let 
mode='create';
let temp;

// عشان يخزن كل الobjects  مع بعض
let courses = [] ;   

// عشان الداتا تضل محفوظة في الجدول لما اعمل ريفريش
if (localStorage.getItem("courses") != null) {

    courses = JSON.parse(localStorage.getItem("courses")); //    array of objectالى json برجع ال 
    displayCourses(); // call display function 
}
// ممكن نستخدم  blur event
name.addEventListener("input", (e)=>{

  e.preventDefault(e);

   //name validation
   const namePattern = /^[A-Z][a-z]{2,10}$/ ;
   if(!namePattern.test(name.value)){
     invalidName.innerHTML="the name is invalid must start with capital and contaian 2-10 small characters.";
     name.classList.add("is-invalid"); // boostrap class

     isValid = false;

   }else{
     invalidName.innerHTML= " ";
     name.classList.remove("is-invalid"); // boostrap class
     name.classList.add("is-valid"); // boostrap class
   }

})


category.addEventListener("input", (e)=>{

  e.preventDefault(e);

    //category validation
    const categoryPattern = /^[A-Z][a-z]{2,3}$/ ;
    if(!categoryPattern.test(category.value)){
      invalidCategory.innerHTML="the category is invalid must start with capital and contaian 2-3 small characters.";
      category.classList.add("is-invalid"); // boostrap class

      isValid = false;

    } else{

      invalidCategory.innerHTML= " ";
      category.classList.remove("is-invalid"); // boostrap class
      category.classList.add("is-valid"); // boostrap class
    }

})

price.addEventListener("input", (e)=>{

  e.preventDefault(e);

// price validations
if( isNaN(price.value) || price.value < 10){
  invalidPrice.innerHTML="the price is invalid must be a  number greater than or equal to 10.";
  price.classList.add("is-invalid"); // boostrap class

  isValid = false;

}else{
  invalidPrice.innerHTML= " ";
 price.classList.remove("is-invalid"); // boostrap class
  price.classList.add("is-valid"); // boostrap class
}
})

capacity.addEventListener("input", (e)=>{

  e.preventDefault(e);

   // capacity validations
   if( capacity.value < 10){
    invalidCapacity.innerHTML="the capacity is invalid must be a  number greater than or equal to 10.";
    capacity.classList.add("is-invalid"); // boostrap class

    isValid = false;

  }else{
    invalidCapacity.innerHTML= " ";
   capacity.classList.remove("is-invalid"); // boostrap class
    capacity.classList.add("is-valid"); // boostrap class
  }
})

addBtn.addEventListener("click", (e) => {
// بنعملها مع اي فورم
    e.preventDefault();  //refresh عشان ما يعمل بسرعة

    let   isValid = true;
    //validation
       //name validation
   const namePattern = /^[A-Z][a-z]{2,10}$/ ;
   if(!namePattern.test(name.value)){
     invalidName.innerHTML="the name is invalid must start with capital and contaian 2-10 small characters.";
     name.classList.add("is-invalid"); // boostrap class

     isValid = false;

   }else{
     invalidName.innerHTML= " ";
     name.classList.remove("is-invalid"); // boostrap class
     name.classList.add("is-valid"); // boostrap class
   }

      //category validation
      const categoryPattern = /^[A-Z][a-z]{2,3}$/ ;
      if(!categoryPattern.test(category.value)){
        invalidCategory.innerHTML="the category is invalid must start with capital and contaian 2-3 small characters.";
        category.classList.add("is-invalid"); // boostrap class
  
        isValid = false;
  
      } else{
  
        invalidCategory.innerHTML= " ";
        category.classList.remove("is-invalid"); // boostrap class
        category.classList.add("is-valid"); // boostrap class
      }

      // price validations
if( isNaN(price.value) || price.value < 10){
  invalidPrice.innerHTML="the price is invalid must be a  number greater than or equal to 10.";
  price.classList.add("is-invalid"); // boostrap class

  isValid = false;

}else{
  invalidPrice.innerHTML= " ";
 price.classList.remove("is-invalid"); // boostrap class
  price.classList.add("is-valid"); // boostrap class
}

  // capacity validations
  if( capacity.value < 10){
    invalidCapacity.innerHTML="the capacity is invalid must be a  number greater than or equal to 10.";
    capacity.classList.add("is-invalid"); // boostrap class

    isValid = false;

  }else{
    invalidCapacity.innerHTML= " ";
   capacity.classList.remove("is-invalid"); // boostrap class
    capacity.classList.add("is-valid"); // boostrap class
  }



  
    if(isValid){
      const course = {


        name : name.value,
        category : category.value,
        price : price.value,
        description : description.value,
        capacity : capacity.value,


    }

    if(mode=='create'){

      courses.push(course);  // ��لب الكورس الجديد ويضيفه ��لى القا��مة التي سبقتها
      // sweet alert

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});
Toast.fire({
  icon: "success",
  title: "new course added successfully",
});
  
    } else{

      courses [temp] = course;
      mode='create';
      addBtn.value = 'Add Course';

    }

   

    // لانه المصفوفة لما نعمل ريفريش بتروح الداتا فلازم نخزن ياللوكال او داتا بيس بس لازم نحوله ل string
    localStorage.setItem("courses", JSON.stringify(courses));  

  




    displayCourses(); // call display function 

    clearFields();// clear th fields
    
   
    }

    //بتقدم اشي اسمه  تيست عشان نجربjs

    console.log(namePattern.test(name.value));
  

});



//read

function displayCourses() {


    const result = courses.map( (course,index)=>{  // index default parameter from map (id)


      return `
      <tr>
      <td>${index}</td>
      <td>${course.name}</td>
      <td>${course.category}</td>
      <td>${course.price}</td>
      <td>${course.description}</td>
      <td>${course.capacity}</td>
      <td>  
      <button class="btn btn-success  update-btn" onclick='updateCourse(${index})'> update </button>
      </td>
      <td>
      <button class="btn btn-danger " onclick='deleteCourse(${index})' > delete </button>
      
      </td>
      </tr>
      
      `;


    } ).join(' ');

    document.querySelector("#data").innerHTML = result;   // insert into tbody

   
   
}

//update course

function updateCourse(index) {

name.value=courses[index].name;
category.value=courses[index].category;
price.value=courses[index].price;
description.value=courses[index].description;
capacity.value=courses[index].capacity;

addBtn.value = "Update";

mode='update';
temp=index;
//عشان يرجع لاول الصفحة لما يعدل
scroll({
  top:0,
 
})


}

//delete course

function deleteCourse(index) {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {

      courses.splice(index,1);
      localStorage.setItem("courses", JSON.stringify(courses));  
      displayCourses();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });


}

//delete all

DeleteBtn.addEventListener("click", ()=>{

  Swal.fire({
    title: "Are you sure?",
    text: "delete all courses!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "green",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete all!"
  }).then((result) => {
    if (result.isConfirmed) {

      courses= [ ];
      localStorage.setItem("courses", JSON.stringify(courses)); 
      displayCourses();

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });







})

// search

search.addEventListener("input", ()=>{

const keyword = search.value;

const searchResult = courses.filter((course)=>{

  return course.name.toLowerCase().includes( keyword.toLowerCase());

})

const result = searchResult.map( (course,index)=>{  // index default parameter from map (id)


  return `
  <tr>
  <td>${index}</td>
  <td>${course.name}</td>
  <td>${course.category}</td>
  <td>${course.price}</td>
  <td>${course.description}</td>
  <td>${course.capacity}</td>

  <td>
  <button class="btn btn-danger " onclick='deleteCourse(${index})' > delete </button>

  </td>
  </tr>
  
  `;


} ).join(' ');

document.querySelector("#data").innerHTML = result;   // insert into tbody

})
 
// clear th fields
function clearFields() {
  name.value = "";
  category.value = "";
  price.value = "";
  description.value = "";
  capacity.value = "";

  // إزالة أي حالة "valid" أو "invalid" من الحقول
  name.classList.remove("is-valid", "is-invalid");
  category.classList.remove("is-valid", "is-invalid");
  price.classList.remove("is-valid", "is-invalid");
  capacity.classList.remove("is-valid", "is-invalid");
}


