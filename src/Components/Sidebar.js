import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import $ from "jquery";
import { Link } from "react-router-dom";
import { BiNote, BiArchiveIn, BiTrash } from "react-icons/bi";
import { IconContext } from "react-icons/lib";

function Sidebar(props) {
  const [activetile, settile] = useState("");

  var iconcolor='#202124'
  if (props.dark){
    iconcolor='white'
  }

  $(props.activepage).addClass("activepage");
  useEffect(() => {
    $(activetile).removeClass("activepage");
    settile(props.activepage);
  }, [props.activepage]);

  if (props.show){
    $('.sidemenu').addClass('active')
  }
  else {
    $('.sidemenu').removeClass('active')
  }

  return (
    <div className="sidemenu">
      <IconContext.Provider value={{ size: "28", color:{iconcolor}}}>
        <Link to="/" className="sdlink" id="home">
          <div title='Notes'>
            <BiNote />
            <span>Notes</span>
          </div>
        </Link>
        <Link to="/Archive" className="sdlink" id="archive">
          <div title='Archive'>
            <BiArchiveIn />
            <span>Archive</span>
          </div>
        </Link>
        <Link to="/Bin" className="sdlink" id="bin">
          <div title='Bin'>
            <BiTrash />
            <span>Bin</span>
          </div>
        </Link>
      </IconContext.Provider>
    </div>
  );
}

export default Sidebar;
