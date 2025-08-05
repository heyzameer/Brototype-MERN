Here's a detailed explanation of all the **Graph Concepts** you asked for:

---

## 📘 **Definition and Properties of Graphs**

A **graph** is a non-linear data structure consisting of:

* **Vertices (or nodes)**: Points representing entities (e.g., cities, people).
* **Edges (or links)**: Connections between the vertices (e.g., roads, relationships).

### ✨ Basic Properties:

1. **Vertex (V)**: A fundamental unit (node).
2. **Edge (E)**: Connects two vertices. Can be **directed** or **undirected**.
3. **Degree**:

   * **In-degree**: Number of incoming edges.
   * **Out-degree**: Number of outgoing edges.
4. **Path**: A sequence of vertices connected by edges.
5. **Cycle**: A path that starts and ends at the same vertex.
6. **Connected Graph**: There is a path between every pair of vertices.
7. **Component**: A disconnected part of a graph.

---

## 📗 **Types of Graphs**

### ➤ **Directed Graph (Digraph)**

* Edges have **direction** (one-way).
* Example: Twitter (A follows B doesn’t mean B follows A).

```txt
A → B
```

### ➤ **Undirected Graph**

* Edges are **bidirectional** (no direction).
* Example: Facebook (if A is friends with B, B is friends with A).

```txt
A — B
```

### ➤ **Weighted Graph**

* Edges carry **weights/costs** (e.g., distance, time).
* Example: Google Maps (distance between cities).

```txt
A —5— B
```

### ➤ **Unweighted Graph**

* All edges are treated equally (same cost or no cost).

---

## 📕 **Special Types of Graphs**

### ➤ **Directed Acyclic Graph (DAG)**

* A **directed** graph with **no cycles**.
* Used in:

  * Scheduling
  * Build systems
  * Dependency resolution

```txt
A → B → C
    ↓
    D
```

### ➤ **Cyclic Graphs**

* Contain **one or more cycles**.
* Can be either directed or undirected.

### ➤ **Isolated Vertex**

* A node **not connected** to any other node (no edges).
* Example: A person not connected to anyone in a social network.

---

## 📙 **Graph Representations**

There are two standard ways to represent graphs in code:

### ➤ **Adjacency List (Efficient for sparse graphs)**

* Each vertex stores a **list of neighbors**.
* Space: `O(V + E)`

```js
{
  A: [B, C],
  B: [A],
  C: [A]
}
```

### ➤ **Adjacency Matrix (Efficient for dense graphs)**

* A `V x V` matrix where `matrix[i][j] = 1` (or weight) if there’s an edge.
* Space: `O(V²)`

```txt
   A B C
A [0 1 1]
B [1 0 0]
C [1 0 0]
```

---

## 📒 **Applications of Graphs**

Graphs are used in **numerous real-world and computer science applications**, including:

1. **Social Networks** – Modeling friendships, followers, influencers.
2. **Navigation Systems (Google Maps)** – Shortest path, route planning.
3. **Recommendation Engines** – Product/user similarity.
4. **Web Crawling** – Pages and links are modeled as graphs.
5. **Computer Networks** – Routers and communication links.
6. **Scheduling & Task Planning** – With DAGs (e.g., build tools like `webpack`, `make`).
7. **Games and AI** – Pathfinding using graphs (e.g., A\* algorithm).
8. **Blockchain & Cryptocurrencies** – Transaction graphs.
9. **Dependency Resolution** – Package managers, compilers.
10. **Epidemiology** – Spread of disease modeled using graphs.

---

Let’s go step-by-step to **implement** and **explain** both **BFS (Breadth-First Search)** and **DFS (Depth-First Search)** on a **graph**, along with their **concepts** and **applications**.

---




Let's break it down in a **clear, easy-to-understand** way with examples and proper explanation:

---

## ✅ 1. **Graph vs Tree**

### 👉 Graph:

* A **graph** is a collection of **nodes (vertices)** connected by **edges**.
* Graphs can be:

  * **Directed** (edges have direction like A → B)
  * **Undirected** (edges have no direction like A — B)
* Can contain **cycles** (a path that starts and ends at the same node).
* No concept of a root node.

#### 🔗 Example:

```
Graph:
A --- B
|     |
C --- D

This is a graph because:
- There are cycles (A-B-D-C-A)
- No fixed starting/root node
```

---

### 👉 Tree:

