const $itemList = document.querySelector(".item-list");

function filterItemList(key, value, itemLsit){
    const filteringItem = itemLsit.filter(item => item[key] === value);
    rederItemList(filteringItem);
}

function handleButton(itemList){
    const $gnb = document.querySelector(".gnb");
    $gnb.addEventListener('click', function(e){
       let target = e.target;
       if(target.tagName === "BUTTON"){
           const {key, value} = target.dataset;
           filterItemList(key, value, itemList);
       }
    });
}

function rederItemList(data){
    $itemList.innerHTML = '';
    data.map((item)=>{
        const li = document.createElement('li');
        li.innerHTML = `
            <img src="${item.image}" alt="이미지">
            <p>
                ${item.gender}, ${item.size}
            </p>
        `;
        $itemList.append(li);
    })
}

async function getItem(){
    try {
        const response = await fetch('../data/data.json');
        const data = await response.json()
        return data;
    } catch(e){
        console.log(e);
    }
}

async function init(){
    const itemList = await getItem();
    rederItemList(itemList.items);
    handleButton(itemList.items);
}

init();