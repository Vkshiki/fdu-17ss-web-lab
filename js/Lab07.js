selectOne();
function selectOne(){
	
}
function createTable(){
	var BoxA = document.getElementById("BoxA");
	BoxA.innerHTML= "";
	var tableNameBox = document.createElement("input");
    tableNameBox.setAttribute("type","text");
    tableNameBox.setAttribute("id", "tableName");
    tableNameBox.setAttribute("placeholder", "Table Name");
    var columnNumberBox= document.createElement("input");
    columnNumberBox.setAttribute("type", "number");
    columnNumberBox.setAttribute("id", "columnNumber");
	columnNumberBox.setAttribute("placeholder", "Columns Numbers");
	var attrBox= document.createElement("div");
    attrBox.setAttribute("id", "attrBox");
	var buttonBox= document.createElement("div");
    buttonBox.setAttribute("id", "buttonBox");
    BoxA.appendChild(tableNameBox);
    BoxA.appendChild(columnNumberBox);

    BoxA.appendChild(document.createElement("br"));
	BoxA.appendChild(attrBox);
	BoxA.appendChild(buttonBox);
	
	createTableCopy();
}

function createTableCopy(){
	var columnNumber = document.getElementById("columnNumber");
	columnNumber.onchange = function(){
		var cnumber = columnNumber.value;
		var attrBox = document.getElementById("attrBox");
		var buttonBox =document.getElementById("buttonBox");
		if (cnumber > 0){
			attrBox.innerHTML ="";
			buttonBox.innerHTML ="";
			
			for(i = 1;i <= cnumber; i++){
				var attrInput= document.createElement("input");
                attrInput.setAttribute("type", "text");
                attrInput.setAttribute("class", "attr");
                attrInput.setAttribute("placeholder", "Attribute");

                attrBox.appendChild(attrInput);
			}
			var commitButton= document.createElement("button");
            commitButton.setAttribute("id", "commitButton1");
            commitButton.setAttribute("class", "commitButton");
            commitButton.setAttribute("onclick", "CommitB()");
            commitButton.appendChild(document.createTextNode("commit"));
            buttonBox.appendChild(commitButton);
		}
		else{
			attrBox.innerHTML ="";
			buttonBox.innerHTML ="";
		}
	}
	
}

// function Node(data) {
    // this.data = data;
    // this.parent = null;
    // this.children = [];
// }

// var dataTree= new Tree("fatherNode");
let tables = new Array();
function CommitB(){
    var tableName = document.getElementById("tableName").value;
    var columnNumber = document.getElementById("columnNumber").value;
    var attrArray = document.getElementsByClassName("attr");
	let arr = new Array();
    for(let i= 0; i < columnNumber; i++) {
		arr.push([attrArray[i].value,new Array()]);
	}
	tables.push([tableName,arr]);
    s2Refresh();

    var select2= document.getElementById("select2");
    var options= select2.options;
    options[options.length-2].selected= true;
    tbRefresh();
}

function addRow(){
	var BoxA= document.getElementById("BoxA");
    BoxA.innerHTML= "";
    var index= document.getElementById("select2").selectedIndex;

    var arrNumber= tables[index][1].length;
    for (let i= 0; i< arrNumber; i++) {

        var attrArray= document.createElement("input");
        attrArray.setAttribute("type", "text");
        attrArray.setAttribute("class", "attr");
        attrArray.setAttribute("placeholder",tables[index][1][i][0]);

        BoxA.appendChild(attrArray);
    }
    BoxA.appendChild(document.createElement("br"));
    var columnNumber2= document.createElement("button");
    columnNumber2.appendChild(document.createTextNode("commit"));
    columnNumber2.setAttribute("onclick", "aRCommit()");
    BoxA.appendChild(columnNumber2);
}

function aRCommit() {
    var arrays = document.getElementsByClassName("attr");
    var index = document.getElementById("select2").selectedIndex;
    var table = tables[index];
    for (let i= 0; i< arrays.length; i++) {
        table[1][i][1].push(arrays[i].value);
    }
    tbRefresh();
}

