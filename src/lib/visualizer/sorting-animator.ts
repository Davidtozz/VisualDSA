import { visualizer } from '@/visualizer/visualizer.svelte.ts';

class BeepPlayer {
    private ctx: AudioContext | null = null;

    private getCtx() {
        if (!this.ctx) {
            // @ts-ignore
            this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        }
        return this.ctx as AudioContext;
    }

    public init() {
        this.getCtx();
    }

    public async resume() {
        try {
            const c = this.getCtx();
            if (c.state === 'suspended') await c.resume();
        } catch (e) {
            // ignore
        }
    }

    public play(freq = 440, duration = 0.05) {
        try {
            const c = this.getCtx();
            const now = c.currentTime;

            const osc = c.createOscillator();
            const gain = c.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            // Very short envelope to avoid clicks
            gain.gain.setValueAtTime(0.0001, now);
            gain.gain.linearRampToValueAtTime(0.2, now + 0.005);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

            osc.connect(gain);
            gain.connect(c.destination);

            osc.start(now);
            osc.stop(now + duration + 0.01);

            osc.onended = () => {
                try {
                    osc.disconnect();
                    gain.disconnect();
                } catch (e) {}
            };
        } catch (e) {}
    }
}

export class SortingAnimator {
    private beep = new BeepPlayer();

    constructor() {
        this.beep.init();
    }

    /**
     * Resume audio context (call from user gesture)
     */
    async resumeAudio() {
        await this.beep.resume();
    }

    /**
     * Play a beep during sorting step (percentage-based frequency)
     * @param value - the numeric value (array index or element)
     * @param arrayLength - total array length for percentage calculation
     */
    public playStepBeep(value: number, arrayLength: number) {
        try {
            const percentage = Math.min(1, Math.max(0, value / arrayLength));
            const freq = Math.min(2000, 220 + percentage * 1500);
            this.beep.play(freq, 0.04);
        } catch (e) {
            // ignore audio errors
        }
    }

    /**
     * Play completion chime sequence (ascending pitch left to right)
     * @param array - the sorted array values
     * @param onProgress - callback to update UI (e.g., arrayAccess, visual feedback)
     * @param shouldStop - function that returns true if animation should stop
     */
    public async playChimeSequence(
        array: number[],
        onProgress: (index: number) => void,
        shouldStop: () => boolean
    ) {
        try {
            await this.beep.resume();
            await visualizer.delay(60);

            const minFreq = 220;
            const maxFreq = 1200;

            for (let i = 0; i < array.length; i++) {
                if (shouldStop()) break;

                onProgress(i);

                // Frequency based on percentage of array position
                const percentage = i / array.length;
                const freq = minFreq + percentage * (maxFreq - minFreq);
                this.beep.play(freq, 0.06);

                await visualizer.delay(40);
            }
        } catch (e) {}
    }

    /**
     * Animate green fill with rising frequency (ease-in effect)
     * @param arrayLength - total array length
     * @param onProgress - callback with sortedUpTo index (0 to arrayLength)
     * @param shouldStop - function that returns true if animation should stop
     * @param durationMs - animation duration in milliseconds
     */
    public async animateGreenFill(
        arrayLength: number,
        onProgress: (sortedUpTo: number) => void,
        shouldStop: () => boolean,
        durationMs: number = 1500
    ) {
        try {
            await this.beep.resume();

            const startTime = Date.now();
            const fillMinFreq = 200;
            const fillMaxFreq = 1500;

            while (true) {
                if (shouldStop()) break;

                const elapsed = Date.now() - startTime;
                const progress = Math.min(1, elapsed / durationMs);

                // Ease-in effect: cubic easing
                const easeProgress = progress * progress * progress;

                // Update green fill progress
                onProgress(Math.floor(easeProgress * arrayLength));

                // Play rising frequency sound based on linear progress
                const freq = fillMinFreq + progress * (fillMaxFreq - fillMinFreq);
                this.beep.play(freq, 0.05);

                if (progress >= 1) {
                    onProgress(arrayLength);
                    break;
                }

                await visualizer.delay(20);
            }
        } catch (e) {}
    }
}