const fs = require('fs');
const prompt = require('prompt-sync')({ sigint: true });

let todos =[];

if(fs.existsSync('todos.json')) {
    const data = fs.readFileSync('todos.json', 'utf8');

    if(data.trim()!== ''){
        todos = JSON.parse(data);
    }
}

function saveTodos(){
   fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
}

function viewTodos(){
    if(todos.length === 0){
        console.log("No ToDos found.");
        return;
    }

    console.log('\n===== YOUR TODOS =====');

    todos.forEach((todo, index) => {
        const status = todo.completed? '✓':' ';
        console.log(`${index+1}  [${status}] ${todo.task}`);
    });
}