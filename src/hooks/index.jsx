import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

export const useGetLabelsQuery = (query) => {
    const getLabelsEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/label`;
    const fetchLabels = () => {
        return axios.get(getLabelsEndpoint,{
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('gkc__auth')).access_token}`
            }
        })
    };
    const {isLoading, data} = useQuery(query, fetchLabels,{
        refetchOnWindowFocus: false,
        refetchOnMount: "always",
    });
    return {isLoading, data};
}


export const useGetNotesQuery = (query) => {
    const getNotesEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/note`;
    const fetchNotes = () => {
        return axios.get(getNotesEndpoint,{
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('gkc__auth')).access_token}`
            }
        })
    };
    const {isFetching, data} = useQuery(query, fetchNotes,{
        refetchOnWindowFocus: false,
        refetchOnMount: "always",
    });
    return {data, isFetching};
}


export const useDeleteNotesMutation = (query) => {
    const queryClient = useQueryClient();
    const{isLoading, mutate} = useMutation(['delete_notes'],(id) => {
        const deleteNoteEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/note/${id}`;
        return axios.delete(deleteNoteEndpoint, {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('gkc__auth')).access_token}`
            }
        })
    }, {
        onSuccess: () => queryClient.invalidateQueries(['fetch__notes'], {exact: true}),
    });

    return {isLoading, mutate};
}


export const useCreateLabelMutation = (query, newLabel, sideEffectError, sideEffectSuccess) => {
    let queryClient = useQueryClient();

    const createLabelEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/label`;

    const {isLoading, mutate} = useMutation(query, () => {
        return axios.post(createLabelEndpoint, {name: newLabel}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('gkc__auth')).access_token}`
            },
        });
    },{
        onError: ()=>{
            sideEffectError();
        },
        onSuccess: () => {
            sideEffectSuccess();
            queryClient.invalidateQueries(['fetch__labels'], {exact: true});
        }
    })

    return {isLoading, mutate};
}


export const useDeleteLabelMutation = (query, sideEffectError) => {
    let queryClient = useQueryClient();
    const {isLoading, mutate} = useMutation(query, (id) => {
        const deleteLabelEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/label/${id}`;

        return axios.delete(deleteLabelEndpoint, {
            headers: {
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('gkc__auth')).access_token}`
            },
        });
    },{
        onError: ()=>{
            sideEffectError();
        } ,
        onSuccess: () => {
            queryClient.invalidateQueries(['fetch__labels'], {exact: true});
            queryClient.invalidateQueries(['fetch__notes'], {exact: true});
        }
    })

    return {isLoading, mutate};
}


export const useSyncLabelsMutation  = (query, noteId, sideEffectError, sideEffectSuccess) => {
    const queryClient = useQueryClient();
    const {isLoading, mutate} = useMutation(query, ([...labels]) => {
        const syncLabelsEndpoint = `${process.env.REACT_APP_BACKEND_HOST}/api/note/sync/${noteId}`;
        return axios.post(syncLabelsEndpoint, {labels}, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('gkc__auth')).access_token}`
            },
        });
    },{
        onSuccess: () =>{
            sideEffectSuccess();
            queryClient.invalidateQueries(['fetch__notes'], {exact: true});
        },
        onError: () =>{
            sideEffectError();
        }
    })

    return {isLoading, mutate};
}