* A **tree** is a **special type of graph** that is:

  * **Connected** (all nodes are reachable)
  * **Acyclic** (no loops/cycles)
  * Has exactly **n-1 edges** for n nodes
  * Has a **root node** and flows downward (like a family tree)

#### 🌲 Example:

```
Tree:
      A
     / \
    B   C
       / \
      D   E

This is a tree because:
- No cycles
- Every node has exactly one parent (except root)
```

---

## 🔁 2. **How to Detect Cycles in a Graph**

We handle this differently for **directed** and **undirected** graphs.

---

### 🔹 In a **Directed Graph** (e.g. A → B → C → A)

Use **DFS** with a `visited` state:

* `0 = unvisited`
* `1 = visiting (in recursion stack)`
* `2 = visited (already done)`
**Approach**:
We use **Depth-First Search (DFS)** with **color marking** to detect cycles in a directed graph.

---

### 🎨 **Color Marking Strategy (`visited` array values)**:

* `0` = Not visited (White)
* `1` = Visiting / In recursion stack (Gray)
* `2` = Visited and done (Black)

---

### 🧠 **Core DFS Logic**:

* If you revisit a node marked `1` (gray), you've found a **back edge** → **cycle exists**.
* If it's already `2` (black), skip it.
* After exploring a node and all its neighbors, mark it as `2`.

---

### 🔁 **Why we run DFS for all nodes**:

To handle **disconnected components** in the graph.

---

### ✅ **Time Complexity**:

`O(V + E)` — V = vertices, E = edges

### ✅ **Space Complexity**:

`O(V)` — for the `visited` array and recursion stack

---

```js
function hasCycleDirected(graph, n) {
  const visited = Array(n).fill(0);

  function dfs(node) {
    if (visited[node] === 1) return true; // back edge = cycle
    if (visited[node] === 2) return false;

    visited[node] = 1;
    for (const neighbor of graph[node]) {
      if (dfs(neighbor)) return true;
    }
    visited[node] = 2;
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i] === 0 && dfs(i)) return true;
  }
  return false;
}
```

---

### 🔹 In an **Undirected Graph** (e.g. A — B — C — A)

Use **DFS** and keep track of the **parent node**. If you reach a **visited node that is not the parent**, you found a cycle.

```js
function hasCycleUndirected(graph, n) {
  const visited = Array(n).fill(false);

  function dfs(node, parent) {
    visited[node] = true;
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true;
      }
    }
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i] && dfs(i, -1)) return true;
  }
  return false;
}
```
### ✅ **Time Complexity**:

`O(V + E)` — V = vertices, E = edges

### ✅ **Space Complexity**:

`O(V)` — for the `visited` array and recursion stack
---

## 🛣️ 3. **Shortest Path in a Graph**

There are **2 common cases**:

---

### 🔸 Case 1: **Unweighted Graph**

Use **Breadth-First Search (BFS)**. It always finds the shortest path (minimum number of edges).

```js
function bfsShortestPath(graph, start, end) {
  const queue = [[start, 0]];
  const visited = new Set([start]);

  while (queue.length) {
    const [node, dist] = queue.shift();
    if (node === end) return dist;

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1; // not reachable
}
```

#### 🧠 Example:

```js
graph = {
  0: [1, 2],
  1: [2, 3],
  2: [3],
  3: []
}

Shortest path from 0 to 3 = 2 steps (0 → 1 → 3)
```

---

### 🔸 Case 2: **Weighted Graph**

Use **Dijkstra's Algorithm** — it finds the minimum total cost (weights of edges), not just fewest steps.

```js
function dijkstra(graph, start) {
  const dist = Array(graph.length).fill(Infinity);
  dist[start] = 0;
  const pq = [[0, start]];

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // simple min-heap
    const [currentDist, node] = pq.shift();

    if (currentDist > dist[node]) continue;

    for (const [neighbor, weight] of graph[node]) {
      const newDist = currentDist + weight;
      if (newDist < dist[neighbor]) {
        dist[neighbor] = newDist;
        pq.push([newDist, neighbor]);
      }
    }
  }

  return dist;
}
```

#### 🧠 Example:

```js
graph = {
  0: [[1, 2], [2, 4]],
  1: [[2, 1], [3, 7]],
  2: [[3, 3]],
  3: []
}

Dijkstra from 0:
Shortest path to node 3 is 0 → 1 → 2 → 3 = total weight 6
```

---

### 🧾 Summary Table

