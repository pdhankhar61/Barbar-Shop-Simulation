class Customer {
  constructor(customer_name) {
    this.customer_name = customer_name;
  }
}

let i = 0;
let chair_name_to_delete; //chair name to delete customer
let bool_value = true;
let checking_chair;
let person;
let chair; // store customer`s choice of chair
let customer_name_array = []; //array to store new customer name
let chair_chosen = [];
let Entry_time = []; //arrival time stored in it
let Service_time_start = []; // service starts at this time
let Service_time_ends = []; // service ends at this time
let Waiting_time = []; //waiting time of each customer

function newCustomer() {
  // let time = new Date();
  for (let p = 0; p <= 1; p++) {
    if (p === 0) {
      person = prompt("Please enter your name", "Enter Your Name");
    } else if (p === 1) {
      chair = prompt(
        "type one of the chairs- chair_1 : Cutting , chair_2 : Shaving ,chair_3 : Facial",
        "chair_1"
      );
    }
  }

  // var person = prompt("Please enter your name");
  if (person && chair) {
    customer_name_array[i] = person; //storing each new coming customer name
    chair_chosen[i] = chair; // storing chair chosen by customer
    //storing arrival time of each customer
    Entry_time[i] =`${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

    let customer = new Customer(person); // object created

    var Pelement = document.createElement("div");
    var Celement = document.createElement("div");
    var Celement_2 = document.createElement("div");
    // var para=document.createElement("p");
    Celement.innerText = customer_name_array[i].slice(0, 1);
    Celement_2.innerHTML = customer.customer_name + " " + chair;
    Pelement.appendChild(Celement);
    Pelement.appendChild(Celement_2);
    document.getElementById("upcoming_customers").appendChild(Pelement);

    console.log(customer_name_array[i] + " " + Entry_time[i]);
    console.log(person);
    console.log(i);
    chair_PE_set_kro();
    i = i + 1;
  } else {
    alert("No new Customer is added");
  }
}

function chair_PE_set_kro() {
  //let element = document.getElementById("upcoming_customers");
  // while (element.children[1]) {
  // element.removeChild(element.children[1]);}

  let parent = document.getElementById(chair_chosen[i]);
  let element = document.getElementById("upcoming_customers");
  let new_element = document.createElement("div");

  // let chair_1 = document.getElementById("chair_1");

  if (parent.firstElementChild.firstElementChild) {
    alert("Wait for some time chair is already filled");
    //setTimeout(parent.firstElementChild.firstElementChild.remove(),5000);
    //let time = new Date();
    // console.log(time.getMinutes()+":"+time.getSeconds());
    bool_value = false;
  } else {
    bool_value = true;
    //console.log("hello prince bhai");
  }

  if (bool_value) {
    // let element = document.getElementById("upcoming_customers");
    // while (element.children[1]) {
    for (let p = 1; p < element.children.length; p++) {
      if (
        element.children[p].lastChild.innerHTML ===
        customer_name_array[i] + " " + `${chair}`
      ) {
        element.children[p].remove();
        //console.log("removed from the NEW CUSTOMERS list");
      }
    }
    //}
    // let new_element=document.createElement('div');
    parent = document.getElementById(chair_chosen[i]);
    new_element.innerHTML = customer_name_array[i];
    parent.children[0].appendChild(new_element);
    Service_time_start[customer_name_array.indexOf(customer_name_array[i], i)] =
    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    console.log(Service_time_start[i] + " service time start");
    let detail = document.getElementsByClassName(
      `customer_in_chair_individual_${chair_chosen[i]}`
    );
    detail[0].children[0].append(customer_name_array[i].slice(0, 1));
    detail[0].children[1].append(customer_name_array[i]);
  }
}

function delete_customer() {
  chair_name_to_delete = prompt(
    "Enter anyone of these names:  chair_1, chair_2, chair_3 to remove respective customer",
    "chair_1"
  );

  if (
    chair_name_to_delete === "chair_1" ||
    chair_name_to_delete === "chair_2" ||
    chair_name_to_delete === "chair_3"
  ) {
    remove_customer_main_logic(chair_name_to_delete);
  } else {
    alert("Please enter correct chair name");
  }
}

function remove_customer_main_logic(chair_name_to_delete) {
  let parent = document.getElementById(chair_name_to_delete);
  if (parent.firstElementChild.firstElementChild) {
    Service_time_ends[
      customer_name_array.indexOf(
        parent.firstElementChild.firstElementChild.innerHTML
      )
    ] =
    `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    console.log(
      Service_time_ends[
        customer_name_array.indexOf(
          parent.firstElementChild.firstElementChild.innerHTML
        )
      ] + " Service_time_ends"
    );
    alert(
      `Existing Customer will be removed from ${chair_name_to_delete} press OK!`
    );
    parent.firstElementChild.firstElementChild.remove();
    set_new_customer_from_list_in_chair(chair_name_to_delete);
  } else {
    alert("There is no customer to remove.");
  }
}

