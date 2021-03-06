import React from 'react';

// Modules
import { Card, Breadcrumb, Form, Input, Button, Divider, Select, DatePicker, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

// Style
import './FormStyle.css';

const FormView = (props) => {


    return (

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
                            label="Ícone"
                        >

                            <Button
                                icon={<UploadOutlined />}
                                onClick={() => document.getElementById('room-tasks-img-file').click()}
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
                                            id='room-tasks-img-file-thumb'
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
                                id='room-tasks-img-file'
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
                                                            value={
                                                                props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                                props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).frequency
                                                            }
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
                                                            <Select.Option value="Monthly">Mensal - Data</Select.Option>
                                                            <Select.Option value="WeekInMonth">Mensal - Dia e Semana</Select.Option>
                                                            <Select.Option value="Quarterly">Trimestral</Select.Option>
                                                            <Select.Option value="Yearly">Semestral</Select.Option>
                                                        </Select>
                                                    </Form.Item>

                                                    {
                                                        (props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).frequency) === 'Weekly' ?
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
                                                        (props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).frequency) === 'Monthly' ?
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
                                                        (props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).frequency) === 'WeekInMonth' ?
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
                                                            </div>
                                                            : null
                                                    }

                                                    {
                                                        (props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).frequency) === 'Quarterly' ?
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
                                                    }

                                                    {
                                                        (props.form.defaultFrequency.find(el => el.roomType === roomType.roomId) &&
                                                            props.form.defaultFrequency.find(el => el.roomType === roomType.roomId).frequency) === 'Yearly' ?
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
                                                    }
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

        </div>

    )

}

export default FormView;