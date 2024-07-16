import React from 'react';

// Modules
import { Card, Table, Space, Button, Breadcrumb, Modal, Input } from 'antd';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

// Styles
import './ListStyle.css';

const ListView = (props) => {

    // Columns of the table list
    const columns = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) =>
                (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "") > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) -
                (a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "") < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")),
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 100,
            render: (text, record) => (

                <Space size="middle">

                    <Link
                        to={{
                            pathname: `/home/room-tasks/update`,
                            state: {
                                id: record.key,
                                roomTypes: props.roomTypes,
                            }
                        }}
                    >Editar</Link>

                    <span
                        style={{
                            color: 'red',
                            cursor: 'pointer'
                        }}
                        onClick={() => {

                            Modal.confirm({
                                title: 'Tem certeza que deseja excluir esse registro?',
                                icon: <ExclamationCircleOutlined />,
                                content: 'Essa ação não poderá ser desfeita',
                                okText: 'Sim',
                                okType: 'danger',
                                cancelText: 'Não',
                                onOk() {
                                    props.removeData(record.key)
                                },
                            });

                        }}
                    >Deletar</span>
                </Space>

            ),
        },
    ];

    const dataSource = props.data.map(el => {
        return {
            ...el,
            name: el.name,
            _createdAt: new Date(el._createdAt).toLocaleString('pt-BR'),
            key: el._id,
        }
    });

    return (

        <div className='home-out-card'>

            <div className='home-in-card'>

                <Card
                    title='Tarefas'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            Tarefas
                        </Breadcrumb.Item>

                    </Breadcrumb>

                    <Link
                        to='/home/room-tasks/new'
                    >
                        <Button type='primary' className='home-list-add-button'>
                            Adicionar
                        </Button>
                    </Link>

                    <Input
                        placeholder='Pesquisar'
                        value={props.search}
                        onChange={(e) => props.filterData(e.target.value)}
                        style={{ marginBottom: 10 }}
                        prefix={<SearchOutlined />}
                    />

                    <Table
                        dataSource={dataSource}
                        columns={columns}
                        loading={props.loading}
                        locale={{
                            emptyText: 'Sem registros'
                        }}
                    />
                </Card>

            </div>

        </div>

    )

}

export default ListView;