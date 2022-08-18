import './Note.scss';
function Note({note}){
    return(
        <>
            <div className="gkc__note">
                <div
                    dangerouslySetInnerHTML={{__html: note.body.slice(0, 10) + '...'}}
                />

                <div className="gkc__noteLabels">
                    {
                        note?.labels.map(({id, name})=>{
                            return(
                                <span key={id}>
                                    {name}
                                </span>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Note;