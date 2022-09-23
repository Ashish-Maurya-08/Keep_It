import React, { useState, useEffect } from "react";
import "./Bottom.css";
import $ from "jquery";
import add from "./../png/plus.png"; 

function Bottom(props) {

  var nextlineindex=[];

  var root=document.documentElement;

  if (props.dark){
    root.style.setProperty("--light-text", "white");
    root.style.setProperty("--background-bottom", "#202124");
  }
  else{
    root.style.setProperty("--light-text","gray")
    root.style.setProperty("--background-bottom","aliceblue")
  }


  function checkenter(e){
    let len=($('#notes').text()).length;
    if (e.key=='Enter'){
      console.log('Enter Pressed!')
      nextlineindex.push(len)
    }
    else if (nextlineindex[nextlineindex.length-1]>len){
      nextlineindex.pop();
      console.log('removed')
    }
    console.log(nextlineindex);
    console.log(nextlineindex[nextlineindex.length-1]);
  }


  function AddNote() {
    var title = $("#title").val();
    var tempnote = $("#notes").text();

    if (nextlineindex.length>0){
    var note=tempnote.slice(0,nextlineindex[0])+"\n";
    for (let i=1;i<nextlineindex.length;i++){
      note=note + tempnote.slice(nextlineindex[i-1],nextlineindex[i])+'\n';
    }
    note=note+tempnote.slice(nextlineindex[nextlineindex.length-1],tempnote.length)
  }
  else{
    var note=tempnote;
  }
    console.log(note);
    console.log(note.length);
    console.log(note==" "*note.length);

    if ((title == "" && note == "") || (title=='' && note==(" "*note.length)) ||(title=='' && note==("\n"*note.length)) ||(title==(" "*title.length) && note=='')){
      alert("Both can't be Empty!!!");
    } else {
      props.setNotes((previous) => [...previous, { Title: title, Note: note }]);
      rotate();
    }
  }

  $('.addnote').hide();
  $('.notecontainer').hide();


  const rotate = (e) => {
    $(".addbutton").toggleClass("rotateadd");
    $(".addnote").fadeToggle('slow');
    $(".notecontainer").fadeToggle('slow');
    if (props.dark){
      $(".addnote").toggleClass("lighten");
    }
    else{
      $(".addnote").toggleClass("darken");
    }
    $("#title").focus();

    setTimeout(() => {
      $("#title").val("");
      $("#notes").text("");
    }, 200);
  };
  return (
    <>
      <div className="bottombar">
        <div id="round">
          <img
            src={add}
            alt="Add"
            height="50"
            className="addbutton"
            onClick={rotate}
            title='Add Note'
          />
        </div>
      </div>

      <div className="addnote">
        <div className="notecontainer" onClick={(e)=>{e.stopPropagation()}}>
          <div className="title">
            <input id="title" placeholder="Title" autoComplete="off"></input>
          </div>
          <div className="note">
            <div id="notes" role="textbox" contentEditable="true" onKeyPress={checkenter}></div>
          </div>
          <div id="settext">
            <button onClick={AddNote}>Add</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Bottom;
 