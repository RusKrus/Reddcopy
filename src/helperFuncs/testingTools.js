import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import feedAreaReducer from "../components/feedArea/feedAreaSlice";
import postAreaReducer from "../components//postArea/postAreaSlice";
import headerReducer from "../components//header/headerSlice";





const testingTools = {
    createMockStore(){
        const store = configureStore({
            reducer:{
                feedArea: feedAreaReducer,
                postArea: postAreaReducer,
                header: headerReducer
            }
        })

        return store;
    },
    renderWithReduxRouter(component, store=this.createMockStore()){
        const renderedComponent = render(
            <MemoryRouter>
                <Provider store={store}>
                    {component}
                </Provider>
            </MemoryRouter>
        )
        return renderedComponent;
    }
}

export default testingTools;