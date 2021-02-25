import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';

// Components
import FormView from './FormView';

const FormContainer = (props) => {
    
    props = props.parent_props;

    /**
     * Set form.
     */
    const [ form, setForm ] = useState({ name: '', options: [] });

    const [ idToUpdate, setIdToUpdate ] = useState(null);
    useEffect(() => {
        
        /**
         * Get data to update.
         */
        async function getDataToUpdate(id) {
            // Call API.
            let apiResponse = await fetch(`${env.api_url}/menu-groups/${id}`, 
            { 
                headers: {
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                },
                method: 'GET',
            });
            apiResponse = await apiResponse.json();
    
            // Check if response was successfuly
            if(apiResponse.code === 200){

                await getOptions();
                
                setForm({
                    name: apiResponse.data['name'],
                    options: apiResponse.data['options'].map(el => el._id),
                })
                
            } else {
                
                message.error(apiResponse.message);
                
            }
        }

        /**
         * Check if update or create form
         */
        if(props.location.state){
            setIdToUpdate(props.location.state.id)
            getDataToUpdate(props.location.state.id);
        } else {
            getOptions();
        }
    }, [props.location.state])
    
    /**
     * Get tasks.
     */
    const [ options, setOptions ] = useState([]);
    const getOptions = async () => {
        
        // Call API
        let apiResponse = await fetch(`${env.api_url}/menu-options`, 
        { 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
            },
            method: 'GET',
        });
        apiResponse = await apiResponse.json();

        // Check if response was successfuly
        if(apiResponse.code === 200){
            
            setOptions([...apiResponse.data]);
            
        } else {
            
            message.error(apiResponse.message);
            
        }
        
    };

    /**
     * Save.
     */
    const [ loadingSaveButton, setLoadingSaveButton ] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true);

        // Method
        let method = idToUpdate ? 'PUT' : 'POST';
        let endpoint = idToUpdate ? `${env.api_url}/menu-groups/${idToUpdate}` : `${env.api_url}/menu-groups`;
        
        // Call API.
        let apiResponse = await fetch(endpoint, 
        { 
            headers: {
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: method,
            body: JSON.stringify(form)
        });
        apiResponse = await apiResponse.json();

        // Check if response was successfuly
        if(apiResponse.code === 200){

            message.success(
                idToUpdate ?
                    'Registro atualizado com sucesso' :
                    'Registro criado com sucesso'
            );
            setLoadingSaveButton(false);
            props.history.push('/home/menu-groups');
            
        } else {
            
            setLoadingSaveButton(false);
            message.error(apiResponse.message);
            
        }
    }

    return(

        <FormView
            idToUpdate={idToUpdate}

            options={options}
            
            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;