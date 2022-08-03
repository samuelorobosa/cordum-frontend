import './SearchBar.scss';
function SearchBar():JSX.Element{
    return (
        <>
            <input
                type="text"
                className="py-2 px-2 text-xl w-5/6 rounded shadow gkc__searchbar__input"
                placeholder={'Search'}
            />
        </>
    )
}

export default SearchBar;