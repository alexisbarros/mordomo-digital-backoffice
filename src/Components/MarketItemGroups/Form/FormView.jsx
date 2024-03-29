import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider, Spin, Switch } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

// Style
import './FormStyle.css';

const FormView = (props) => {


    return (

        <div className='home-out-card'>

            <Spin spinning={props.loadingScreen}>

                <div
                    style={{
                        maxHeight: '100%',
                        overflow: 'auto'
                    }}
                >

                    <Card
                        title='Grupos de itens'
                    >

                        <Breadcrumb>

                            <Breadcrumb.Item>
                                <Link to='/home'>Início</Link>
                            </Breadcrumb.Item>

                            <Breadcrumb.Item>
                                <Link to='/home/market-item-groups'>Grupos de itens</Link>
                            </Breadcrumb.Item>

                            <Breadcrumb.Item>
                                {props.idToUpdate ? 'Editar' : 'Novo'}
                            </Breadcrumb.Item>

                        </Breadcrumb>

                        <Form
                            style={{ marginTop: 40 }}
                            layout='vertical'
                        >

                            <Form.Item
                                label="Ícone"
                            >

                                <Button
                                    icon={<UploadOutlined />}
                                    onClick={() => document.getElementById('market-item-groups-img-file').click()}
                                    style={{ marginBottom: '10px' }}
                                >
                                    Enviar icone
                                </Button><br />

                                {
                                    props.form.icon ?
                                        <Card
                                            style={{
                                                color: '#6495ED',
                                                fontSize: 12
                                            }}
                                        >
                                            <img
                                                alt='thumb'
                                                id='market-item-groups-img-file-thumb'
                                                style={{
                                                    height: 50,
                                                    marginRight: 10
                                                }}
                                                src={props.form.iconThumb}
                                            />

                                            <div
                                                style={{
                                                    float: 'right',
                                                    lineHeight: 5
                                                }}
                                            >
                                                <DeleteOutlined
                                                    style={{
                                                        color: 'red',
                                                        cursor: 'pointer',
                                                        fontSize: 14,
                                                    }}
                                                    onClick={() => props.setForm({ ...props.form, icon: '' })}
                                                />
                                            </div>
                                        </Card> : null
                                }

                                <input
                                    type='file'
                                    id='market-item-groups-img-file'
                                    style={{ display: 'none' }}
                                    accept='image/x-png'
                                    onChange={e => {
                                        let filesArray = e.target.files;
                                        let file = filesArray[filesArray.length - 1];

                                        // Set thumbnail
                                        var fileReader = new FileReader();
                                        fileReader.readAsDataURL(file);
                                        fileReader.onload = function (oFREvent) {
                                            props.setForm({ ...props.form, icon: file, iconThumb: oFREvent.target.result });
                                        };
                                    }}
                                />

                            </Form.Item>


                            <Form.Item
                                label="Nome"
                                style={{ width: 500 }}
                            >
                                <Input
                                    value={props.form.name}
                                    onChange={e => props.setForm({ ...props.form, name: e.target.value })}
                                />
                            </Form.Item>

                            <Form.Item
                                label='Exclusivo para usuários premium?'
                            >
                                <Switch
                                    checked={props.form.isAPremiumMarketItemGroup}
                                    onChange={e => props.setForm({ ...props.form, isAPremiumMarketItemGroup: e })}
                                />
                            </Form.Item>

                        </Form>

                        <Divider />

                        <Button
                            type='primary'
                            disabled={
                                !props.form.name || !props.form.icon
                            }
                            onClick={() => props.save()}
                            loading={props.loadingSaveButton}
                        >
                            {props.idToUpdate ? 'Atualizar' : 'Salvar'}
                        </Button>

                    </Card>

                </div>

            </Spin>

        </div>

    )

}

export default FormView;