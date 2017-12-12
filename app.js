function app(people) {
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let filteredPeople;
  switch (searchType) {
    case 'yes':
      searchByName(people);
      break;
    case 'no':
      var singleSearch = promptFor("Do you want to search by multiple characteristics?\n\nEntering NO will let you serach by ONE trait.\nEntering YES will let you serach by multiple traits.\n\nEnter 'yes' or 'no", yesNo).toLowerCase();
      switch (singleSearch) {
        case 'yes':
          let filteredPeople = serachByMultipleTraits(people);
          let uniqueUsers = findDuplicateUser(filteredPeople);
          checkIfMultipleUsersAreEmpty(uniqueUsers, people);
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
  let userSearchChoice = prompt("Which would you like to serach by? \n\n Please type two or more of the following separated by a space.\n'height', 'weight', 'eyecolor', 'gender', 'age', 'occupation'.");
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
  return mergedUsers;
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

function checkIfMultipleUsersAreEmpty(users, people) {
  if (users.length <= 0) {
    alert("No Matches Found!");
  } else {
    displayPeople(users);
    for (i = 0; i <= users.length - 1; i++) {
      let foundPerson = users[i];
      mainMenu(foundPerson, people);
    }
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


function mainMenu(person, people) {
  if (!person) {
    alert("Could not find that individual.");
    return app(people);
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit' or 'n' for the next record.");

  switch (displayOption) {
    case "info":
      displayPerson(person);
      break;
    case "family":
      displayFamily(person, people);
      break;
    case "descendants":
      // TODO: get person's descendants
      let descendants = findDescendants(person, people);
      displayPeople(descendants);
      break;
    case "restart":
      app(people);
      break;
    case "quit":
      return;
    case "n":
      break;
    default:
      return mainMenu(person, people);
  }
}

function searchByName(people) {
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();
  let newArray = people.filter(function(el) {
    if (firstName == el.firstName.toLowerCase() && lastName == el.lastName.toLowerCase()) {
      return true;
    }
  });
  mainMenu(newArray[0], people);
}

function displayPeople(people) {
  alert(people.map(function(person) {
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayFamily(person, people) {
  let spouse = getSpouse(person, people);
  let parents = getParents(person, people);
  let children = getChildren(person, people);
  let siblings = getSiblings(person, people);
  let family;
  family = spouse.concat(parents);
  family = family.concat(children);
  family = family.concat(siblings);
  displayPeople(family);
  for (i = 0; i <= family.length - 1; i++) {
    let foundPerson = family[i];
    mainMenu(foundPerson, people);
  }
}

function getSpouse(person, people) {
  let spouse = people.filter(function(el) {
    if (el.currentSpouse == person.id) {
      return person.firstName + " " + person.lastName;
    }
  });
  return spouse;
}

function getParents(person, people) {
  let parents = people.filter(function(el) {
    if (el.id == person.parents[0] || el.id == person.parents[1]) {
      return person.firstName + " " + person.lastName;
    }
  });
  return parents;
}

function getChildren(person, people) {
  let children = people.filter(function(el) {
    for (let i = 0; i < el.parents.length; i++)
      if (person.id === el.parents[i]) {
        return el.firstName + " " + el.lastName;
      }
  });
  return children;
}

function findDescendants(person, people) {
  let descendants = getChildren(person, people);
  for(let i = 0; i < descendants.length; i++) {
    let result = findDescendants(descendants[i], people);
    descendants = descendants.concat(result);
  }
  return descendants;
}

function getSiblings(person, people) {
  let siblings = people.filter(function(el) {
    for (let i = 0; i < person.parents.length; i++)
      if ((el.parents[i] === person.parents[i]) && (el.id != person.id)) {
        return el.firstName + " " + el.lastName;
      }
  });
  return siblings;
}

function displayPerson(person) {
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
  alert(personInfo);
}


function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}

function yesNo(input) {
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

function chars(input) {
  return true;
}
