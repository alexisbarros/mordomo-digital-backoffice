import React from 'react';

// Modules
import { Card, Table, Space, Button, Breadcrumb, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
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
            title: 'Sessão - Antigo',
            dataIndex: 'type',
            key: 'type',
            sorter: (a, b) =>
                (a.type.normalize('NFD').replace(/[\u0300-\u036f]/g, "") > b.type.normalize('NFD').replace(/[\u0300-\u036f]/g, "")) -
                (a.type.normalize('NFD').replace(/[\u0300-\u036f]/g, "") < b.type.normalize('NFD').replace(/[\u0300-\u036f]/g, "")),
        },
        {
            title: 'Sessão - Novo',
            dataIndex: 'group',
            key: 'group',
            render: (groupObj) => groupObj && groupObj.name
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 100,
            render: (text, record) => (

                <Space size="middle">

                    <Link
                        to={{
                            pathname: `/home/market-itens/update`,
                            state: {
                                id: record.key
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
            type: el.type,
            group: el.group,
            _createdAt: new Date(el._createdAt).toLocaleString('pt-BR'),
            key: el._id
        }
    });

    return (

        <div className='home-out-card'>

            <div className='home-in-card'>

                <Card
                    title='Itens de mercado'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            Itens de mercado
                        </Breadcrumb.Item>

                    </Breadcrumb>

                    <Link
                        to='/home/market-itens/new'
                    >
                        <Button type='primary' className='home-list-add-button'>
                            Adicionar
                        </Button>
                    </Link>

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