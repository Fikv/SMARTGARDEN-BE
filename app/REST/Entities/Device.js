export default class Device {

    constructor(name,type ,status, connectionType, address) {
        this.type = type
        this.name = name;
        this.status = status,
        this.connectionType = connectionType,
        this.address = address;
    }


    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }


    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }


    get connectionType() {
        return this._connectionType;
    }

    set connectionType(value) {
        this._connectionType = value;
    }

}