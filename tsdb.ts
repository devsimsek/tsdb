/**
 * Copyright (C) devsimsek.
 * TSDB - Fast, Reliable database port of the original sdb database (php)
 * This is my first typescript package! Please leave comment on my website or social media!
 * @github: https://github.com/devsimsek
 * @web: https://beta.smsk.me
 * @package: tsdb (https://github.com/devsimsek/tsdb)
 * @version: v1.0
 */
import * as fs from 'fs'
import * as path from 'path'

class Debug {
  constructor(protected mode: boolean = false) {
    
  }

  log(message: string, flag: string = "DEBUG"): boolean | void {
    if (this.mode) console.info(`[${new Date()} ${flag}]: ${message}`)
  }

  error(message: string, code: string = "unknown", flag: string = "ERROR") {
    console.error(`[${new Date} ${flag}]: ${message} (err code: ${code})`)
  }
}

export interface Data {
  id: any 
  key: string
  value: any
}

export class TSDB {
  debug: Debug = new Debug(true)
  data: any
  tempObject: Array<Data>
  file: string = ''
  constructor() {
    this.debug.log('Initializing tsdb...')
    this.tempObject = []
  }

  load(file: string, directory: string = ""): boolean {
    let load: boolean = false
    this.file = __dirname + "/" + directory + "/" + file + ".tsdb"
    this.debug.log(`Loading ${file} database. (dir: ${__dirname + "/" + (directory ?? "")})`)
    if (fs.existsSync(__dirname + "/" + directory + "/" + file + ".tsdb")) {
      try {
        let d = fs.readFileSync(path.join(__dirname, directory, file + ".tsdb"), 'utf8')
        this.data = JSON.parse(d)
        if (Array.isArray(this.data))
          load = true
        else {
          this.debug.error('Datasource is corrupted.')
          load = false
        }
      } catch (e) {
        // @ts-ignore
        this.debug.error(e)
      }
    } else this.debug.error('Data source does not exists.')
    if (load) this.tempObject = this.data
    return load  
  }

  save(): boolean {
    if (this.tempObject) {
      if (this.tempObject.length > 0) {
        try {
          fs.writeFileSync(this.file, JSON.stringify(this.tempObject))
          return true
        } catch (e) {
          // @ts-ignore
          this.debug.error(e)
          return false
        }
      }
      return false
    }
    return false
  }
  
  createFile(file: string, directory: string = ""): boolean {
    try {
      file = __dirname + "/" + directory + "/" + file + ".tsdb"
      fs.writeFileSync(file, "[]")
      return true
    } catch (e) {
      // @ts-ignore
      this.debug.error(e)
      return false
    }
  }

  create(key: string, value: any): number {
    if (this.tempObject) {
      let id = this.tempObject.length > 0 ? this.tempObject.length + 1 : 1;
      return this.tempObject.push({ id: id , ...{key, value}})
    }
    return -1
  }

  readById(id: number): Data | undefined {
    if (this.tempObject)
      return this.tempObject.find(s => s.id === id)
    return undefined
  }

  read(key: string): Data | undefined {
    if (this.tempObject)
      return this.tempObject.find(s => s.key === key)
    return undefined
  }

  updateById(id: number, data: Partial<Data>): void {
    if (this.tempObject) {
      let i = this.tempObject.findIndex(s => s.id === id)
      if (i !== -1) this.tempObject[i] = { ...this.tempObject[i], ...data }
    }
  }

  update(key: string, data: Partial<Data>): void {
    if (this.tempObject) {
      let i = this.tempObject.findIndex(s => s.key === key)
      if (i !== -1) this.tempObject[i] = { ...this.tempObject[i], ...data }
    }
  }

  delete(key: string): void {
    if (this.tempObject) {
      this.tempObject = this.tempObject.filter(v => v.key !== key)
    }
  }

  has(key: string): boolean {
    return this.read(key) !== null
  }

  map(): string | number {
    if (this.tempObject) 
      return JSON.stringify(this.tempObject)
    return -1
  }

  mapObject(): Data[] | number {
    if (this.tempObject)
      return this.tempObject
    return -1
  }
}
