//var cube = ['W', 'Y', 'G', 'O', 'G', 'W', 'Y', 'O', 'B', 'O', 'G', 'G', 'Y', 'B', 'B', 'W', 'R', 'O', 'B', 'R', 'R', 'R', 'W', 'Y'];
//scramble: F R2 F R F2 U' F R U2

document.addEventListener('keydown', function(e) {
    switch (e.keyCode) {
        case 37:
        //left
        	right();
        	break;
        case 38:
        //up
        	rightPrime();
        	break;
        case 39:
        //right
        	front();
        	break;
        case 40:
        //down
        	frontPrime();
        	break;
    }
});

var cube = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5];
const colours = ["white", "orange", "lime", "red", "blue", "yellow"];

var playMode = true;

var selectedColour = -1;

const solved = new Set(["000011112222333344445555", "000022223333444411115555", "000033334444111122225555", "000044441111222233335555", 
"111100004444555522223333", "111144445555222200003333", "111155552222000044443333", "111122220000444455553333",
"222200001111555533334444", "222211115555333300004444", "222255553333000011114444", "222233330000111155554444",
"333300002222555544441111", "333322225555444400001111", "333355554444000022221111", "333344440000222255551111",
"444400003333555511112222", "444433335555111100002222", "444455551111000033332222", "444411110000333355552222",
"555511114444333322220000", "555544443333222211110000", "555533332222111144440000", "555522221111444433330000"
]);


document.addEventListener('DOMContentLoaded', function() {
	let counter = 0;
	let numPainted = 0;
    for(let i = 65; i <= 88; i++){
    	document.getElementById(String.fromCharCode(i)).style.backgroundColor = colours[counter];
    	if(++numPainted % 4 == 0) counter++;
    }
}, false);

function printCube(){
	for(let i = 65; i <= 88; i++){
		document.getElementById(String.fromCharCode(i)).style.backgroundColor = colours[cube[i-65]];
	}
}


function solveCube(){
	let origCube = cube; //original cube


	let map = new Map(); //maps permutation to the previous move
	let queue = new Array(); //queue.shift() = poll, queue.push();

	map.set(serialize(cube), " ");
	queue.push([serialize(cube), " "]);

	
	let frontOfQueue = 0;

	while(queue.length != 0){
		playMode = false;

		let curPerm = queue[frontOfQueue][0];
		let prevMove = queue[frontOfQueue][1];

		/* Debug Stuff
		console.log(prevMove);
		for(let i = 0; i < queue.length; i++){
			console.log(queue[i][0] + " " + queue[i][1]);
		}
		console.log(" ");

		console.log(map.size);
		___________________ */


		frontOfQueue++;

		if(solved.has(curPerm)){
			ans = "";

			console.log("done");
			
			while(prevMove != " "){
				ans = prevMove + " " + ans;
				//console.log(prevMove);

				cube = cubeToArray(curPerm);
				doInverse(prevMove);
				curPerm = serialize(cube);
				prevMove = map.get(curPerm);
			}
			console.log(ans);
			/* working on */
			playMode = true;
			cube = origCube;
			break;
		}

		cube = cubeToArray(curPerm);


		if(prevMove != "F" && prevMove != "F'" && prevMove != "F2"){
			front();
			let doTurn = serialize(cube);

			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "F");
				queue.push([doTurn.slice(0, 24), "F"]);
			}

			doubleFront();
			doTurn = serialize(cube);
			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "F'");
				queue.push([doTurn.slice(0, 24), "F'"]);
			}


			frontPrime();
			doTurn = serialize(cube);
			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "F2");
				queue.push([doTurn.slice(0, 24), "F2"]);
			}

			doubleFront();
		}

		
		if(prevMove != "U" && prevMove != "U'" && prevMove != "U2"){
			up();
			let doTurn = serialize(cube);

			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "U");
				queue.push([doTurn.slice(0, 24), "U"]);
			}

			doubleUp();
			doTurn = serialize(cube);
			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "U'");
				queue.push([doTurn.slice(0, 24), "U'"]);
			}


			upPrime();
			doTurn = serialize(cube);
			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "U2");
				queue.push([doTurn.slice(0, 24), "U2"]);
			}
			doubleUp();
		}
		
		
		if(prevMove != "R" && prevMove != "R'" && prevMove != "R2"){
			right();
			let doTurn = serialize(cube);

			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "R");
				queue.push([doTurn.slice(0, 24), "R"]);
			}

			doubleRight();
			doTurn = serialize(cube);
			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "R'");
				queue.push([doTurn.slice(0, 24), "R'"]);
			}


			rightPrime();
			doTurn = serialize(cube);
			if(!map.has(doTurn)){
				map.set(doTurn.slice(0, 24), "R2");
				queue.push([doTurn.slice(0, 24), "R2"]);
			}
			doubleRight();	
		}
	}
}

function serialize(curCube){
	let str = "";
	for(let i = 0; i < 24; i++){
		str += curCube[i] + "";
	}
	return str;
}

function cubeToArray(perm){
	let ans = new Array(24);

	for(let i = 0; i < 24; i++){
		ans[i] = perm.charAt(i);
	}

	return ans;
}

function right(){
	let temp = cube[1];
	cube[1] = cube[9];
	cube[9] = cube[21];
	cube[21] = cube[19];
	cube[19] = temp;

	temp = cube[2];
	cube[2] = cube[10];
	cube[10] = cube[22];
	cube[22] = cube[16];
	cube[16] = temp;

	temp = cube[12];
	cube[12] = cube[15];
	cube[15] = cube[14];
	cube[14] = cube[13];
	cube[13] = temp;

	if(playMode) printCube();
}

