window.addEventListener('load', solve);

function solve() {

  
    const modelElement = document.getElementById('car-model');
    const yearElement = document.getElementById('car-year');
    const partNameElement = document.getElementById('part-name');
    const partNumberElement = document.getElementById('part-number');
    const conditionElement = document.getElementById('condition');
    const nextButtonElement = document.getElementById('next-btn');
    const infoListElement = document.querySelector('.info-list');
    const confirmListElement = document.querySelector('.confirm-list');
    const completeImgElement = document.getElementById('complete-img');
    const completeTextElement = document.getElementById('complete-text');

   
    nextButtonElement.addEventListener('click', onNext);

    function onNext(e) {
        e.preventDefault();

        if (modelElement.value === '' || partNameElement.value === '' ||partNumberElement.value === '' || 
        conditionElement.value === '' || isNaN(yearElement.value) || yearElement.value < 1980 || yearElement.value > 2023) {
            return;
        }

        
        let liElement = document.createElement('li');
        liElement.setAttribute('class', "part-content");

        let articleElement = document.createElement('article');

        let modelParagraph = document.createElement('p');
        modelParagraph.textContent = `Car Model: ${modelElement.value}`;

        let yearParagraph = document.createElement('p');
        yearParagraph.textContent = `Car Year: ${yearElement.value}`;

        let partNameParagraph = document.createElement('p');
        partNameParagraph.textContent = `Part Name: ${partNameElement.value}`;

        let partNumberParagraph = document.createElement('p');
        partNumberParagraph.textContent = `Part Number: ${partNumberElement.value}`;

        let conditionParagraph = document.createElement('p');
        conditionParagraph.textContent = `Condition: ${conditionElement.value}`;

        let editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'edit-btn');
        editBtn.textContent = "Edit";

        let continueBtn = document.createElement('button');
        continueBtn.setAttribute('class', 'continue-btn');
        continueBtn.textContent = "Continue";

        articleElement.appendChild(modelParagraph);
        articleElement.appendChild(yearParagraph);
        articleElement.appendChild(partNameParagraph);
        articleElement.appendChild(partNumberParagraph);
        articleElement.appendChild(conditionParagraph);

        liElement.appendChild(articleElement);
        liElement.appendChild(editBtn);
        liElement.appendChild(continueBtn);

        infoListElement.appendChild(liElement);

        nextButtonElement.disabled = true;

       
        let editedModel = modelElement.value;
        let editedYear = yearElement.value;
        let editedPartName = partNameElement.value;
        let editedPartNumber = partNumberElement.value;
        let editedCondition = conditionElement.value;

       
        modelElement.value = '';
        yearElement.value = '';
        partNameElement.value = '';
        partNumberElement.value = '';
        conditionElement.value = '';

       
        editBtn.addEventListener('click', onEdit);

        function onEdit() {
            modelElement.value = editedModel;
            yearElement.value = editedYear;
            partNameElement.value = editedPartName;
            partNumberElement.value = editedPartNumber;
            conditionElement.value = editedCondition;

            liElement.remove();
            nextButtonElement.disabled = false;
        }

       
        continueBtn.addEventListener('click', onContinue);

        function onContinue() {
            let liElementContinue = document.createElement('li');
            liElementContinue.setAttribute('class', 'part-content');

            let articleElementContinue = document.createElement('article');
            articleElementContinue.innerHTML = articleElement.innerHTML;

            let confirmBtn = document.createElement('button');
            confirmBtn.setAttribute('class', 'confirm-btn');
            confirmBtn.textContent = 'Confirm';

            let cancelBtn = document.createElement('button');
            cancelBtn.setAttribute('class', 'cancel-btn');
            cancelBtn.textContent = 'Cancel';

            liElementContinue.appendChild(articleElementContinue);
            liElementContinue.appendChild(confirmBtn);
            liElementContinue.appendChild(cancelBtn);

            confirmListElement.appendChild(liElementContinue);
            liElement.remove();

           
            confirmBtn.addEventListener('click', onConfirm);

            function onConfirm() {
                liElementContinue.remove();
                completeImgElement.style.visibility = 'visible';
                completeTextElement.textContent = 'Part is Ordered!';
                nextButtonElement.disabled = false;
            }

            
            cancelBtn.addEventListener('click', onCancel);

            function onCancel() {
                liElementContinue.remove();
                nextButtonElement.disabled = false;
            }
        }
    }

  
    const inputs = [modelElement, yearElement, partNameElement, partNumberElement, conditionElement];
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (inputs.every(inp => inp.value.trim() !== '')) {
                nextButtonElement.disabled = false;
            } else {
                nextButtonElement.disabled = true;
            }
        });
    });
}