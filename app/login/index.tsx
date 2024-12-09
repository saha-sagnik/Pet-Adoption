import { View, Image,Text, Pressable } from 'react-native';
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import Colors from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'


const parseFontSize = (size: string) => {
  return parseInt(size.replace('px', ''), 10);
};

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    
    void WebBrowser.warmUpAsync()
    return () => {
      void WebBrowser.coolDownAsync()
    }
  }, [])
}

WebBrowser.maybeCompleteAuthSession()

function LoginScreen() {

  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL('/(tabs)/home', { scheme: 'myapp' }),
      })
      if(createdSessionId){
        setActive!({ session: createdSessionId })
      }
      else{

      }

    } catch (err) {
    
      console.error(JSON.stringify(err, null, 2))
    }
  }, [])

  return (
    <View style={{
      height: '100%',
      backgroundColor:Colors.WHITE,
    }}>
      <Image source={require('./../../assets/images/login.png')}
      style={{
        width: '100%',
        height: '60%',
      }}
      />
      <View
      style={{
        padding:20,
        display:'flex',
        alignItems:'center'
      }}
      >
      <Text
      style={{
        fontFamily: '',
        fontSize:20,
        textAlign:'center'
      }}
      >Ready to make a new friend?</Text>
      <Text
      style={{
        fontSize: parseFontSize('20px'),
        textAlign:'center',
        color:Colors.GRAY
      }}
      >Let's adopt the pet which you like and make there life happy </Text>

<Pressable

onPress={onPress}
style={{
  padding:14,
  marginTop:100,
  backgroundColor:Colors.PRIMARY,
  width:'100%',
  borderRadius:14
}}
>
  <Text
  style={{
    fontFamily:'',
    fontSize:20,
    textAlign:'center'
  }}
  >Get Started</Text>
</Pressable>

      </View>
    </View>
  );
}

export default LoginScreen;
