// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';


class mockIntersectionObserver {
    constructor(callback, options){
        this.callback = callback;
        this.options = options;
        this.observe = jest.fn();
        this.unobserve = jest.fn();
        this.disconnect = jest.fn();
    }

    triggerIntersect(entries){
        this.callback(entries, this)
    }
}

global.IntersectionObserver = mockIntersectionObserver; 
