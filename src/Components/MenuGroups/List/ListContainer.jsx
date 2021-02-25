import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';
import env from '../../../env.json';

// Components
import ListView from './ListView';

const ListContainer = (props) => {

    /**
     * Get data.
     */
    const [ data, setData ] = useState([]);
    const getData = async () => {
        
        // Call API
        let apiResponse = await fetch(`${env.api_url}/menu-groups`, 
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
            
            setData([...apiResponse.data]);
            
        } else {
            
            message.error(apiResponse.message);
            
        }
        
    };
    
    useEffect(() => {
        
        getData();
        
    }, []);
    
    /**
     * Method to remove.
     * @param {String} id
     */
    const removeData = async (id) => {
        
        // Call API
        let apiResponse = await fetch(`${env.api_url}/menu-groups/${id}`, 
        { 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'access_token': sessionStorage.getItem('access_token') || localStorage.getItem('access_token')
            },
            method: 'DELETE',
        });
        apiResponse = await apiResponse.json();
    
        // Check if response was successfuly
        if(apiResponse.code === 200){
            
            getData()
            
        } else {
            
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

        <ListView

            data={data}
            removeData={id => removeData(id)}

            arrayBufferToBase64={buffer => arrayBufferToBase64(buffer)}

        />

    )

}

export default ListContainer