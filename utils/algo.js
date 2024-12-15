export function memo(fn, cache = {}) {
  return (...args) => (cache[JSON.stringify(args)] ??= fn(...args));
}

export function bfs(root, fn) {
  let queue = [{ node: root, depth: 0 }];

  while (queue.length) {
    let { node, depth } = queue.shift();

    if (fn(node, depth)) return { node, depth };

    for (let child of node.children ?? []) {
      queue.push({ node: child, depth: depth + 1 });
    }
  }
}

export function dfs(root, fn) {
  let stack = [{ node: root, depth: 0 }];

  while (stack.length) {
    let { node, depth } = stack.pop();

    if (fn(node, depth)) return { node, depth };

    for (let child of node.children?.toReversed() ?? []) {
      stack.push({ node: child, depth: depth + 1 });
    }
  }
}

export function createHeap(heap = [], compare = (a, b) => b - a) {
  function add(item) {
    heap.push(item);
    up(heap.length - 1);
  }

  function up(i) {
    while (i > 0) {
      let next = Math.floor((i + 1) / 2) - 1;

      if (compare(heap[i], heap[next]) < 0) {
        [heap[next], heap[i]] = [heap[i], heap[next]];
      }

      i = next;
    }
  }

  function pop() {
    let root = heap[0];
    let last = heap.pop();

    if (heap.length) {
      heap[0] = last;
      down(0);
    }

    return root;
  }

  function down(i) {
    let { length } = heap;

    while (true) {
      let right = (i + 1) * 2;
      let left = right - 1;
      let next = i;

      if (right < length && compare(heap[right], heap[next]) < 0) {
        next = right;
      }

      if (left < length && compare(heap[left], heap[next]) < 0) {
        next = left;
      }

      if (next === i) {
        break;
      }

      [heap[next], heap[i]] = [heap[i], heap[next]];
      i = next;
    }
  }

  return {
    get heap() {
      return heap;
    },

    get peek() {
      return heap[0];
    },

    add,
    pop,

    *[Symbol.iterator]() {
      while (heap.length) {
        yield pop();
      }
    },
  };
}

export function createQueue(queue = []) {
  function add(item) {
    queue.push(item);
  }

  function pop() {
    return queue.shift();
  }

  return {
    add,
    pop,

    *[Symbol.iterator]() {
      while (queue.length) {
        yield pop();
      }
    },
  };
}

export function createStack(stack = []) {
  function add(item) {
    stack.push(item);
  }

  function pop() {
    return stack.pop();
  }

  return {
    add,
    pop,

    *[Symbol.iterator]() {
      while (stack.length) {
        yield pop();
      }
    },
  };
}
