var contacts = [];
var contactsSquared = [];
var contactProgress = 0;
var variableContact = 0;

//On page load, it already grabs what it needs to begin. I had this as a button to begin with, but as I kept testing it, I don't really feel this needed to be a button.
function getIndex() {
    var indexLoad = new XMLHttpRequest();
    indexLoad.open("GET", "https://mustang-index.azurewebsites.net/index.json");
    indexLoad.onload = function() {
        ourContacts = JSON.parse(indexLoad.responseText);
        console.log(ourContacts);
    for (i = 0; i < ourContacts.length; i++)
    	contacts.push(ourContacts[i].ContactURL)
}
    indexLoad.send();
}

//Grabs the contacts and puts them in their own list, along with showContact.
function nextContact() {
	for (contactProgress = 0; contactProgress < contacts.length; contactProgress++) {
		showContact()
	}
	document.getElementById("numberOfContacts").innerHTML = "There are " + contactProgress + " contacts to log, press 'Show contacts' above.";
}

function contactMarker() {
    document.getElementById("numberOfContacts").innerHTML = "Showing " + (variableContact + 1) + " of " + contactsSquared.length + " available contacts.";
}

//Part of nextContact, this is what makes it work.
function showContact() {
	console.log(contacts[contactProgress]);
	var ofIndexLoad = new XMLHttpRequest();
    ofIndexLoad.open("GET", contacts[contactProgress]);

    ofIndexLoad.onload = function() {
    	console.log(ofIndexLoad.responseText)
    	contactOfContacts = JSON.parse(ofIndexLoad.responseText);
    	contactsSquared.push(contactOfContacts)
	}
    ofIndexLoad.send();
}

//Logs the contacts to the html page.
function check() {
	for (i = 0; i < contactsSquared.length; i++) {
		console.log(contactsSquared[i])
		document.getElementById("contactsID").insertAdjacentHTML("beforeend","<h3>Contact: " + contactsSquared[i].preferredName + "</h3>First Name: " + contactsSquared[i].firstName + 
			"<br>Last Name: " + contactsSquared[i].lastName + "<br>Email: " + contactsSquared[i].email + "<br>Phone #: " + contactsSquared[i].phoneNumber + 
			"<br>City: " + contactsSquared[i].city + ", " + contactsSquared[i].state + "<br>Hobby: " + contactsSquared[i].favoriteHobby + "<br><br><br>");
	}
	currentContactTable();
    contactMarker();
}

function override() {
	document.getElementById("contactsID").innerHTML = " ";
	for (i = 0; i < contactsSquared.length; i++) {
		document.getElementById("contactsID").insertAdjacentHTML("beforeend", "<h3>Contact: " + contactsSquared[i].preferredName + "</h3>First Name: " + contactsSquared[i].firstName + 
			"<br>Last Name: " + contactsSquared[i].lastName + "<br>Email: " + contactsSquared[i].email + "<br>Phone #: " + contactsSquared[i].phoneNumber + 
			"<br>City: " + contactsSquared[i].city + ", " + contactsSquared[i].state + "<br>Hobby: " + contactsSquared[i].favoriteHobby + "<br><br><br>");
	}
	currentContactTable()
}

function zipAutofill() {
	zipPlace = []
    var zipFind = new XMLHttpRequest();
    zipFind.open("GET", "getCityState.php?zip=" + document.getElementById("zipID").value);
    zipFind.onreadystatechange = function() {
    	if (zipFind.readyState == 4 && zipFind.status == 200) {
    		var response = zipFind.responseText;
  	    	console.log(response)
  	    	var zipPlace = response.split(", ");
   	    	console.log(zipPlace)
  		if (document.getElementById("cityID").value.trim() == "") {
   	    	document.getElementById("cityID").value = zipPlace[0];
  		}
 		if (document.getElementById("stateID").value.trim() == "") {
  	    	document.getElementById("stateID").value = zipPlace[1];
  		}
	}
}
    zipFind.send();
}

function currentContactTable() {
	currentContact = contactsSquared[variableContact];
    document.getElementById("nameID").value = currentContact.preferredName;
    document.getElementById("emailID").value = currentContact.email;
    document.getElementById("fnameID").value = currentContact.firstName;
    document.getElementById("lnameID").value = currentContact.lastName;
    document.getElementById("phoneID").value = currentContact.phoneNumber;
    document.getElementById("cityID").value = currentContact.city;
    document.getElementById("stateID").value = currentContact.state;
    document.getElementById("zipID").value = currentContact.zip;
}

function updateContact() {
	currentContact = contactsSquared[variableContact]
	currentContact.preferredName = document.getElementById("nameID").value;
    currentContact.email = document.getElementById("emailID").value;
    currentContact.firstName = document.getElementById("fnameID").value;
    currentContact.lastName = document.getElementById("lnameID").value;
    currentContact.phoneNumber = document.getElementById("phoneID").value;
    currentContact.city = document.getElementById("cityID").value;
    currentContact.state = document.getElementById("stateID").value;
    currentContact.zip = document.getElementById("zipID").value;
}

function next() {
	if (variableContact < (contactsSquared.length - 1)) {
		variableContact++;
	}
	else {
	}

	currentContact = contactsSquared[variableContact];
	currentContactTable();
    contactMarker();
}

function previous() {
	if (variableContact > 0) {
		variableContact--;
	}

	currentContact = contactsSquared[variableContact];
	currentContactTable();
    contactMarker();
}

function newContact() {
	var fnamevariable = '{"firstName": "'+ document.getElementById("fnameID").value + '", ';
    var lnamevariable = '"lastName": "'+ document.getElementById("lnameID").value + '", ';
	var namevariable = '"preferredName": "'+ document.getElementById("nameID").value + '", ';
    var emailvariable = '"email": "'+ document.getElementById("emailID").value + '", ';
    var phonevariable = '"phoneNumber": "'+ document.getElementById("phoneID").value + '", ';
    var cityvariable = '"city": "'+ document.getElementById("cityID").value + '", ';
    var statevariable = '"state": "'+ document.getElementById("stateID").value + '", ';
    var zipvariable = '"zip": "'+ document.getElementById("zipID").value + '"}';
    var pushedVariable = fnamevariable+lnamevariable+namevariable+emailvariable+phonevariable+cityvariable+statevariable+zipvariable;
    pushedVariable = JSON.parse(pushedVariable)
	contactsSquared.push(pushedVariable);
	console.log(pushedVariable)
    contactMarker();
}

function delContact() {
	if (variableContact == (contactsSquared.length - 1)) {
		contactsSquared.splice(variableContact,1)
		variableContact = variableContact - 1;
	}
	else {
		contactsSquared.splice(variableContact,1);
	}
	console.log(contactsSquared);
	override();
    contactMarker();
}