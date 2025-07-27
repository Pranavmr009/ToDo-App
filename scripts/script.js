// let items = JSON.parse(localStorage.getItem('todoItems')) || [];
function logCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    return timeString;

}

function logCurrentDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString();

    return dateString;
}

function equalizeWidth(){
    const containers = document.querySelectorAll('.js-DisplayContainer');
    let maxWidth = 0;

    containers.forEach(container => {
        const width = container.offsetWidth;
        if (width > maxWidth){
            maxWidth = width;
        }
    });

    return maxWidth;
}

setInterval(logCurrentTime, 1000);

setInterval(() => {
    document.querySelector('#date-time').textContent = logCurrentTime();

}, 1000);

document.querySelector("#dateDisplay").textContent = logCurrentDate();


function storeData(data) {
    let items = JSON.parse(localStorage.getItem('todoItems')) || [];
    items.push(data);
    console.log(items);
    localStorage.setItem('todoItems', JSON.stringify(items));
}


function Done(clickedIcon) {
    console.log(clickedIcon);
    const DisplayContainer = clickedIcon.closest('#DisplayContainer');
    if (DisplayContainer.classList.contains('opacity-50')
    ) {
        DisplayContainer.classList.remove('opacity-50', 'line-through');

    }

    else {
        DisplayContainer.classList.add('opacity-50', 'line-through');
    }
    // .classList.add("line-through", "opacity-50"); 
}


function DeleteTodo(index) {

    let todos = JSON.parse(localStorage.getItem('todoItems')) || [];
    console.log(index);
    todos.splice(index, 1);
    localStorage.setItem('todoItems', JSON.stringify(todos));

    DisplayOutput();

}

function DisplayOutput() {

    const todos = JSON.parse(localStorage.getItem('todoItems')) || [];
    const output = document.querySelector('#output');
    output.innerHTML = '';
    todos.forEach((todo, index) => {
        // console.log(index);
        output.innerHTML +=
            `   
        <div id="DisplayContainer" class="bg-[rgb(1,57,76)] text-white p-4 rounded-full my-5 flex gap-2 items-center js-DisplayContainer justify-between">
            <p id="output-item" class="px-4">${todo}</p>
            <div>
                <i class="fa-solid fa-circle-check cursor-pointer active:opacity-50 text-2xl" onclick=Done(this)></i>
                <i class="fa-solid fa-trash  cursor-pointer active:opacity-50 text-2xl" onclick="DeleteTodo(${index})"></i>
            </div>
        </div>

    `;
    });

    let maxWidth = equalizeWidth();
    document.querySelectorAll('.js-DisplayContainer').forEach(container => {
        container.style.width = maxWidth;
    });

}



window.onload = DisplayOutput();

document.querySelector('#addButton').addEventListener('click', () => {
    const taskValue = document.querySelector("#addTask");

    console.log(taskValue.value);
    storeData(taskValue.value);
    taskValue.value = '';
    DisplayOutput();


});

equalizeWidth();



// let a = Array(localStorage.getItem('todoItems'))
// console.log(a[0]);

