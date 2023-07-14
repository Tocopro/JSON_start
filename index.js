/*-----------------initialize variables----------------- */
let number = 1;
/* -----------adding an event listener--------------- */
let animal_container = document.getElementById("animal-info");
let click_now = document.getElementById("btn");
/*-------------------function to GET data from an URL and display on the webpage--------------- */
click_now.addEventListener("click", function()
    {/*-----------------------create a variable to pass the data to from the URL------------------- */
        let newData = new XMLHttpRequest();        
        newData.open("GET", "https://learnwebcode.github.io/json-example/animals-" + number + ".json");
        /* -----------------what the function does to the JSON data before displaying it on the webpage */
        newData.onload = function()
        {
            /*-----------------error handling if connection is unsuccessful---------------- */
            if(newData.status >= 200 && newData.status < 400)
            {
                /*--------------if connection is successful-------------- */
                let someData = JSON.parse(newData.responseText);
                printer(someData); 
            }
            else
            {
                alert("Connection on the Server Side errored")
            }             
        }
        /*--------------------error handling-------------------- */
        newData.onerror = function()
        {
            alert("Connection Errors");
        }
        newData.send();
        /*-----------------incrementing the variable and pass it to the URL string to create a different text--------------- */
        number++;
        if(number > 3)
        {
            btn.classList.add("hide_me");
        }
    });
/*-----------------------------the function that controls the displaying of the JSON object with nested arrays------------------ */
function printer(data)
    {
        /*-----------------empty string to concatenate------------------- */
        let html_string = "";
        /* ---------------loop through the arrays to extract the necessary information---------------- */
        for(let i = 0; i < data.length; i++)
        {
            
            html_string += "<p>" + data[i].name + " is a " + data[i].species + " that likes eating ";
            for(let ii = 0; ii < data[i].foods.likes.length; ii++ )
             { 
               if(ii === 0)
               {
                html_string += data[i].foods.likes[ii];
               }
               else
               { 
                html_string += " and " +  data[i].foods.likes[ii];
               }
             }
             html_string += " and dislikes ";
             for(let ii = 0; ii < data[i].foods.likes.length; ii++ )
             { 
               if(ii === 0)
               {
                html_string += data[i].foods.dislikes[ii];
               }
               else
               { 
                html_string += " and " +  data[i].foods.dislikes[ii];
               }
             }            
        }
        html_string += " </p>";
        animal_container.insertAdjacentHTML("beforeend", html_string);
    }