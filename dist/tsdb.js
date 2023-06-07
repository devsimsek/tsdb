"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TSDB = void 0;
/**
 * Copyright (C) devsimsek.
 * TSDB - Fast, Reliable database port of the original sdb database (php)
 */
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Debug {
    constructor(mode = false) {
        this.mode = mode;
    }
    log(message, flag = "DEBUG") {
        if (this.mode)
            console.info(`[${new Date()} ${flag}]: ${message}`);
    }
    error(message, code = "unknown", flag = "ERROR") {
        console.error(`[${new Date} ${flag}]: ${message} (err code: ${code})`);
    }
}
class TSDB {
    constructor() {
        this.debug = new Debug(true);
        this.debug.log('Initializing tsdb...');
    }
    load(file, directory = "") {
        let load = false;
        this.file = __dirname + "/" + directory + "/" + file + ".tsdb";
        this.debug.log(`Loading ${file} database. (dir: ${__dirname + "/" + (directory !== null && directory !== void 0 ? directory : "")})`);
        if (fs.existsSync(__dirname + "/" + directory + "/" + file + ".tsdb")) {
            try {
                let d = fs.readFileSync(path.join(__dirname, directory, file + ".tsdb"), 'utf8');
                this.data = JSON.parse(d);
                if (Array.isArray(this.data))
                    load = true;
                else {
                    this.debug.error('Datasource is corrupted.');
                    load = false;
                }
            }
            catch (e) {
                this.debug.error(e);
            }
        }
        else
            this.debug.error('Data source does not exists.');
        if (load)
            this.tempObject = this.data;
        return load;
    }
    save() {
        if (this.tempObject) {
            if (this.tempObject.length > 0) {
                try {
                    fs.writeFileSync(this.file, JSON.stringify(this.tempObject));
                    return true;
                }
                catch (e) {
                    this.debug.error(e);
                    return false;
                }
            }
            return false;
        }
        return false;
    }
    createFile(file, directory = "") {
        try {
            file = __dirname + "/" + directory + "/" + file + ".tsdb";
            fs.writeFileSync(file, "[]");
            return true;
        }
        catch (e) {
            this.debug.error(e);
            return false;
        }
    }
    create(key, value) {
        if (this.tempObject) {
            let id = this.tempObject.length > 0 ? this.tempObject.length + 1 : 1;
            return this.tempObject.push(Object.assign({ id: id }, { key, value }));
        }
        return -1;
    }
    readById(id) {
        if (this.tempObject)
            return this.tempObject.find(s => s.id === id);
        return undefined;
    }
    read(key) {
        if (this.tempObject)
            return this.tempObject.find(s => s.key === key);
        return undefined;
    }
    updateById(id, data) {
        if (this.tempObject) {
            let i = this.tempObject.findIndex(s => s.id === id);
            if (i !== -1)
                this.tempObject[i] = Object.assign(Object.assign({}, this.tempObject[i]), data);
        }
    }
    update(key, data) {
        if (this.tempObject) {
            let i = this.tempObject.findIndex(s => s.key === key);
            if (i !== -1)
                this.tempObject[i] = Object.assign(Object.assign({}, this.tempObject[i]), data);
        }
    }
    delete(key) {
        if (this.tempObject) {
            this.tempObject = this.tempObject.filter(v => v.key !== key);
        }
    }
    has(key) {
        return this.read(key) !== null;
    }
    map() {
        if (this.tempObject)
            return JSON.stringify(this.tempObject);
        return -1;
    }
    mapObject() {
        if (this.tempObject)
            return this.tempObject;
        return -1;
    }
}
exports.TSDB = TSDB;
