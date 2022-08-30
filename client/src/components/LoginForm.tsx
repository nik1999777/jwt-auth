import { FC, useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../main'
import { Button, Grid, TextField } from '@mui/material'

const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { store } = useContext(Context)

  return (
    <>
      <TextField
        label='Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
        variant='outlined'
      />
      <TextField
        label='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
        variant='outlined'
      />
      <Button onClick={() => store.login(email, password)} variant='contained'>
        Login
      </Button>
      <Button onClick={() => store.login(email, password)} variant='contained'>
        Registration
      </Button>
    </>
  )
}

export default observer(LoginForm)
