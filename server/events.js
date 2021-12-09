class EventEmitter {
    
    listeners = {};

    fire(event) {
        for (const key in this.listeners) {
            let listener = this.listener(key);
            this.unregister(key);
            listener(events);
        }
    }

    register(id, listener) {
        this.listeners[id] = listener;
        console.log('Register', id);
    }
    
    unregister(id) {
        return delete this.listeners[id];
    }
}

module.exports = EventEmitter;
