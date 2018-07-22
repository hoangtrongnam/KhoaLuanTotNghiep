// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    
        'facebookAuth' : {
            'clientID'        : '372842999875874', // your App ID 572260129776268
            'clientSecret'    : '9f2119a8d443b0811d79908c45955b7d', // your App Secret 20e6f818ebe511478635518b004fbb1b
            'callbackURL'     : 'https://localhost:3000/auth/facebook/callback',
            'profileURL'      : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'
    
        },
    
        'googleAuth' : {
            'clientID'         : 'your-secret-clientID-here',
            'clientSecret'     : 'your-client-secret-here',
            'callbackURL'      : 'http://localhost:3000/auth/google/callback'
        }
    
    };
    