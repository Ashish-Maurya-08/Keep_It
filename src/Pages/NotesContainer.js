import React, { useState,useEffect } from "react";
import "./NoteContainer.css";
import $ from "jquery";
import { RiDeleteBin4Line, RiInboxArchiveLine,RiInboxUnarchiveLine } from "react-icons/ri";
import { MdRestore  } from "react-icons/md";

function NotesContainer(props) {

    var opt='opt'+props.index;
    var optclass='';

    var optid='#'+opt;

    const showopt=()=>{
        $(optid).animate({
            opacity:'0.6'
        },200)
    }
    const hideopt=()=>{
        $(optid).animate({
            opacity:'0'
        },200)
    }


    function optionHandler(action){
      let val=$(optid).attr('data-id')
      if (action==='delete'){
        props.func_remove(val);
      }
      else if (action==='archive'){
        props.func_move(val)
      }
      else if (action==='restore'){
        props.func_restore(val)
      }
      else if (action==='unarchive'){
        props.func_unarch(val)
      }
    }

    if (props.active=='bin'){
      optclass='optbin'
    }
    else if (props.active==='notes'){
      optclass='optnotes'
    }
    else if (props.active==='archive'){
      optclass='optarchive'
    }
    else if (props.active==='search'){
      optclass='optsearch'
    }


    

  var hidetitle = false;
  var hidedesc = false;
  if (props.title === "") {
    hidetitle = true;
  }
  if (props.desc === "" || (props.desc).length==0 || props.desc=='\n'){
    hidedesc = true;
  }

  return (  
    <div className="container" onMouseEnter={showopt} onMouseLeave={hideopt}>
      <div className={hidetitle ? "hide" : "tit"} title='Title'>{props.title}</div>
      <div className={hidedesc ? "hide" : "desc"} title='Note'>{props.desc}</div>
      <div className={'opt '+optclass} id={opt} data-id={props.index}>
        <div onClick={()=>optionHandler('delete')} className='DeleteButton' title='Delete'>
          <RiDeleteBin4Line size="20" />
        </div>
        <div onClick={()=>optionHandler('archive')} className='ArchiveIn' title='Archive'>
          <RiInboxArchiveLine size="20" />
        </div>
        <div onClick={()=>optionHandler('unarchive')} className='ArchiveOut' title='Unarchive'>
          <RiInboxUnarchiveLine size="20" />
        </div>
        <div onClick={()=>optionHandler('restore')} className='Restore' title='Restore'>
          <MdRestore size="20" />
        </div>

      </div>
    </div>
  );
}

export default NotesContainer;
