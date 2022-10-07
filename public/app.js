const textBox = document.querySelector('#car_search');
let carList = document.querySelector('.carList');

//POST model
let mName = document.querySelector('#model');
let bPrice = document.querySelector('#b_price');
let elec = document.querySelector('#elec');
//POST manufacturer
let manName = document.querySelector('#manu');
let dom = document.querySelector('#domestic');

//GET FUNCTION FOR MODEL AND MANUFACTURER TABLE LISTS
let clickFunc = () =>{
    carList.innerHTML = "";
    fetch(`http://localhost:8008/api/cars/${textBox.value}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
        return data;
    })
    .then((data)=>{
        if(data[0].model_name){
            for(let i = 0; i < data.length; i++){
                let carItem = document.createElement('div');
                carItem.textContent = data[i].model_name + ': ' + data[i].base_price;
                carList.append(carItem);
            }; 
        } else {
            for(let i = 0; i < data.length; i++){
                let carItem = document.createElement('div');
                carItem.textContent = data[i].man_name + ', Domestic: ' + data[i].domestic;
                carList.append(carItem);
            }; 
        }
    })
};

//POST NEW VEHICLE FUNCTION
let addVehicle = () =>{
    let manufac = {
        "man_name": manName.value,
        "domestic": dom.value
    };

    let model = {
        "model_name": mName.value,
        "base_price": Number(bPrice.value),
        "electric": elec.value
    };
    console.log(mName.value, bPrice.value, elec.value)
    fetch('http://localhost:8008/api/cars/manufacturer', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(manufac),
    })
    .then((data) => {
        console.log('Success:', data);
})
   
    fetch('http://localhost:8008/api/cars/models', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
    })
    .then((data) => {
            console.log('Success:', data);
    })
};



