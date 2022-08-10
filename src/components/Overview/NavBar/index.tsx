import SearchBar from "../SearchBar";
import './NavBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCampground, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'

function NavBar(): JSX.Element|null{

    return (
        <nav className="border-b-2 py-5 px-4 grid gkc__navbar__container">
            <div>
                <FontAwesomeIcon icon={faBarsStaggered} size="2x" className={'gkc__navbar__icon'} />
            </div>
            <div className="flex items-center">
                <FontAwesomeIcon icon={faCampground} size="2x" className={'gkc__navbar__icon'} />
                &nbsp;
                <span className="text-2xl text-gray-400 font-bold">React Keep</span>
            </div>
            <div>
                <SearchBar/>
            </div>
        </nav>
    )

}

export default NavBar;