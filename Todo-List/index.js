//  Global var 
let projects ;
let projectsOn = [];

// function for object
const createProject = () => {
    let projectName = "";
    let tasks = {
        taskName : [],
        taskDate : [],
        status: []
    };
    return {projectName, tasks};
} ;

// On load check if there is in the database 
function isDataIsThere () {
    
    if(localStorage.getItem('projects') === null) {
        projects = [];
        let defaultProjects = ["Inbox","Today","This week"];
        for(let i=0; i<3; i++) {
            let newProject = createProject();
            newProject.projectName = defaultProjects[i];
            newProject.tasks.taskName = [];
            newProject.tasks.taskDate = [];
            newProject.tasks.status = [];
            projects.push(newProject);
        }
        localStorage.setItem("projects",JSON.stringify(projects));
    } else {
        projects = JSON.parse(localStorage.getItem('projects'));
    }

    setPreview(0);
    for(let i=0; i<projects.length; i++) {
        projectsOn.push(0);
    }
    if(projects.length>3) {
        for(let i=3; i<projects.length; i++) {
            addUserProject(i);
        }
    }
    projectsOn[0]=1;
    for(let i=0; i<projectsOn.length; i++) {
        addEffectsToDefault(i);
    }
    
}

isDataIsThere();

// To add New Data and Delete
function addNewData() {
    const addUserProjectBotton = document.querySelector('.add-project');
    const UserProjectForm = document.querySelector('.project-input');
    const submitProject = document.querySelector('.submit');
    const deleteProject = document.querySelector('.delete');
    const inputName = document.querySelector('.input-name');

    addUserProjectBotton.addEventListener('click',()=> {
        UserProjectForm.style.display = 'grid';
    });

    submitProject.addEventListener('click',()=>{
        let doesExist = false;
        projects.forEach((proj)=>{
            doesExist = (proj.projectName === inputName.value);
            if(doesExist) {
                return ;
            } 
        })
        if(doesExist) {
            alert('Project already exists');
        }
        if(inputName.value !== '' && !doesExist) {
            let newProject = createProject();
            newProject.projectName = inputName.value;
            newProject.tasks.taskName = [];
            newProject.tasks.taskDate = [];
            newProject.tasks.status = [];
            projects.push(newProject);
            localStorage.setItem("projects",JSON.stringify(projects));
            projectsOn.push(0);
            addUserProject(projects.length-1);
            inputName.value = '';
            UserProjectForm.style.display = 'none';
        }
    });

    deleteProject.addEventListener('click',()=>{
        inputName.value = '';
        UserProjectForm.style.display = 'none';
    });

}

addNewData();

function setPreview(projectNum) {
    const rightSide = document.querySelector('.right-side');
    rightSide.textContent = '';

    const title = document.createElement('h1');
    title.className = 'title';
    title.textContent = projects[projectNum].projectName;
    rightSide.appendChild(title);

    const taskList = document.createElement('ul');
    taskList.className = 'list-item';
    rightSide.appendChild(taskList);

    for(let i=0; i<projects[projectNum].tasks.taskName.length; i++) {
        addNewTasks(projectNum,i);
    }

    const addTask = document.createElement('button');
    addTask.classList.add('add-item');
    addTask.classList.add(`A-${projectNum}`);
    addTask.innerHTML = '<i class="fas fa-plus"></i>';
    rightSide.appendChild(addTask);

    addTask.addEventListener('click',(e)=>{
        e.stopPropagation();
        addNewTasks(projectNum,projects[projectNum].tasks.taskName.length,1);
    });
}

// add Effect to default Project
function addEffectsToDefault(projectNum) {
    const temp = document.querySelector(`#P-${projectNum}`); 

    temp.addEventListener('mouseenter',(e)=>{
        let activeProjectNum =parseInt(e.target.dataset.index);
        if(!projectsOn[activeProjectNum]) {
            e.target.classList.add('active');
        }
        
    });
    temp.addEventListener('mouseleave',(e)=>{
        let activeProjectNum =parseInt(e.target.dataset.index);
        if(!projectsOn[activeProjectNum]) {
            e.target.classList.remove('active');
        }
    });
    temp.addEventListener('click',(e)=>{
        let activeProjectNum = parseInt(e.target.dataset.index);
        if(!projectsOn[activeProjectNum]) {
            for(let i=0; i<projectsOn.length; i++) {
                projectsOn[i]=0;
                let tempToRemove =  document.querySelector(`#P-${i}`);
                tempToRemove.classList.remove('active');
            }
            setPreview(activeProjectNum);
            projectsOn[activeProjectNum]=1;
            e.target.classList.add('active');
        }
    });

}


