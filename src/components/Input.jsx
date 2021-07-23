import React from 'react';
import './input.css';
import PropTypes from 'prop-types';
// eslint-disable-next-line
export const urlPattern = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/

export class Input extends React.Component {
  state = {
    inputValidation: true,
    text: '',
  }

  checkValidation = (field) => {
    if (field.name === 'title' || field.name === 'imdbId') {
      field.value.length === 0
        ? this.setState({
          inputValidation: !!field.value.length,
          text: 'Is required',
        })
        : this.setState({
          inputValidation: !!field.value.length,
        });
    } else {
      field.value.length === 0
        ? this.setState({
          inputValidation: urlPattern.test(field.value),
          text: 'Is required',
        })
        : this.setState({
          inputValidation: urlPattern.test(field.value),
          text: 'wrong format',
        });
    }

    this.props.onChange(field.name, field.value);
  }

  checkValue = (input) => {
    this.props.onChange(input.name, input.value);

    input.value.length === 0
      && this.setState({
        text: '',
        inputValidation: !!input.value.length,
      });
  }

  render() {
    const {
      title,
      name,
      value,
    } = this.props;

    const { inputValidation, text } = this.state;

    return (
      <label>
        {`${title} `}
        <input
          className={
            inputValidation
              ? 'input'
              : 'input app__input'
          }
          value={value}
          name={name}
          onChange={event => this.checkValue(event.target)}
          onBlur={event => this.checkValidation(event.target)}
        />
        <span
          className="app__error"
        >
          {
            inputValidation ? null : text
          }
        </span>
      </label>
    );
  }
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};