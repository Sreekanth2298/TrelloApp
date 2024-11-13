const addButton = document.querySelector('#addButton');
let currentDraggedItem;
let cardValue = document.querySelector("#cardName");
addButton.addEventListener('click',(e)=>{
    if(cardValue.value!==''){
        createCardName(cardValue.value);
        cardValue.value='';
    }else{
        alert("Please Enter card name");
    }
})
function createCardName(cardvalue){
   const cardNameContainer = document.createElement('div'); 
   cardNameContainer.setAttribute('class','cardNameContainer');
   cardNameContainer.setAttribute('draggable','true')
   const label = document.createElement('p');
   label.textContent= cardvalue;
   cardNameContainer.appendChild(label);
   cardNameContainer.addEventListener('dragstart',(e)=>{
    currentDraggedItem= e.target;
    e.target.classList.add('dragging');
   })
   const parentContainer = document.querySelector('#parent-container');
   parentContainer.appendChild(cardNameContainer);
}
const parentContainer = document.querySelector("#parent-container");
parentContainer.addEventListener('dragover',(e)=>{
    debugger
    e.preventDefault();


    const afterElement = getDragAfterElement(parentContainer, e.clientY);
  //const draggingElement = document.querySelector('.dragging');
  
  if (afterElement == null) {
    parentContainer.appendChild(currentDraggedItem);
  } else {
    parentContainer.insertBefore(currentDraggedItem, afterElement);
  }
    })
parentContainer.addEventListener('drop',function(e){
debugger
currentDraggedItem.classList.remove('dragging');
currentDraggedItem=null
// if(this!==currentDraggedItem){
//     this.appendChild(currentDraggedItem);
// }
})
function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.cardNameContainer:not(.dragging)')];
  debugger
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
