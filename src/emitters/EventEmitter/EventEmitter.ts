export type EventListener = (...args: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface IEventEmitter {
	on(event: string, listener: EventListener): this;
	off(event: string, listener: EventListener): this;
	emit(event: string, ...args: any[]): boolean; // eslint-disable-line @typescript-eslint/no-explicit-any
	addListener(event: string, listener: EventListener): this;
	removeListener(event: string, listener: EventListener): this;
}

export class EventEmitter implements IEventEmitter {
	private events: Record<string, EventListener[]> = {};

	on(event: string, listener: EventListener): this {
		if (!this.events[event]) {
			this.events[event] = [];
		}

		this.events[event].push(listener);
		return this;
	}

	off(event: string, listener: EventListener): this {
		return this.removeListener(event, listener);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	emit(event: string, ...args: any[]): boolean {
		const listeners = this.events[event];
		if (Array.isArray(listeners)) {
			listeners.forEach((listener) => {
				listener(...args);
			});
			return true;
		}
		return false;
	}

	addListener(event: string, listener: EventListener): this {
		return this.on(event, listener);
	}

	removeListener(event: string, listener: EventListener): this {
		const listeners = this.events[event];
		if (listeners) {
			const index = listeners.indexOf(listener);
			if (index !== -1) {
				listeners.splice(index, 1);
			}
		}
		return this;
	}
}
