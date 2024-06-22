import React,{createContext} from "react";

export const Datacontext = createContext();

export const  Dataprovider=(props)=> {


  
  function checkempty(data) {
    let newdata;
    if (data) {
      newdata = JSON.parse(data); 
    }
    else{
      newdata = [];
    }
    return newdata;
  }

  var localnotes = localStorage.getItem("Notes");
  var localNotes = checkempty(localnotes);
  var localarchive = localStorage.getItem("Archive");
  var localArchive = checkempty(localarchive);
  var localbin = localStorage.getItem("Bin");
  var localBin = checkempty(localbin);
  console.log(localNotes)


  return (
      <Datacontext.Provider value={{Notes:localNotes,Archive:localArchive,Bin:localBin}}>
          {props.children}
      </Datacontext.Provider>
  );
}
