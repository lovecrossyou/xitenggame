/**
 * Created by huibei on 17/3/1.
 */
class User {
}
User.schema = {
    name: 'User',
    properties: {
        name: {type: 'string'},
        sex: {type: 'string',optional: true},
        access_token: {type: 'string'},
        access_token_secret: {type: 'string'},
        picture: {type: 'data', optional: true}, // optional property
    }
}

export let User
