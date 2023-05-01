import { View, StyleSheet, SafeAreaView, Pressable, TextInput, FlatList, Text } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import colors from "../../variables/colors";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "../../variables/url";
import AdminUserItem from "../../components/adminAddCoach/adminUserItem";

const AdminCoachesScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [description, setDescription]= useState('');
  const [specialization, setSpecialization] = useState('');
  const [visible, setVisible] = useState(false);

  function SearchUsers(text){
    const filteredUsers = users.filter((item) => {
      const username = item.username.toLowerCase(); // convert title to lowercase
      return username.includes(text.toLowerCase()); // convert text to lowercase and use includes method
    });
    setFilteredUsers(filteredUsers);
  }

  function UserInfoPlus(user){
    setUser(user);
    setVisible(true);
  }

  function LoadUsers() {
    axios
      .get(`${url}/users/users-for-admin`, {})
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(err => {
        console.log(err);
    });
  }

  function CreateCoach(){
    if (description.trim() === "" || specialization.trim() === "") return;
    axios
      .post(`${url}/coaches/coach-create`, {
        user_id: user.id,
        specializaion: specialization,
        description: description
      })
      .then(response => {
        axios
          .put(`${url}/users/upgrade/user-to-coach/${user.id}`, {})
          .then(response => {
            setVisible(false);
            LoadUsers();
            setDescription('');
            setSpecialization('');
            axios.get(`${url}/users/expo/${user.id}`).then(response => {
              fetch('https://exp.host/--/api/v2/push/send', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                to: response.data.token,
                title: 'You are coach!',
                body: 'Your role has been changed to coach.'
              })
            })
            })
          })
          .catch(err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
    });
  }

  useEffect(() => {
    LoadUsers();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
        <Pressable onPress={() => {navigation.navigate("AdminHome")}} style={{height: '10%', paddingLeft: '5%', justifyContent: 'flex-end'}}>
          <AntDesign name="leftcircle" size={40} color="black" />
        </Pressable>
        <View style={styles.usersContainer}>
            <View style={styles.searchContainer}>
                <TextInput onChangeText={SearchUsers} style={{fontSize: 25}} placeholder="Search"></TextInput>
            </View>
            <View style={styles.usersList}>
                <FlatList
                    data={filteredUsers}
                    renderItem={({item}) => {
                        return <AdminUserItem func={UserInfoPlus} user={item}/>;
                    }}
                />
            </View>
        </View>
        {visible ? 
            <View style={styles.addCoachContainer}>
                <View style={{height: '10%', justifyContent: 'flex-end', alignItems: 'center', width: '80%', borderBottomWidth: 2, borderColor: colors.green}}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.white}}>{user.username}</Text>
                </View>
                <View style={{borderWidth: 1, height: '10%', marginTop: '5%', width: '90%', justifyContent: 'center', paddingLeft: '5%', backgroundColor: colors.white, borderRadius: 30}}>
                    <TextInput placeholder="Specialization" style={{fontSize: 17}} onChangeText={(text) => setSpecialization(text)}/>
                </View>
                <View style={{borderWidth: 1, height: '60%', marginTop: '5%', width: '90%', justifyContent: 'flex-start', backgroundColor: colors.white, borderRadius: 30, padding: '5%'}}>
                <TextInput 
                    maxLength={250} 
                    keyboardType="default" 
                    returnKeyType="done" 
                    multiline={true} 
                    blurOnSubmit={true} 
                    placeholder="Description" 
                    style={{width: '100%', height: '100%', color: colors.black, textAlignVertical: 'top', fontSize: 17}}
                    onChangeText={(text) => setDescription(text)}>
                </TextInput>
                </View>
                <View style={{flexDirection: 'row', gap: 60}}>
                    <Pressable onPress={CreateCoach} style={{marginTop: '5%', backgroundColor: colors.green, paddingHorizontal: '7%', paddingVertical: '2%', borderRadius: 30}}>
                        <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 17}}>ADD</Text>
                    </Pressable>
                    <Pressable onPress={() => setVisible(false)} style={{marginTop: '5%', backgroundColor: 'red', paddingHorizontal: '7%', paddingVertical: '2%', borderRadius: 30}}>
                        <Text style={{color: colors.white, fontWeight: 'bold', fontSize: 17}}>CLOSE</Text>
                    </Pressable>
                </View>
            </View> : null
        }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  usersContainer:{
    width: '100%',
    height: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '5%'
  },
  searchContainer: {
    width: '100%',
    height: '10%',
    justifyContent: 'flex-end',
    borderBottomWidth: 2,
    borderColor: colors.green,
  },
  usersList: {
    justifyContent:'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '90%',
    padding: '5%',
  },
  addCoachContainer: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    marginTop: '10%',
    backgroundColor: colors.darkgrey,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});

export default AdminCoachesScreen;
