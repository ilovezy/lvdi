import React, { useEffect, useState } from 'react'
import { NavBar, List, WhiteSpace, Button, WingBlank } from 'antd-mobile';

import axios from 'axios'

var no, userId, projectCode, hotelId, hotelGroupId
const thisStatus = ['未签署', '已签署', '已拒绝', '锁定代签', '抄送', '']

export default props => {
    const [data, setData] = useState({})
    const [status, setStatus] = useState(5)
    const [isCompany, setIsCompany] = useState(false)

    useEffect(() => {
        try {
            const query = props.location.search // '?n=1&u=1&p=2&h=2&g=3'
            const params = query.split('&')
            no = params[0].substr(3)
            userId = params[1].substr(2)
            projectCode = params[2].substr(2)
            hotelId = params[3].substr(2)
            hotelGroupId = params[4].substr(2)

            axios.get("/getContractSta?contractNo=" + no).then((response) => {
                if (response && response.data && response.data.contract && response.data.contract.signatories) {
                    response.data.contract.signatories.forEach(signatorie => {
                        if (signatorie.userId === userId) {
                            setStatus(signatorie.signmentState)
                        }
                    })
                }
            })
            axios.get("/getContract?contractNo=" + no).then((response) => {
                setData(response.data)
                if (response.data.hasOwnProperty('text20') && response.data.text20.length > 0) {
                    setIsCompany(true)
                } else {
                    setIsCompany(false)
                }
            })
        } catch (error) {
            console.log('解析参数失败')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <div>
        <NavBar mode="dark">合同-{thisStatus[status]}</NavBar>
        <List renderHeader={() => "合同信息"}>
            <List.Item>出租方(以下简称甲方):
            <List.Item.Brief>{data.text1}</List.Item.Brief></List.Item>
            <List.Item>电话:
            <List.Item.Brief>{(data.text2 && data.text2.length === 11) ? (data.text2.substr(0, 3) + "****" + data.text2.substr(7)) : data.text2}</List.Item.Brief></List.Item>
            <List.Item>承租方(以下简称乙方):
            <List.Item.Brief>{(data.text3 && data.text3.length >= 2) ? (data.text3.substr(0, data.text3.length - 2) + "*" + data.text3.substr(data.text3.length - 1)) : data.text3}</List.Item.Brief></List.Item>
            <List.Item>证件类型:
            <List.Item.Brief>{data.text4}</List.Item.Brief></List.Item>
            <List.Item>证件号码:
            <List.Item.Brief>{(data.text5 && data.text5.length >= 15) ? (data.text5.substr(0, 6) + "****" + data.text5.substr(14)) : data.text5}</List.Item.Brief></List.Item>
            <List.Item>电话:
            <List.Item.Brief>{(data.text6 && data.text6.length === 11) ? (data.text6.substr(0, 3) + "****" + data.text6.substr(7)) : data.text6}</List.Item.Brief></List.Item>
            {isCompany ? <>
                <List.Item>联系人:
                <List.Item.Brief>{(data.text20 && data.text20.length >= 2) ? (data.text20.substr(0, data.text20.length - 2) + "*" + data.text20.substr(data.text20.length - 1)) : data.text20}</List.Item.Brief></List.Item>
                <List.Item>联系人证件类型:
                <List.Item.Brief>{data.text21}</List.Item.Brief></List.Item>
                <List.Item>联系人证件号码:
                <List.Item.Brief>{(data.text22 && data.text22.length >= 15) ? (data.text22.substr(0, 6) + "****" + data.text22.substr(14)) : data.text22}</List.Item.Brief></List.Item></> : null}
        </List>
        <WhiteSpace />
        <List.Item>
            <List.Item.Brief>
                甲乙双方在平等自愿,互利互惠的基础上,<br />
                经协商甲方愿意将使用,<br />
                管理权属于自己的房租出租给乙方,<br />
                双方根据国家相关规定,达成一致的协议:<br />
            </List.Item.Brief>
        </List.Item>
        <List renderHeader={() => '第一条 公寓信息'}>
            <List.Item>
                <List.Item.Brief>
                    甲方将拥有经营管理及转租权的<br />房类 {data.text7} 房号 {data.text8} 的房租出租给乙方.
                </List.Item.Brief>
            </List.Item>
        </List>
        <List renderHeader={() => '第二条 租金,押金交纳期及方式'}>
            <List.Item>
                <List.Item.Brief>
                    1 <br />入住日期 {data.text9}<br />退租日期 {data.text10}.
                </List.Item.Brief>
            </List.Item>
            <List.Item>
                <List.Item.Brief>
                    2 押金方式 {data.tet11}, 押金 {data.text12}元.
                </List.Item.Brief>
            </List.Item>
            <List.Item>
                <List.Item.Brief>
                    3 协议月租 {data.text13}元, 实际月租 {data.text14}元.
                </List.Item.Brief>
            </List.Item>
            <List.Item>
                <List.Item.Brief>
                    4 收款周期 {data.text15}, 收款日期: {data.text16}.
                </List.Item.Brief>
            </List.Item>
        </List>
        <WhiteSpace />
        <List renderHeader={() => "签字"}>
            <List.Item>出租方:
            <List.Item.Brief>{data.text1}</List.Item.Brief></List.Item>
            <List.Item>时间:
            <List.Item.Brief>{`${data.text17}-${data.text18}-${data.text19}`}</List.Item.Brief></List.Item>
            <List.Item>承租方:
            <List.Item.Brief>{data.text3}</List.Item.Brief></List.Item>
            <List.Item>时间:
            <List.Item.Brief>{`${data.text17}-${data.text18}-${data.text19}`}</List.Item.Brief></List.Item>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        {status === 0 ? <WingBlank><Button type="primary" onClick={() => {
            axios.get(`/postCheckCode1?userId=${userId}&projectCode=${projectCode}&hotelId=${hotelId}&hotelGroupId=${hotelGroupId}`)
                .then(response => {
                    props.history.push({ pathname: '/preview', state: { no, userId, projectCode } })
                })
        }}>确认签署</Button></WingBlank> : null}

    </div>
}
