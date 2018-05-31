declare module '*.json' {
    const content: any;
    export default content;
}

type Class = { new(...args: any[]): any; };