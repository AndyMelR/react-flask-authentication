const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user:{},
			token: "",
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			setSignup: async (
				email,
				password
			  ) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body: JSON.stringify({
					email,
					password,
				  }),
				  mode: "cors",
				});
				const user = await response.json();
				setStore({ ...getStore(), user });
				//const newUser = await response.json();
				//setStore({user: newUser})
			  },

			  setUser: async (email, password) => {
				const response = await fetch(process.env.BACKEND_URL + "/api/login", {
				  method: "POST",
				  headers: {
					"Content-Type": "application/json",
				  },
				  body:JSON.stringify({
					email,
					password,
				  }) ,
				  mode: "cors",
				});
				console.log(response)
				if (!response.ok) throw Error("There was a problem in the login request");
		
				if (response.status === 401) {
				  throw "Invalid credentials";
				} else if (response.status === 400) {
				  throw "Invalid email or password format";
				}
				const {token} = await response.json();
				setStore({ ...getStore(), token });
			  },
			  getUser: async () => {
				const token = getStore().user.token; // <-- obtener token de user del store
				const response = await fetch(process.env.BACKEND_URL + "/api/user", {
				  method: "GET",
				  headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				  },
				});
				const user = await response.json();
				setStore({ ...getStore(), user });
			  },

			  logout: async () => {
				try {
				  const { token } = getStore().user;
				  if (!token) {
					throw Error("No token found");
				  }
			  
				  const response = await fetch(process.env.BACKEND_URL + "/api/logout", {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					  Authorization: "Bearer " + token,
					},
				  });
			  
				  if (!response.ok) {
					throw Error("There was a problem with the logout request");
				  }
			  
				  setStore({ ...getStore(), user: {}, token: "" });
				} catch (error) {
				  console.log("Error during logout", error);
				}
			  },
			  
			  
			

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
