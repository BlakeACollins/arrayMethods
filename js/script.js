const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser()

//fetch random user and add money 
async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`, 
        money: Math.floor(Math.random() * 1000000)
    };

    addData(newUser);
}

//Double everyones money
function doubleMoney(){
    data= data.map(user =>{
        return{...user, money: user.money * 2};
    });

    upDateDOM();
}
//Sort by richest
function sortByRichest(){
    data.sort((a,b) => b.money - a.money);

    upDateDOM();
}
//Filter by richest...
function showMillionaires(){
    data = data.filter(user => user.money > 1000000);

    upDateDOM();
}
//Add wealth together
function addWealth(){
    const wealth = data.reduce((acc, user) => (acc+= user.money), 0);
    
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(wealth)}</strong>`;
    main.appendChild(wealthEl);

    //upDateDOM();
}




//Add new object to data array
function addData(obj){
    data.push(obj);

    upDateDOM();
}

//Update DOM function
function upDateDOM(providedData = data){
    //Clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//Format item.money as money https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listener
addUserBtn.addEventListener('click', getRandomUser);

doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', addWealth);