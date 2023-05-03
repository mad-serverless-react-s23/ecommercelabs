import './App.css';
import { Authenticator } from '@aws-amplify/ui-react';
import { Button } from 'antd';
import '@aws-amplify/ui-react/styles.css';

const Profile = () => {
    return (
        <Authenticator>
            {({ signOut, user }) => (
                <>
                <h1>Content!</h1>
                <h2>This is your profile, I guess</h2>
                <h3>{user.username}</h3>
                <Button onClick={signOut}>Click to sign out?</Button>
                </>
            )}
        </Authenticator>
    )
}


export default Authenticator(Profile)