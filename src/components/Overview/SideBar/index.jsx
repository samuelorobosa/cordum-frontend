import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import
{faBarsStaggered,
    faArrowRightFromBracket,
    faCampground,
    faPlus,
    faSpinner,
    faTrashCan} from "@fortawesome/free-solid-svg-icons";
import './Sidebar.scss';
import {useState} from "react";
import {toast} from "react-toastify";
import Skeleton from "react-loading-skeleton";
import {useCreateLabelMutation, useDeleteLabelMutation, useGetLabelsQuery} from "../../../hooks";

function SideBar({handleSideBar, open}) {
    const [newLabel, setNewLabel] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const handleNewLabelSubmit = () => {
        if (newLabel.length > 0) {
            mutate(newLabel)
        }
    }
    const createLabelSuccess = () =>  setNewLabel('');
    const createLabelError = () =>  toast.error('Something went wrong in creating the label.');
    const deleteLabelError = () =>  toast.error('Something went wrong in deleting the label.');
    const {isLoading: isLabelFetching, data} = useGetLabelsQuery(['fetch__labels']);
    const {isLoading: isLabelSubmitting, mutate} = useCreateLabelMutation(['submit__labels'], newLabel, createLabelError, createLabelSuccess);
    const {isLoading: isLabelDeleting, mutate:deleteMutate} = useDeleteLabelMutation(['delete__label'], deleteLabelError);
    const handleLogout = () => {
        setIsLoggingOut(true);
        localStorage.removeItem('gkc__auth');
        if(window.localStorage.getItem('gkc__auth') === null) {
            setIsLoggingOut(false);
            window.location.href = '/';
        }
    }


  return (
          <>
              <nav className="gkc__navbarContainer">
                  <div className="gkc__sideBarToggle">
                      <FontAwesomeIcon onClick={handleSideBar} icon={faBarsStaggered} size="2x" className={'gkc__navbarIcon'} />
                  </div>
                  <header className="gkc__navbarBrand">
                      &nbsp;
                      <span>Cordum</span>
                  </header>
                  <div onClick={()=>handleLogout()} className="gkc__logout">
                      <FontAwesomeIcon icon={faArrowRightFromBracket} size="1x" />
                      &nbsp;
                      <span>Logout</span>
                      <FontAwesomeIcon icon={faSpinner} size="1x" className={`${isLoggingOut ? '' : 'hidden'}`} />
                  </div>
              </nav>
              <div className={`gkc__overViewBodySidebar ${open ? 'open' : ''}`}>
                  <ul className="gkc__overViewBodySidebarItems">
                      <div className="gkc__newLabelContainer relative">
                          {
                                isLabelSubmitting ?
                                <FontAwesomeIcon icon={faSpinner} className="spinner"/>:
                                <FontAwesomeIcon onClick={()=> handleNewLabelSubmit} icon={faPlus} className="gkc__newLabelContainerIcon"/>
                          }

                            <input
                                onBlur={handleNewLabelSubmit}
                                value={newLabel}
                                onChange={(e) => setNewLabel(e.target.value)}
                                className="gkc__newLabelInput" type="text"
                                placeholder="Add a New Label"/>
                      </div>
                      {isLabelFetching ? <Skeleton count={5}/> : data.data?.map((label, idx) => {
                          return (
                              <li key={idx} className="gkc__overViewBodySidebarItem">
                                  <div>{label.name}</div>
                                  {
                                      isLabelDeleting ?
                                          <FontAwesomeIcon icon={faSpinner} className="spinner"/> :
                                          <div onClick={()=>deleteMutate(label.id)} className="gkc__overViewBodySidebarItemIcon">
                                              <FontAwesomeIcon icon={faTrashCan} className="gkc__overViewBodySidebarItemIcon"/>
                                          </div>
                                  }

                              </li>
                          )
                      })}
                  </ul>
              </div>
          </>
  )
}

export default SideBar;