function deleteRow(){
	var BoxA= document.getElementById("BoxA");
    BoxA.innerHTML= "";
    var index= document.getElementById("select2").selectedIndex;
    var table = tables[index];

    for (let i= 0; i< table[1].length; i++) {
        var attrArray= document.createElement("input");
        attrArray.setAttribute("type", "text");
        attrArray.setAttribute("class", "attr");
        attrArray.setAttribute("placeholder", table[1][i].data);
        BoxA.appendChild(attrArray);
    }
    BoxA.appendChild(document.createElement("br"));
    var columnNumber3= document.createElement("button");
    columnNumber3.appendChild(document.createTextNode("commit"));
    columnNumber3.setAttribute("onclick", "dRCommit()");
    BoxA.appendChild(columnNumber3);
}

function dRCommit() {
    var arrays= document.getElementsByClassName("attr");
    var index= document.getElementById("select2").selectedIndex;
    var table= tables[index];
    var deleteIndex= new Array();
    for (let r= 0; r < table[1][0][1].length; r++) {
        matchIndex(0, r);
    }

    function matchIndex(c, r) {
        if (c=== arrays.length) {
            deleteIndex.push(r);
        }
        else if (table[1][c][1][r]=== arrays[c].value.trim()|| arrays[c].value.trim()==="") {
			matchIndex(c+ 1, r);
        }
    }
	
    if (deleteIndex.length!== 0) {
        for (let i= deleteIndex.length- 1; i>= 0; i--) {
            let r= deleteIndex[i];
            for (let j= 0; j< table[1].length; j++) {
                table[1][j][1].splice(r, 1);
            }
        }
    }
    tbRefresh();
}

function deleteTable(){
	var BoxA= document.getElementById("BoxA");
    BoxA.innerHTML= "";
    var select2= document.getElementById("select2");
    var index= select2.selectedIndex;
    if (index!= select2.options.length- 1) {
        var columnNumber4= document.createElement("button");
        columnNumber4.appendChild(document.createTextNode("commit"));
        columnNumber4.setAttribute("onclick", "dTCommit()");
		BoxA.innerHTML = "WARNING: You cannot undo this action!<br/>"
        BoxA.appendChild(columnNumber4);
    }
}

function dTCommit() {
    var select2= document.getElementById("select2");
    var index= select2.selectedIndex;
    tables.splice(index, 1);
    s2Refresh();

    var options= document.getElementById("select2").options;
    options[0].selected= true;
    tbRefresh();
	deleteTable();

}

function s2Refresh() {
    var select2= document.getElementById("select2");
    select2.innerHTML= "";
    for (let i= 0; i< tables.length; i++) {
        var newOption= document.createElement("option");
        newOption.appendChild(document.createTextNode(tables[i][0]));
        select2.add(newOption);
    }
    var newOption= document.createElement("option");
    newOption.appendChild(document.createTextNode("SELECT(default: last created)"));
    newOption.setAttribute("value", "default");
    select2.add(newOption);
}

function tbRefresh() {
    var index= document.getElementById("select2").selectedIndex;
    var tableBox= document.getElementById("BoxB");
    tableBox.innerHTML= "";

    var table= tables[index];
    var tr0= document.createElement("tr");
	if(table!=null){
    for (let i= 0; i< table[1].length; i++) {
        let th= document.createElement("th");
        th.appendChild(document.createTextNode(table[1][i][0]));
        tr0.appendChild(th);
    }
    tableBox.appendChild(tr0);


    for (let j= 0; j< table[1][0][1].length; j++) {
        let newRow= document.createElement("tr");
        for (let i= 0; i< table[1].length; i++) {
            let newCell= document.createElement("td");
            newCell.appendChild(document.createTextNode(table[1][i][1][j]));
            newRow.appendChild(newCell);
        }
        tableBox.appendChild(newRow);
    }
	}
}

function selectChange() {
    var select1= document.getElementById("select1");
    var href= select1.value;
    eval(href);
}

function selectChange_() {
    tableRefresh();
    selectChange();
}