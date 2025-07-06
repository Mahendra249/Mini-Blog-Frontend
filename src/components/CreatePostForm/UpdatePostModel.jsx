import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Form, Input, Select, Button, Spin } from "antd";
import { updateData } from "../../api/ClientFunction";
import { mutate } from "swr";

const { TextArea } = Input;
const { Option } = Select;

const UpdatePostModal = ({ visible, onClose, initialData = {} }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);


  const handleFinish = async (values) => {
    setIsLoading(true);
    console.log(values);
    const response = await updateData(`/posts/${initialData?._id}`, values); // update your API path
    if (response?.success) {
      toast.success(response.message || "Post updated successfully");
      mutate("/posts");
      onClose(); // close modal
    } else {
      toast.error(response?.message || "Failed to update post");
    }
    setIsLoading(false);
  };

  return (
    <Modal
      title="Update Post"
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
    >
      <Spin spinning={isLoading}>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            title: initialData.title || "",
            excerpt: initialData.excerpt || "",
            content: initialData.content || "",
            category: initialData.category || "",
          }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>

          <Form.Item
            label="Tagline"
            name="excerpt"
            rules={[{ required: true, message: "Please enter the tagline" }]}
          >
            <TextArea rows={2} placeholder="Tagline" />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please enter the content" }]}
          >
            <TextArea rows={6} placeholder="Content" />
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select category" }]}
          >
            <Select placeholder="Select Category">
              <Option value="React">React</Option>
              <Option value="Tech">Tech</Option>
              <Option value="Entertainment">Entertainment</Option>
              <Option value="Movies">Movies</Option>
              <Option value="Knowledge">Knowledge</Option>
              <Option value="Health">Health</Option>
              <Option value="Business">Business</Option>
              <Option value="Jobs">Jobs</Option>
              <Option value="Govt">Govt.</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Update Post
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default UpdatePostModal;
