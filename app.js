/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch (searchType) {
    case 'yes':
      searchByName();
      break;
    case 'no':
    var singleSearch = promptFor("Do you want to search by multiple characteristics?\n\nEntering NO will let you serach by ONE trait.\nEntering YES will let you serach by multiple traits.\n\nEnter 'yes' or 'no", yesNo).toLowerCase();
      switch (singleSearch) {
        case 'yes':
        serachByMultipleTraits(people);
        break;
        case 'no':
        searchByTrait(people);
        break;
        default:
        alert("Please enter yes or no");
        break;
      }
  }
}

function serachByMultipleTraits(people){
  let userSearchChoice = prompt("MULTIPLE SEARCH!! \nWhich would you like to serach by? \n\n ie: Enter: height, weight, gender.... \n Choose from the following ---------->\n'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let splitUserChoice = userSearchChoice.replace(/,/g, '').split(" ");
  console.log(splitUserChoice);
  for (i=0; i<= splitUserChoice.length-1; i++){
    console.log(splitUserChoice[i]);
  }
  
}

function searchByTrait(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch (userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
      displayPeople(filteredPeople);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      displayPeople(filteredPeople);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people);
      displayPeople(filteredPeople);
      break;
    case "gender":
      filteredPeople = searchByGender(people);
      displayPeople(filteredPeople);
      break;
    case "occupation":
      filteredPeople = searchByOccupation(people);
      displayPeople(filteredPeople);
      break;
    case "age":
      filteredPeople = searchByAge(people);
      displayPeople(filteredPeople);
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTrait(people);
      break;
  }

  // let foundPerson = filteredPeople[0];

  // mainMenu(foundPerson, people);

}


function searchByAge(people) {
  let userInputAge = prompt("What is the age of the person?");
  let newArray = people.filter(function(el) {
    let today = new Date();
    let age = Date.parse(today) - Date.parse(el.dob);
    let msPerYear = 31556952000;
    let calculatedAge = Math.floor(age / msPerYear);
    console.log(calculatedAge);
    el.age = calculatedAge;
    console.log(el.age);
    if (calculatedAge == userInputAge) {
      console.log("calculated " + el.age);
      console.log("input " + userInputAge);
      return true;
    }
  });
  return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is their occupation?").toLowerCase();
  let newArray = people.filter(function(el) {
    if (el.occupation == userInputOccupation) {
      return true;
    }
  })
  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What color eyes does the person have?");
  let newArray = people.filter(function(el) {
    if (el.eyeColor == userInputEyeColor) {
      return true;
    }
  });

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function(el) {
    if (el.weight == userInputWeight) {
      return true;
    }
  });

  return newArray;
}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person in inches?");
  let newArray = people.filter(function(el) {
    if (el.height == userInputHeight) {
      return true;
    }
  });
  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What gender is the person? ('male' or 'female')").toLowerCase();
  let newArray = people.filter(function(el) {
    if (el.gender == userInputGender) {
      return true;
    }
  });
  return newArray;
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people) {
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();

  for (i = 0; i <= data.length - 1; i++) {
    if (firstName == data[i].firstName.toLowerCase() && lastName == data[i].lastName.toLowerCase()) {
      mainMenu(data[i]);
      // displayPerson(data[i]);
    }
  }
}


// alerts a list of people
function displayPeople(people) {
  alert(people.map(function(person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "ID: " + person.id + "\n" + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye-color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}
