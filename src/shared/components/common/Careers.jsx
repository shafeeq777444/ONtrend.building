import React, { useState, useEffect } from 'react';
import {
    Layout, Row, Col, Form, Input, Button, DatePicker,
    Upload, Select, Typography, message, TimePicker, Switch
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { supabase } from '@/lib/supabase/client';
import { getJobOpenings } from '@/lib/supabase/queries/getJobOpenings';
import '@/shared/styles/ApplicantTimeline.css';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default function Careers() {
    const [form] = Form.useForm();
    const [jobRole, setJobRole] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [language, setLanguage] = useState('en');
    const isArabic = language === 'ar';

    useEffect(() => {
        getJobOpenings()
            .then((data) => setJobs(data))
            .catch(() => message.error('Failed to load job openings'));
    }, []);

    const uploadFile = async (file, folder) => {
        const ext = file.name.split('.').pop();
        const filename = `${Date.now()}.${ext}`;
        const filePath = `${folder}/${filename}`;

        const { data, error } = await supabase.storage
            .from('resumes')
            .upload(filePath, file);

        if (error) throw error;

        return `https://fqiifksaapakkylqbfug.supabase.co/storage/v1/object/public/resumes/${filePath}`;
    };

    const handleFinish = async (values) => {
        try {
            const idCardFile = values.idCard?.[0]?.originFileObj;
            const resumeFile = values.resume?.[0]?.originFileObj;

            if (!resumeFile) {
                return message.error(isArabic ? 'يرجى رفع الملفات المطلوبة' : 'Please upload required files');
            }

            const idCardUrl = idCardFile
                ? await uploadFile(idCardFile, 'id-cards')
                : null;
            const resumeUrl = await uploadFile(resumeFile, 'user-files');

            const { error } = await supabase.from('career').insert({
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email,
                phone_number: values.phoneNumber,
                id_number: values.idNumber,
                date_of_birth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
                id_card: idCardUrl,
                resume_url: resumeUrl,
                job_id: values.jobRole,
                preferred_time_from: values.preferred_time_from.format('HH:mm'),
                preferred_time_to: values.preferred_time_to.format('HH:mm')
            });

            if (error) throw error;

            message.success(isArabic ? 'تم الإرسال بنجاح' : 'Submitted successfully!');
            form.resetFields();
            setJobRole(null);
            setSelectedJob(null);
        } catch (error) {
            console.error(error);
            message.error(isArabic ? 'حدث خطأ أثناء الإرسال' : 'Submission failed');
        }
    };

    return (
        <Layout className='tile-bg'>
            <Content style={{ padding: '24px 8px' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <Title level={1} style={{ fontSize: '60px', color: 'white' }}>{'ONtrend Careers'}</Title>
                    <Paragraph style={{ fontSize: '1.25rem', color: 'white' }}>
                        {isArabic ? 'جاهز لتصبح أحد فريقنا؟' : 'Ready to become one of us?'}
                    </Paragraph>
                    <div style={{ marginTop: 16, color: 'white' }}>
                        <span style={{ marginRight: 8 }}>EN</span>
                        <Switch checked={isArabic} onChange={(val) => setLanguage(val ? 'ar' : 'en')} />
                        <span style={{ marginLeft: 8 }}>AR</span>
                    </div>
                </div>

                <Row gutter={[24, 24]} justify="center" align="top" style={{ flexWrap: 'wrap' }}>
                    <Col xs={24} md={14} lg={12}>
                        <div style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                            <Form
                                form={form}
                                layout="vertical"
                                onFinish={handleFinish}
                                requiredMark={false}
                                dir={isArabic ? 'rtl' : 'ltr'}
                            >
                                <Row gutter={16}>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="firstName"
                                            label={isArabic ? 'الاسم الأول' : 'First Name'}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={isArabic ? 'أدخل الاسم الأول' : 'Enter first name'} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="lastName"
                                            label={isArabic ? 'الاسم الأخير' : 'Last Name'}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder={isArabic ? 'أدخل الاسم الأخير' : 'Enter last name'} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="email"
                                            label={isArabic ? 'البريد الإلكتروني' : 'Email'}
                                            rules={[{ required: true }, { type: 'email' }]}
                                        >
                                            <Input placeholder="example@email.com" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="phoneNumber"
                                            label={isArabic ? 'رقم الهاتف' : 'Phone Number'}
                                            rules={[{ required: true }]}
                                        >
                                            <Input addonBefore="+968" placeholder="5xxxxxxx" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="idNumber"
                                            label={isArabic ? 'رقم الهوية' : 'Civil ID'}
                                            rules={[{ required: true }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="dateOfBirth"
                                            label={isArabic ? 'تاريخ الميلاد' : 'Date of Birth'}
                                            rules={[{ required: true }]}
                                        >
                                            <DatePicker style={{ width: '100%' }} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="resume"
                                            label={isArabic ? 'السيرة الذاتية' : 'Resume'}
                                            valuePropName="fileList"
                                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                                            rules={[{ required: true }]}
                                        >
                                            <Upload beforeUpload={() => false} accept=".pdf,.doc,.docx">
                                                <Button icon={<UploadOutlined />}>{isArabic ? 'تحميل السيرة الذاتية' : 'Upload Resume'}</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={12}>
                                        <Form.Item
                                            name="idCard"
                                            label={isArabic ? 'بطاقة الهوية' : 'Related Documents (optional)'}
                                            valuePropName="fileList"
                                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                                        >
                                            <Upload beforeUpload={() => false} accept="image/*">
                                                <Button icon={<UploadOutlined />}>{isArabic ? 'تحميل البطاقة' : 'Upload'}</Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item
                                    name="jobRole"
                                    label={isArabic ? 'اختر الوظيفة' : 'Select Job Role'}
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        // showSearch
                                        placeholder={isArabic ? 'ابحث عن وظيفة' : 'Search job'}
                                        onChange={(val) => {
                                            setJobRole(val);
                                            const job = jobs.find(j => j.id === val);
                                            setSelectedJob(job);
                                        }}
                                        filterOption={(input, option) =>
                                            option?.children?.toLowerCase().includes(input.toLowerCase())
                                        }
                                    >
                                        {jobs.map((job) => (
                                            <Select.Option key={job.id} value={job.id}>
                                                {isArabic ? job.title_ar : job.title}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                {jobRole && (
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="preferred_time_from"
                                                label={isArabic ? 'من الساعة' : 'Preferred Time From'}
                                                rules={[{ required: true }]}
                                            >
                                                <TimePicker format="HH:mm" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="preferred_time_to"
                                                label={isArabic ? 'إلى الساعة' : 'Preferred Time To'}
                                                rules={[{ required: true }]}
                                            >
                                                <TimePicker format="HH:mm" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )}
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" block style={{ background: 'red' }}>
                                        {isArabic ? 'التالي' : 'Submit'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>

                    {selectedJob && (
                        <Col xs={24} md={10} lg={8}>
                            <div
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    borderRadius: 8,
                                    borderLeft: '4px solid red',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                    minHeight: 200,
                                    marginTop: 12,
                                }}
                            >
                                <Title level={4} style={{
                                    color: 'red',
                                    whiteSpace: 'pre-line',
                                    textAlign: isArabic ? 'right' : 'left',
                                    direction: isArabic ? 'rtl' : 'ltr',
                                }}>
                                    {isArabic ? 'الوصف الوظيفي' : 'Job Description'}
                                </Title>
                                <Paragraph
                                    style={{
                                        whiteSpace: 'pre-line',
                                        textAlign: isArabic ? 'right' : 'left',
                                        direction: isArabic ? 'rtl' : 'ltr',
                                        marginBottom: 0,
                                    }}
                                >
                                    {(isArabic ? selectedJob.description_ar : selectedJob.description) ||
                                        (isArabic ? 'لا يوجد وصف' : 'No description provided.')}
                                </Paragraph>
                            </div>
                        </Col>
                    )}
                </Row>
            </Content>
        </Layout>
    );
}