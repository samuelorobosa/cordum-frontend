import './OverviewBody.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPencil,
    faBoxArchive,
    faTrashCan,
    faLightbulb,
    faTag,
    faCampground
} from '@fortawesome/free-solid-svg-icons';
import RichTextEditor from "../RichTextEditor";

function OverviewBody(){
    return(
        <>
            <div className="flex">
                <div className="gkc__overViewBody__sidebar text-gray-500">
                    <ul>
                        <li><FontAwesomeIcon icon={faLightbulb}/> &nbsp; Notes</li>
                        <li><FontAwesomeIcon icon={faPencil}/> &nbsp; Edit Labels </li>
                        <li><FontAwesomeIcon icon={faTag}/> &nbsp; New Label </li>
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
                           <div className="gkc__overViewBody__notes__wrapper mx-auto grow">
                               <div className="gkc__overViewBody__notes__wrapper__placeholder flex flex-col justify-center items-center mt-20">
                                   <FontAwesomeIcon icon={faCampground} size="4x" className={'gkc__navbar__icon mb-2'} />
                                   <p className={'text-gray-500 text-2xl font-bold grow align-top'}> Notes that you make appear here.</p>
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