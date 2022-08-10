import SearchBar from "../SearchBar";
import './NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'

function NavBar(): JSX.Element|null{

    return (
        <nav className="gkc__navbarContainer">
            <div>
                <FontAwesomeIcon icon={faBarsStaggered} size="2x" className={'gkc__navbarIcon'} />
            </div>
            <div className="gkc__navbarBrand">
                <FontAwesomeIcon icon={faCampground} size="2x" className={'gkc__navbarIcon'} />
                &nbsp;
                <span>React Keep</span>
            </div>
            <div>
                <SearchBar/>
            </div>
        </nav>
    )

}

export default NavBar;