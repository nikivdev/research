/**
 * MinHeap implementation in TypeScript.
 *
 * JavaScript doesn't have a built-in heap, so you might need to implement one
 * or use an array with manual heapify operations in interviews.
 *
 * HEAP PROPERTIES:
 * - Complete binary tree stored in array
 * - Parent is smaller (min-heap) or larger (max-heap) than children
 * - Root is always min/max element
 * - Insert and extract are O(log n)
 */

export class MinHeap<T = number> {
  private heap: T[] = [];
  private compareFn: (a: T, b: T) => number;

  constructor(compareFn: (a: T, b: T) => number = (a, b) => (a as number) - (b as number)) {
    this.compareFn = compareFn;
  }

  get size(): number {
    return this.heap.length;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  push(val: T): void {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.bubbleDown(0);
    return min;
  }

  private bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compareFn(this.heap[index], this.heap[parentIndex]) >= 0) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  private bubbleDown(index: number): void {
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < this.heap.length && this.compareFn(this.heap[leftChild], this.heap[smallest]) < 0) {
        smallest = leftChild;
      }
      if (rightChild < this.heap.length && this.compareFn(this.heap[rightChild], this.heap[smallest]) < 0) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
      index = smallest;
    }
  }
}

// MaxHeap is just MinHeap with reversed comparison
export class MaxHeap<T = number> extends MinHeap<T> {
  constructor(compareFn: (a: T, b: T) => number = (a, b) => (b as number) - (a as number)) {
    super(compareFn);
  }
}

/**
 * ARRAY-BASED HEAP FORMULAS:
 *
 * For node at index i:
 * - Parent: Math.floor((i - 1) / 2)
 * - Left child: 2 * i + 1
 * - Right child: 2 * i + 2
 *
 * HEAP OPERATIONS:
 *
 * push(val) - O(log n):
 * 1. Add to end of array
 * 2. Bubble up until heap property restored
 *
 * pop() - O(log n):
 * 1. Save root (min/max element)
 * 2. Move last element to root
 * 3. Bubble down until heap property restored
 * 4. Return saved element
 *
 * peek() - O(1):
 * 1. Return root element (don't remove)
 *
 * WHEN TO USE HEAP:
 * - "K largest/smallest" problems
 * - Merge K sorted things
 * - Median from data stream
 * - Task scheduling with priorities
 * - Dijkstra's shortest path
 */