function rightPrime(){
	let temp = cube[16];
	cube[16] = cube[22];
	cube[22] = cube[10];
	cube[10] = cube[2];
	cube[2] = temp;

	temp = cube[19];
	cube[19] = cube[21];
	cube[21] = cube[9];
	cube[9] = cube[1];
	cube[1] = temp;

	temp = cube[13];
	cube[13] = cube[14];
	cube[14] = cube[15];
	cube[15] = cube[12];
	cube[12] = temp;

	if(playMode) printCube();
}

function doubleRight(){
	let temp = cube[1];
	cube[1] = cube[21];
	cube[21] = temp;

	temp = cube[2];
	cube[2] = cube[22];
	cube[22] = temp;

	temp = cube[9];
	cube[9] = cube[19];
	cube[19] = temp;

	temp = cube[10];
	cube[10] = cube[16];
	cube[16] = temp;

	temp = cube[12];
	cube[12] = cube[14];
	cube[14] = temp;

	temp = cube[13];
	cube[13] = cube[15];
	cube[15] = temp;

	if(playMode) printCube();
}

function up(){
	let temp = cube[0];
	cube[0] = cube[3];
	cube[3] = cube[2];
	cube[2] = cube[1];
	cube[1] = temp;

	temp = cube[4];
	cube[4] = cube[8];
	cube[8] = cube[12];
	cube[12] = cube[16];
	cube[16] = temp;

	temp = cube[5];
	cube[5] = cube[9];
	cube[9] = cube[13];
	cube[13] = cube[17];
	cube[17] = temp;

	if(playMode) printCube();
}

function upPrime(){
	let temp = cube[0];
	cube[0] = cube[1];
	cube[1] = cube[2];
	cube[2] = cube[3];
	cube[3] = temp;

	temp = cube[4];
	cube[4] = cube[16];
	cube[16] = cube[12];
	cube[12] = cube[8];
	cube[8] = temp;

	temp = cube[5];
	cube[5] = cube[17];
	cube[17] = cube[13];
	cube[13] = cube[9];
	cube[9] = temp;

	if(playMode) printCube();
}

function doubleUp(){
	let temp = cube[0];
	cube[0] = cube[2];
	cube[2] = temp;

	temp = cube[1];
	cube[1] = cube[3];
	cube[3] = temp;

	temp = cube[4];
	cube[4] = cube[12];
	cube[12] = temp;

	temp = cube[8];
	cube[8] = cube[16];
	cube[16] = temp;

	temp = cube[5];
	cube[5] = cube[13];
	cube[13] = temp;

	temp = cube[9];
	cube[9] = cube[17];
	cube[17] = temp;

	if(playMode) printCube();
}

function front(){
	let temp = cube[2];
	cube[2] = cube[5];
	cube[5] = cube[20];
	cube[20] = cube[15];
	cube[15] = temp;

	temp = cube[3];
	cube[3] = cube[6];
	cube[6] = cube[21];
	cube[21] = cube[12];
	cube[12] = temp;

	temp = cube[8];
	cube[8] = cube[11];
	cube[11] = cube[10];
	cube[10] = cube[9];
	cube[9] = temp;

	if(playMode) printCube();
}

function frontPrime(){
	let temp = cube[2];
	cube[2] = cube[15];
	cube[15] = cube[20];
	cube[20] = cube[5];
	cube[5] = temp;

	temp = cube[3];
	cube[3] = cube[12];
	cube[12] = cube[21];
	cube[21] = cube[6];
	cube[6] = temp;

	temp = cube[8];
	cube[8] = cube[9];
	cube[9] = cube[10];
	cube[10] = cube[11];
	cube[11] = temp;

	if(playMode) printCube();
}

function doubleFront(){
	let temp = cube[21];
	cube[21] = cube[3];
 	cube[3] = temp;

	temp = cube[20];
	cube[20] = cube[2];
	cube[2] = temp;

	temp = cube[15];
	cube[15] = cube[5];
	cube[5] = temp;

	temp = cube[12];
	cube[12] = cube[6];
	cube[6] = temp;

	temp = cube[8];
	cube[8] = cube[10];
	cube[10] = temp;

	temp = cube[9];
	cube[9] = cube[11];
	cube[11] = temp;

	if(playMode) printCube();
}

function doInverse(move){
	if(move == "F"){
		frontPrime();
	}else if(move == "F'"){
		front();
	}else if(move == "F2"){
		doubleFront();
	}else if(move == "U"){
		upPrime();
	}else if(move == "U'"){
		up();
	}else if(move == "U2"){
		doubleUp();
	}else if(move == "R"){
		rightPrime();
	}else if(move == "R'"){
		right();
	}else{
		doubleRight();
	}
}

function reset(){
	let cur = -1;

	for(let i = 0; i < 24; i++){
		if(i % 4 == 0) cur++;
		cube[i] = cur;
	}
	printCube();
}

function selectColour(colour){
	selectedColour = colour;

	console.log(colour);
}

function paint(id){
	console.log(selectedColour);
	if(selectedColour != -1){
		document.getElementById(id).style.backgroundColor = colours[selectedColour];
		cube[id.charCodeAt(0) - 65] = selectedColour;
	}
}