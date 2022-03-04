import { Breadcrumb, Button, Card, Input, Layout, Menu, Space } from "antd";
import {
    UserOutlined
  } from '@ant-design/icons';
import SubMenu from "antd/lib/menu/SubMenu";
import { Typography } from 'antd';
import { Link } from "react-router-dom";
import "../../assets/css/Pages.css";
import { useSelector } from "react-redux";
import { meetingJoin } from "../../utils/api";

const { Header, Footer, Content } = Layout;

export default function MeetingJoin() {

    const { Title } = Typography;
    const userid = useSelector((state: any) => state.userReducer.userid);

    const joinMeeting = async () => {
        console.log("Join Meeting");
        const meetingId = +(document.getElementById("meetingId") as HTMLInputElement).value;
        console.log(userid, meetingId);

        // TODO:
        // - レスポンスが帰ってくるまでロード画面にする
        // - 作成完了したら画面遷移
        // 帰ってきたレスポンスの会議データをStoreに

        await meetingJoin(userid, meetingId)
            .then((res: any) => {
                console.log(res);
                if(!res.result){
                    throw new Error("Join Meeting Failed");
                }
                alert("join success");
            })
            .catch((err: any) => {
                console.log(err);
                alert(err.message);
            });

    }

    return (
        <Layout >
            <Header>
                <Menu theme="dark" mode="horizontal" >
                    <SubMenu key="sub1" icon={<UserOutlined />} title='ユーザ' style={{paddingLeft:'90%'}}>
                        <Menu.Item key="1">プロファイル</Menu.Item>
                        <Link to={'../login'}>
                            <Menu.Item key="2">ログアウト</Menu.Item>
                        </Link>
                    </SubMenu>
                </Menu>
            </Header>
            <Content style={{padding:'0 50px', margin:'16px 0', height:'100%',}}>
                <Title style={{margin:'16px 0'}}>
                    ○○システム
                </Title>
                <Breadcrumb style={{margin:'16px 0'}}>
                    <Breadcrumb.Item>会議</Breadcrumb.Item>
                    <Breadcrumb.Item>会議参加</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content" style={{background: '#fff', margin:'16px 0'}}>
                    <Card title="ミーティングに参加する" bordered={false} style={{ width: '100%', textAlign:'center' }}>
                        <Space direction="vertical" style={{width: '100%'}}>
                            <p>ミーティングID</p>
                            <Input id="meetingId" type={'number'} style={{width: '20%', textAlign:'center'}} placeholder="ミーティングIDを入力してください" />
                            <p style={{margin:'16px 0'}}>ミーティングに参加するために、ミーティング開催者からミーティングを取得してください。</p>
                            <Button type="primary" style={{width: '20%'}} onClick={joinMeeting}>ミーティングに参加する</Button>
                        </Space>
                    </Card>                    
                </div>
                <div className="site-layout-content" style={{background: '#fff', margin:'16px 0'}}>
                    <Card title="ミーティング開催者ですか？" bordered={false} style={{ width: '100%', textAlign:'center' }}>
                        <p style={{margin:'16px 0'}}>ミーティングを作成するために、詳細設定で設定してください。</p>
                        <Link to={'../meeting/host'}>    
                            <Button type="primary" style={{width: '20%'}}>ミーティングを作成する</Button>
                        </Link>
                    </Card>                    
                </div>
            </Content>
            <Footer style={{ 
                borderTop: '1px solid #e8e8e8',
                position: 'fixed',
                left: 0,
                bottom: 0,
                width: '100%',
                textAlign: 'center',}}>
                Made by RochUP Team
            </Footer>
        </Layout>
    );
};

