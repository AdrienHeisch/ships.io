declare module '*.json' {
    const content: any;
    export default content;
}

type Class = { new(...args: any[]): any; };

type ShipInput = {
    up:boolean;
    down:boolean;
    left:boolean;
    right:boolean;
}