function set_new_customer_from_list_in_chair(chair_name_to_delete) {
  let detail = document.getElementsByClassName(
    `customer_in_chair_individual_${chair_name_to_delete}`
  );
  let element = document.getElementById("upcoming_customers");
  let parent = document.getElementById(chair_name_to_delete);
  let length_of_element = element.children.length;
 let value_of_p;

  if (length_of_element > 1) {
    // console.log("helllllllllpooooooooooooooo");
    for (let p = 1; p <= element.children.length-1; p++) {
      let str = element.children[p].lastElementChild.innerHTML;
      if (str.endsWith(chair_name_to_delete)) {
        let new_element = document.createElement("div");
        new_element.innerHTML = str.replace(` ${chair_name_to_delete}`,"");
        parent.children[0].appendChild(new_element);
        Service_time_start[
          customer_name_array.indexOf(
            str.replace(` ${chair_name_to_delete}`, "")
          )
        ] =
        `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
        console.log(
          Service_time_start[
            customer_name_array.indexOf(
              str.replace(` ${chair_name_to_delete}`, "")
            )
          ] + " service time start"
        );
        detail[0].children[0].textContent = str
          .replace(chair_name_to_delete, "")
          .slice(0, 1);
        detail[0].children[1].textContent = str.replace(
          ` ${chair_name_to_delete}`,""
        );
        element.children[p].remove();
  break;
      }else{
      value_of_p=p;
      if(value_of_p===element.children.length-1){
        detail[0].children[0].textContent ='';
      detail[0].children[1].textContent ='';
        alert(`No customer is waiting for ${chair_name_to_delete}`);
      }
    
    }
      
    }
    
 //  alert(`no customers for ${chair_name_to_delete}`);
  
     
  } else if (length_of_element === 1) {
    alert(
      `No more customers to address for ${chair_name_to_delete}. Press OK! to remove existing customer.`
    );
    detail[0].children[1].textContent = "";
    detail[0].children[0].textContent = "";
  }
}

function Report() {
  var report = document.getElementsByClassName("report");
  var table = document.createElement("table");
  var th1 = document.createElement("th");
  var th2 = document.createElement("th");
  var th3 = document.createElement("th");
  var th4 = document.createElement("th");
  var th5 = document.createElement("th");
  var th6 = document.createElement("th");
  th1.innerText = "Arrival Time";
  th2.innerText = "Service start at";
  th3.innerText = "Service end at";
  th4.innerText = "Name of customers";
  th5.innerText = "Serial no.";
  th6.innerText = "Chair_Chosen";
  table.appendChild(th5);
  table.appendChild(th4);
  table.appendChild(th6);
  table.appendChild(th1);
  table.appendChild(th2);
  table.appendChild(th3);
  // report[0].appendChild(table);
  for (let p = 0; p < i; p++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");
    let td6 = document.createElement("td");
    td6.innerText = chair_chosen[p];
    td5.innerText = p+1;
    td4.innerText = customer_name_array[p];
    td1.innerText = Entry_time[p];
    td2.innerText = Service_time_start[p];
    td3.innerText = Service_time_ends[p];
    tr.append(td5,td4,td6,td1, td2, td3);
    table.appendChild(tr);
    report[0].appendChild(table);
    // var list =document.createElement("li");
    // list.innerText=Entry_time[p];
    // console.log(list);
    // console.log(Entry_time[p]);
    // report[0].appendChild(list);
  }
}
