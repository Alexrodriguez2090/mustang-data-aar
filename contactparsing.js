var contacts = [];
var contactsSquared = [];
var contactProgress = 0;

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
	document.getElementById("contactsID").innerHTML = "There are " + contactProgress + " contacts to log, press 'Show contacts' above.";
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
}