| Task          | Method                            | Use Case                       |
| ------------- | --------------------------------- | ------------------------------ |
| Detect cycle  | DFS (w/ parent or visited states) | Directed & Undirected          |
| Shortest path | BFS                               | Unweighted graphs              |
| Shortest path | Dijkstra                          | Weighted graphs (non-negative) |

---





### ✅ What is a Path in a Graph?

A **path** in a graph is a sequence of **vertices** connected by **edges**, where each consecutive pair of vertices is connected by an edge.

* In a **directed graph**, the direction of the edges matters.
* In an **undirected graph**, the path can move either way on an edge.

---

### 🟢 What is the Shortest Path?

The **shortest path** between two nodes is the path with the **minimum total weight** (in weighted graphs) or **fewest number of edges** (in unweighted graphs).

---

### 🔍 How to Find the Shortest Path

#### 1. **Unweighted Graph**

Use **Breadth-First Search (BFS)** — finds the shortest path in terms of the number of edges.

**Example (BFS)**:

```js
function shortestPathBFS(graph, start, end) {
  let queue = [[start]];
  let visited = new Set();

  while (queue.length) {
    let path = queue.shift();
    let node = path[path.length - 1];

    if (node === end) return path;

    if (!visited.has(node)) {
      visited.add(node);
      for (let neighbor of graph[node]) {
        let newPath = [...path, neighbor];
        queue.push(newPath);
      }
    }
  }
  return null; // No path found
}
```

---

#### 2. **Weighted Graph (No Negative Weights)**

Use **Dijkstra's Algorithm** – guarantees the shortest path by exploring the lowest-cost paths first.

**Key Idea**:

* Use a **min-heap (priority queue)** to always expand the lowest-cost node.
* Maintain a distance map and update when shorter paths are found.

**Time Complexity**: `O((V + E) log V)` with a min-heap

---

#### 3. **Weighted Graph (With Negative Weights)**

Use **Bellman-Ford Algorithm** – can handle negative weights and detect negative cycles.

* Slower than Dijkstra: `O(V * E)`
* Works even when some edges reduce total cost (negative weights).

---

#### 4. **All-Pairs Shortest Path**

Use **Floyd-Warshall Algorithm** (for small graphs)

* Time Complexity: `O(V³)`
* Calculates shortest paths between **all pairs** of vertices.

---

### ✅ Summary Table

| Graph Type          | Best Algorithm | Time Complexity  | Notes                        |
| ------------------- | -------------- | ---------------- | ---------------------------- |
| Unweighted          | BFS            | O(V + E)         | Shortest by number of edges  |
| Weighted (No -ve)   | Dijkstra       | O((V + E) log V) | Efficient with a min-heap    |
| Weighted (With -ve) | Bellman-Ford   | O(V \* E)        | Can detect negative cycles   |
| All-Pairs (Small)   | Floyd-Warshall | O(V³)            | Good for dense, small graphs |

---





## 🔹 Graph Traversals

Traversal means visiting all the nodes of a graph. The two main strategies are:

---

## ✅ Breadth-First Search (BFS)

### 🔸 Concept:

* BFS explores the graph level by level.
* It starts at a source node, then visits all its neighbors, then neighbors of those neighbors, and so on.
* It uses a **queue** to keep track of nodes to visit.

### 🔸 Implementation:

```javascript
class Graph {
  constructor() {
    this.adjList = new Map(); // Adjacency list
  }

  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }

  addEdge(v1, v2) {
    this.adjList.get(v1).push(v2);
    this.adjList.get(v2).push(v1); // For undirected graph
  }

  bfs(start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current);

      for (const neighbor of this.adjList.get(current)) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

// Usage:
const graph = new Graph();
['A', 'B', 'C', 'D', 'E'].forEach(v => graph.addVertex(v));
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'E');

console.log("BFS:", graph.bfs('A')); // Output: A, B, C, D, E
```

### 🔸 Time & Space Complexity:

* **Time:** O(V + E) — where V = vertices, E = edges
* **Space:** O(V) — for queue and visited set

### 🔸 Applications:

* Shortest path in unweighted graphs
* Social networking sites (finding connections)
* Web crawlers
* GPS Navigation systems
Let's go through the code **line-by-line** and **understand everything** about this `Graph` class and how **Breadth-First Search (BFS)** is implemented in it.

---

## ✅ Goal:

This class is used to create an **undirected graph** and perform **BFS traversal** starting from a given node.

---

## 📦 Class Breakdown: `Graph`

```js
class Graph {
  constructor() {
    this.adjList = new Map(); // Adjacency list
  }
```

### 🔹 `adjList`:

