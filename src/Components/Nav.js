import React, { useState } from "react";
import "./Nav.css";
import $ from "jquery";
import logo from "./../png/Icon.png";
import user from "./../png/profile.png";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiSearch } from "react-icons/hi";
import { MdClear } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";

function Navbar(props) {
  var val = "";
  var search_list = [];

  const [panel, setpanel] = useState(false);
  var root = document.documentElement;

  if (props.dark){
    root.style.setProperty("--search", "#525355");
    root.style.setProperty("--background", "#202124");
    root.style.setProperty("--hover", "#404040");
    root.style.setProperty("--icon", "white");
    root.style.setProperty("--border", "#5F6368");
  }
  else{
    root.style.setProperty("--search","#F1F3F4")
    root.style.setProperty("--background","white")
    root.style.setProperty("--hover","#EEEFEF")
    root.style.setProperty("--icon","#525355")
    root.style.setProperty("--border","#DADCE0")
  }

  $(document).click(function () {
    $(".userpanel").hide("slow");
  });

  function changesidebar() {
    props.setshow(!props.show);
  }

  function changemode(){
    props.setDark(!props.dark);
    console.log(props.dark)
    
  }

  function changeback() {
    if (!props.dark){
    root.style.setProperty("--search", "white");
    }
    $("#form").addClass("boxshadow");
  }

  function clearsearch() {
    $("#search").val("");
    props.setSearch([]);
    $("#search").focus();
    $("#clearsearch").hide("fast");
  }

  function showup(e) {
    $("#clearsearch").show("fast");
    val = e.target.value;
    if (val.length > 0) {
      search_list = props.Notes.filter((note) => {
        return note.Title.includes(val) || note.Note.includes(val);
      });
      props.setSearch(search_list);
    } else {
      props.setSearch([]);
    }
  }

  function focus(e) {
    e.preventDefault();
    $("#search").focus();
  }
  const SearchHandler = (e) => {
    e.preventDefault();
  };
  const userhandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    $(".userpanel").toggle(500);
    setpanel(!panel);
  };

  if (props.show) {
    $("#menu").hide("fast");
    $("#close").show("fast");
  } else {
    $("#close").hide("fast");
    $("#menu").show("fast");
  }

  const cleardata = () => {
    alert("All data will be Cleared!!");
    localStorage.clear();
  };

  return (
    <>
      <div className="nav">
        <div className="menu">
          <div id="menubutton" onClick={changesidebar}>
            <HiOutlineMenuAlt3
              id="menu"
              size="22"
              style={{ margin: "0.7rem" }}
              title="Open Menu"
            />
            <MdClear
              id="close"
              size="22"
              style={{ margin: "0.7rem", display: "none" }}
              title="Close Menu"
            />
          </div>
          <div>
            <Link to="/" className="link">
              <img src={logo} alt="Logo" height="35" title="Logo" />
              <span
                className="head"
                style={{
                  minWidth: "5rem",
                  fontSize: "20px",
                  marginLeft: "1rem",
                }}
                title="Keep It"
              >
                Keep it
              </span>
            </Link>
          </div>
        </div>
        <div className="searchbar">
          <form onSubmit={SearchHandler} id="form">
            <button className="buttonS" onClick={focus} title="Search">
              <HiSearch size="20"/>
            </button>
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              autoComplete="off"
              onFocus={changeback}
              onChange={showup}
            />
            <button
              className="buttonS"
              id="clearsearch"
              style={{ display: "none" }}
              onClick={clearsearch}
              title="Clear"
            >
              <MdClear size="25"/>
            </button>
          </form>
        </div>

        <div className="extras">
          <div className='darkmode' onClick={changemode} title='Dark Mode'>
            <CgDarkMode size="27" />
          </div>
          <a href="" className="link" onClick={userhandler}>
            <span title="Username">{props.user}</span>
            <img src={user} alt="User" height="40" title="Profile" />
          </a>
        </div>
      </div>
      <div className={panel ? "userpanel" : "userpanel hide"}>
        <a
          href=""
          className="link"
          style={{ color: "red", minWidth: "4rem" }}
          onClick={cleardata}
        >
          Log Out
        </a>
      </div>
    </>
  );
}

export default Navbar;
