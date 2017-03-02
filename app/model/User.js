/**
 * Created by huibei on 17/3/1.
 */
export default class User {
}
User.schema = {
    name: 'User',
    properties: {
        name: {type: 'string',optional: true},
        sex: {type: 'string',optional: true},
        access_token: {type: 'string'},
        access_token_secret: {type: 'string'},
        picture: {type: 'data', optional: true},
        online:{type:'bool'}, // optional property
    }
}