* A `Map()` is used to store the **adjacency list**, where:

  * Each **key** is a node (vertex).
  * Each **value** is an array of its connected neighbors.
* This structure is efficient for **adding/removing edges** and **traversal**.

---

### 🔹 `addVertex(vertex)`

```js
addVertex(vertex) {
  if (!this.adjList.has(vertex)) {
    this.adjList.set(vertex, []);
  }
}
```

* **Purpose**: To add a new node to the graph.
* If the vertex is **not already present**, it's added with an **empty array** (no neighbors yet).

#### 🧠 Example:

```js
g.addVertex('A'); 
// adjList becomes: { A: [] }
```

---

### 🔹 `addEdge(v1, v2)`

```js
addEdge(v1, v2) {
  this.adjList.get(v1).push(v2);
  this.adjList.get(v2).push(v1); // For undirected graph
}
```

* **Adds an edge between two vertices**, `v1` and `v2`.
* Since it’s an **undirected graph**, both directions are added:

  * v1 → v2
  * v2 → v1

#### 🧠 Example:

```js
g.addEdge('A', 'B');
// adjList becomes: { A: [B], B: [A] }
```

> **Note**: This code assumes that both vertices have already been added via `addVertex`.

---

## 🔄 `bfs(start)`

```js
bfs(start) {
  const visited = new Set();
  const queue = [start];
  const result = [];

  visited.add(start);
```

### 🧠 What is BFS?

* **Breadth-First Search (BFS)** explores **layer by layer**.
* It uses a **queue** to remember the next nodes to visit.
* Useful for **shortest path in unweighted graphs**, and **level-wise traversal**.

---

### 📌 Step-by-step Execution of BFS:

1. **Initialize**:

   * `visited`: Keeps track of visited nodes (prevents cycles).
   * `queue`: Starts with the `start` node.
   * `result`: Stores the order of traversal.

2. **Loop**:

```js
while (queue.length > 0) {
  const current = queue.shift();
  result.push(current);
```

* Take the **front node** from the queue (`shift()`).
* Mark it as visited by adding to `result`.

---

3. **Explore Neighbors**:

```js
for (const neighbor of this.adjList.get(current)) {
  if (!visited.has(neighbor)) {
    visited.add(neighbor);
    queue.push(neighbor);
  }
}
```

* Loop through each neighbor of the current node.
* If neighbor is **not visited**:

  * Mark as visited.
  * Add to the queue (for future exploration).

---

4. **Return Final Traversal**:

```js
return result;
```

This returns the list of nodes **visited in BFS order**.

---

## ✅ Example Usage:

```js
const g = new Graph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');

console.log(g.bfs('A')); 
// Output: ['A', 'B', 'C', 'D']
```

### 🧭 BFS Traversal Flow:

* Start at `A`
* Visit `B`, `C` (neighbors of A)
* Visit `D` (neighbor of B)

---

## 🧠 Time & Space Complexity:

* **Time Complexity**:
  `O(V + E)` — All vertices and edges are visited once.

* **Space Complexity**:
  `O(V)` — For `visited`, `queue`, and `result`.

---

## 🔄 Summary:

| Method        | Purpose                                      |
| ------------- | -------------------------------------------- |
| `addVertex()` | Adds a new node to the graph                 |
| `addEdge()`   | Connects two nodes (undirected edge)         |
| `bfs()`       | Performs breadth-first traversal from a node |



---

## ✅ Depth-First Search (DFS)

### 🔸 Concept:

* DFS explores as far as possible along each branch before backtracking.
* It uses **recursion** (or a **stack**) to keep track of nodes.

### 🔸 Implementation:

```javascript
class GraphDFS extends Graph {
  dfs(start) {
    const visited = new Set();
    const result = [];

    const dfsHelper = (vertex) => {
      if (!vertex) return;
      visited.add(vertex);
      result.push(vertex);

      for (const neighbor of this.adjList.get(vertex)) {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      }
    };

    dfsHelper(start);
    return result;
  }
}

// Usage:
const dfsGraph = new GraphDFS();
['A', 'B', 'C', 'D', 'E'].forEach(v => dfsGraph.addVertex(v));
dfsGraph.addEdge('A', 'B');
dfsGraph.addEdge('A', 'C');
dfsGraph.addEdge('B', 'D');
dfsGraph.addEdge('C', 'E');

console.log("DFS:", dfsGraph.dfs('A')); // Output: A, B, D, C, E
```

### 🔸 Time & Space Complexity:

