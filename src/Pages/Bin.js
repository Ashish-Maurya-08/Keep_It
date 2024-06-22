import React,{useState,useEffect} from "react";
import "./Page.css";
import { RiDeleteBin5Line } from "react-icons/ri";
import Masonry from 'react-masonry-css';
import NotesContainer from './NotesContainer'

function Bin(props) {
  props.setactive("#bin");
  var active='bin';
  const [del,setdel]=useState(-1);
  const [restore,setrestore]=useState(-1);

  var changed_list=props.Bin.slice(0, props.Bin.length);

  var count_bin=0

  const breakpoints={
    default:20,
    4500:15,
    3000:10,
    2300:8,
    2000:7,
    1800:6,
    1600:5,
    1400:4,
    1000:3,
    900:2,
    600:1,
    
  }


  useEffect(() => {
    if (del >= 0) {
      changed_list.splice(del, 1);
      props.setBin(changed_list);
      setdel(-1);
    }
  }, [del]);


  useEffect(() => {
    if (restore >= 0) {
      changed_list.splice(restore, 1);
      props.setNotes((prev) => [
        ...prev,
        { Title: props.Bin[restore].Title, Note: props.Bin[restore].Note },
      ]);
      props.setBin(changed_list);
      setrestore(-1);
    }
  }, [restore]);


  return (
    <div className={props.show ? "side open" : "side close"}>
      <div className={props.Bin.length === 0 ? "nothing" : "hide"}>
        <RiDeleteBin5Line size="130" opacity={props.dark?"1":'0.2'} />
        <div style={{ opacity: "0.6",margin:'1rem' }}>Empty Bin</div>
      </div>
      <div className={props.Bin.length !== 0 ? "contain" : "hide"}>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {(props.Bin).map((note) => (
            <div>
              <NotesContainer
                title={note.Title}
                desc={note.Note}
                index={count_bin}
                func_remove={setdel}
                func_restore={setrestore}
                active={active}
              />
              <script>{count_bin++}</script>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default Bin;
