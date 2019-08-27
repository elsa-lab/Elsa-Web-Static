import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';

const { TextArea } = Input;

const SubmitButton = styled(Button)`
  float: right;
`;

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <SubmitButton
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </SubmitButton>
    </Form.Item>
  </div>
);

Editor.propTypes = {
  submitting: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Editor;
