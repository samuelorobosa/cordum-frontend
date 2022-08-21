import './OverviewBody.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown, faSpinner} from '@fortawesome/free-solid-svg-icons';
import RichTextEditor from "../RichTextEditor";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import {useEffect, useRef, useState} from "react";
import Modal from "../Modal";
import LabelModal from "../LabelModal";
import {useDeleteNotesMutation, useGetNotesQuery} from "../../../hooks";
import Note from "../Note/Note";

function OverviewBody() {
    const [open, setOpen] = useState(false);
    const [attachLabel, setAttachLabel] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const modalRef = useRef(null);
    const attachModalRef = useRef(null);

    const {data, isFetching} = useGetNotesQuery(['fetch__notes']);
    const {isLoading, mutate} = useDeleteNotesMutation(['delete__label']);

    const openModal = (note) => {
        let statePromise = new Promise(function(resolve) {
            resolve(setCurrentNote(note));
        });

      statePromise.then(() => {
          setOpen(true);
          document.querySelector('body').style.overflowY = 'hidden';
      })
    }
    const openAttachModal = (note) => {
        let statePromise = new Promise(function(resolve) {
            resolve(setCurrentNote(note));
        });

        statePromise.then(() => {
            setAttachLabel(true);
            document.querySelector('body').style.overflowY = 'hidden';
        })
    }
    let dropDownNodeList = document.querySelectorAll(`.dropdown__Content`);
    let dropDownArray = [...dropDownNodeList];
    const handleDropdownClick = (event, index, className) => {
        const currentDropdown = document.querySelector(`.${className + index}`);
            if(className === 'dropdown__Content'){
                dropDownArray.map(el =>{
                        if (el !== currentDropdown){
                            el.classList.remove('dropdown__Show');
                        }
                    }
                );
            }

        currentDropdown.classList.toggle('dropdown__Show');
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!modalRef.current.contains(event.target)) {
                setOpen(false);
                document.querySelector('body').style.overflowY = 'auto';
            }
            if (!attachModalRef.current.contains(event.target)) {
                setAttachLabel(false);
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
    return(
        <>
            <div className={`gkc__overViewBodyContainer`}>
                <div className="flex">
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
                                                    <Skeleton inline={true} height={200} count={4} containerClassName="gkc__skeletonContainer" />:
                                                    <>
                                                        {
                                                            data.data.notes > 0 ?
                                                                data?.data?.notes.map((note, idx)=>{
                                                                return(
                                                                    <div key={idx} className="flex relative">
                                                                        <div className="gkc__noteOptions">
                                                                            <div className="relative">
                                                                                <div onClick={event =>handleDropdownClick(event,idx, 'dropdown__Content')} className={`dropdown__Button`}>
                                                                                    <span>Actions</span> &nbsp; <FontAwesomeIcon icon={ faChevronDown}/>
                                                                                </div>
                                                                                <ul className={`dropdown__Content dropdown__Content${idx}`}>
                                                                                    <li onClick={()=>{openModal({id: note.id, body: note.body, labels:note.labels})}}>
                                                                                        View/Edit
                                                                                    </li>
                                                                                    <li onClick={()=>mutate(note.id)} className="flex items-center">
                                                                                        <span>Delete</span> &nbsp;
                                                                                        <FontAwesomeIcon icon={faSpinner} className={`spinner ${isLoading ? '' : 'hidden'}`}/>
                                                                                    </li>
                                                                                    <li onClick={()=>openAttachModal({id:note.id, labels:note.labels})} className="relative">
                                                                                        <span>Sync Labels</span>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <Note note={note}/>
                                                                    </div>
                                                                )
                                                            }) : <p className="placeholderText"> Your notes will appear here.</p>
                                                        }
                                                    </>
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
                <div className={`gkc__modalBackdrop ${attachLabel ? 'flex' : 'd-none'}`}>
                    <div ref={attachModalRef} className="gkc__modalContent">
                        {
                            currentNote !== null ?
                                <LabelModal note={currentNote}/>:
                                null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default OverviewBody;