// add user Projects if exist
function addUserProject(projectNum) {
    const userList = document.querySelector('.user-list');
    const newList = document.createElement('li');

    newList.setAttribute('data-index',`${projectNum}`);
    newList.setAttribute('id',`P-${projectNum}`);
    newList.innerHTML = `<i class="fa-solid fa-list"></i>${projects[projectNum].projectName}<i class="fas fa-trash list"></i>`;
    userList.append(newList);

    addEffectsToDefault(projectNum);

    // remove Project
    newList.children[1].addEventListener('click',(e)=>{
        e.stopPropagation();
        let parentOf = e.target.parentElement;
        let idx = parseInt(parentOf.dataset.index);
        projects.splice(idx,1);
        projectsOn.splice(idx,1);
        parentOf.remove();
        localStorage.setItem("projects",JSON.stringify(projects));
    });
}

// adding tasks to projects
function addNewTasks(projectNum,idx,status=0) {
    const taskList = document.querySelector('.list-item');
    let oldText = '';
    let oldTime = '';
    let oldStatus = 'far fa-circle';
    if(status == 0) {
        oldText = projects[projectNum].tasks.taskName[idx];
        oldTime = projects[projectNum].tasks.taskDate[idx];
        if(projects[projectNum].tasks.status[idx]) {
            oldStatus = 'far fa-check-circle';
        }
    }


    let li = document.createElement('li');
        li.classList.add('item');
        li.classList.add(`l-${idx}`);
        li.innerHTML = `<div class="display">
        <div class="item-left" data-index="${idx}">
            <i class="${oldStatus}"></i><p class="intext">${oldText}</p>
        </div>
        <div class="item-right">
            ${oldTime}
        </div>
        </div>
        <div class="edit">
            <div class="item-input-left">
                <input type="text" id="item-text">
                <input type="date" id="item-time">
            </div>
            <div class="item-input-right" data-index="${idx}">
                <button type="submit" id="done">Done</button>
                <i class="fas fa-trash"></i>
            </div>
        </div>`
    taskList.appendChild(li);

    // Add events
    const task = document.querySelector(`.l-${idx}`);
    const completeTask = document.querySelector(`.l-${idx} i`)
    const edit = document.querySelector(`.l-${idx} .edit`);
    const display = document.querySelector(`.l-${idx} .display`);
    const done = document.querySelector(`.l-${idx} #done`);
    const itemText = document.querySelector(`.l-${idx} #item-text`);
    const itemTime = document.querySelector(`.l-${idx} #item-time`);
    const inText = document.querySelector(`.l-${idx} .intext`);
    const inTime = document.querySelector(`.l-${idx} .item-right`);
    const deleteTask = document.querySelector(`.l-${idx} .item-input-right i`);
    
    if(status == 1) {
        edit.style.display = 'flex';
        display.style.display = 'none';
        projects[projectNum].tasks.taskName.push('');
        projects[projectNum].tasks.taskDate.push('');
        projects[projectNum].tasks.status.push(false);
    }

    completeTask.addEventListener('click',(e)=>{
        e.stopPropagation();
        let taskNumber = parseInt(e.target.parentElement.dataset.index);
        if(projects[projectNum].tasks.status[taskNumber]) {
            e.target.setAttribute('class','far fa-circle');
            projects[projectNum].tasks.status[taskNumber] = false;
        } else {
            e.target.setAttribute('class','far fa-check-circle');
            projects[projectNum].tasks.status[taskNumber] = true;
        }
        localStorage.setItem("projects",JSON.stringify(projects));
    });

    display.addEventListener('click',(e)=> {
        e.target.style.display = 'none';
        edit.style.display = 'flex';
        itemText.value = inText.textContent;
        itemTime.value = inTime.textContent;
    });
    
    done.addEventListener('click', (e)=> {
        e.stopPropagation();
        inText.textContent = itemText.value;
        inTime.textContent = itemTime.value;
        let taskNumber = parseInt(e.target.parentElement.dataset.index);
        projects[projectNum].tasks.taskName[taskNumber] = itemText.value;
        projects[projectNum].tasks.taskDate[taskNumber] = itemTime.value;
        localStorage.setItem("projects",JSON.stringify(projects));
        display.style.display = 'flex';
        edit.style.display = 'none';
    });
    
    deleteTask.addEventListener('click',(e)=>{
        e.stopPropagation();
        let taskNumber = parseInt(e.target.parentElement.dataset.index);
        projects[projectNum].tasks.taskName.splice(taskNumber,1);
        projects[projectNum].tasks.taskDate.splice(taskNumber,1);
        projects[projectNum].tasks.status.splice(taskNumber,1);
        task.remove();
        localStorage.setItem("projects",JSON.stringify(projects));
    });
}
