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
        picture: {type: 'data', optional: true}, // optional property
    }
}

export let User
