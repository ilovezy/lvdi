import React, { useState } from 'react'
import { NavBar, List, InputItem, Button, Toast, Icon } from 'antd-mobile';
import axios from 'axios'


export default props => {
    const [code, setCode] = useState('')
    let location = props.location
    let state = location.state || {}
    return <div>
        <NavBar mode="dark" icon={<Icon type="left" />} onLeftClick={() => {
            props.history.goBack()
        }}>输入验证码</NavBar>
        <List>
            <InputItem defaultValue={code} onChange={value => {
                setCode(value)
            }}>验证码</InputItem>
            <List.Item><Button type="primary" onClick={() => {
                axios.post("/postCheckCode", {
                    "head": {
                        "txTime": "20190903093001"
                    },
                    "proxySign": {
                        "userId": state.userId,
                        "projectCode": state.projectCode,
                        "checkCode": code
                    }
                })
                    .then(doc => {
                        if (doc.data && doc.data.head && doc.data.head.retMessage === "OK") {
                            axios.post("/signContract ", {
                                "head": {
                                    "txTime": "20190903150152"
                                },
                                "signContract": {
                                    "contractNo": state.no,
                                    "signInfo": {
                                        "userId": state.userId,
                                        "authorizationTime": "20190903150252",
                                        "location": "127.0.0.1",
                                        "signLocation": "Signature2",
                                        "projectCode": state.projectCode,
                                    }
                                }
                            })
                                .then(doc => {
                                    if (doc.data && doc.data.head && doc.data.head.retMessage === "OK") {
                                        Toast.fail('签署成功')
                                        props.history.goBack()
                                    } else {
                                        Toast.fail('签署失败')
                                    }
                                })
                                .catch(err => {
                                    Toast.fail('签署失败')
                                })
                        } else {
                            Toast.fail('验证码不正确')
                        }
                    })
                    .catch(err => {
                        Toast.fail(err)
                    })
            }}>确定</Button></List.Item>
        </List>
    </div>
}
