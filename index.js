const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("list-container")
const completeBtn = document.getElementById('complete-all')
const clearBtn = document.getElementById('clear-all')

function addTask(){
    if(!inputBox) return;
    const text = inputBox.value.trim();
    if(text === ''){
        alert("You must write something!");
        return;
    }
    const li = document.createElement("li");
    li.textContent = text;
    const span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    listContainer.appendChild(li);
    inputBox.value = "";
    saveData();
}

// toggle/ remove
listContainer.addEventListener("click", function(e){
    const t = e.target;
    if(t.tagName === "LI"){
        t.classList.toggle("checked");
        saveData();
    }
    else if(t.tagName === "SPAN"){
        const p = t.parentElement;
        if(p) p.remove();
        saveData();
    }
}, false);

function saveData(){
    if(!listContainer) return;
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    const data = localStorage.getItem("data");
    if(data) listContainer.innerHTML = data;
}

function completeAll(){
    const items = listContainer.querySelectorAll('li');
    items.forEach(li => li.classList.add('checked'));
    saveData();
}

function clearAll(){
    // remove all children and clear storage
    while(listContainer.firstChild){
        listContainer.removeChild(listContainer.firstChild);
    }
    localStorage.removeItem('data');
}

if(completeBtn) completeBtn.addEventListener('click', completeAll);
if(clearBtn) clearBtn.addEventListener('click', clearAll);

showTask();
