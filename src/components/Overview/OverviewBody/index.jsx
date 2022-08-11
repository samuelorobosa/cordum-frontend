import './OverviewBody.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan, faTag} from '@fortawesome/free-solid-svg-icons';
import RichTextEditor from "../RichTextEditor";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import RichTextEditorModal from "../RichTextEditorModal";

function OverviewBody(){
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

    const openEditModal = (note) => {
      console.log(note);

    }
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
                                                       <>
                                                           <div
                                                               dangerouslySetInnerHTML={{__html: note.body}}
                                                               className="gkc__note"
                                                               key={idx}
                                                               onClick={()=>{openEditModal(note.body)}}
                                                           />
                                                       </>
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
            <div className="modal__backdrop">
                    <RichTextEditorModal/>
            </div>
        </>
    )
}

export default OverviewBody;