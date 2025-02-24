import * as React from 'react'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'

import { SITE_MAIL } from '../../consts'

const parameters = ['to', 'subject', 'body']

const Content = styled.div`
  margin: 0 auto;
  max-width: 860px;
  min-height: 80vh;
  padding: 1.45rem 1.0875rem;
`

const FormDiv = styled.div`
  line-height: 2;
`

const StyledInput = styled.input`
  border: none;
  border-bottom: 2px solid black;
  outline: none;
  height: 30px;
  margin: 0 10px;
`

const StyledTextarea = styled.textarea`
  border: 2px solid black;
  outline: none;
`

const HiddenInput = styled.input`
  display: none;
`

const StyledSelect = styled.select`
  border: none;
  border-bottom: 2px dashed black;
  margin: 0 10px;

  &:focus {
    outline: none;
  }
`

const ContactPage = () => {
  const [state, setState] = React.useState({
    isFor: 'job offer',
    values: parameters.reduce((acc, param) => {
      acc[param] = ''
      return acc
    }, {}),
  })
  const { register, handleSubmit } = useForm() // initialise the hook

  const onSubmit = form => {
    window.open(buildMailto(form), '_blank')
  }

  const onSubjectChange = form =>
    form &&
    setState({
      isFor: form.target.value,
    })

  const buildSubject = form => {
    const { subject, jobTitle, product } = form
    return `${subject} : ${jobTitle ? jobTitle : product}`
  }

  const buildBody = data =>
    `Hi%20J%C3%A9r%C3%A9mie%2C%20%20%0A%0AMy%20name%20is%20${encodeURIComponent(
      data.name,
    )}%20and%20I%20wanted%20to%20discuss%20about%20${encodeURIComponent(
      data.subject,
    )}%20${data.product ? 'for' : 'as'}%20%20${encodeURIComponent(
      data.jobTitle ? data.jobTitle : data.product,
    )}%20%20%0A%0AHere's%20what%20I%20call%20tell%20you%20so%20far%20%3A%20${encodeURIComponent(
      data.project,
    )}%20%20%0A%0AYou%20can%20reply%20at%20my%20email%20address%20%20${encodeURIComponent(
      data.email,
    )}%20%20%0A%0ARegards%2C%0A${encodeURIComponent(data.name)}`

  const buildMailto = values => {
    const { to } = values
    return `mailto:${to}?subject=${buildSubject(values)}&body=${buildBody(
      values,
    )}`
  }

  return (
    <Content>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HiddenInput
          type='text'
          name='to'
          readOnly
          value={atob(SITE_MAIL)}
          {...register('to', { required: true })}
        />
        <FormDiv>
          <p>Hi Jérémie, </p>
          <p>
            My name is{' '}
            <StyledInput
              type='text'
              placeholder='John Doe'
              name='name'
              {...register('name', { required: true })}
            />{' '}
            and I wanted to discuss about
            <StyledSelect
              name='subject'
              {...register('subject', { required: true })}
              onChange={onSubjectChange}>
              <option value='job offer'>a job offer</option>
              <option value='license inquiry'>buying a license</option>
            </StyledSelect>
            {state.isFor === 'job offer' && (
              <React.Fragment>
                {'    '}as{' '}
                <StyledInput
                  type='text'
                  placeholder='fullstack developer'
                  name='jobTitle'
                  {...register('jobTitle', { required: true })}
                />
              </React.Fragment>
            )}
            {state.isFor === 'license inquiry' && (
              <React.Fragment>
                {'    '}for{' '}
                <StyledSelect name='product' {...register('product', { required: true })}>
                  <option value='node-bird'>node-bird</option>
                  <option value='node-bolt'>node-bolt</option>
                  <option value='node-wind'>node-wind</option>
                  <option value='node-cityscoot'>node-cityscoot</option>
                </StyledSelect>
              </React.Fragment>
            )}
          </p>
        </FormDiv>
        <FormDiv>
          {' '}
          Here's what I call tell you so far :{' '}
          <p>
            <StyledTextarea
              name='project'
              autoFocus
              style={{ width: '100%', minHeight: '50px' }}
              {...register('project', { required: true })}
            />
          </p>
        </FormDiv>
        <FormDiv>
          You can reply at my email address{' '}
          <StyledInput
            type='text'
            placeholder='john@doe.com'
            name='email'
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          <p>Regards, </p>
          <p></p>
        </FormDiv>
        <div className='submitButton'>
          <input type='submit' />
        </div>
      </form>
    </Content>
  )
}

export default ContactPage
