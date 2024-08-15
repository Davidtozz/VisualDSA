import { Graph } from './graph.ts';
import { log } from 'node:console';

const graph = new Graph<number>();

graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addVertex(4);
graph.addVertex(5);
graph.addVertex(3);
graph.addVertex(7);
graph.addVertex(10);

graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(2, 3);
graph.addEdge(2, 4);
graph.addEdge(3, 5);
graph.addEdge(3, 6);
graph.addEdge(3, 7);
graph.addEdge(4, 7);
graph.addEdge(10, 8);
graph.addEdge(8, 9);
graph.addEdge(9, 10);


graph.print();
log('==Depth First Search==');
graph.dfs(3);


log('==Breadth First Search==');
graph.bfs(3);

log(graph);