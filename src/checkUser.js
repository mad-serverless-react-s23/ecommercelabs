import { Auth } from "aws-amplify";

const checkUser = async(updateUser) => {
    try {
        const userData = await Auth.currentSession()
        console.log('check that user, yeah!', userData);

        const { idToken: { payload }} = userData;

        const isAuthorized = payload['cognito:groups'] &&
            payload['cognito:groups'].includes('Admin');

        updateUser({
            username: payload['cognito:username'],
            isAuthorized
        })
    } catch (err) {
        console.error(err)
    }
}
export default checkUser;