<script lang="ts">
    import * as Tabs from '@shadcn/tabs';
    import { Info, Minus, Plus } from 'lucide-svelte';
    import 'svelte-highlight/styles/atom-one-dark-reasonable.css';
    import { type Render, Canvas, Layer } from 'svelte-canvas';
    import { dsaStore } from '@/stores.ts';
    import { Button } from '@shadcn/button';


    let canvas: HTMLCanvasElement;
    let container: HTMLDivElement;

    let height = 0;
    let width = 0;

    $: if (container) {
        const rect = container.getBoundingClientRect();
        height = rect.height;
        width = rect.width;
    }

    let render: Render;
    $: render = ({ context }) => {

        function createPetal(length, width) {

            const path = new Path2D();
            path.moveTo(0, 0);
            path.lineTo(length * 0.3, -width);
            path.lineTo(length * 0.8, -width);
            path.lineTo(length, 0);
            path.lineTo(length * 0.8, width);
            path.lineTo(length * 0.3, width);
            path.closePath();
            path.moveTo(0, 0);
            path.lineTo(length, 0);

            return path;
        }

        function drawPetals(x, y, count, startAt, petal) {
            const step = (Math.PI * 2) / count;
            context.setTransform(1, 0, 0, 1, x, y);
            context.rotate(startAt);
            for (var i = 0; i < count; i += 1) {
                context.stroke(petal);
                context.rotate(step);
            }
            context.setTransform(1, 0, 0, 1, 0, 0);  // restore default
        }

        function drawFlower(col, lineWidth, fitScale, petalCount) {
            context.strokeStyle = col;
            context.lineWidth = lineWidth;
            const size = Math.min(context.canvas.width, context.canvas.height) * fitScale * 0.5;
            drawPetals(context.canvas.width / 2, context.canvas.height / 2, 5, 0, createPetal(size, size * 0.2));
            context.beginPath();
            context.arc(context.canvas.width / 2, context.canvas.height / 2, size * 0.15, 0, Math.PI * 2);
            context.fillStyle = col;
            context.fill();
        }


        drawFlower('white', 4, 0.95, 5);
    };

</script>


<svelte:window on:resize={(e) => {
    width = container.getBoundingClientRect().width;
    height = container.getBoundingClientRect().height;
}} />


<div class="bg-primary flex-col h-dvh flex ">
    <div class="flex flex-1 p-3 gap-5">
        <div class="flex-[4] flex flex-col items-center">

            <Tabs.Root class="flex flex-[3] flex-col rounded-b-xl overflow-clip w-full 2"
                       onValueChange={(value) => console.log(value)}>

                <div class="flex justify-between">
                    <h1 class="text-white text-3xl text-left self-start mt-1 mb-1 indent-5 inline-block">
                        Visualizing: {$dsaStore}
                        <Info color="white" class="inline-block opacity-50" />
                    </h1>

                    <div class="text-white text-base bg-primary border-gray-500">
                        Search here
                    </div>

                    <Tabs.List class="dark">
                        <Tabs.Trigger value="visualizer" class="w-full dark">Visualizer</Tabs.Trigger>
                        <Tabs.Trigger value="implementation" class="w-full dark">Source Code</Tabs.Trigger>
                    </Tabs.List>
                </div>

                <Tabs.Content value="visualizer" class="size-full">
                    <div bind:this={container} class="relative size-full bg-grid bg-primary rounded-xl">
                        {#if container}
                            <div
                                class="absolute left-2 top-1/2 h-fit p-5 flex flex-col bg-primary -translate-y-1/2 z-10 cursor-grab">

                                <h4 class="text-primary-foreground text-center">Commands</h4>
                                <br />
                                <div class="flex flex-col gap-1">
                                    <Button variant="outline" class="text-primary-foreground bg-primary">
                                        New Node
                                    </Button>
                                    <Button variant="outline" class="text-primary-foreground bg-primary">
                                        Add stuff
                                    </Button>
                                    <Button variant="outline" class="text-primary-foreground bg-primary">
                                        Add stuff
                                    </Button>
                                    <Button variant="outline" class="text-primary-foreground bg-primary">
                                        Add stuff
                                    </Button>
                                </div>
                            </div>
                            <Canvas {width} {height} class="absolute size-full">
                                <Layer {render} />
                            </Canvas>
                        {/if}
                        <div class="absolute top-0  right-2">
                            <div class="h-fit  flex gap-2 flex-row">
                                <button class="rounded-md border-2 border-primary-foreground">
                                    <Plus color="white" size={30} />
                                </button>
                                <button class="rounded-md border-2 border-primary-foreground">
                                    <Minus color="white" size={30} />
                                </button>
                            </div>
                        </div>
                    </div>
                </Tabs.Content>
                <Tabs.Content value="implementation" class="size-full rounded-tr-xl">
                    <div class="bg-gray-800 size-full text-white flex items-center justify-center">
                        {'</>'}IMPLEMENTATION{'</>'}
                    </div>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </div>
</div>

<style>
    .bg-grid {
        background-size: 15px 15px;
        background-image: linear-gradient(to right, #83838358 1px, transparent 1px),
        linear-gradient(to bottom, #cccccc47 1px, transparent 1px);
    }
</style>