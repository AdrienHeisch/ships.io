// / <reference types="express" />

declare module 'expresslfs' {
    import * as express from 'express';

    function expresslfs (pBatchApi:string, pOptions:any):any;

    namespace expresslfs {}

    export = expresslfs;
}