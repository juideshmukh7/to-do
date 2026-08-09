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

let ch;

do{
    console.log('\n===== MENU =====');
    console.log('1. Add Todo');
    console.log('2. View Todos');
    console.log('3. Delete Todo');
    console.log('4. Mark Todo as Completed');
    console.log('5. Exit');

    ch = prompt('Enter your choice: ');
    switch(ch){
        case '1':
            const task = prompt('Enter the task: ');
            
            if(task.trim() === ''){
                console.log('Task cannot be empty.');
                break;
            }

            todos.push({
                task: task,
                completed: false
            });
            saveTodos();
            console.log('Todo added successfully.');
            break;

        case '2':
            viewTodos();
            break;
        
        case '3':   
            viewTodos();

            if(todos.length === 0){
                console.log('No ToDos to delete.');
                break;
            }
            const num = Number(prompt('Enter the number of the todo to delete: '));
            
            if(num<1 || num>todos.length || isNaN(num)){
                console.log('Invalid number.');
                break;
            }
            todos.splice(num-1,1);

            saveTodos();
            console.log('Todo deleted successfully.');
            break;
        
        case '4':
            viewTodos();
            
            if(todos.length === 0){
                console.log('No ToDos to mark as completed.');
                break;
            }
            
            const num2 = Number(prompt('Enter the number of the todo to mark as completed: '));
            
            if(num2<1 || num2>todos.length || isNaN(num2)){
                console.log('Invalid number.');
                break;
            }
            todos[num2-1].completed = true;

            saveTodos();
            console.log('Todo marked as completed.');
            break;

        case '5':
            console.log('Exiting...');
            break;

        default:
            console.log('Invalid choice. Please try again.');
    }

}while (ch !== '5');

