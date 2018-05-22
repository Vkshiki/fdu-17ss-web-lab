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
	//var commitButton= document.createElement("button");
    //commitButton.setAttribute("id", "commitButton1");
    //commitButton.setAttribute("class", "commitButton");
    //commitButton.appendChild(document.createTextNode("commit"));
	var attrBox= document.createElement("div");
    attrBox.setAttribute("id", "attrBox");
	var buttonBox= document.createElement("div");
    buttonBox.setAttribute("id", "buttonBox");
	
    BoxA.appendChild(tableNameBox);
    BoxA.appendChild(columnNumberBox);
	//BoxA.appendChild(document.createElement("br"));
    //BoxA.appendChild(commitButton);
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

function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree (data) {
    this._root = new Node(data);
}

var dataTree= new Tree("fatherNode");

function CommitB(){
    var tableName= document.getElementById("tableName").value;
    var newTable= new Node(tableName);
    dataTree._root.children.push(newTable);
    newTable.parent= dataTree;

    var columnNumber= document.getElementById("columnNumber").value;
    var attrArray= document.getElementsByClassName("attr");
    for (let i= 0; i < columnNumber; i++) {
        var newArray= new Node(attrArray[i].value);
        newTable.children.push(newArray);
        newArray.parent= newTable;
    }
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
    var table= dataTree._root.children[index];
    var arrNumber= table.children.length;
    for (let i= 0; i< arrNumber; i++) {

        var attrArray= document.createElement("input");
        attrArray.setAttribute("type", "text");
        attrArray.setAttribute("class", "attr");
        attrArray.setAttribute("placeholder", table.children[i].data);

        BoxA.appendChild(attrArray);
    }
    BoxA.appendChild(document.createElement("br"));
    var columnNumber2= document.createElement("button");
    columnNumber2.appendChild(document.createTextNode("commit"));
    columnNumber2.setAttribute("onclick", "aRCommit()");
    BoxA.appendChild(columnNumber2);
}

function aRCommit() {
    var arrays= document.getElementsByClassName("attr");
    var index= document.getElementById("select2").selectedIndex;
    var table= dataTree._root.children[index];

    for (let i= 0; i< arrays.length; i++) {
        var cellCont= new Node(arrays[i].value);
        cellCont.parent= table.children[i];
        table.children[i].children.push(cellCont);
    }
    tbRefresh();
}

function deleteRow(){
	var BoxA= document.getElementById("BoxA");
    BoxA.innerHTML= "";
    var index= document.getElementById("select2").selectedIndex;
    var table= dataTree._root.children[index];
    var arrNumber= table.children.length;
    for (let i= 0; i< arrNumber; i++) {

        var attrArray= document.createElement("input");
        attrArray.setAttribute("type", "text");
        attrArray.setAttribute("class", "attr");
        attrArray.setAttribute("placeholder", table.children[i].data);

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
    var table= dataTree._root.children[index];

    var deleteIndex= [];
    for (let r= 0; r< table.children[0].children.length; r++) {
        matchIndex(0, r);
    }
    function matchIndex(c, r) {
        if (c=== arrays.length) {
            deleteIndex.push(r);
        }
        else if (table.children[c].children[r].data=== arrays[c].value.trim()|| arrays[c].value.trim()==="") {
			matchIndex(c+ 1, r);
        }
    }

    if (deleteIndex.length!== 0) {
        for (let i= deleteIndex.length- 1; i>= 0; i--) {
            let r= deleteIndex[i];
            for (let j= 0; j< table.children.length; j++) {
                table.children[j].children.splice(r, 1);
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
    if (index!== select2.options.length- 1) {
        var columnNumber4= document.createElement("button");
        columnNumber4.appendChild(document.createTextNode("commit"));
        columnNumber4.setAttribute("onclick", "dTCommit()");
        BoxA.appendChild(columnNumber4);
    }
}

function dTCommit() {
    var select2= document.getElementById("select2");
    var index= select2.selectedIndex;
    dataTree._root.children.splice(index, 1);
    s2Refresh();

    var options= document.getElementById("select2").options;
    options[0].selected= true;
    tbRefresh();
    alert("WARNING: You cannot undo this action!");

}

function s2Refresh() {
    var select2= document.getElementById("select2");
    select2.innerHTML= "";
    for (let i= 0; i< dataTree._root.children.length; i++) {
        var newOption= document.createElement("option");
        newOption.appendChild(document.createTextNode(dataTree._root.children[i].data));
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

    var table= dataTree._root.children[index];
    var tr0= document.createElement("tr");

    for (let i= 0; i< table.children.length; i++) {
        let th= document.createElement("th");
        th.appendChild(document.createTextNode(table.children[i].data));
        tr0.appendChild(th);
    }
    tableBox.appendChild(tr0);


    for (let j= 0; j< table.children[0].children.length; j++) {
        let newRow= document.createElement("tr");
        for (let i= 0; i< table.children.length; i++) {
            let newCell= document.createElement("td");
            newCell.appendChild(document.createTextNode(table.children[i].children[j].data));
            newRow.appendChild(newCell);
        }
        tableBox.appendChild(newRow);
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