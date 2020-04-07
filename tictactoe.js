
// obtain all elements in the html page
var boxElements = document.querySelectorAll("div");
var touched = document.querySelectorAll('.touched');

var handleClick = function (event) {

    // event.target.style.backgroundColor = 'red';
    event.target.classList.toggle('red');

    // if items clicked to RED is the same as # of elements. i.e 3...
    if ((document.querySelectorAll('.red').length) === boxElements.length) {
        console.log("make them all go GREEN"); 
        for (var i = 0; i < boxElements.length; i++) {
            boxElements[i].classList.toggle("green");
        }
    } else {
        console.log("it does not work")
    }

}

//add an event click listener for all array items
for (var i = 0; i < boxElements.length; i++) {
    boxElements[i].addEventListener('click', handleClick);
}

//boxElements.addEventListener('click', handleClick);
console.log(boxElements.length);

