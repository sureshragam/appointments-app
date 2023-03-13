// Write your code here
import format from 'date-fns/format'
import './index.css'

const AppointmentItem = props => {
  const {title, date, isStarred, onToggleStar, id} = props
  const dateObj = new Date(date)
  const formattedDate = format(dateObj, 'dd MMMM yyyy, EEEE')

  const onClickStar = () => {
    onToggleStar(id)
  }
  return (
    <li className="appointment">
      <div>
        <p>{title}</p>
        <p>{formattedDate}</p>
      </div>
      <button type="button" onClick={onClickStar} data-testid="star">
        {isStarred ? (
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
            alt="star"
          />
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
            alt="star"
          />
        )}
      </button>
    </li>
  )
}

export default AppointmentItem
