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
    const [ form, setForm ] = useState({ name: '', icon: '', tasks: [], iconThumb: '' });

    const [ idToUpdate, setIdToUpdate ] = useState(null);
    useEffect(() => {
        
        /**
         * Get data to update.
         */
        async function getDataToUpdate(id) {
            // Call API.
            let apiResponse = await fetch(`${env.api_url}/room-types/${id}`, 
            { 
                headers: {
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                },
                method: 'GET',
            });
            apiResponse = await apiResponse.json();
    
            // Check if response was successfuly
            if(apiResponse.code === 200){

                await getTasks();
                
                setForm({
                    name: apiResponse.data['name'],
                    icon: apiResponse.data['icon'],
                    tasks: apiResponse.data['tasks'].map(el => el._id),
                    iconThumb: `data:image/png;base64,${arrayBufferToBase64(apiResponse.data['icon'].data.data)}`
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
            getTasks();
        }
    }, [props.location.state])
    
    /**
     * Get tasks.
     */
    const [ tasks, setTasks ] = useState([]);
    const getTasks = async () => {
        
        // Call API
        let apiResponse = await fetch(`${env.api_url}/room-tasks`, 
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
            
            setTasks([...apiResponse.data]);
            
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
        let endpoint = idToUpdate ? `${env.api_url}/room-types/${idToUpdate}` : `${env.api_url}/room-types`;

        // Changing the name of the image
        let imageWithNewName = null;
        let icon = form.icon;
        if(!icon['data']){
            let blob = icon.slice(0, icon.size, icon.type); 
            imageWithNewName = new File([blob], `${form.name}`, { type: icon.type });
        }
        
        // Create form to save.
        let Form = new FormData();
        Form.append('name', form.name);
        Form.append('image', imageWithNewName);
        Form.append('tasks', JSON.stringify(form.tasks));
        
        // Call API.
        let apiResponse = await fetch(endpoint, 
        { 
            headers: {
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
            },
            method: method,
            body: Form
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
            props.history.push('/home/room-types');
            
        } else {
            
            setLoadingSaveButton(false);
            message.error(apiResponse.message);
            
        }
    }

    /**
     * Transform buffer to base64 to render a image from mongodb
     * @param {*} buffer 
     */
    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    }

    return(

        <FormView
            idToUpdate={idToUpdate}

            tasks={tasks}
            
            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;