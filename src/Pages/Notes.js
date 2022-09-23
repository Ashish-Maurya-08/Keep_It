import React, { useEffect, useState } from "react";
import $ from "jquery";
import NotesContainer from "./NotesContainer";
import { GoNote } from "react-icons/go";
import Masonry from "react-masonry-css";

function Notes(props) {

  props.setactive("#home");
  var active='notes'
  var Notes = props.Notes;

  const breakpoints={
    default:20,
    4900:15,
    3800:10,
    2700:8,
    2200:7,
    1900:6,
    1600:5,
    1400:4,
    1150:3,
    920:2,
    700:1,
    
  }


  var changed_list = props.Notes.slice(0, props.Notes.length);
  const [del, setdel] = useState(-1);
  const [arch, setarch] = useState(-1);

  useEffect(() => {
    if (del >= 0) {
      changed_list.splice(del, 1);
      props.setBin((prev) => [
        ...prev,
        { Title: props.Notes[del].Title, Note: props.Notes[del].Note },
      ]);
      props.setNotes(changed_list);
      setdel(-1);
    }
  }, [del]);

  useEffect(() => {
    if (arch >= 0) {
      changed_list.splice(arch, 1);
      props.setArchive((prev) => [
        ...prev,
        { Title: props.Notes[arch].Title, Note: props.Notes[arch].Note },
      ]);
      props.setNotes(changed_list);
      setarch(-1);
    }
  }, [arch]);

  var count_notes = 0;


  return (
    <div className="side">
      <div className={props.Notes.length == 0 ? "nothing" : "hide"}>
        <GoNote size="130" opacity={props.dark?"1":'0.2'} />
        <div style={{ opacity: "0.6",margin:'1rem' }}>Nothing Here! Add Notes </div>
      </div>
      <div className={props.Notes.length != 0 ? "contain" : "hide"}>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {Notes.map((note) => (
            <div>
              <NotesContainer
                title={note.Title}
                desc={note.Note}
                index={count_notes}
                func_remove={setdel}
                func_move={setarch}
                page='Notes'
                active={active}
              />
              <script>{count_notes++}</script>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default Notes;
