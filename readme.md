# TSDB (TypeScript Database)

TSDB is a fast and reliable database port of the original sdb database written in PHP. It is my first TypeScript package, and I welcome any comments or feedback on my website or social media.

## Installation

To install TSDB, you can use npm:

```
npm install ts-sdb
```

## Usage

Here is an example of how to use TSDB in your TypeScript project:

```typescript
import { TSDB } from 'tsdb';

// Create a new instance of TSDB
const db = new TSDB();

// Load the database
db.load('mydatabase');

// Perform operations on the database
db.create('key1', 'value1');
db.create('key2', 'value2');
db.update('key1', { value: 'newvalue' });
db.delete('key2');

// Save changes to the database
db.save();
```

## Documentation

### Class: Debug

The Debug class provides logging and error handling functionalities.

#### Constructor

```typescript
constructor(mode: boolean = false)
```

- `mode` (optional): A boolean value indicating the debug mode. Default is `false`.

#### log

Logs a message to the console if debug mode is enabled.

```typescript
log(message: string, flag: string = 'DEBUG'): boolean | void
```

- `message`: The message to be logged.
- `flag` (optional): The log flag. Default is `'DEBUG'`.

#### error

Logs an error message to the console.

```typescript
error(message: string, code: string = 'unknown', flag: string = 'ERROR')
```

- `message`: The error message to be logged.
- `code` (optional): The error code. Default is `'unknown'`.
- `flag` (optional): The error flag. Default is `'ERROR'`.

### Interface: Data

The Data interface represents a database record.

```typescript
interface Data {
  id: any;
  key: string;
  value: any;
}
```

- `id`: The unique identifier of the record.
- `key`: The key of the record.
- `value`: The value associated with the key.

### Class: TSDB

The TSDB class represents the TSDB database.

#### Constructor

```typescript
constructor()
```

Creates a new instance of the TSDB class.

#### load

Loads a database file.

```typescript
load(file: string, directory: string = ''): boolean
```

- `file`: The name of the database file.
- `directory` (optional): The directory where the database file is located. Default is an empty string.

Returns `true` if the database is successfully loaded, `false` otherwise.

#### save

Saves the changes made to the database.

```typescript
save(): boolean
```

Returns `true` if the changes are successfully saved, `false` otherwise.

#### create

Creates a new record in the database.

```typescript
create(key: string, value: any): number
```

- `key`: The key of the record.
- `value`: The value associated with the key.

Returns the ID of the created record.

#### readById

Reads a record from the database by its ID.

```typescript
readById(id: number): Data | undefined
```

- `id`: The ID of the record.

Returns the record if found, `undefined` otherwise.

#### read

Reads a record from the database by its key.

```typescript
read(key: string): Data | undefined
```

- `key`: The key of

 the record.

Returns the record if found, `undefined` otherwise.

#### updateById

Updates a record in the database by its ID.

```typescript
updateById(id: number, data: Partial<Data>): void
```

- `id`: The ID of the record.
- `data`: The partial data to update.

#### update

Updates a record in the database by its key.

```typescript
update(key: string, data: Partial<Data>): void
```

- `key`: The key of the record.
- `data`: The partial data to update.

#### delete

Deletes a record from the database by its key.

```typescript
delete(key: string): void
```

- `key`: The key of the record.

#### has

Checks if a record with the given key exists in the database.

```typescript
has(key: string): boolean
```

- `key`: The key to check.

Returns `true` if the record exists, `false` otherwise.

#### map

Returns a JSON string representation of the database.

```typescript
map(): string | number
```

Returns the JSON string representation of the database if it exists, `-1` otherwise.

#### mapObject

Returns the database as an array of Data objects.

```typescript
mapObject(): Data[] | number
```

Returns the database as an array of Data objects if it exists, `-1` otherwise.

## Contributors

- [devsimsek](https://github.com/devsimsek) - Developer and maintainer

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
