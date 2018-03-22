The most recent version of this guide is available [here]().

# Dear Future Developer
This is a pretty standard react native app made with [Create React Native App](https://github.com/react-community/create-react-native-app).
You can see their guide [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).
This app uses [expo](https://expo.io/).
It talks to the [rainworks-backend](https://github.com/simonbw/rainworks-backend) running at [rainworks-backend.herokuapp.com](https://rainworks-backend.herokuapp.com).

### Some things you might need to do

Install [yarn](https://yarnpkg.com/en/), (I suppose you could use `npm` if you wanted to).

Install the expo client, `exp`:

    yarn global add exp

Install app dependencies:

    yarn

Start a local dev version:

    yarn start

Publish a new version on expo:

    exp publish
