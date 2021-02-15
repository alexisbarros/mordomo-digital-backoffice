import React from 'react';

// Modules
import { Card, Table, Tag, Space, Button, Breadcrumb, Modal } from 'antd';
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
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Ações',
            key: 'actions',
            width: 100,
            render: (text, record) => (
                
                <Space size="middle">
                    
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
            _createdAt: new Date(el._createdAt).toLocaleString('pt-BR'),
            key: el._id
        }
    });

    return(

        <div
            style={{
                height: '80vh',
                position: 'relative'
            }}
        >

            <div
                style={{
                    maxHeight: '100%',
                    overflow: 'auto'
                }}
            >

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
                        to='/home/room-market-itens/new'
                    >
                        <Button
                            type='primary'
                            style={{
                                marginBottom: 20,
                                marginTop: 20
                            }}
                        >
                            Adicionar
                        </Button>
                    </Link>
                    
                    <Table 
                        dataSource={dataSource} 
                        columns={columns} 
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