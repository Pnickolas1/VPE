import React, { Component} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Spin, Alert } from 'antd';


function formatData(data) {
  if (data.error) {
    return []
  }
  const {data: survey } = data
  return survey.map(item => ({id: item.id, type: item.fields.name}))
}


class Surveys extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      loading: false,
      data: []
    }
  }

  async componentDidMount() {
    this.setState({ error: false, loading: true, data: [] });
    const response = await axios(`/api/surveys`)
    this.setState({ error: response.data.error,
      loading: false,
      data: formatData(response.data)
    });
  }

  render() {
    const { data, loading, error } = this.state
    return (
      <div>
        {loading && <Spin size="large" /> }
        {error && (
          <div>
            <Alert message={`Error has occured, please refresh: ${error}`}
              type="error" />
          </div>
        )}
        {data.map(item => (
          <div key={item.id}>
            <Link to={item.id}>
              {item.type}
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

export default Surveys