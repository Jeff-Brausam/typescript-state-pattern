interface BaseEntity {
  id: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

interface User extends BaseEntity {
  email: string;
}

const Allysa: User = {
  id: "1",
  email: "AlyssaG@gmail.com",
};

const James: User = {
  id: "2",
  email: "JamesB@yahoo.com",
};

const Users: User[] = [Allysa, James];

interface UsersState {
  users: User[];
  currentUser: User;
}

const newUser: User = {
  id: null,
  email: "",
};

const initialUserState: UsersState = {
  users: Users,
  currentUser: newUser,
};

interface AppState {
  usersState: UsersState[];
}

class UsersStore {
  reducer;
  state: UsersState;

  constructor(state: UsersState, reducer) {
    this.state = state;
    this.reducer = reducer;
  }

  getState() {
    return this.state;
  }
  select(key: string) {
    return this.state[key];
  }
  dispatch(action: Action) {
    this.state = this.reducer(this.state, action);
  }
}

const USER_LOAD = "User Load";
const USER_CREATE = "User Create";
const USER_UPDATE = "User Update";
const USER_DELETE = "User Delete";
const USER_SELECT = "User Select";
const USER_CLEAR = "User Clear";

const loadUser = (state, users): UsersState => {
  return {
    users: users.payload,
    currentUser: state.currentUser,
  };
};
const selectUser = (state, user): UsersState => {
  return {
    users: state.users,
    currentUser: user.payload,
  };
};
const clearUser = (state): UsersState => {
  return {
    users: state.users,
    currentUser: null,
  };
};
const createUser = (state, user): UsersState => {
  return {
    users: [...state.users, user.payload],
    currentUser: state.currentUser,
  };
};
const updateUser = (state, user): UsersState => {
  return {
    users: state.users.map((u) =>
      u.id === user.payload.id ? (<any>Object).assign({}, user.payload) : u
    ),
    currentUser: state.currentUser,
  };
};
const deleteUser = (state, user): UsersState => {
  return {
    users: state.users.filter((u) => u.id !== user.payload.id),
    currentUser: state.currentUser,
  };
};

const usersReducer = (state: UsersState = initialUserState, action: Action) => {
  switch (action.type) {
    case USER_LOAD: {
      return loadUser(state, action);
    }
    case USER_SELECT: {
      return selectUser(state, action);
    }
    case USER_CLEAR: {
      return clearUser(state);
    }
    case USER_CREATE: {
      return createUser(state, action);
    }
    case USER_UPDATE: {
      return updateUser(state, action);
    }
    case USER_DELETE: {
      return deleteUser(state, action);
    }
    default:
      return state;
  }
};

const Jane: User = {
  id: "123",
  email: "janewoah@hotmail.com",
};

const updatedJane: User = {
  id: "123",
  email: "janesnewemail@yahoo.com",
};

// now use it!
const userStore = new UsersStore(initialUserState, usersReducer);
userStore.getState();
userStore.dispatch({ type: USER_CREATE, payload: Jane });
console.log("User created! Current State: ", userStore.getState());
userStore.dispatch({ type: USER_UPDATE, payload: updatedJane });
console.log("User updated! Current State: ", userStore.getState());
userStore.dispatch({ type: USER_DELETE, payload: Jane });
console.log("User deleted! Current State: ", userStore.getState());
userStore.dispatch({ type: USER_SELECT, payload: James });
console.log("User selected! Current State: ", userStore.getState());
userStore.dispatch({ type: USER_CLEAR, payload: James });
console.log("User cleared! Current State: ", userStore.getState());
