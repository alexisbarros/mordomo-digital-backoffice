import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider, Select, Switch, Tabs, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { MinusCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

// Style
import './FormStyle.css';

const FormView = (props) => {

    const getRoomTypeFrequency = (roomType) => {
        const roomTypeFound = props.form.defaultFrequency.find(el => el.roomType === roomType.roomId)
        return roomTypeFound && roomTypeFound.frequency
    }


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
                            <Link to='/home/room-tasks'>Tarefas</Link>
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
                            label="Descrição"
                            style={{ width: 500 }}
                        >
                            <Input
                                value={props.form.description}
                                onChange={e => props.setForm({ ...props.form, description: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label="URL do vídeo"
                            style={{ width: 500 }}
                        >
                            <Input
                                value={props.form.videoUrl}
                                onChange={e => props.setForm({ ...props.form, videoUrl: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Necessita de contratação?'
                        >
                            <Switch
                                checked={props.form.needToHireLabor}
                                onChange={e => props.setForm({ ...props.form, needToHireLabor: e })}
                            />
                        </Form.Item>

                        <Form.Item
                            label='Destinatário da notificação'
                            style={{ width: 500 }}
                        >
                            <Select
                                value={props.form.notificationRecipient}
                                onChange={e => props.setForm({ ...props.form, notificationRecipient: e })}
                            >
                                <Select.Option value="Manager">Gestor</Select.Option>
                                <Select.Option value="Employee">Funcionário</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Passos"
                            style={{ width: 500, float: 'left' }}
                        >
                            <Input
                                value={props.stepToAdd}
                                onChange={e => props.setStepToAdd(e.target.value)}
                            />
                        </Form.Item>

                        <Button
                            type='primary'
                            style={{ float: 'left', marginTop: '30px', marginLeft: '10px' }}
                            onClick={() => {
                                let steps = props.form.steps;
                                steps.push(props.stepToAdd);
                                props.setForm({ ...props.form, steps })
                                props.setStepToAdd(null);
                            }}
                        >
                            Adicionar Passo
                        </Button>

                        <div style={{ clear: 'both' }} />

                        <ul>
                            {
                                (props.form.steps ?? []).map((step, i) => {
                                    return (
                                        <li>
                                            {step}
                                            <MinusCircleOutlined
                                                style={{ color: 'red', cursor: 'pointer', marginLeft: '10px' }}
                                                onClick={() => {

                                                    Modal.confirm({
                                                        title: 'Tem certeza que deseja excluir esse passo?',
                                                        icon: <ExclamationCircleOutlined />,
                                                        content: 'Essa ação não poderá ser desfeita',
                                                        okText: 'Sim',
                                                        okType: 'danger',
                                                        cancelText: 'Não',
                                                        onOk() {
                                                            let steps = [...props.form.steps];
                                                            steps.splice(i, 1);
                                                            props.setForm({ ...props.form, steps })
                                                        },
                                                    });

                                                }}
                                            />
                                        </li>
                                    )
                                })
                            }
                        </ul>

                        {
                            props.roomTypes ?
                                <div>
                                    <Tabs defaultActiveKey="1">
                                        {props.roomTypes.map((roomType, index) => {
                                            return (
                                                <Tabs.TabPane tab={roomType.roomName} key={index}>
                                                    <Form.Item
                                                        label={`Frequência | ${roomType.roomName}`}
                                                        style={{ width: 500 }}
                                                    >
                                                        <Select
                                                            value={getRoomTypeFrequency(roomType)}
                                                            style={{ width: 500 }}
                                                            onChange={e => {
                                                                let defaultFrequency = props.form.defaultFrequency;
                                                                defaultFrequency = defaultFrequency.map((el) => {
                                                                    if (el.roomType === roomType.roomId) {
                                                                        return { ...el, frequency: e };
                                                                    }
                                                                    return el;
                                                                })
                                                                props.setForm({ ...props.form, defaultFrequency: defaultFrequency });
                                                            }}
                                                        >
                                                            <Select.Option value="Daily">Diária</Select.Option>
                                                            <Select.Option value="Weekly">Semanal</Select.Option>
                                                            <Select.Option value="WeekInMonth">Mensal - Dia e Semana</Select.Option>
                                                            <Select.Option value="Quarterly">Trimestral</Select.Option>
                                                            <Select.Option value="Yearly">Semestral</Select.Option>
                                                        </Select>
                                                    </Form.Item>

                                                    {
                                                        getRoomTypeFrequency(roomType) === 'Weekly' ?
                                                            <Form.Item
                                                                label="Dias da semana"
                                                                style={{ width: 500 }}
                                                            >
                                                                <Select
                                                                    style={{ width: 500 }}
                                                                    onChange={e => {
                                                                        let defaultFrequency = props.form.defaultFrequency;
                                                                        defaultFrequency = defaultFrequency.map((el) => {
                                                                            if (el.roomType === roomType.roomId) {
                                                                                return { ...el, weekdays: e };
                                                                            }
                                                                            return el;
                                                                        })
                                                                        props.setForm({ ...props.form, defaultFrequency: defaultFrequency });
                                                                    }}
                                                                    mode="multiple"
                                                                    value={
                                                                        props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                                        props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).weekdays
                                                                    }
                                                                >
                                                                    <Select.Option value="1">Segunda-feira</Select.Option>
                                                                    <Select.Option value="2">Terça-feira</Select.Option>
                                                                    <Select.Option value="3">Quarta-feira</Select.Option>
                                                                    <Select.Option value="4">Quinta-feira</Select.Option>
                                                                    <Select.Option value="5">Sexta-feira</Select.Option>
                                                                    <Select.Option value="6">Sábado</Select.Option>
                                                                    <Select.Option value="7">Domingo</Select.Option>
                                                                </Select>
                                                            </Form.Item> : null
                                                    }

                                                    {
                                                        getRoomTypeFrequency(roomType) === 'Monthly' ?
                                                            <Form.Item
                                                                label="Dia do mês"
                                                                style={{ width: 100 }}
                                                            >
                                                                <Select
                                                                    style={{ width: 100 }}
                                                                    onChange={e => {
                                                                        let defaultFrequency = props.form.defaultFrequency;
                                                                        defaultFrequency = defaultFrequency.map((el) => {
                                                                            if (el.roomType === roomType.roomId) {
                                                                                return { ...el, day: e };
                                                                            }
                                                                            return el;
                                                                        })
                                                                        props.setForm({ ...props.form, defaultFrequency: defaultFrequency });
                                                                    }}
                                                                    value={
                                                                        props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                                        props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).day
                                                                    }
                                                                >
                                                                    {new Array(30).fill('day').map((el, i) => {
                                                                        return (
                                                                            <Select.Option value={(i + 1).toString()}>{(i + 1).toString()}</Select.Option>
                                                                        )
                                                                    })}
                                                                </Select>
                                                            </Form.Item> : null
                                                    }

                                                    {
                                                        getRoomTypeFrequency(roomType) === 'WeekInMonth' ||
                                                            getRoomTypeFrequency(roomType) === 'Quarterly' ||
                                                            getRoomTypeFrequency(roomType) === 'Yearly'
                                                            ?
                                                            <div>
                                                                <Form.Item
                                                                    label="Dias da semana"
                                                                    style={{ width: 500 }}
                                                                >
                                                                    <Select
                                                                        style={{ width: 500 }}
                                                                        onChange={e => {
                                                                            let defaultFrequency = props.form.defaultFrequency;
                                                                            defaultFrequency = defaultFrequency.map((el) => {
                                                                                if (el.roomType === roomType.roomId) {
                                                                                    return { ...el, weekdays: e };
                                                                                }
                                                                                return el;
                                                                            })
                                                                            props.setForm({ ...props.form, defaultFrequency: defaultFrequency });
                                                                        }}
                                                                        mode="multiple"
                                                                        value={
                                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).weekdays
                                                                        }
                                                                    >
                                                                        <Select.Option value="1">Segunda-feira</Select.Option>
                                                                        <Select.Option value="2">Terça-feira</Select.Option>
                                                                        <Select.Option value="3">Quarta-feira</Select.Option>
                                                                        <Select.Option value="4">Quinta-feira</Select.Option>
                                                                        <Select.Option value="5">Sexta-feira</Select.Option>
                                                                        <Select.Option value="6">Sábado</Select.Option>
                                                                        <Select.Option value="7">Domingo</Select.Option>
                                                                    </Select>
                                                                </Form.Item>

                                                                <Form.Item
                                                                    label="Semana do mês"
                                                                    style={{ width: 250 }}
                                                                >
                                                                    <Select
                                                                        style={{ width: 250 }}
                                                                        onChange={e => {
                                                                            let defaultFrequency = props.form.defaultFrequency;
                                                                            defaultFrequency = defaultFrequency.map((el) => {
                                                                                if (el.roomType === roomType.roomId) {
                                                                                    return { ...el, weekOfTheMonth: e };
                                                                                }
                                                                                return el;
                                                                            })
                                                                            props.setForm({ ...props.form, defaultFrequency: defaultFrequency });
                                                                        }}
                                                                        value={
                                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).weekOfTheMonth
                                                                        }
                                                                    >
                                                                        <Select.Option value="1">Primeira semana</Select.Option>
                                                                        <Select.Option value="2">Segunda semana</Select.Option>
                                                                        <Select.Option value="3">Terceira semana</Select.Option>
                                                                        <Select.Option value="4">Quarta semana</Select.Option>
                                                                    </Select>
                                                                </Form.Item>

                                                                {
                                                                    getRoomTypeFrequency(roomType) === 'Quarterly' ||
                                                                        getRoomTypeFrequency(roomType) === 'Yearly' ?
                                                                        <Form.Item
                                                                            label="Mês inicial"
                                                                            style={{ width: 100 }}
                                                                        >
                                                                            <Select
                                                                                style={{ width: 100 }}
                                                                                onChange={e => {
                                                                                    let defaultFrequency = props.form.defaultFrequency;
                                                                                    defaultFrequency = defaultFrequency.map((el) => {
                                                                                        if (el.roomType === roomType.roomId) {
                                                                                            return { ...el, startMonth: e };
                                                                                        }
                                                                                        return el;
                                                                                    })
                                                                                    props.setForm({ ...props.form, defaultFrequency: defaultFrequency });
                                                                                }}
                                                                                value={
                                                                                    props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                                                    props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).startMonth
                                                                                }
                                                                            >
                                                                                {new Array(12).fill('month').map((el, i) => {
                                                                                    return (
                                                                                        <Select.Option value={(i + 1).toString()}>{(i + 1).toString()}</Select.Option>
                                                                                    )
                                                                                })}
                                                                            </Select>
                                                                        </Form.Item> : null
                                                                }
                                                            </div>
                                                            : null
                                                    }

                                                    {/*
                                                        getRoomTypeFrequency(roomType) === 'Quarterly' ?
                                                            <Form.Item
                                                                label="Dia do mês"
                                                                style={{ width: 500 }}
                                                            >
                                                                <DatePicker
                                                                    format='DD/MM/YYYY'
                                                                    value={
                                                                        props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) ?
                                                                            moment(props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).date).isValid() ?
                                                                                moment(props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).date) : undefined
                                                                            : undefined
                                                                    }
                                                                    style={{ width: 500 }}
                                                                    onChange={(e, d) => {
                                                                        let defaultFrequency = props.form.defaultFrequency;
                                                                        defaultFrequency = defaultFrequency.map((el) => {
                                                                            if (el.roomType === roomType.roomId) {
                                                                                return { ...el, date: moment(e).format('MMMM DD, YYYY h:mm:ss a') };
                                                                            }
                                                                            return el;
                                                                        })
                                                                        props.setForm({ ...props.form, defaultFrequency: defaultFrequency });
                                                                    }}
                                                                />
                                                            </Form.Item> : null
                                                    */}

                                                    {/*
                                                        getRoomTypeFrequency(roomType) === 'Yearly' ?
                                                            <Form.Item
                                                                label="Dia do mês"
                                                                style={{ width: 500 }}
                                                            >
                                                                <DatePicker
                                                                    format='DD/MM/YYYY'
                                                                    value={
                                                                        props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) ?
                                                                            moment(props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).date).isValid() ?
                                                                                moment(props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).date) : undefined
                                                                            : undefined
                                                                    }
                                                                    style={{ width: 500 }}
                                                                    onChange={(e, d) => {
                                                                        let defaultFrequency = props.form.defaultFrequency;
                                                                        defaultFrequency = defaultFrequency.map((el) => {
                                                                            if (el.roomType === roomType.roomId) {
                                                                                return { ...el, date: moment(e).format('MMMM DD, YYYY h:mm:ss a') };
                                                                            }
                                                                            return el;
                                                                        })
                                                                        props.setForm({ ...props.form, defaultFrequency: defaultFrequency });
                                                                    }}
                                                                />
                                                            </Form.Item> : null
                                                        */}
                                                </Tabs.TabPane>
                                            )
                                        })}
                                    </Tabs>
                                </div> : null
                        }

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