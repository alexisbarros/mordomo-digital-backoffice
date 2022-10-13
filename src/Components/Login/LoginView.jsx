import React from 'react';

// Modules
import { Card, Button, Input, Checkbox, Form } from 'antd';

// Images
import icon from '../../assets/img/icon.png';

// Style
import './LoginStyle.css';

const LoginView = (props) => {

    return (

        <div className='login-bg-image'>
            <div className='login-bg'>

                <Card
                    className='login-box'
                    title={
                        <div className='login-align-center'>
                            <img src={icon} alt='icon' className='login-icon' />
                            <div>Mordomo Digital</div>
                            <div className='login-subtitle'>Backoffice v1.0 </div>
                        </div>
                    }
                >
                    <Form layout='vertical' onFinish={() => props.login()}>

                        <Form.Item label='E-mail'>
                            <Input
                                placeholder='E-mail'
                                type='email'
                                onChange={e => props.setLoginForm({ ...props.loginForm, email: e.target.value })}
                            />
                        </Form.Item>

                        <Form.Item label='Senha'>
                            <Input
                                placeholder='Senha'
                                type='password'
                                className='login-form-elements'
                                onChange={e => props.setLoginForm({ ...props.loginForm, password: e.target.value })}
                            />
                        </Form.Item>

                        <Button
                            type='primary'
                            className='login-form-elements'
                            htmlType="submit"
                            onClick={() => props.login()}
                            loading={props.loginButtonLoading}
                            disabled={!props.loginForm.email || !props.loginForm.password}
                        >Entrar</Button>

                    </Form>

                    <Checkbox
                        checked={props.saveLoginInfo}
                        onChange={() => props.setSaveLoginInfo(!props.saveLoginInfo)}
                    >
                        Mantenha conectado
                    </Checkbox>

                </Card>

            </div >
        </div >

    )

};

export default LoginView;