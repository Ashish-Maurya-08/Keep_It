import { useState,useContext,useEffect } from "react";
import "./App.css";
import Navbar from "./Components/Nav";
import Bin from "./Pages/Bin";
import Archive from "./Pages/Archive";
import Sidebar from "./Components/Sidebar";
import Bottom from "./Components/Bottom";
import Search from './Components/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login";
import Notes from "./Pages/Notes";
import {Datacontext} from './Datacontext';

function App() {

  var tempdark=localStorage.getItem("Dark");
  if (tempdark==null || tempdark=='false'){
    var Dark=false;
  }
  else {
    var Dark=true;
  }

  const [dark,setdark]=useState(Dark);
  const [search,setsearch]=useState([]);
  const [user, setuser] = useState(localStorage.getItem("username"));
  const [show, setshow] = useState(false);
  const [active, setactive] = useState("");
  const list = useContext(Datacontext);
  const [notes,setnotes]=useState(list.Notes);
  const [archive,setarchive]=useState(list.Archive);
  const [bin,setbin]=useState(list.Bin);

  useEffect(() => {
    localStorage.setItem("Notes", JSON.stringify(notes));
    console.log('changed!')
  }, [notes]);
  useEffect(() => {
    localStorage.setItem("Archive", JSON.stringify(archive));
    console.log('changed!')
  }, [archive]);
  useEffect(() => {
    localStorage.setItem("Bin", JSON.stringify(bin));
    console.log('changed!')
  }, [bin]);
  useEffect(()=>{
    localStorage.setItem("Dark",dark)
    console.log(dark)
  },[dark])

  

  return (
    <>
      {user ? (
        <div className='fullscreen'>
        <Router> 
      
            <Navbar show={show} setshow={setshow} user={user} Notes={notes} setSearch={setsearch} dark={dark} setDark={setdark}/>
            <Search Search={search} dark={dark}/>
            <div className='maindiv'>
            <Sidebar show={show} activepage={active} dark={dark}/>
            <Redirect to="/" />
            <Switch>
              <Route path="/" exact component={()=><Notes setactive={setactive} show={show} Notes={notes} setNotes={setnotes} setArchive={setarchive} setBin={setbin} dark={dark}/>} />

              <Route path="/Archive" component={()=><Archive setactive={setactive} show={show} Archive={archive} setArchive={setarchive} setBin={setbin} setNotes={setnotes} dark={dark}/>} />

              <Route path="/Bin" component={()=><Bin setactive={setactive} show={show} Bin={bin} Notes={notes} setNotes={setnotes} setBin={setbin} dark={dark}/>} />

            </Switch>
            </div>
            <Bottom Notes={notes} setNotes={setnotes} dark={dark}/>
        
        </Router>
        </div>
      ) : (
        <Login set={setuser} state={user} />
      )}
    </>
  );
}

export default App;
