// MIT License
// Copyright (c) 2020 Luis Espino

function reflex_agent(location, state) {
	if (state == "DIRTY") return "CLEAN";
	else if (location == "A") return "RIGHT";
	else if (location == "B") return "LEFT";
}

var estado1 = 0;
var estado2 = 0;
var estado3 = 0;
var estado4 = 0;
var estado5 = 0;
var estado6 = 0;
var estado7 = 0;
var estado8 = 0;

var end = false;

function dirty(position, state1, state2) {
	if ((position == "B" && state1 == "CLEAN" && state2 == "CLEAN") ||
		(position == "A" && state1 == "CLEAN" && state2 == "CLEAN")) {
		if (Math.floor(Math.random() * 10) > 4) {
			states[2] = "DIRTY"
			states[1] = "DIRTY"
		}
	}
}

function cont(position, state1, state2) {
	if (position == "A" && state1 == "DIRTY" && state2 == "DIRTY") {
		estado1++;
	}
	else if (position == "A" && state1 == "CLEAN" && state2 == "DIRTY") {
		estado2++;
	}
	else if (position == "B" && state1 == "CLEAN" && state2 == "DIRTY") {
		estado3++;
	}
	else if (position == "B" && state1 == "CLEAN" && state2 == "CLEAN") {
		estado4++;
	}
	else if (position == "A" && state1 == "CLEAN" && state2 == "CLEAN") {
		estado5++;
	}
	else if (position == "B" && state1 == "DIRTY" && state2 == "DIRTY") {
		estado6++;
	}
	else if (position == "B" && state1 == "DIRTY" && state2 == "CLEAN") {
		estado7++;
	}
	else if (position == "A" && state1 == "DIRTY" && state2 == "CLEAN") {
		estado8++;
	}
}

function validate() {
	if (estado1 >= 2 && estado2 >= 2 && estado3 >= 2 && estado4 >= 2 &&
		estado5 >= 2 && estado6 >= 2 && estado7 >= 2 && estado8 >= 2) {
		end = true
	}
}

getStates = () => {
	return end ? "Todos los Estados Fueron visitados 2 veces <br>" : "" +
		"Estados Visitados <br>" +
		"Estdo1: " + estado1 + "</br>" +
		"Estdo2: " + estado2 + "<br>" +
		"Estdo3: " + estado3 + "<br>" +
		"Estdo4: " + estado4 + "<br>" +
		"Estdo5: " + estado5 + "<br>" +
		"Estdo6: " + estado6 + "<br>" +
		"Estdo7: " + estado7 + "<br>" +
		"Estdo8: " + estado8 + "<br>";
}

var stringConcat = "";

function test() {
	cont(states[0], states[1], states[2]);
	if (end) {
		document.getElementById("log").innerHTML = getStates() + stringConcat;
		return;
	}
	var location = states[0];
	var state = states[0] == "A" ? states[1] : states[2];
	var action_result = reflex_agent(location, state);
	stringConcat += "<br>Location: ".concat(location).concat(" => ").concat(states[1]).concat(" | ").concat(states[2]);
	document.getElementById("log").innerHTML = getStates() + stringConcat;
	if (action_result == "CLEAN") {
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") states[2] = "CLEAN";
	}
	else if (action_result == "RIGHT") states[0] = "B";
	else if (action_result == "LEFT") states[0] = "A";
	dirty(states[0], states[1], states[2]);
	validate();
	setTimeout(function () { test(); }, 500);
}

var states = ["A", "DIRTY", "DIRTY"];
test();
