import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider } from 'antd';
import { Link } from 'react-router-dom';

// Style
import './FormStyle.css';

const FormView = (props) => {


    return (

        <div className='home-out-card'>

            <div className='home-in-card'>

                <Card
                    title='Cardápio - Opções'
                >

                    <Breadcrumb>

                        <Breadcrumb.Item>
                            <Link to='/home'>Início</Link>
                        </Breadcrumb.Item>

                        <Breadcrumb.Item>
                            <Link to='/home/menu-options'>Cardápio - Opções</Link>
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
                            label="Nome"
                            style={{ width: 500 }}
                        >
                            <Input
                                value={props.form.name}
                                onChange={e => props.setForm({ ...props.form, name: e.target.value })}
                            />
                        </Form.Item>

                    </Form>

                    <Divider />

                    <Button
                        type='primary'
                        disabled={!props.form.name}
                        onClick={() => props.save()}
                        loading={props.loadingSaveButton}
                    >
                        {props.idToUpdate ? 'Atualizar' : 'Salvar'}
                    </Button>

                </Card>

            </div>

        </div>

    )

}

export default FormView;