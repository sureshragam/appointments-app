// Write your code here
import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    appointmentTitle: '',
    appointmentDate: '',
    starred: false,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const id = uuidV4()
    const {appointmentTitle, appointmentDate} = this.state
    const isStarred = false
    const appointment = {
      id,
      title: appointmentTitle,
      date: appointmentDate,
      isStarred,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, appointment],
      appointmentTitle: '',
      appointmentDate: '',
    }))
  }

  onTitleChange = event => {
    this.setState({appointmentTitle: event.target.value})
  }

  onDateChange = event => {
    this.setState({appointmentDate: event.target.value})
  }

  onToggleStar = id => {
    this.setState(prevState => {
      const updatedAppointmentList = prevState.appointmentsList.map(
        eachAppointment => {
          if (eachAppointment.id === id) {
            return {...eachAppointment, isStarred: !eachAppointment.isStarred}
          }
          return eachAppointment
        },
      )
      return {appointmentsList: updatedAppointmentList}
    })
  }

  onToggleStarButton = () => {
    this.setState(prevState => ({starred: !prevState.starred}))
  }

  render() {
    const {
      appointmentTitle,
      appointmentDate,
      appointmentsList,
      starred,
    } = this.state
    const filteredAppointmentList = appointmentsList.filter(
      eachAppointment => eachAppointment.isStarred === true,
    )
    const finalList = starred ? filteredAppointmentList : appointmentsList
    return (
      <div className="main-container">
        <div className="appointment-card">
          <div className="row">
            <div className="col-1">
              <h1>Add Appointment</h1>
              <form onSubmit={this.onSubmitForm}>
                <label htmlFor="title">TITLE</label>
                <input
                  type="text"
                  id="title"
                  onChange={this.onTitleChange}
                  value={appointmentTitle}
                />
                <label htmlFor="date">DATE</label>
                <input
                  type="date"
                  id="date"
                  onChange={this.onDateChange}
                  value={appointmentDate}
                />
                <button type="submit">Add</button>
              </form>
            </div>
            <div className="col-2">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr />
          <div className="appointments-tab">
            <div className="appointment-heading">
              <h1>Appointments</h1>
              <button
                type="button"
                className={starred ? 'filled-star-button' : 'starred-button'}
                onClick={this.onToggleStarButton}
              >
                Starred
              </button>
            </div>
            <ul>
              {finalList.map(eachAppointment => {
                const {title, id, date, isStarred} = eachAppointment
                return (
                  <AppointmentItem
                    key={id}
                    title={title}
                    isStarred={isStarred}
                    id={id}
                    date={date}
                    onToggleStar={this.onToggleStar}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
