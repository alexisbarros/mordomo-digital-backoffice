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
    const [form, setForm] = useState({ email: '', usename: '', userType: '', verified: false });

    const [idToUpdate, setIdToUpdate] = useState(null);
    useEffect(() => {

        /**
         * Get data to update.
         */
        async function getDataToUpdate(id) {
            // Call API.
            let apiResponse = await fetch(`${env.api_url}/users/${id}`,
                {
                    headers: {
                        'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token'),
                    },
                    method: 'GET',
                });
            apiResponse = await apiResponse.json();

            // Check if response was successfuly
            if (apiResponse.code === 200) {

                setForm({
                    email: apiResponse.data['email'],
                    username: apiResponse.data['username'],
                    userType: apiResponse.data['userType'],
                    verified: apiResponse.data['verified'],
                })

            } else {

                message.error(apiResponse.message);

            }
        }

        /**
         * Check if update or create form
         */
        if (props.location.state) {
            setIdToUpdate(props.location.state.id)
            getDataToUpdate(props.location.state.id);
        }
    }, [props.location.state])

    /**
     * Save.
     */
    const [loadingSaveButton, setLoadingSaveButton] = useState(false);
    const save = async () => {

        setLoadingSaveButton(true);

        // Method
        let method = idToUpdate ? 'PUT' : 'POST';
        let endpoint = idToUpdate ? `${env.api_url}/users/${idToUpdate}` : `${env.api_url}/users`;

        // Call API.
        let apiResponse = await fetch(endpoint,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
                },
                method: method,
                body: JSON.stringify(form)
            });
        apiResponse = await apiResponse.json();

        // Check if response was successfuly
        if (apiResponse.code === 200) {

            message.success(
                idToUpdate ?
                    'Registro atualizado com sucesso' :
                    'Registro criado com sucesso'
            );
            setLoadingSaveButton(false);
            props.history.push('/home/users');

        } else {

            setLoadingSaveButton(false);
            message.error(apiResponse.message);

        }
    }

    return (

        <FormView
            idToUpdate={idToUpdate}

            form={form}
            setForm={form => setForm({ ...form })}

            save={() => save()}
            loadingSaveButton={loadingSaveButton}
        />

    )

}

export default FormContainer;