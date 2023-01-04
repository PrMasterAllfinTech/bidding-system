const UseStorage = props => {
    const storage = JSON.parse(localStorage.getItem('userDetails'))

    const user_data = storage.user_data

    return {id: user_data.id, name: user_data.name, role: user_data.role_id};
};

export default UseStorage;