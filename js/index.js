document.addEventListener('DOMContentLoaded', () => {
    const parentDiv = document.querySelector('#create-monster')
    const monsterForm = document.createElement('form')
    parentDiv.appendChild(monsterForm)
    const inputName = document.createElement('input')
    monsterForm.appendChild(inputName)
    inputName.setAttribute('placeholder', 'Name...')
    const inputAge = document.createElement('input')
    monsterForm.appendChild(inputAge)
    inputAge.setAttribute('placeholder', 'Age...')
    const inputDescription = document.createElement('input')
    monsterForm.appendChild(inputDescription)
    inputDescription.setAttribute('placeholder', 'Description...')
    const createMonsterButton = document.createElement('button')
    createMonsterButton.textContent = 'Create'
    monsterForm.appendChild(createMonsterButton)
    createMonsterButton.setAttribute('id', 'create-monster-button')

    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            age: age,
            description: description
        })
    })
        .then(response => response.json())
        .then(monster => {
            // add the new monster to the DOM
            const newDiv = document.createElement('div')
            const newh2 = document.createElement('h2')
            const newh4 = document.createElement('h4')
            const newPara = document.createElement('p')
            newh2.textContent = `Name: ${monster.name}`;
            newh4.textContent = `Age: ${monster.age}`;
            newPara.textContent = `Bio: ${monster.description}`;
            newDiv.appendChild(newh2)
            newDiv.appendChild(newh4)
            newDiv.appendChild(newPara)
            const parentDiv = document.querySelector('#monster-container')
            parentDiv.appendChild(newDiv)

            // clear the form
            inputName.value = '';
            inputAge.value = '';
            inputDescription.value = '';
        })
        .catch(error => console.error(error));
});

let currentPage = 1;

function monsterList(array, numPerPage) {
    const parentDiv = document.querySelector('#monster-container')
    const startIndex = (currentPage - 1) * numPerPage;
    const endIndex = startIndex + numPerPage;
    for (let i = startIndex; i < endIndex && i < array.length; i++) {
        const obj = array[i];
        const newDiv = document.createElement('div')
        const newh2 = document.createElement('h2')
        const newh4 = document.createElement('h4')
        const newPara = document.createElement('p')
        newh2.setAttribute('id', `${obj.name}`)
        newh4.setAttribute('id', `${obj.age}`)
        newPara.setAttribute('id', `${obj.description}`)
        newh2.textContent = `Name: ${obj.name}`;
        newh4.textContent = `Age: ${obj.age}`;
        newPara.textContent = `Bio: ${obj.description}`;
        parentDiv.appendChild(newDiv)
        newDiv.appendChild(newh2)
        newDiv.appendChild(newh4)
        newDiv.appendChild(newPara)
    }
}



fetch("http://localhost:3000/monsters")
    .then(res => res.json())
    .then(json => {
        monsterList(json, 50);
        const forwardButton = document.querySelector('#forward');
        // document.body.appendChild(forwardButton);
        forwardButton.addEventListener('click', () => {
            currentPage++;
            const oldMonsters = document.querySelectorAll('#monster-container div');
            oldMonsters.forEach(monster => monster.remove());
            monsterList(json, 50);
        });
        const backButton = document.querySelector('#back');
        // document.body.appendChild(backButton);
        backButton.addEventListener('click', () => {
            currentPage--;
            const oldMonsters = document.querySelectorAll('#monster-container div');
            oldMonsters.forEach(monster => monster.remove());
            monsterList(json, 50);
        })
    })
    .catch(error => console.log(error));

