import './OverviewBody.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPencil, faBoxArchive, faTrashCan, faLightbulb, faTag} from '@fortawesome/free-solid-svg-icons';
import RichTextEditor from "../RichTextEditor";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

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

    return(
        <>
            <div className="flex">
                <div className="gkc__overViewBody__sidebar text-gray-500">
                    <ul>
                        <li><FontAwesomeIcon icon={faLightbulb}/> &nbsp; Notes</li>
                        <li><FontAwesomeIcon icon={faPencil}/> &nbsp; Edit Labels </li>
                        <li><FontAwesomeIcon icon={faTag}/> &nbsp; New Label </li>
                        <li><FontAwesomeIcon icon={faBoxArchive}/> &nbsp; Archive </li>
                        <li><FontAwesomeIcon icon={faTrashCan}/> &nbsp; Bin</li>
                    </ul>
                </div>
                <div className="gkc__overViewBody__notes ml-10 grow">
                    <div className="gkc__overViewBody__notes__form mt-10">
                       <div className="flex flex-col h-screen">
                           {/*Rich Text Editor*/}
                           <RichTextEditor/>
                           {/*Rich Text Editor*/}
                           <div className="gkc__overViewBody__notes__wrapper grow">
                               <div className="gkc__overViewBody__notes__wrapper__placeholder px-4 mt-20">
                                   <div className="grid grid-cols-[repeat(3,_1fr)] gap-2 align-top grow relative">
                                           {
                                               isFetching ?
                                               <Skeleton inline={true} height={200} count={9} containerClassName="gkc__skeletonContainer" /> :
                                               data?.data?.notes.map((note, idx)=>{
                                                   return(
                                                       <>
                                                           <div
                                                               dangerouslySetInnerHTML={{__html: note.body}}
                                                               className="cursor-pointer p-5  rounded-lg shadow shadow-gray-400 rounded-lg"
                                                               key={idx}
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
        </>
    )
}

export default OverviewBody;