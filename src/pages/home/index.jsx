import {Helmet} from "react-helmet";
import logo from '../../assets/images/logo.png'
import {faRocket, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import applicationView from '../../assets/images/application-view.png'
import labelView from '../../assets/images/label-view.png'
import HomeStyles from './home.module.scss';
import Footer from "../../components/Overview/Footer";
import {Link} from "react-router-dom";

function Home(){
    const user = localStorage.getItem('gkc__auth');
    return(
        <>
            <Helmet>
                <title>Home | Cordum</title>
            </Helmet>
            <div className="tw-container tw-mx-auto">
                <nav className="tw-flex tw-items-center tw-justify-between tw-h-24">
                   <div className="tw-flex tw-items-center">
                       <img src={logo} className="tw-h-10" alt="Cordum Logo"/>
                       <span className="tw-text-2xl tw-font-extrabold tw-text-blue-600">Cordum</span>
                   </div>
                    <div className="tw-flex hidden sm:tw-block">
                        {user !== null ?
                            <Link to={'/overview'} className="tw-text-blue-600 tw-no-underline">Go to My Notes <FontAwesomeIcon icon={faArrowRight}/></Link> :
                            <>
                                <Link className="tw-text-center tw-inline-block tw-no-underline tw-cursor-pointer tw-font-bold tw-text-base tw-border-0 hover:tw-bg-gray-900 hover:tw-text-white tw-transition-all tw-bg-gray-200 tw-text-gray-800 tw-px-10 tw-rounded-lg tw-outline-0 tw-mx-2 tw-py-3" to={'/login'}>Login</Link>
                                <Link className="tw-text-center tw-inline-block tw-no-underline tw-cursor-pointer tw-font-bold tw-text-base tw-border-0 hover:tw-bg-blue-900 tw-transition-all tw-bg-blue-600 tw-text-white tw-px-10 tw-rounded-lg tw-outline-0 tw-mx-2 tw-py-3" to={'/register'}>Get Started</Link>
                            </>
                        }
                    </div>
                </nav>
                <main>
                    <section className="tw-text-center tw-mb-3.5">
                        <p className="tw-text-6xl tw-font-bold tw-text-gray-900 tw-w-full sm:tw-w-1/2 tw-mx-auto tw-text-center tw-my-10">Your notes application with a <span className="tw-text-blue-600">boost&nbsp;<FontAwesomeIcon icon={faRocket}/></span></p>
                        <p className="tw-text-base tw-text-gray-900 tw-full sm:tw-w-1/2 tw-mx-auto tw-text-center tw-my-10"><span className=""><span className="tw-text-blue-600 tw-font-black">Cordum</span> is a note application that brings the power of a document to you. Take notes, store them online and access them from anywhere.</span></p>
                        <Link className="tw-text-center tw-inline-block tw-no-underline tw-cursor-pointer tw-font-bold tw-text-base tw-border-0 hover:tw-bg-blue-900 tw-transition-all tw-bg-blue-600 tw-text-white tw-px-10 tw-rounded-lg tw-outline-0 tw-mx-2 tw-py-3" to={user !== null ? '/overview': '/register'}>Get Started</Link>
                    </section>

                    <section className={`${HomeStyles.gkc__section}`}>
                        <div className={`${HomeStyles.gkc__ImageContainer}`}><img src={applicationView} className="tw-block mt-2 lg:tw-mt-0 tw-mx-auto lg:tw-mr-auto" alt="applicationView"/></div>
                        <div>
                            <p className="tw-font-medium tw-text-3xl tw-my-10">01. Start taking notes in rich-text format.</p>
                            <p className="tw-text-base tw-my-10">Want to take your notes in a format that's easy to read? <span className="tw-text-blue-600">Cordum</span> makes it easy to do that.</p>
                            <Link to={user !== null ? '/overview': '/register'} className="tw-text-blue-600 tw-no-underline">Get Started <FontAwesomeIcon icon={faArrowRight}/></Link>
                        </div>
                    </section>

                    <section className={`${HomeStyles.gkc__section} tw-my-12`}>
                        <div>
                            <p className="tw-font-medium tw-text-3xl tw-my-10">02. Get past cluttered notes.</p>
                            <p className="tw-text-base tw-my-10"> De-clutter your notes by organizing them. Whether it's a shopping list or lecture note or a random idea or maybe you wan't to quickly summarize a document, <span className="tw-text-blue-600">Cordum</span> helps you do it all.</p>
                            <Link to={user !== null ? '/overview': '/register'} className="tw-text-blue-600 tw-no-underline">Get Started <FontAwesomeIcon icon={faArrowRight}/></Link>
                        </div>
                        <div className={`${HomeStyles.gkc__ImageContainer}`}><img src={labelView} className="tw-block tw-mx-auto mt-2 lg:tw-mt-0 lg:tw-ml-auto" alt="labelView"/></div>
                    </section>
                </main>
            </div>
            <section className="tw-bg-blue-600 tw-py-16 tw-text-center">
                <p className="tw-text-white tw-font-bold tw-text-4xl tw-my-10">Start using Cordum now.</p>
                <Link className="tw-text-center tw-inline-block tw-no-underline tw-cursor-pointer tw-font-bold  tw-text-base tw-border-0 hover:tw-bg-gray-200 tw-transition-all tw-bg-white tw-text-blue-900 tw-px-10 tw-rounded-lg tw-outline-0 tw-mx-2 tw-py-3" to={user !== null ? '/overview': '/register'}>Get Started</Link>
            </section>
            <footer className="tw-h-32 flex tw-flex-col tw-justify-center">
                <Footer/>
            </footer>
        </>
    )
}

export default Home;