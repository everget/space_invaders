import { EventEmitter, type IEventEmitter } from '@/emitters/EventEmitter/EventEmitter';

describe('Class: EventEmitter', () => {
	let emitter: IEventEmitter;

	beforeEach(() => {
		emitter = new EventEmitter();
	});

	it('should create a new instance', () => {
		expect(emitter).toBeInstanceOf(EventEmitter);
	});

	it('should trigger event using on and emit', () => {
		let called = false;

		emitter.on('testEvent', () => {
			called = true;
		});

		emitter.emit('testEvent');

		expect(called).toBe(true);
	});

	it('should trigger event using addListener and emit', () => {
		let called = false;

		emitter.addListener('anotherEvent', () => {
			called = true;
		});

		emitter.emit('anotherEvent');

		expect(called).toBe(true);
	});

	it('should remove listener using removeListener', () => {
		let called = false;

		const listener = () => {
			called = true;
		};

		emitter.on('removeEvent', listener);
		emitter.removeListener('removeEvent', listener);

		emitter.emit('removeEvent');

		expect(called).toBe(false);
	});

	it('should remove listener using off (alias for removeListener)', () => {
		let called = false;

		const listener = () => {
			called = true;
		};

		emitter.on('offEvent', listener);
		emitter.off('offEvent', listener);

		emitter.emit('offEvent');

		expect(called).toBe(false);
	});
});
