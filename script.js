const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;


loadItems();


eventListeners();

function eventListeners() {
    
    form.addEventListener('submit', addNewItem);

    
    taskList.addEventListener('click', deleteItem);

    
    btnDeleteAll.addEventListener('click', deleteAllItems);
}

function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}

// Local Storage kullanarak veri al
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// Local Storage kullanarak veri ekle
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// LS den veri sil
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1);   
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}


function createItem(text) {
    
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    
    li.appendChild(a);

    
    taskList.appendChild(li);

}

// Yeni etkinlik ekle
function addNewItem(e) {
    if (input.value === '') {
        alert('Lütfen eklemek istediğiniz etkinliğin ismini giriniz !');
    }

   else{
    createItem(input.value);

   
    setItemToLS(input.value);

    
    input.value = '';

    e.preventDefault();
   
   }
   

}

// Silmek istenilen etkinliği sil
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('Silmek istediğine emin misin ?')) {
            e.target.parentElement.parentElement.remove();

           
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

// Tüm etkinlikleri sil
function deleteAllItems(e) {

    if (confirm('Silmek istediğine emin misin ?')) {
        
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}
