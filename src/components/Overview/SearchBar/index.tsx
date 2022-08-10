import './SearchBar.scss';
function SearchBar():JSX.Element{
    return (
        <>
            <input
                type="text"
                className="gkc__searchbarInput"
                placeholder={'Search'}
            />
        </>
    )
}

export default SearchBar;