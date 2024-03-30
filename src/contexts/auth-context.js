import {
	createContext,
	useContext,
	useEffect,
	useReducer,
	useRef,
} from "react";
import PropTypes from "prop-types";

const HANDLERS = {
	INITIALIZE: "INITIALIZE",
	SIGN_IN: "SIGN_IN",
	SIGN_UP: "SIGN_UP",
	SIGN_OUT: "SIGN_OUT",
	COMPANY_SIGN_UP: "COMPANY_SIGN_UP",
	FETCH_PROJECTS: "FETCH_PROJECTS",
	CREATE_NEW_PROJECT: "CREATE_NEW_PROJECT",
};

const initialState = {
	isAuthenticated: false,
	isLoading: true,
	user: null,
};

const handlers = {
	[HANDLERS.INITIALIZE]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			...// if payload (user) is provided, then is authenticated
			(user
				? {
						isAuthenticated: true,
						isLoading: false,
						user,
				  }
				: {
						isLoading: false,
				  }),
		};
	},
	[HANDLERS.SIGN_IN]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},
	[HANDLERS.SIGN_UP]: (state, action) => {
		const user = action.payload;

		return {
			...state,
			isAuthenticated: true,
			user,
		};
	},

	[HANDLERS.SIGN_OUT]: (state) => {
		return {
			...state,
			isAuthenticated: false,
			user: null,
		};
	},

	[HANDLERS.FETCH_PROJECTS]: (state) => {
		const data = action.payload;
		return {
			...state,
			projects: data,
		};
	},

	[HANDLERS.CREATE_NEW_PROJECT]: (state) => {
		const data = action.payload;
		return {
			...state,
			project_created: data,
		};
	},
};

const reducer = (state, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
	const { children } = props;
	const [state, dispatch] = useReducer(reducer, initialState);
	const initialized = useRef(false);

	const initialize = async () => {
		// Prevent from calling twice in development mode with React.StrictMode enabled
		if (initialized.current) {
			return;
		}

		initialized.current = true;

		let isAuthenticated = false;

		try {
			isAuthenticated =
				window.sessionStorage.getItem("authenticated") === "true";
		} catch (err) {
			console.error(err);
		}

		if (isAuthenticated) {
			const user = {
				id: "5e86809283e28b96d2d38537",
				avatar: "/assets/avatars/avatar-anika-visser.png",
				name: "Om",
				email: "buddhadevom@gmail.com",
			};

			dispatch({
				type: HANDLERS.INITIALIZE,
				payload: user,
			});
		} else {
			dispatch({
				type: HANDLERS.INITIALIZE,
			});
		}
	};

	useEffect(
		() => {
			initialize();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const skip = () => {
		try {
			window.sessionStorage.setItem("authenticated", "true");
		} catch (err) {
			console.error(err);
		}

		const user = {
			id: "5e86809283e28b96d2d38537",
				avatar: "/assets/avatars/avatar-anika-visser.png",
				name: "Om",
				email: "buddhadevom@gmail.com",
		};

		dispatch({
			type: HANDLERS.SIGN_IN,
			payload: user,
		});
	};

	const signIn = async (email, password) => {
		if (email !== "buddhadevom@gmail.com" || password !== "Password321") {
			throw new Error("Please check your email and password");
		}

		// axios
		// 	.post("/api/token/")
		// 	.then(function (response) {
		// 		// handle success
		// 		console.log(response);
		// 	})
		// 	.catch(function (error) {
		// 		// handle error
		// 		console.log(error);
		// 	})
		// 	.finally(function () {
		// 		// always executed
		// 	});

		try {
			window.sessionStorage.setItem("authenticated", "true");
		} catch (err) {
			console.error(err);
		}

		const user = {
			id: "5e86809283e28b96d2d38537",
			avatar: "/assets/avatars/avatar-anika-visser.png",
			name: "Om",
			email: "buddhadevom@gmail.com",
		};

		dispatch({
			type: HANDLERS.SIGN_IN,
			payload: user,
		});
	};

	const signUp = async (company_id, email, name, password) => {
		throw new Error("Sign up is not implemented");
	};

	const fetchProjects = async () => {};

	const signOut = () => {
		dispatch({
			type: HANDLERS.SIGN_OUT,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				...state,
				skip,
				signIn,
				signUp,
				signOut,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
