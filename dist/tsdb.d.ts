declare class Debug {
    protected mode: boolean;
    constructor(mode?: boolean);
    log(message: string, flag?: string): boolean | void;
    error(message: string, code?: string, flag?: string): void;
}
export interface Data {
    id: any;
    key: string;
    value: any;
}
export declare class TSDB {
    debug: Debug;
    data: any;
    tempObject: Array<Data>;
    file: string;
    constructor();
    load(file: string, directory?: string): boolean;
    save(): boolean;
    createFile(file: string, directory?: string): boolean;
    create(key: string, value: any): number;
    readById(id: number): Data | undefined;
    read(key: string): Data | undefined;
    updateById(id: number, data: Partial<Data>): void;
    update(key: string, data: Partial<Data>): void;
    delete(key: string): void;
    has(key: string): boolean;
    map(): string | number;
    mapObject(): Data[] | number;
}
export {};
