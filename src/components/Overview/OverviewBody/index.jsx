import './OverviewBody.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan, faTag, faChevronDown, faSpinner} from '@fortawesome/free-solid-svg-icons';
import RichTextEditor from "../RichTextEditor";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import {useEffect, useRef, useState} from "react";
import Modal from "../Modal";

function OverviewBody(){
    const [open, setOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!modalRef.current.contains(event.target)) {
                setOpen(false);
                document.querySelector('body').style.overflowY = 'auto';
            }

            if (!event.target.matches('.dropdown__Button') && !event.target.matches('.dropdown__Button *')) {
                if(!event.target.matches('.dropdown__Content') && !event.target.matches('.dropdown__Content *')){
                    let tempdropDownNodeList = document.querySelectorAll(`.dropdown__Content`);
                    let tempdropDownArray = [...tempdropDownNodeList];
                    tempdropDownArray.map(el => {
                        el.classList.remove('dropdown__Show')
                    });
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    } , []);
    const queryClient = useQueryClient();
    const modalRef = useRef(null);
    const getNotesEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/note/`;
    const fetchNotes = () => {
         return axios.get(getNotesEndpoint,{
             headers: {
                 'Accept': 'application/json',
                 'Access-Control-Allow-Origin': 'http://localhost:3000/',
                 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('gkc__auth')).access_token}`
             }
         })
    };
    const {data, isFetching} = useQuery(['fetch__notes'], fetchNotes, {
        refetchOnWindowFocus: false,
        refetchOnMount: "always",
    });
    const openModal = (note) => {
        let statePromise = new Promise(function(resolve) {
            resolve(setCurrentNote(note));
        });

      statePromise.then(() => {
          setOpen(true);
          document.querySelector('body').style.overflowY = 'hidden';
      })
    }
    let dropDownNodeList = document.querySelectorAll(`.dropdown__Content`);
    let dropDownArray = [...dropDownNodeList];
    const handleDropdownClick = (event, index) => {
        const currentDropdown = document.querySelector(`.dropdown__Content${index}`);
        dropDownArray.map(el =>{
                if (el !== currentDropdown){
                    el.classList.remove('dropdown__Show');
                }
            }
        );
        currentDropdown.classList.toggle('dropdown__Show');
    }
    const{isLoading, mutate} = useMutation(['delete_notes'],(id) => {
        const deleteNoteEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/note/${id}`;
        return axios.delete(deleteNoteEndpoint, {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000/',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('gkc__auth')).access_token}`
            }
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries(['fetch__notes'], {exact: true}),
    });
    return(
        <>
            <div className="flex">
                <div className="gkc__overViewBodySidebar">
                    <ul className="gkc__overViewBodySidebarItems">
                        <li><FontAwesomeIcon icon={faTag}/> &nbsp; <span>New Label</span> </li>
                        <li><FontAwesomeIcon icon={faTrashCan}/> &nbsp; <span>Bin</span></li>
                    </ul>
                </div>
                <div className="gkc__overViewBodyNotes">
                    <div className="gkc__overViewBodyNotesForm">
                       <div className="gkc__richTextEditorWrapper">
                           {/*Rich Text Editor*/}
                           <RichTextEditor/>
                           {/*Rich Text Editor*/}
                           <div className="gkc__overViewBodyNotesContent">
                               <div className="gkc__overViewBodyNotesContentPlaceholder">
                                   <div className="gkc__overViewBodyNotesContentPlaceholder__inner">
                                           {
                                               isFetching ?
                                               <Skeleton inline={true} height={200} count={9} containerClassName="gkc__skeletonContainer" /> :
                                               data?.data?.notes.map((note, idx)=>{
                                                   return(
                                                           <div key={idx} className="flex relative">
                                                               <div className="gkc__noteOptions">
                                                                   <div className="relative">
                                                                       <div onClick={event =>handleDropdownClick(event,idx)} className={`dropdown__Button`}>
                                                                           <span>Actions</span> &nbsp; <FontAwesomeIcon icon={ faChevronDown}/>
                                                                       </div>
                                                                        <ul className={`dropdown__Content dropdown__Content${idx}`}>
                                                                            <li onClick={()=>mutate(note.id)} className="flex items-center">
                                                                                <span>Delete</span> &nbsp;
                                                                                <FontAwesomeIcon icon={faSpinner} className={`spinner ${isLoading ? '' : 'hidden'}`}/>
                                                                            </li>
                                                                            <li>Attach Labels</li>
                                                                        </ul>
                                                                   </div>
                                                               </div>
                                                               <div
                                                                   dangerouslySetInnerHTML={{__html: note.body}}
                                                                   className="gkc__note"
                                                                   onClick={()=>{openModal({id: note.id, body: note.body})}}
                                                               />
                                                           </div>
                                                   )
                                               })
                                           }
                                   </div>
                               </div>
                           </div>
                       </div>
                    </div>
                </div>
            </div>
            <div className={`gkc__modalBackdrop ${open ? 'flex' : 'd-none'}`}>
                <div ref={modalRef} className="gkc__modalContent">
                    {
                        currentNote !== null ?
                        <Modal note={currentNote}/>:
                        null
                    }
                </div>
            </div>
        </>
    )
}

export default OverviewBody;