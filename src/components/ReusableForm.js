import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form id="form" onSubmit={props.formSubmissionHandler}>
        <div>
          <label>
            Date:
            <input
              type='date'
              name='date'
              required />
            </label>
        </div>
        <div>
          <label>
            Wake Time:
            <input
              type='time'
              name='wakeTime'
              />
          </label>
        </div>
        <div>
          <label>
            Bed Time:
            <input
              type='time'
              name='bedTime'
              />
          </label>
        </div>
        <div>
          <label>
            Energy Level:
            <select name="energyLevel">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              </select>
          </label>
        </div>
        <div>
          <label>
            Mood Level:
            <select name="mood">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              </select>
          </label>
        </div>
        <div>
          <button type='submit'>{props.buttonText}</button>
        </div>
      </form>
      <div id="footer">
      </div>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;