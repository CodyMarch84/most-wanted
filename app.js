/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people) {
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch (searchType) {
    case 'yes':
      searchByName(people);
      break;
    case 'no':
      var singleSearch = promptFor("Do you want to search by multiple characteristics?\n\nEntering NO will let you serach by ONE trait.\nEntering YES will let you serach by Multiple traits.\n\nEnter 'yes' or 'no", yesNo).toLowerCase();
      switch (singleSearch) {
        case 'yes':
          let filteredPeople;
          filteredPeople = serachByMultipleTraits(people);
          alert(filteredPeople.join("\n"));
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

function serachByMultipleTraits(people) {
  let userSearchChoice = prompt("Which would you like to serach by? \n\n ie: Enter: height, weight, gender.... \n Choose from the following ---------->\n'height', 'weight', 'eyecolor', 'gender', 'age', 'occupation'.");
  let splitUserChoice = userSearchChoice.replace(/,/g, '').split(" ");
  let i = 0;
  let compiledUsers = [];
  let filteredPeople;

  while (splitUserChoice[i]) {
    if (splitUserChoice[i] === "height") {
      let userHeights = searchByHeight(people);
      compiledUsers.push(userHeights);
      i++;
    } else if (splitUserChoice[i] === "weight") {
      let userWeights = searchByWeight(people);
      compiledUsers.push(userWeights);
      i++;
    } else if (splitUserChoice[i] === "eyecolor") {
      let userEyeColor = searchByEyeColor(people);
      compiledUsers.push(userEyeColor);
      i++
    } else if (splitUserChoice[i] === "gender") {
      let userGender = searchByGender(people);
      compiledUsers.push(userGender);
      i++
    } else if (splitUserChoice[i] === "age") {
      let userAge = searchByAge(people);
      compiledUsers.push(userAge);
      i++;
    } else if (splitUserChoice[i] === "occupation") {
      let userOccupation = searchByOccupation(people);
      compiledUsers.push(userOccupation);
      i++
    }
  }

  let mergedUsers = [].concat.apply([], compiledUsers);
  let names = [];
  mergedUsers.forEach(function(val) {
    names.push(val.firstName + " " + val.lastName);
  });
  let finalTally = findDuplicateUser(names);
  return finalTally;
}

  function findDuplicateUser(names) {
    let result = [];
    names.forEach(function(element, index) {
      if (names.indexOf(element, index + 1) > -1) {
        if (result.indexOf(element) === -1) {
          result.push(element);
        }
      }
    });
    return result;
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

  for (i = 0; i <= filteredPeople.length - 1; i++) {
    let foundPerson = filteredPeople[i];
    mainMenu(foundPerson, people);
  }
}

function searchByAge(people) {
  let userInputAge = prompt("What is the age of the person?");
  let newArray = people.filter(function(el) {
    let today = new Date();
    let age = Date.parse(today) - Date.parse(el.dob);
    let msPerYear = 31556952000;
    let calculatedAge = Math.floor(age / msPerYear);
    el.age = calculatedAge;
    if (calculatedAge == userInputAge) {
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
  });

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

//   // Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit' or 'n' for the next record.");

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      // TODO: get person's family
      displayFamily(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return;
    case "n":
      break; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}



function searchByName(people) {
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();

  for (i = 0; i <= people.length - 1; i++) {
    if (firstName == people[i].firstName.toLowerCase() && lastName == people[i].lastName.toLowerCase()) {
      mainMenu(people[i], people);
    }
  }
}


//   // alerts a list of people

function displayPeople(people) {
  alert(people.map(function(person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

// // "Immediate family includes a person’s parents, siblings, spouse(current only), and children. Must use iteration"


function displayFamily(person, people) {
  console.log(person);
  console.log(people);
  let spouse = people.filter(function(el) {
    if (el.currentSpouse == person.id) {
      alert("Spouse: ");
      return true;
    } else {
      return false;
    }
  });
  return spouse;
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


// helper function to pass into promptFor to validate yes/no answers
function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input) {
  return true; // default validation only
}