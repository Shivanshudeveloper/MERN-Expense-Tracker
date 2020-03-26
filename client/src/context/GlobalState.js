import React, {createContext, useReducer} from "react";
import AppReducer from "./AppReducer";

// Axios for maiking the API Request from the Server MondoDB Data
import axios from "axios";

// Initial State
const initialState = {
    transactions: [],
    error: null,
    loading: true
}

// Create Global Context Here
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`);

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function addTransaction(transaction) {
        // For sending data we need a Content Type
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post(`/api/v1/transactions`, transaction, config);
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });

        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getTransaction() {
        try {
            const res = await axios.get("/api/v1/transactions");
            // To get the data array in the whole MongoDB Data
            // res.data.data;
            dispatch({
                type: 'GET_TRANSACTION',
                payload: res.data.data
            });


        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    // Provider Componnet
    return (
        <GlobalContext.Provider value={{
            transactions: state.transactions,
            deleteTransaction,
            addTransaction,
            getTransaction,
            error: state.error,
            loading: state.loading
        }}>
            {children}
        </GlobalContext.Provider>
    );
}