import React, { useState } from "react";
import "./Login.css";
import user from "./../png/profile.png";
import { FaArrowCircleRight } from "react-icons/fa";
import $ from "jquery";

function Login(props) {
  const [live, setlive] = useState("Guest");

  var regx = /^[\w.\- _]{2,25}$/g;

  const submit = (user) => {
    props.set(user);
    localStorage.setItem("username", user);
  };

  const submituser = (e) => {
    e.preventDefault();
    var user = $("#username").val();
    if (user===' '*user.length){
      alert('Only Spaces are not Allowed!!\n\nTry Again :)')
    }
    else if (!regx.test(user)) {
      alert("Invailed!!!\nOnly Alphbets, Numbers and Some Special Charaters(Dot,Hyphen and Underscore) are Allowed\nMinimum:2 Maximum:25\n\nTry Again :)");
    } 
    else {
      $(".main").animate(
        {
          marginLeft: "40rem",
          opacity: 0,
        },
        "slow"
      );
      $(".main").hide("fast");
      setTimeout(() => {
        $(".loader").addClass("flexclass");
        $(".loader").fadeIn("slow");
        setTimeout(() => {
          $(".loader").fadeOut("slow");
          setTimeout(() => {
            $(".loginpage").fadeOut("slow");
            setTimeout(() => {
              submit(user);
            }, 400);
          }, 1000);
        }, 1500);
      }, 1000);
    }
  };
  const change = () => {
    var nw = $("#username").val();
    if (nw) {
      setlive(nw);
    } else {
      setlive("Guest");
    }
  };
  return (
    <div className="loginpage">
      <div className="loader">
        <div className="rotate"></div>
        <div className="greeting">Setting up!!</div>
      </div>
      <div className="main">
        <div>
          <img src={user} alt="user" height="150" />
        </div>
        <h1 className="greeting">Hi! {live}</h1>
        <div className="inputbar">
          <form onSubmit={submituser}>
            <input
              type="text"
              id="username"
              onChange={change}
              placeholder="Enter Username"
              autoComplete="off"
              required
              maxLength="25"
            ></input>
          </form>
          <a href="" onClick={submituser}>
            <span>
              <FaArrowCircleRight color="white" size="25" />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
