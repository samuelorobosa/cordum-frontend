import './LabelModal.scss';
import {useGetLabelsQuery, useSyncLabelsMutation} from "../../../hooks";
import {useState} from "react";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";

export default function LabelModal({note}) {
    const syncLabelsSuccess = () => toast.success('Sync Successful');
    const syncLabelsError = () => toast.success('Sync Unsuccessful');
    const {isLoading: isLabelFetching, data} = useGetLabelsQuery(['fetch__labels']);
    const [activeLabels, setActiveLabels] = useState([]);
    const handleLabelSync = (e) => {
        if (e.target.checked) {
            setActiveLabels([...activeLabels, e.target.id]);
        } else if (!e.target.checked) {
            setActiveLabels(activeLabels.filter(label => label !== e.target.id));
        }
    }
    const {isLoading, mutate} = useSyncLabelsMutation(['sync_labels'], note.id, syncLabelsError, syncLabelsSuccess);
    const handleLabelSubmit = (e) => {
        e.preventDefault();

        //convert array to number array
        const labelIds = activeLabels.map(label => parseInt(label));
        mutate(labelIds);
    }
    return(
        <>

           <div className="gkc__labelModalContainer">
                <h3>Attach Labels</h3>
                <div className="gkc__labelModalList">
                    <form onSubmit={(e)=>handleLabelSubmit(e)}>
                        {
                            isLabelFetching ?
                                <div className="spinner"/> :
                                data?.data?.map((label, idx)=>{

                                    return(
                                        <div className="gkc__labelCheckboxContainer" key={idx}>
                                            <input
                                                defaultChecked={note.labels.some(noteLabel => noteLabel.id === label.id)}
                                                onChange={e =>handleLabelSync(e)}
                                                type="checkbox"
                                                name="label"
                                                id={label.id}/>
                                            <label htmlFor={label.id}>{label.name}</label>
                                        </div>
                                    )
                                })
                        }
                        <div className="gkc__labelModalSubmitButtonContainer">
                            <button type="submit" className="gkc__labelModalSubmitButton">
                                Sync Labels
                                <FontAwesomeIcon icon={faSpinner} className={`spinner ${isLoading ? '' : 'hidden'}`}/>
                            </button>
                        </div>
                    </form>
                </div>
           </div>
        </>
    )
}