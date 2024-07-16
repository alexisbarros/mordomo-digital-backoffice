import React, { useEffect, useState } from 'react';

// Modules
import { message } from 'antd';


// Components
import ListView from './ListView';
import { apiRequestGet } from '../../../utils/api-request';

const ListContainer = (props) => {
    /**
     * Get data.
     */
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [search, setSearch] = useState('');
    const [roomTypes, setRoomTypes] = useState([]);
    const getData = async () => {
        setLoading(true);

        // Call API
        const roomTasks = await apiRequestGet('/room-tasks');

        if (roomTasks) {

            // Call API to get all room types
            const roomTypesFound = await apiRequestGet('/room-types?withDisabled=true');
            if (roomTypesFound) {

                let roomTypes = roomTypesFound.map(el => {
                    return {
                        '_id': el['_id'],
                        'name': el['name'],
                        'tasks': el['tasks'].map(task => task['_id'])
                    }
                });
                setRoomTypes([...roomTypes]);

                setData([...roomTasks]);
                setFilteredData([...roomTasks]);
                setLoading(false);
            }

        } else {

            setLoading(false);

        }

    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        filterData(search);
    }, [search]);

    const filterData = (value) => {
        setSearch(value);

        if (value === '') {
            setFilteredData(data);
        } else {
            const filteredData = data.filter(el => {
                return el.name.toLowerCase().includes(value.toLowerCase());
            });
            setFilteredData(filteredData);
        }
    }

    /**
     * Method to remove.
     * @param {String} id
     */
    const removeData = async (id) => {

        // Call API
        let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/room-tasks/${id}`,
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
        if (apiResponse.code === 200) {

            getData()

        } else {

            message.error(apiResponse.message);

        }

    }

    return (

        <ListView

            loading={loading}
            data={filteredData}
            filterData={value => filterData(value)}
            search={search}
            removeData={id => removeData(id)}

            roomTypes={roomTypes}

        />

    )

}

export default ListContainer