import React, { useState,useEffect } from "react";
import "./Page.css";
import { BsArchive } from "react-icons/bs";
import Masonry from "react-masonry-css";
import NotesContainer from "./NotesContainer";

function Archive(props) {
  props.setactive("#archive");
  var active = "archive";
  var count_arch = 0;
  var changed_list=props.Archive.slice(0, props.Archive.length);


  const [del, setdel] = useState(-1);
  const [unarch, setunarch] = useState(-1);

  useEffect(() => {
    if (del >= 0) {
      changed_list.splice(del, 1);
      props.setBin((prev) => [
        ...prev,
        { Title: props.Archive[del].Title, Note: props.Archive[del].Note },
      ]);
      props.setArchive(changed_list);
      setdel(-1);
    }
  }, [del]);

  useEffect(() => {
    if (unarch >= 0) {
      changed_list.splice(unarch, 1);
      props.setNotes((prev) => [
        ...prev,
        { Title: props.Archive[unarch].Title, Note: props.Archive[unarch].Note },
      ]);
      props.setArchive(changed_list);
      setunarch(-1);
    }
  }, [unarch]);

  return (
    <div className={props.show ? "side open" : "side close"}>
      <div className={props.Archive.length === 0 ? "nothing" : "hide"}>
        <BsArchive size="130" opacity={props.dark?"1":'0.2'} />
        <div style={{ opacity:"0.6", margin: "1rem" }}>
          Archived Notes Appears Here
        </div>
      </div>
      <div className= {props.Archive.length !== 0 ? "contain" : "hide"}>
        <Masonry
          breakpointCols={props.show ? 4 : 5}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {props.Archive.map((note) => (
            <div>
              <NotesContainer
                title={note.Title}
                desc={note.Note}
                index={count_arch}
                func_remove={setdel}
                func_unarch={setunarch}
                active={active}
              />
              <script>{count_arch++}</script>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default Archive;
