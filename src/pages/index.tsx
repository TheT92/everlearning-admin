import '../styles/index.scss';

import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, List } from 'antd';

import { apiAddCategory, apiGetCategories } from '../apis/category';
import { useEffect, useState } from 'react';

type FieldType = {
    name?: string;
};



export default function Index() {
    const [categories, setCategories] = useState([]);
    
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        apiAddCategory(values).then(res => {
            console.log("success", res)
            fetchData()
        }).catch(err => {
            console.log("error", err)
        })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const fetchData = () => {
        apiGetCategories().then(res => {
            console.log("success", res.data?.data, '-----------------------')
            setCategories(res.data?.data)
        }).catch(err => {
            console.log("error", err)
        })
    }
    useEffect(() => {
        // 组件加载时检查认证状态
        fetchData()
    }, []);

    return (
        <div className='page-container home-page'>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please enter category name' }]}
                >
                    <Input allowClear/>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <List>
                {
                    categories.map((v: any, i) => (<List.Item key={i}>{v.name}</List.Item>))
                }
            </List>
        </div>
    )
};
