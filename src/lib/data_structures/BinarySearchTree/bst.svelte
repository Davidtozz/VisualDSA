<script lang="ts">
    import { Canvas, Layer, type Render } from 'svelte-canvas';
    import { bst } from '$lib/data_structures/BinarySearchTree/bst.svelte.ts';
    import { NODE_RADIUS } from '@/constants';
    import { clearCanvas, drawEdge, drawNode } from '@/visualizer/canvas-utils';

    interface TreeNode {
        value: number;
        left: TreeNode | null;
        right: TreeNode | null;
    }

    interface Props {
        root?: TreeNode | null;
    }

    interface LayoutNode {
        node: TreeNode;
        depth: number;
    }

    interface Position {
        x: number;
        y: number;
    }

    let { root }: Props = $props();
    let currentRoot = $derived(root ?? bst.root);

    function collectInOrder(node: TreeNode | null, depth = 0, result: LayoutNode[] = []): LayoutNode[] {
        if (!node) return result;

        collectInOrder(node.left, depth + 1, result);
        result.push({ node, depth });
        collectInOrder(node.right, depth + 1, result);
        return result;
    }

    function getMaxDepth(node: TreeNode | null, depth = 0): number {
        if (!node) return depth - 1;
        return Math.max(getMaxDepth(node.left, depth + 1), getMaxDepth(node.right, depth + 1));
    }

    function drawEdges(
        ctx: CanvasRenderingContext2D,
        node: TreeNode | null,
        positions: Map<TreeNode, Position>
    ) {
        if (!node) return;

        const start = positions.get(node);
        if (!start) return;

        for (const child of [node.left, node.right]) {
            if (!child) continue;
            const end = positions.get(child);
            if (!end) continue;

            drawEdge(ctx, start.x, start.y, end.x, end.y, {
                strokeStyle: 'white',
                lineWidth: 2,
                lineCap: 'round'
            });
            drawEdges(ctx, child, positions);
        }
    }

    let render: Render = $derived(({ context, width, height }) => {
        clearCanvas(context, width, height);

        const tree = currentRoot;
        if (!tree) return;

        const nodes = collectInOrder(tree);
        const maxDepth = Math.max(0, getMaxDepth(tree));
        const topPadding = NODE_RADIUS + 28;
        const bottomPadding = NODE_RADIUS + 28;
        const xSpacing = width / (nodes.length + 1);
        const levelGap = maxDepth === 0
            ? 0
            : Math.max(36, (height - topPadding - bottomPadding) / (maxDepth + 1));

        const positions = new Map<TreeNode, Position>();

        nodes.forEach((entry, index) => {
            positions.set(entry.node, {
                x: (index + 1) * xSpacing,
                y: topPadding + entry.depth * levelGap
            });
        });

        drawEdges(context, tree, positions);

        for (const { node } of nodes) {
            const position = positions.get(node);
            if (!position) continue;

            const isHighlighted = bst.highlighted === node.value;

            drawNode(context, position.x, position.y, node.value.toString(), {
                radius: NODE_RADIUS,
                nodeFillStyle: isHighlighted ? '#f87171' : 'white',
                strokeStyle: 'white',
                lineWidth: 2,
                font: '20px system-ui',
                textFillStyle: 'black'
            });
        }

        if (nodes.length === 0) {
            drawNode(context, width / 2, height / 2, 'BSTree is empty', {
                radius: NODE_RADIUS * 2,
                nodeFillStyle: 'transparent',
                strokeStyle: 'transparent',
                lineWidth: 0,
                font: '24px system-ui',
                textFillStyle: 'white'
            });
        }
    });
</script>

<Canvas layerEvents>
    <Layer {render} />
</Canvas>
