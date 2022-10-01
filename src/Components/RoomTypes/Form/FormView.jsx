import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider, Select, Spin, Switch } from 'antd';
import { Link } from 'react-router-dom';

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
                        title='Tipo de cômodo'
                    >

                        <Breadcrumb>

                            <Breadcrumb.Item>
                                <Link to='/home'>Início</Link>
                            </Breadcrumb.Item>

                            <Breadcrumb.Item>
                                <Link to='/home/room-types'>Tipos de cômodos</Link>
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

                            <Form.Item
                                label="Tarefas"
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Escolha..."
                                    value={props.form.tasks}
                                    onChange={e => props.setForm({ ...props.form, tasks: e })}
                                >
                                    {
                                        props.tasks.map((el, i) => {
                                            return (
                                                <Select.Option key={i} value={el._id}>
                                                    {el.name}
                                                </Select.Option>
                                            )
                                        })
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label='Exclusivo para usuários premium?'
                            >
                                <Switch
                                    checked={props.form.isAPremiumRoomType}
                                    onChange={e => props.setForm({ ...props.form, isAPremiumRoomType: e })}
                                />
                            </Form.Item>

                        </Form>

                        <Divider />

                        <Button
                            type='primary'
                            disabled={
                                !props.form.name
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