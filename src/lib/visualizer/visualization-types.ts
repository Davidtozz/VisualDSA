/**
 * Visualization component registry for non-linear data structures.
 * Maps data structure types to their Svelte components.
 */
const visualizationComponents: Record<string, () => Promise<any>> = {
    bst: () => import('@/data_structures/BinarySearchTree/bst.svelte'),
    graph: () => import('@/data_structures/Graph/graph.svelte')
};

/**
 * Get the visualization component for a data structure type
 */
export async function getVisualizationComponent(type: string): Promise<any> {
    const loader = visualizationComponents[type.toLowerCase()];
    if (!loader) {
        throw new Error(`No visualization component found for type: ${type}`);
    }
    return loader();
}

/**
 * Register a visualization component for a new data structure type
 */
export function registerVisualizationComponent(
    type: string,
    loader: () => Promise<any>
): void {
    visualizationComponents[type.toLowerCase()] = loader;
}
