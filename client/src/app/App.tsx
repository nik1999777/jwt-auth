import { FC, useContext, useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import { observer } from 'mobx-react-lite'
import { IUser } from '../models/IUser'
import UserService from '../services/UserService'
import { Context } from '../main'
import { Button, Typography } from '@mui/material'
import styles from './App.module.scss'

const App: FC = () => {
  const { store } = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers()
      setUsers(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  if (store.isLoading) {
    return <div>Loading...</div>
  }

  if (!store.isAuth) {
    return (
      <div className={styles.wrapper}>
        <Typography className={styles.title} variant='h2'>
          JWT AUTH
        </Typography>
        <LoginForm />
        <Button onClick={getUsers} variant='contained' color='success'>
          Get Users
        </Button>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <Typography variant='h4'>
        {store.isAuth ? `User is authorized ${store.user.email}` : 'LOG IN'}
      </Typography>
      <Typography variant='h6'>
        {store.user.isActivated
          ? 'Account verified by email'
          : 'CONFIRM ACCOUNT!!!!'}
      </Typography>
      <Button variant='contained' onClick={() => store.logout()}>
        Go out
      </Button>
      <Button onClick={getUsers} variant='contained' color='success'>
        Get Users
      </Button>
      {users.map(user => (
        <div className={styles.wrapp}>
          <Typography className={styles.user} variant='h5' key={user.email}>
            {user.email}
          </Typography>
        </div>
      ))}
    </div>
  )
}

export default observer(App)
