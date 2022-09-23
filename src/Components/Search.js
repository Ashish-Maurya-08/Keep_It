import React from "react";
import "./search.css";
import NotesContainer from "../Pages/NotesContainer";
import $ from "jquery";

function Search(props) {
  if (props.Search.length > 0) {
    $(".resultcontainer").show();
  } else {
    $(".resultcontainer").hide();
  }

  if (props.dark) {
    $(".resultcontainer").removeClass("darken");
    $(".resultcontainer").addClass("lighten");
  } else {
    $(".resultcontainer").removeClass("lighten");
    $(".resultcontainer").addClass("darken");
  }

  return (
    <div className="resultcontainer">
      <div className="searchresults">
        
        {props.Search.map((note) => (
          <NotesContainer title={note.Title} desc={note.Note} active="search" />
        ))}
      </div>
    </div>
  );
}

export default Search;
