import React, { Component} from 'react'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { Spin, Alert, Form, Select, Input, Button, notification } from 'antd'
const { Option } = Select;


const messageType = {
  'success': 'your vote was successful cast',
  'error': 'There was an error. Your vote was not cast, please ensure are input fields have been properly entered'
}

const openNotificationWithIcon = (type, val) => {
  notification[type]({
    message: val,
    description: messageType[type],
  });
};

class Choices extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      error: false,
      loading: false,
      data: [],
      form: {
        option: '',
        email: '',
        number: null,
      }
    }
  }


  async componentDidMount() {
    const { id } = this.props.match.params
    this.setState({ error: false, loading: true, data: [] });
    const response = await axios(`/api/${id}`)
    this.setState({
      ...this.state.form,
      error: response.data.error,
      loading: false,
      data: response.data.data,
      success: response.data.success,
    });
  }

  onChange = ({ name, val }) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [name]: val,
      }
    })
  }

  triggerNotification = (type, val) => openNotificationWithIcon(type, val)

  submit = async () => {
    const { form, data: fields } =  this.state
    const { uuid } = fields.fields
    const { option, email, number } = form 
    if (form.option && form.email && number && uuid) {
      const payload = { option, email, uuid, number, id: uuidv4()  }
      await axios.post(`/api/submit`, payload)
      this.triggerNotification('success', 'success vote')
      this.props.history.push('/')
    } else {
      this.triggerNotification('error', 'error voting')
    }
  }

  render() {
    const options = ['option_1', 'option_2', 'option_3']
    const { error, loading, success } = this.state
    return (
      <div>
        {loading && <Spin size="large" /> }
        {error && (
          <div>
            <Alert message={`Error has occured, please refresh: ${error}`}
              type="error" />
          </div>
        )}
        <div>
          {this.state.data.fields && (
            <div>
              {`${this.state.data.fields.name} options` || ''}
            </div>
          )}
        </div>
        <div style={{ paddingTop: 50 }}>
        <Form onFinish={this.submit}>
          <Form.Item name="option" label="Select">
            <Select placeholder="Select" name="option" onChange={op => this.onChange({ name: 'option',  val: op})}>
              {success && options.map((op, i) => <Option key={i} value={`${this.state.data.fields[op]}`}>{this.state.data.fields[op]}</Option>)}}
            </Select>
          </Form.Item>
          <Form.Item name="number" label="number" type="number" onChange={e => this.onChange({ name: 'number', val: e.target.value})}>
            <Input name="number"/>
          </Form.Item>
          <Form.Item name="email" label="Email" type="email" onChange={e => this.onChange({ name: 'email', val: e.target.value})}>
            <Input type="email" name="email"/>
          </Form.Item>
          <div style={{ maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>
          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
          </div>
        </Form>
        </div>
      </div>
    )
  }
}

export default withRouter(Choices)