* **Time:** O(V + E)
* **Space:** O(V) — for recursion stack and visited set

### 🔸 Applications:

* Cycle detection in a graph
* Topological sorting (in DAGs)
* Solving mazes or puzzles
* Network analysis (e.g., connected components)

---

## ✅ BFS vs DFS Summary

| Feature        | BFS                          | DFS                                   |
| -------------- | ---------------------------- | ------------------------------------- |
| Data Structure | Queue                        | Stack (or recursion)                  |
| Strategy       | Level-wise                   | Depth-wise                            |
| Shortest Path  | ✅ Yes                        | ❌ Not always                          |
| Memory Usage   | More (stores entire level)   | Less (deeper but fewer nodes at once) |
| Applications   | Shortest paths, broadcasting | Puzzle solving, cycle detection       |

---










### ✅ Minimum Spanning Tree (MST) – Explained in Detail

---

### 🔷 What is a Minimum Spanning Tree?

A **Minimum Spanning Tree (MST)** is a subset of the edges of a **connected, undirected, weighted** graph that:

1. Connects **all the vertices** together.
2. Has **no cycles**.
3. Has the **minimum possible total edge weight**.

---

### 📌 Why is MST Important?

**Applications:**

* Network design (telecom, computer networks)
* Road and transport planning
* Clustering algorithms
* Approximation for NP-hard problems (e.g., traveling salesman)

---

### 📊 Properties of MST:

| Property          | Description                                   |
| ----------------- | --------------------------------------------- |
| Graph Type        | Undirected, Connected, Weighted               |
| Edges in MST      | `V - 1` edges (where V is number of vertices) |
| No Cycles         | Always acyclic (a tree!)                      |
| Not Always Unique | If weights are same, multiple MSTs may exist  |

---

### 🛠 Algorithms to Find MST:

#### 1. **Kruskal’s Algorithm (Greedy)**

* Sort all edges by weight.
* Pick the smallest edge that **does not form a cycle**.
* Use **Disjoint Set (Union-Find)** to detect cycles.

**Time Complexity**: `O(E log E)`
(Sorting edges dominates)

---

#### ✅ Kruskal’s Example (JS-style pseudocode):

```js
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(u) {
    if (this.parent[u] !== u) this.parent[u] = this.find(this.parent[u]);
    return this.parent[u];
  }

  union(u, v) {
    let pu = this.find(u), pv = this.find(v);
    if (pu === pv) return false;
    this.parent[pu] = pv;
    return true;
  }
}

function kruskalMST(V, edges) {
  edges.sort((a, b) => a[2] - b[2]); // Sort by weight
  const uf = new UnionFind(V);
  const result = [];
  let cost = 0;

  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      result.push([u, v]);
      cost += weight;
    }
  }

  return { mst: result, totalWeight: cost };
}
```

---

#### 2. **Prim’s Algorithm (Greedy)**

* Start from any node.
* Add the **smallest edge** connecting the current tree to a new vertex.
* Use a **min-heap (priority queue)** for efficiency.

**Time Complexity**:

* Naive: `O(V²)`
* With Min-Heap: `O((V + E) log V)`

---

#### ✅ Prim’s Conceptual Steps:

1. Start with a single node.
2. Push all connected edges into a priority queue.
3. Pick the smallest-weight edge that connects to a **new** vertex.
4. Repeat until all vertices are included.

---

### ⚖ Kruskal vs Prim

| Feature    | Kruskal’s                 | Prim’s                    |
| ---------- | ------------------------- | ------------------------- |
| Approach   | Edge-based (global)       | Vertex-based (local)      |
| Best For   | Sparse graphs             | Dense graphs              |
| Uses       | Union-Find (Disjoint Set) | Priority Queue / Min-Heap |
| Complexity | `O(E log E)`              | `O((V + E) log V)`        |

---

### 🎯 Example Input (for both):

```js
// edges = [ [u, v, weight] ]
const edges = [
  [0, 1, 4],
  [0, 2, 3],
  [1, 2, 1],
  [1, 3, 2],
  [2, 3, 4],
  [3, 4, 2],
  [4, 5, 6]
];
```
### ✅ Merge Sort to Sort a String (Step-by-Step Explanation + Code)

---

### 🔷 What does “sort a string” mean?

Sorting a string means **rearranging its characters** in lexicographical (alphabetical) order.

For example:
🔤 `"dcba"` → `"abcd"` (after sorting)

---

### 🔧 How to Use Merge Sort to Sort a String?

