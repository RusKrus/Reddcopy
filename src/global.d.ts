declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }

declare module 'uuid' {
  export function v4(): string;
}

declare module 'he'