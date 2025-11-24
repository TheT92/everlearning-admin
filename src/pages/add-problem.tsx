import { Link, useParams } from "react-router-dom";
import { Button, Checkbox, Form, Input, message, Radio, type FormProps } from "antd";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { apiGetCategories } from "../apis/category";
import { apiAddProblem } from "../apis/problem";

type FieldType = {
    title: string;
    difficulty: number;
    categoriesArr: string[];
    description: string;
    problemType: number;
    answer: string;
    categories?: string;
};

const problemTypes = [
    { value: 1, label: 'Q&A' }
]

export default function Problem() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState<FieldType>({ title: '', difficulty: 1, categoriesArr: [], problemType: 1, description: '', answer: '' });


    const fetchData = () => {
        apiGetCategories().then(res => {
            setCategories(res.data?.data)
        }).catch(err => {
            console.log("error", err)
        })
    }

    useEffect(() => {
        // 组件加载时检查认证状态
        fetchData()
    }, []);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        
        values.categories = values.categoriesArr.join(',');
        console.log('Success:', values);

        apiAddProblem(values).then(res => {
            console.log("success", res)
            message.success("Add problem successfully!")
        }).catch(err => {
            console.log("error", err)
            message.error("Add problem failed")
        })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="full-width problem-page">
            <h2>Add Problem</h2>
            <Form
                name="basic"
                labelAlign="right"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please enter title' }]}
                >
                    <Input allowClear />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Problem Type"
                    name="problemType"
                    rules={[{ required: true, message: 'Please choose type' }]}
                >
                    <Radio.Group
                        value={formData.difficulty}
                        options={problemTypes}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Difficulty"
                    name="difficulty"
                    rules={[{ required: true, message: 'Please choose difficulty' }]}
                >
                    <Radio.Group
                        value={formData.difficulty}
                        options={[
                            { value: 1, label: 'Easy' },
                            { value: 2, label: 'Middle' },
                            { value: 3, label: 'Hard' },
                        ]}
                    />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Categories"
                    name="categoriesArr"
                    rules={[{ required: true, message: 'Please choose Categories' }]}
                >
                    <Checkbox.Group options={categories.map((v: any) => v.name)} value={formData.categoriesArr}></Checkbox.Group>
                </Form.Item>
                <Form.Item<FieldType>
                    label="description"
                    name="description"
                    rules={[{ required: true, message: 'Please enter description' }]}
                >
                    <TextArea showCount rows={10}></TextArea>
                </Form.Item>
                <Form.Item<FieldType>
                    label="Answer"
                    name="answer"
                    rules={[{ required: true, message: 'Please enter answer' }]}
                >
                    <TextArea showCount rows={10}></TextArea>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}