Merge Sort is a **Divide and Conquer** algorithm:

1. Divide the string into halves.
2. Recursively sort both halves.
3. Merge the sorted halves back.

---

### 📘 Merge Sort Concept for Strings:

Just treat the string as an array of characters.

---

### ✅ JavaScript Code to Sort a String Using Merge Sort:

```js
function mergeSortString(str) {
  // Convert string to array for easy manipulation
  const arr = str.split('');

  // Recursive merge sort function
  function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
  }

  // Merge two sorted arrays
  function merge(left, right) {
    let result = [], i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  // Return the sorted string
  return mergeSort(arr).join('');
}

// 🔍 Example:
console.log(mergeSortString("letzto")); // Output: "elottz"
```

---

### 🧠 Time and Space Complexity:

| Complexity | Value                   |
| ---------- | ----------------------- |
| Time       | O(n log n)              |
| Space      | O(n) (for extra arrays) |

---

### ✨ Example Dry Run:

Input: `"bca"`

1. Split → `"b"`, `"ca"`
2. Sort `"ca"` → `"a"`, `"c"` → Merge → `"ac"`
3. Merge `"b"` and `"ac"` → `"abc"`

---
class Graph {
  constructor() {
    this.adjList = {};
  }

  addVertex(vertex) {
    if (!this.adjList[vertex]) {
      this.adjList[vertex] = [];
    }
  }

  addEdge(v1, v2) {
    this.adjList[v1].push(v2);
    this.adjList[v2].push(v1); // Remove this line for a directed graph
  }

  // BFS
  bfs(start) {
    const visited = {};
    const queue = [start];
    const result = [];

    visited[start] = true;

    while (queue.length) {
      const vertex = queue.shift();
      result.push(vertex);

      this.adjList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }

    return result;
  }

  // DFS
  dfs(start) {
    const result = [];
    const visited = {};

    const dfsHelper = (v) => {
      if (!v) return;
      visited[v] = true;
      result.push(v);

      this.adjList[v].forEach(neighbor => {
        if (!visited[neighbor]) dfsHelper(neighbor);
      });
    };

    dfsHelper(start);
    return result;
  }
}

// Sample Workouts
const g = new Graph();

// Workout 1: Adding vertices and edges
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addVertex("E");

g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "E");

// Workout 2: BFS from A
console.log("BFS from A:", g.bfs("A"));  // Output: [ 'A', 'B', 'C', 'D', 'E' ]

// Workout 3: DFS from A
console.log("DFS from A:", g.dfs("A"));  // Output: [ 'A', 'B', 'D', 'C', 'E' ]

Here's how to solve the **"Clone Graph"** problem from LeetCode (Problem #133) using JavaScript, with a full explanation.

---

### ❓ Problem Summary

You are given a reference to a node in a **connected undirected graph**. Each node has a value and a list of neighbors. You need to return a **deep copy (clone)** of the graph.

Each node is of the form:

```js
class Node {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}
```

---

### ✅ Approach: **DFS with HashMap**

We’ll use a hash map (`Map`) to keep track of already cloned nodes to avoid cycles and duplicated work.

---

### 🔁 Algorithm Steps

1. If input node is `null`, return `null`.
2. Initialize a `Map` to store cloned nodes (`original node -> cloned node`).
3. Define a recursive DFS function:

   * If the node is already cloned, return it from the map.
   * Otherwise:

     * Create a new node.
     * Add it to the map.
     * Clone all its neighbors recursively.
4. Return the clone of the input node.

---

### ✅ JavaScript Code

```js
/**
 * // Definition for a Node:
 * function Node(val, neighbors) {
 *    this.val = val;
 *    this.neighbors = neighbors || [];
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    if (!node) return null;

    const map = new Map();

    const dfs = (current) => {
        if (map.has(current)) {
            return map.get(current);
        }

        // Clone the node (without neighbors for now)
        const clone = new Node(current.val);
        map.set(current, clone);

        // Clone the neighbors
        for (let neighbor of current.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    };

    return dfs(node);
};
```

---

### 🧠 Time and Space Complexity

* **Time:** `O(N)` — each node and edge is visited once.
* **Space:** `O(N)` — for the hash map and recursion stack.

---

### 📘 Example

Input graph:

```
1 -- 2
|    |
4 -- 3
```

Output: Deep copy of the same structure (different nodes in memory).

---

Let me know if you want a **BFS version**, or if you want to **visualize the graph** and how the clone is formed.
